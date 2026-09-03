import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Mirror" welcome layout — Hygiene Module, Week 2 ("Personal Hygiene"). A soft
 * mint page, a two-tone title, an oval hand-mirror with a slow shine sweep
 * framing a small sun rising over a horizon, a friendly caption, and the
 * objective inside a rounded hand-mirror card. Purely presentational — see
 * `LessonHygienePersonalWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-personal-welcome',
  standalone: true,
  templateUrl: './hygiene-personal-welcome.html',
  styleUrl: './hygiene-personal-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygienePersonalWelcome extends WelcomeVariantBase {
  @Input({ required: true }) hpw!: NonNullable<Lesson['hygienePersonalWelcome']>;

  /** Sun-ray angles, for the little sun inside the mirror. */
  readonly rayAngles = [0, 45, 90, 135, 180, 225, 270, 315];
}
