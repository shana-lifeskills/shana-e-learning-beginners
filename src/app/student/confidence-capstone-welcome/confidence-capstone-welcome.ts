import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Capstone trophy" welcome layout — Self-Confidence Module (Advanced), End-
 * of-Module Project ("Confidence Check-In"). A single coral-gradient card: a
 * trophy badge, a short title, one subtitle line, and a compact task list.
 * Purely presentational — see `LessonConfidenceCapstoneWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-confidence-capstone-welcome',
  standalone: true,
  templateUrl: './confidence-capstone-welcome.html',
  styleUrl: './confidence-capstone-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfidenceCapstoneWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ccw!: NonNullable<Lesson['confidenceCapstoneWelcome']>;
}
