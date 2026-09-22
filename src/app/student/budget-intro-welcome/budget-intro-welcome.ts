import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-budget-intro-welcome',
  standalone: true,
  templateUrl: './budget-intro-welcome.html',
  styleUrl: './budget-intro-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetIntroWelcome extends WelcomeVariantBase {
  @Input({ required: true }) biw!: NonNullable<Lesson['budgetIntroWelcome']>;
}
