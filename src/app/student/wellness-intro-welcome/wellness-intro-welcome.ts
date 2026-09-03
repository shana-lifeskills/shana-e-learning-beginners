import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Whole self sprout" welcome layout — Wellness Module, Week 1. A sunny
 * peach-to-green card, a two-tone title, a seedling growing from a small pot
 * with three soft glowing orbs (body, mind, feelings) circling it, a friendly
 * caption, a row of labelled pillar chips, and the objective on a seed-packet
 * card. Purely presentational — see `LessonWellnessIntroWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-intro-welcome',
  standalone: true,
  templateUrl: './wellness-intro-welcome.html',
  styleUrl: './wellness-intro-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessIntroWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wiw!: NonNullable<Lesson['wellnessIntroWelcome']>;

  /** Orbs circling the seedling — one per pillar, each on its own slow orbit. */
  readonly orbs = [
    { r: 8, delay: '0s', dur: '9s' },
    { r: 7, delay: '-3s', dur: '9s' },
    { r: 9, delay: '-6s', dur: '9s' },
  ];
}
