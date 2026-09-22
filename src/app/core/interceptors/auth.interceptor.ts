import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Attaches the in-memory access token and retries once after a silent refresh on a 401. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.accessToken();
  const authedReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authedReq).pipe(
    catchError((err: unknown) => {
      const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/auth/refresh');
      if (err instanceof HttpErrorResponse && err.status === 401 && token && !isAuthEndpoint) {
        return auth.refreshAccessToken().pipe(
          switchMap((newToken) => next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })))
        );
      }
      return throwError(() => err);
    })
  );
};
