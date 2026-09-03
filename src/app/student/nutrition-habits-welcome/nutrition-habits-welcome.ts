import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Habit house" welcome layout — Nutrition Module, Week 4 ("Building Healthy
 * Eating Habits"). A warm amber-to-cream card, a two-tone title, an SVG house
 * that builds itself brick by brick from the ground up and then adds its roof,
 * a friendly caption, a row of labelled daily-habit chips, and the objective
 * on a rounded card. Purely presentational — see `LessonNutritionHabitsWelcome`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-habits-welcome',
  standalone: true,
  templateUrl: './nutrition-habits-welcome.html',
  styleUrl: './nutrition-habits-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHabitsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) nhw!: NonNullable<Lesson['nutritionHabitsWelcome']>;

  /** Wall bricks, laid bottom-up left-to-right. */
  readonly bricks = [
    { x: 78, y: 132 }, { x: 122, y: 132 },
    { x: 78, y: 110 }, { x: 122, y: 110 },
    { x: 78, y: 88 }, { x: 122, y: 88 },
  ];
}
