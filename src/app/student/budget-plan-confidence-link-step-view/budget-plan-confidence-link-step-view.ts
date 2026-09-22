import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { BudgetPlanConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Budgeting Module, Week 1. The
 * learner taps "I said it out loud!" to light the coin badge, which unlocks
 * the "Complete" button.
 */
@Component({
  selector: 'app-budget-plan-confidence-link-step-view',
  standalone: true,
  templateUrl: './budget-plan-confidence-link-step-view.html',
  styleUrl: './budget-plan-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetPlanConfidenceLinkStepView {
  readonly step = input.required<BudgetPlanConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly saidIt = signal(false);

  toggleSaidIt(): void {
    this.saidIt.set(true);
  }

  finish(): void {
    if (!this.saidIt()) return;
    this.completed.emit();
  }
}
