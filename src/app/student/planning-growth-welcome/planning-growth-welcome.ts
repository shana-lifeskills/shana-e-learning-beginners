import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Growth path" welcome layout — Planning Module (Advanced), Week 4
 * ("Reflection and Growth: From Plans to Habits"). A single sage-green card:
 * week/stage pills, a short title, one subtitle line, a seed-to-sprout-to-
 * plant growth row, and a compact objective list. Purely presentational —
 * see `LessonPlanningGrowthWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-planning-growth-welcome',
  standalone: true,
  templateUrl: './planning-growth-welcome.html',
  styleUrl: './planning-growth-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningGrowthWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pgrw!: NonNullable<Lesson['planningGrowthWelcome']>;
}
