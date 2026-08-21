import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AgeGroup, AGE_GROUPS, Role } from '../../core/models/user.model';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FriendlyAlert, AuthHero],
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
  readonly role = signal<Role>('student');
  readonly ageGroup = signal<AgeGroup>('beginner');
  readonly ageGroups = AGE_GROUPS;
  readonly showPassword = signal(false);
  readonly avatarPreview = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor() {
    const queryRole = this.route.snapshot.queryParamMap.get('role');
    if (queryRole === 'trainer' || queryRole === 'student') this.role.set(queryRole);
  }

  chooseRole(role: Role): void {
    this.role.set(role);
  }

  chooseAgeGroup(ageGroup: AgeGroup): void {
    this.ageGroup.set(ageGroup);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage.set("Almost there! Let's fill in every box first.");
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);

    this.auth
      .createAccount({
        ...this.form.getRawValue(),
        role: this.role(),
        ageGroup: this.role() === 'student' ? this.ageGroup() : undefined,
        avatarUrl: this.avatarPreview() ?? undefined,
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

  friendlyFieldMessage(field: 'firstName' | 'lastName' | 'email' | 'password'): string | null {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) return null;

    switch (field) {
      case 'firstName':
      case 'lastName':
        return 'This one needs at least 2 letters.';
      case 'email':
        return 'That email doesn’t look quite right yet.';
      case 'password':
        return 'Passwords need at least 4 characters.';
    }
  }
}
