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
import { DatabaseService } from './core/services/database.service';
import { SEED_FLAG } from './core/services/seed-flag';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // Dynamically imported so the (large, content-heavy) seed data lives in its own
    // chunk instead of bloating the initial bundle — it's only needed once, to
    // bootstrap the local mock DB on a fresh browser. Checking the flag FIRST,
    // before importing, matters: without it, every single page load — even
    // the 99% that are already seeded — fetched and parsed the whole ~650KB
    // chunk just to find out there was nothing to do, blocking first render
    // on that round-trip every time.
    provideAppInitializer(async () => {
      if (inject(DatabaseService).getFlag(SEED_FLAG)) return;
      const injector = inject(EnvironmentInjector);
      const { SeedDataService } = await import('./core/services/seed-data.service');
      runInInjectionContext(injector, () => inject(SeedDataService).seedIfNeeded());
    }),
    // Tries to restore a session from the httpOnly refresh cookie before the
    // router activates any guarded route, so guards never fire on a stale null user.
    provideAppInitializer(() => inject(AuthService).init()),
  ],
};
