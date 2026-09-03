import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Sidekick } from './shared/components/sidekick/sidekick';
import { CelebrationOverlay } from './shared/components/celebration-overlay/celebration-overlay';
import { AppHeader } from './shared/components/app-header/app-header';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { AppFooter } from './shared/components/app-footer/app-footer';
import { AuthService } from './core/services/auth.service';

/** Routes that are their own full page — no app shell, even while a user stays signed in. */
const AUTH_ROUTES = ['/welcome', '/login', '/signup'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidekick, CelebrationOverlay, AppHeader, Sidebar, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly signedIn = this.auth.currentUser;
  private readonly url = signal(this.router.url);

  /**
   * The header/sidebar/footer chrome shows only for a signed-in user on an
   * in-app route. Auth screens (welcome, login, signup) render bare even if the
   * user is still signed in — otherwise visiting them shows the app shell
   * wrapped around the sign-in page.
   */
  readonly showShell = computed(() => this.signedIn() && !this.isAuthRoute(this.url()));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.url.set(event.urlAfterRedirects));
  }

  private isAuthRoute(url: string): boolean {
    const path = url.split(/[?#]/)[0];
    return AUTH_ROUTES.some((route) => path === route || path.startsWith(route + '/'));
  }
}
