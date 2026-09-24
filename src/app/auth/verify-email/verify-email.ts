import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

type VerifyStatus = 'checking' | 'success' | 'error';

/** Landing page for the link in the verification email — reads `?token=`,
 *  confirms it with the backend, and reports the result. */
@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  readonly status = signal<VerifyStatus>('checking');
  readonly errorMessage = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status.set('error');
      this.errorMessage.set('This verification link is missing its token.');
      return;
    }

    this.auth.verifyEmail(token).subscribe({
      next: () => {
        this.status.set('success');
        this.auth.refreshCurrentUserFromBackend().subscribe();
      },
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err?.error?.message ?? 'This verification link is invalid or has expired.');
      },
    });
  }

  continue(): void {
    const user = this.auth.currentUser();
    this.router.navigate([user?.role === 'student' ? '/student' : user?.role === 'trainer' ? '/admin' : '/login']);
  }
}
