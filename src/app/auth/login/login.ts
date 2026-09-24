import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { AccountType, AccountTypePicker } from '../../shared/components/account-type-picker/account-type-picker';
import { AppUser, ROLE_HOME_PATH } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FriendlyAlert, AuthHero, AccountTypePicker],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sidekick = inject(SidekickService);

  readonly errorMessage = signal('');
  readonly submitting = signal(false);
  readonly showPassword = signal(false);
  /** Which tab is selected — swaps the hero art/button copy, and is checked
   *  against the account that actually logs in (see submit()). */
  readonly accountType = signal<AccountType>('beginner');

  constructor() {
    const queryType = this.route.snapshot.queryParamMap.get('accountType');
    if (queryType === 'beginner' || queryType === 'advanced' || queryType === 'trainer' || queryType === 'coach') {
      this.accountType.set(queryType);
    }
  }

  readonly ctaLabel = computed(() => {
    switch (this.accountType()) {
      case 'advanced':
        return 'Sign in as an advanced student';
      case 'trainer':
        return 'Sign in as an admin';
      case 'coach':
        return 'Sign in as a trainer';
      default:
        return 'Sign in as a beginner';
    }
  });

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  chooseAccountType(type: AccountType): void {
    this.accountType.set(type);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  forgotPassword(): void {
    this.sidekick.say('Ask your grown-up or trainer to help you reset it!', 'wave', 3500);
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please fill in your email and password to continue.');
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      next: (user) => {
        this.submitting.set(false);

        const mismatch = this.accountTypeMismatch(user);
        if (mismatch) {
          this.auth.logout();
          this.errorMessage.set(mismatch);
          this.sidekick.say('Hmm, that didn’t work. Want to try again?', 'oops', 3500);
          return;
        }

        this.router.navigate([ROLE_HOME_PATH[user.role]]);
      },
      error: (err: Error) => {
        this.submitting.set(false);
        this.errorMessage.set(err.message);
        this.sidekick.say('Hmm, that didn’t work. Want to try again?', 'oops', 3500);
      },
    });
  }

  /** Checks the selected tab against the account that actually logged in —
   *  returns a friendly error message if they don't match, or null if fine. */
  private accountTypeMismatch(user: AppUser): string | null {
    const selected = this.accountType();

    if (selected === 'trainer') {
      return user.role === 'trainer' ? null : `${this.actualAccountLabel(user)} Switch to the Admin tab above and try again.`;
    }
    if (selected === 'coach') {
      return user.role === 'coach' ? null : `${this.actualAccountLabel(user)} Switch to the Trainer tab above and try again.`;
    }

    // Selected tab was a student tier (beginner/advanced).
    if (user.role !== 'student') {
      return `${this.actualAccountLabel(user)} Switch tabs above and try again.`;
    }
    if (user.ageGroup !== selected) {
      return `${this.actualAccountLabel(user)} Switch tabs above and try again.`;
    }
    return null;
  }

  private actualAccountLabel(user: AppUser): string {
    if (user.role === 'trainer') return 'This account is an admin account.';
    if (user.role === 'coach') return 'This account is a trainer account.';
    const ageLabel = user.ageGroup === 'advanced' ? 'Advanced' : 'Beginner';
    return `This account is a ${ageLabel} student account.`;
  }
}
