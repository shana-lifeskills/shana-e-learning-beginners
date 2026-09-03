import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Daily routine clock" welcome layout — Wellness Module, Week 4. An amber-to-
 * deep-blue day-to-night card, a two-tone title, an SVG clock face with a
 * sweeping hand and small routine dots at the hour marks, a friendly caption, a
 * row of routine-step chips, and the objective on a rounded card. Purely
 * presentational — see `LessonWellnessRoutineWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-routine-welcome',
  standalone: true,
  templateUrl: './wellness-routine-welcome.html',
  styleUrl: './wellness-routine-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessRoutineWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wrw!: NonNullable<Lesson['wellnessRoutineWelcome']>;

  /** Dots around the clock face — one per hour mark. */
  readonly marks = Array.from({ length: 12 }, (_, i) => i * 30);
}
