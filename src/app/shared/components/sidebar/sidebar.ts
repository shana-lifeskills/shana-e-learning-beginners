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

const ADVANCED_STUDENT_NAV: NavItem[] = [
  { label: 'Home', icon: '🏠', link: '/student', exact: true },
  { label: 'Rewards', icon: '🏅', link: '/student/rewards' },
  { label: 'Arcade', icon: '🎮', link: '/student/games' },
  { label: 'Leaderboard', icon: '📊' },
  { label: 'Crew', icon: '👥' },
  { label: 'Settings', icon: '⚙️' },
];

const TRAINER_NAV: NavItem[] = [
  { label: 'Home', icon: '🏠', link: '/admin', exact: true },
  { label: 'All Modules', icon: '📘', link: '/admin/modules' },
  { label: 'Upload Module', icon: '⬆️', link: '/admin/modules/new' },
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

  readonly navItems = computed<NavItem[]>(() => {
    const user = this.auth.currentUser();
    if (user?.role === 'trainer') return TRAINER_NAV;
    return (user as Student)?.ageGroup === 'advanced' ? ADVANCED_STUDENT_NAV : STUDENT_NAV;
  });

  /** The streak tip only makes sense for students — trainers don't have a learning streak. */
  readonly student = computed(() => {
    const user = this.auth.currentUser();
    return user?.role === 'student' ? (user as Student) : null;
  });
}
