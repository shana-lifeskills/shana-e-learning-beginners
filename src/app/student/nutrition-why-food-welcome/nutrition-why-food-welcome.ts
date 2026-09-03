import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Fuel plate" welcome layout — Nutrition Module, Week 1 ("Why Do We Need
 * Food?"). A warm tomato-to-amber card, a two-tone title, a dinner plate whose
 * three food wedges light up one after another while an energy bolt rises from
 * the plate and a small battery beside it charges to full, a friendly caption,
 * a row of labelled benefit chips, and the objective on a menu-card. Purely
 * presentational — see `LessonNutritionWhyFoodWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-why-food-welcome',
  standalone: true,
  templateUrl: './nutrition-why-food-welcome.html',
  styleUrl: './nutrition-why-food-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionWhyFoodWelcome extends WelcomeVariantBase {
  @Input({ required: true }) nwf!: NonNullable<Lesson['nutritionWhyFoodWelcome']>;

  /** The three plate wedges — each lights up on its own staggered delay. */
  readonly wedges = [
    { d: 'M120 120 L120 40 A80 80 0 0 1 189 80 Z', delay: '0s' },
    { d: 'M120 120 L189 80 A80 80 0 0 1 155 191 Z', delay: '-1.2s' },
    { d: 'M120 120 L155 191 A80 80 0 0 1 51 160 A80 80 0 0 1 120 40 Z', delay: '-2.4s' },
  ];
}
