import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-budget-habits-welcome',
  standalone: true,
  templateUrl: './budget-habits-welcome.html',
  styleUrl: './budget-habits-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetHabitsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) bhw!: NonNullable<Lesson['budgetHabitsWelcome']>;

  get streakRange(): number[] {
    return Array.from({ length: this.bhw.streakDays }, (_, i) => i + 1);
  }
}
