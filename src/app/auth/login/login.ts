import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { AccountType, AccountTypePicker } from '../../shared/components/account-type-picker/account-type-picker';

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
  /** Purely cosmetic — swaps the hero art and button copy; the real role comes from the matched account. */
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
        this.router.navigate([user.role === 'student' ? '/student' : '/trainer']);
      },
      error: (err: Error) => {
        this.submitting.set(false);
        this.errorMessage.set(err.message);
        this.sidekick.say('Hmm, that didn’t work. Want to try again?', 'oops', 3500);
      },
    });
  }
}
