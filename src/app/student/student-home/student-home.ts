import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Student } from '../../core/models/user.model';
import { Dashboard } from '../dashboard/dashboard';
import { DashboardAdvanced } from '../dashboard-advanced/dashboard-advanced';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [Dashboard, DashboardAdvanced],
  template: `
    @if (isAdvanced()) {
      <app-dashboard-advanced />
    } @else {
      <app-student-dashboard />
    }
  `,
})
export class StudentHome {
  private auth = inject(AuthService);

  readonly isAdvanced = computed(() => (this.auth.currentUser() as Student)?.ageGroup === 'advanced');
}
