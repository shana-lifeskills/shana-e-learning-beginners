import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Food-group pyramid" welcome layout — Nutrition Module, Week 2 ("Different
 * Foods Help Our Bodies"). A leaf-green-to-cream card, a two-tone title, a
 * stack of food-group tiers that build up from the base one after another,
 * each carrying its group's emoji, a friendly caption, a row of labelled
 * food-group chips, and the objective on a rounded card. Purely presentational
 * — see `LessonNutritionFoodGroupsWelcome` in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-food-groups-welcome',
  standalone: true,
  templateUrl: './nutrition-food-groups-welcome.html',
  styleUrl: './nutrition-food-groups-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionFoodGroupsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) nfg!: NonNullable<Lesson['nutritionFoodGroupsWelcome']>;

  /** Tier geometry, base first — width shrinks and the tier rises up the stack. */
  readonly tiers = [
    { x: 30, w: 180, fill: '#7cbf6a' },
    { x: 54, w: 132, fill: '#f2a63c' },
    { x: 78, w: 84, fill: '#e2603f' },
    { x: 96, w: 48, fill: '#8d6fd1' },
  ];
}
