import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Student } from '../../../core/models/user.model';
import { OllieMascot } from '../ollie-mascot/ollie-mascot';

interface NavItem {
  label: string;
  icon: string;
  link?: string;
  exact?: boolean;
}

const STUDENT_NAV: NavItem[] = [
  { label: 'Home', icon: '🏠', link: '/student', exact: true },
  { label: 'My Rewards', icon: '🏅', link: '/student/rewards' },
  { label: 'Games', icon: '🎮', link: '/student/games' },
  { label: 'Leaderboard', icon: '🏆' },
  { label: 'Friends', icon: '👥' },
  { label: 'Settings', icon: '⚙️' },
];

const TRAINER_NAV: NavItem[] = [
  { label: 'Home', icon: '🏠', link: '/trainer', exact: true },
  { label: 'My Modules', icon: '📘', link: '/trainer/modules' },
  { label: 'Create Module', icon: '✏️', link: '/trainer/modules/new' },
  { label: 'Settings', icon: '⚙️' },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, OllieMascot],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private auth = inject(AuthService);

  readonly navItems = computed<NavItem[]>(() =>
    this.auth.currentUser()?.role === 'trainer' ? TRAINER_NAV : STUDENT_NAV
  );

  /** The streak tip only makes sense for students — trainers don't have a learning streak. */
  readonly student = computed(() => {
    const user = this.auth.currentUser();
    return user?.role === 'student' ? (user as Student) : null;
  });
}
