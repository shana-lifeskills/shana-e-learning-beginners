import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Balance scale" welcome layout — Nutrition Module, Week 3 ("Healthy Choices
 * vs Unhealthy Choices"). A split mint-green / warm-peach card, a two-tone
 * title, an SVG balance scale that gently rocks and settles with the healthy
 * pan sitting lower, a friendly caption, two labelled chip columns for
 * "everyday" and "sometimes" foods, and the objective on a rounded card.
 * Purely presentational — see `LessonNutritionHealthyChoicesWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-healthy-choices-welcome',
  standalone: true,
  templateUrl: './nutrition-healthy-choices-welcome.html',
  styleUrl: './nutrition-healthy-choices-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHealthyChoicesWelcome extends WelcomeVariantBase {
  @Input({ required: true }) nhc!: NonNullable<Lesson['nutritionHealthyChoicesWelcome']>;
}
