import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

/** A dismissible-by-completing-it reminder shown on both dashboards while
 *  `currentUser().emailVerified` is false. Doesn't block anything — just
 *  nudges the student/admin to confirm their email, with a resend action. */
@Component({
  selector: 'app-verify-email-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email-banner.html',
  styleUrl: './verify-email-banner.scss',
})
export class VerifyEmailBanner {
  private auth = inject(AuthService);

  readonly user = this.auth.currentUser;
  readonly sending = signal(false);
  readonly sent = signal(false);

  resend(): void {
    if (this.sending()) return;
    this.sending.set(true);
    this.sent.set(false);
    this.auth.resendVerificationEmail().subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
      },
      error: () => {
        this.sending.set(false);
      },
    });
  }
}
