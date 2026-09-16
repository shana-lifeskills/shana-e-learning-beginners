import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * Plain "spare intro" welcome layout — Identity Module (Advanced). A
 * single card: a week/stage pill, a title, one short subtitle line, and a
 * compact objective list — no banner, hero image, or tag row. First built
 * for Week 2 ("My Strengths & Temperament"), reused as-is for later weeks
 * that want the same nice-and-straightforward brief. Purely presentational
 * — see `LessonIdentityStrengthsWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-identity-strengths-welcome',
  standalone: true,
  templateUrl: './identity-strengths-welcome.html',
  styleUrl: './identity-strengths-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityStrengthsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) isw!: NonNullable<Lesson['identityStrengthsWelcome']>;
}
