import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const trainerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser();

  if (!user) return router.createUrlTree(['/welcome']);
  if (user.role !== 'trainer') return router.createUrlTree(['/student']);

  return true;
};
