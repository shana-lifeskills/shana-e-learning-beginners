import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Making a difference" welcome layout — Service Module, Week 4 ("Making a
 * Difference"). A deliberately spare intro screen: a week pill, a two-tone
 * title, a hand-drawn ripple where one glowing heart at the centre sends rings
 * out to a circle of dots that light up in turn, and a single Objective card.
 * The week's teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-service-ripple-welcome',
  standalone: true,
  templateUrl: './service-ripple-welcome.html',
  styleUrl: './service-ripple-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceRippleWelcome extends WelcomeVariantBase {
  @Input({ required: true }) srw!: NonNullable<Lesson['serviceRippleWelcome']>;

  /** Positions for the ring of dots that light up around the heart. */
  readonly dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 100 + Math.cos(angle) * 78,
      cy: 100 + Math.sin(angle) * 78,
      delay: 0.9 + i * 0.18,
    };
  });
}
