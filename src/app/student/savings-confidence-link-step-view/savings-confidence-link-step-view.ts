import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { SavingsConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Savings Module, Week 1. The learner
 * taps "I said it out loud!" to wake the piggy bank's speech bubble, which
 * unlocks the "Complete" button.
 */
@Component({
  selector: 'app-savings-confidence-link-step-view',
  standalone: true,
  templateUrl: './savings-confidence-link-step-view.html',
  styleUrl: './savings-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsConfidenceLinkStepView {
  readonly step = input.required<SavingsConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly saidIt = signal(false);

  finish(): void {
    if (!this.saidIt()) return;
    this.completed.emit();
  }
}
