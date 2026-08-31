import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { BudgetConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Choices Module, Week 2. The affirmation
 * sits on a bank-card-style pledge card; the learner says it out loud and taps
 * to thump an "APPROVED" stamp onto the card, unlocking "Complete Week 2".
 */
@Component({
  selector: 'app-budget-confidence-link-step-view',
  standalone: true,
  templateUrl: './budget-confidence-link-step-view.html',
  styleUrl: './budget-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetConfidenceLinkStepView {
  readonly step = input.required<BudgetConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly stamped = signal(false);

  stamp(): void {
    this.stamped.set(true);
  }

  finish(): void {
    if (this.stamped()) this.completed.emit();
  }
}
