import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Bubble bath" welcome layout — Hygiene Module. A fresh cyan card edged like a
 * tiled bathroom wall, a two-tone title on a tile strip, a smiling water-drop
 * mascot with bubbles drifting up past it, a friendly caption, and the objective
 * on a punched paper luggage-tag. Purely presentational — see
 * `LessonHygieneIntroWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-intro-welcome',
  standalone: true,
  templateUrl: './hygiene-intro-welcome.html',
  styleUrl: './hygiene-intro-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneIntroWelcome extends WelcomeVariantBase {
  @Input({ required: true }) hiw!: NonNullable<Lesson['hygieneIntroWelcome']>;

  /** Bubbles drifting up past the mascot — tuned x / size / delay per bubble. */
  readonly bubbles = [
    { cx: 40, r: 7, delay: '0s', dur: '5.5s' },
    { cx: 88, r: 5, delay: '1.6s', dur: '6.4s' },
    { cx: 120, r: 9, delay: '0.8s', dur: '5s' },
    { cx: 158, r: 6, delay: '2.4s', dur: '6.9s' },
    { cx: 196, r: 8, delay: '3.1s', dur: '5.8s' },
  ];
}
