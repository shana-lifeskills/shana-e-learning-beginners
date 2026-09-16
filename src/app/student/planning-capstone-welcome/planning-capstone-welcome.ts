import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Capstone trophy" welcome layout — Planning Module (Advanced), End-of-
 * Module Project ("The 7-Day Planning Challenge"). A single gold-gradient
 * card: a trophy badge, a short title, one subtitle line, and a compact task
 * list. Purely presentational — see `LessonPlanningCapstoneWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-planning-capstone-welcome',
  standalone: true,
  templateUrl: './planning-capstone-welcome.html',
  styleUrl: './planning-capstone-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningCapstoneWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pcw!: NonNullable<Lesson['planningCapstoneWelcome']>;
}
