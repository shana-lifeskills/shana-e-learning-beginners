import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ROLE_HOME_PATH } from '../models/user.model';

export const trainerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.ready).pipe(
    filter((ready) => ready),
    take(1),
    map(() => {
      const user = auth.currentUser();
      if (!user) return router.createUrlTree(['/login']);
      if (user.role !== 'trainer') return router.createUrlTree([ROLE_HOME_PATH[user.role]]);
      return true;
    })
  );
};
