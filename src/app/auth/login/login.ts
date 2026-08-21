import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FriendlyAlert, AuthHero],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private sidekick = inject(SidekickService);

  readonly errorMessage = signal('');
  readonly submitting = signal(false);
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
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
