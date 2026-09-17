import {
  ApplicationConfig,
  EnvironmentInjector,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Dynamically imported so the (large, content-heavy) seed data lives in its own
    // chunk instead of bloating the initial bundle — it's only needed once, to
    // bootstrap the local mock DB on a fresh browser.
    provideAppInitializer(async () => {
      const injector = inject(EnvironmentInjector);
      const { SeedDataService } = await import('./core/services/seed-data.service');
      runInInjectionContext(injector, () => inject(SeedDataService).seedIfNeeded());
    }),
  ],
};
