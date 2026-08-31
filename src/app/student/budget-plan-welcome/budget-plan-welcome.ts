import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Budget jars" welcome layout — Choices Module, Week 2 ("Budgeting &
 * Planning"). A friendly planner-blue page built around a shelf of clear
 * cartoon jars, each labelled with a job for the money (Save / Spend / Goal)
 * and a coin dropping in, to show that a budget means deciding where money goes
 * before you spend it. Purely presentational.
 */
@Component({
  selector: 'app-budget-plan-welcome',
  standalone: true,
  templateUrl: './budget-plan-welcome.html',
  styleUrl: './budget-plan-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetPlanWelcome extends WelcomeVariantBase {
  @Input({ required: true }) bpw!: NonNullable<Lesson['budgetPlanWelcome']>;
}
