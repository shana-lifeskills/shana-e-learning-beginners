import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ShoppingPlannerConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Budgeting Module, Week 3. The
 * learner taps "I said it out loud!" to light the coin badge, which unlocks
 * the "Complete" button.
 */
@Component({
  selector: 'app-shopping-planner-confidence-link-step-view',
  standalone: true,
  templateUrl: './shopping-planner-confidence-link-step-view.html',
  styleUrl: './shopping-planner-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingPlannerConfidenceLinkStepView {
  readonly step = input.required<ShoppingPlannerConfidenceLinkStep>();
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
