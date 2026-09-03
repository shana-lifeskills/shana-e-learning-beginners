import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Growing habit" welcome layout — Hygiene Module, Week 4 ("Building Lifelong
 * Hygiene Habits"). A warm honey-and-cream page, a two-tone title, an SVG
 * potted plant whose four leaves unfurl one by one under a slow-rising sun, a
 * friendly caption, and the objective inside a leaf-shaped card. Purely
 * presentational — see `LessonHygieneHabitsWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-habits-welcome',
  standalone: true,
  templateUrl: './hygiene-habits-welcome.html',
  styleUrl: './hygiene-habits-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneHabitsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) hbw!: NonNullable<Lesson['hygieneHabitsWelcome']>;

  /** The four leaves, each with its own unfurl delay — one per week of practice. */
  readonly leaves = [
    { d: 'M110 118c-16-4-30-16-32-32 16 2 30 12 34 28Z', delay: '0.2s' },
    { d: 'M110 116c16-4 30-16 32-32-16 2-30 12-34 28Z', delay: '0.9s' },
    { d: 'M110 100c-14-6-24-20-24-36 14 4 26 16 28 34Z', delay: '1.6s' },
    { d: 'M110 98c14-6 24-20 24-36-14 4-26 16-28 34Z', delay: '2.3s' },
  ];
}
