import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Planning route" welcome layout — Planning Module (Advanced), Week 1
 * ("Why Planning Matters"). A single teal card: week/stage pills, a short
 * two-tone title, one subtitle line, and the week's objectives drawn as a
 * numbered route — nodes joined by a dashed line, like steps on a map.
 * Purely presentational — see `LessonPlanningWhyWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-planning-why-welcome',
  standalone: true,
  templateUrl: './planning-why-welcome.html',
  styleUrl: './planning-why-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningWhyWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pww!: NonNullable<Lesson['planningWhyWelcome']>;
}
