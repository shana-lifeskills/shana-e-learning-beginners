import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Handwashing" welcome layout — Hygiene Module, Week 3 ("Handwashing &
 * Stopping Germs"). A sky-blue page, a two-tone title, an SVG tap running water
 * over two cupped soapy hands while germ blobs rinse away, a friendly caption,
 * and the objective inside a soft foam-bubble card. Purely presentational — see
 * `LessonHygieneHandwashWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-handwash-welcome',
  standalone: true,
  templateUrl: './hygiene-handwash-welcome.html',
  styleUrl: './hygiene-handwash-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneHandwashWelcome extends WelcomeVariantBase {
  @Input({ required: true }) hhw!: NonNullable<Lesson['hygieneHandwashWelcome']>;

  /** Germ blobs rinsing down the water stream — tuned x / delay per blob. */
  readonly germs = [
    { cx: 104, delay: '0s' },
    { cx: 118, delay: '1.3s' },
    { cx: 110, delay: '2.6s' },
  ];

  /** Soap-suds bubbles clinging to the hands. */
  readonly suds = [
    { cx: 82, cy: 118, r: 6 },
    { cx: 96, cy: 126, r: 4 },
    { cx: 138, cy: 120, r: 5 },
    { cx: 150, cy: 128, r: 3.5 },
    { cx: 115, cy: 132, r: 4.5 },
  ];
}
