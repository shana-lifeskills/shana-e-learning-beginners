import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { AccountType, AccountTypePicker } from '../../shared/components/account-type-picker/account-type-picker';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FriendlyAlert, AuthHero, AccountTypePicker],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly errorMessage = signal('');
  readonly submitting = signal(false);
  readonly showPassword = signal(false);
  readonly accountType = signal<AccountType>('beginner');

  readonly ctaLabel = computed(() => {
    switch (this.accountType()) {
      case 'advanced':
        return 'Create account as an advanced student';
      case 'trainer':
        return 'Create account as a trainer';
      default:
        return 'Create account as a beginner';
    }
  });

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor() {
    const queryType = this.route.snapshot.queryParamMap.get('accountType');
    if (queryType === 'beginner' || queryType === 'advanced' || queryType === 'trainer') this.accountType.set(queryType);
  }

  chooseAccountType(type: AccountType): void {
    this.accountType.set(type);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  submit(): void {
    const accountType = this.accountType();

    if (this.form.invalid) {
      this.errorMessage.set("Almost there! Let's fill in every box first.");
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);

    const { fullName, email, password } = this.form.getRawValue();
    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const lastName = rest.join(' ');
    const isTrainer = accountType === 'trainer';

    this.auth
      .register({
        firstName,
        lastName,
        email,
        password,
        role: isTrainer ? 'instructor' : 'student',
        ageGroup: isTrainer ? undefined : accountType,
      })
      .subscribe({
        next: (user) => {
          this.submitting.set(false);
          this.router.navigate([user.role === 'student' ? '/student' : '/trainer']);
        },
        error: (err: Error) => {
          this.submitting.set(false);
          this.errorMessage.set(err.message);
        },
      });
  }

  friendlyFieldMessage(field: 'fullName' | 'email' | 'password'): string | null {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) return null;

    switch (field) {
      case 'fullName':
        return 'This one needs at least 2 letters.';
      case 'email':
        return 'That email doesn’t look quite right yet.';
      case 'password':
        return 'Passwords need at least 4 characters.';
    }
  }
}
