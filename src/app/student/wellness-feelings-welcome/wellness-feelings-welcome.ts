import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Mood heart" welcome layout — Wellness Module, Week 3. A soft lavender-to-
 * yellow card, a two-tone title, an SVG heart that gently shifts colour with
 * small mood faces drifting around it, a friendly caption, a row of feeling
 * chips, and the objective on a rounded card. Purely presentational — see
 * `LessonWellnessFeelingsWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-feelings-welcome',
  standalone: true,
  templateUrl: './wellness-feelings-welcome.html',
  styleUrl: './wellness-feelings-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessFeelingsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wfw!: NonNullable<Lesson['wellnessFeelingsWelcome']>;

  /** Mood faces drifting around the heart — tuned position / delay per face. */
  readonly moods = [
    { cx: 40, cy: 54, face: 'happy', delay: '0s' },
    { cx: 182, cy: 44, face: 'sad', delay: '1.1s' },
    { cx: 34, cy: 140, face: 'calm', delay: '2.2s' },
    { cx: 188, cy: 148, face: 'angry', delay: '0.6s' },
  ];
}
