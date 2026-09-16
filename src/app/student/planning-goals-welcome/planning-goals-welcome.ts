import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "SMART goals" welcome layout — Planning Module (Advanced), Week 3 ("Smart
 * Goals and Follow-Through"). A single coral/gold card: week/stage pills, a
 * short title, one subtitle line, a row of S-M-A-R-T letter tiles, and a
 * compact objective list. Purely presentational — see
 * `LessonPlanningGoalsWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-planning-goals-welcome',
  standalone: true,
  templateUrl: './planning-goals-welcome.html',
  styleUrl: './planning-goals-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningGoalsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pgw!: NonNullable<Lesson['planningGoalsWelcome']>;
}
