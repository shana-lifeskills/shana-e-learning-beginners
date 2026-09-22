import {
  ApplicationConfig,
  EnvironmentInjector,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // Dynamically imported so the (large, content-heavy) seed data lives in its own
    // chunk instead of bloating the initial bundle — it's only needed once, to
    // bootstrap the local mock DB on a fresh browser.
    provideAppInitializer(async () => {
      const injector = inject(EnvironmentInjector);
      const { SeedDataService } = await import('./core/services/seed-data.service');
      runInInjectionContext(injector, () => inject(SeedDataService).seedIfNeeded());
    }),
    // Tries to restore a session from the httpOnly refresh cookie before the
    // router activates any guarded route, so guards never fire on a stale null user.
    provideAppInitializer(() => inject(AuthService).init()),
  ],
};
