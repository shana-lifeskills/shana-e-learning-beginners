import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Spark" welcome layout — Self-Confidence Module (Advanced), Week 1. A single
 * coral card: week/stage pills, a title, one short subtitle, the week's
 * objective on its own line, and a small reflection prompt that recaps a
 * point from the Planning module with a sample answer — no hero image or
 * tag row. Purely presentational — see `LessonConfidenceSparkWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-confidence-spark-welcome',
  standalone: true,
  templateUrl: './confidence-spark-welcome.html',
  styleUrl: './confidence-spark-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfidenceSparkWelcome extends WelcomeVariantBase {
  @Input({ required: true }) csw!: NonNullable<Lesson['confidenceSparkWelcome']>;
}
