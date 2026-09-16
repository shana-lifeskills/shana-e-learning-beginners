import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Priority matrix" welcome layout — Planning Module (Advanced), Week 2
 * ("Strategic Planning"). A single navy/amber card: week/stage pills, a short
 * title, one subtitle line, an important-vs-urgent 2×2 matrix graphic, and a
 * compact objective list. Purely presentational — see
 * `LessonPlanningPrioritiesWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-planning-priorities-welcome',
  standalone: true,
  templateUrl: './planning-priorities-welcome.html',
  styleUrl: './planning-priorities-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningPrioritiesWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ppw!: NonNullable<Lesson['planningPrioritiesWelcome']>;
}
