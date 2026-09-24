import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AVATAR_EMOJI } from '../../avatar-emoji';
import { BrandLogo } from '../brand-logo/brand-logo';
import { ROLE_HOME_PATH } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, BrandLogo],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  private auth = inject(AuthService);
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);

  readonly user = this.auth.currentUser;
  readonly avatarEmoji = AVATAR_EMOJI;
  readonly menuOpen = signal(false);

  readonly homeLink = () => {
    const role = this.user()?.role;
    return role ? ROLE_HOME_PATH[role] : '/student';
  };

  readonly roleLabel = computed(() => {
    const u = this.user();
    if (!u) return '';
    if (u.role === 'trainer') return 'Admin';
    if (u.role === 'coach') return 'Trainer';
    return u.ageGroup === 'advanced' ? 'Advanced' : 'Beginner';
  });

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  logout(): void {
    this.menuOpen.set(false);
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen.set(false);
    }
  }
}
