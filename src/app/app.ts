import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidekick } from './shared/components/sidekick/sidekick';
import { CelebrationOverlay } from './shared/components/celebration-overlay/celebration-overlay';
import { AppHeader } from './shared/components/app-header/app-header';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { AppFooter } from './shared/components/app-footer/app-footer';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidekick, CelebrationOverlay, AppHeader, Sidebar, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private auth = inject(AuthService);

  readonly signedIn = this.auth.currentUser;
}
