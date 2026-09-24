import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { AccountType, AccountTypePicker } from '../../shared/components/account-type-picker/account-type-picker';
import { AppUser } from '../../core/models/user.model';

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
    if (queryType === 'beginner' || queryType === 'advanced' || queryType === 'trainer') this.accountType.set(queryType);
  }

  readonly ctaLabel = computed(() => {
    switch (this.accountType()) {
      case 'advanced':
        return 'Sign in as an advanced student';
      case 'trainer':
        return 'Sign in as an admin';
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

        this.router.navigate([user.role === 'student' ? '/student' : '/admin']);
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
      return user.role === 'trainer' ? null : 'This account is a student account, not an admin. Switch tabs above and try again.';
    }

    if (user.role === 'trainer') {
      return "This account is an admin account. Switch to the Admin tab above and try again.";
    }
    if (user.ageGroup !== selected) {
      const actualLabel = user.ageGroup === 'advanced' ? 'Advanced' : 'Beginner';
      return `This account is a ${actualLabel} student account. Switch tabs above and try again.`;
    }
    return null;
  }
}
