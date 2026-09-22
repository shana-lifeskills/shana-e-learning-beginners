import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { SavingsChoiceConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Savings Module, Week 2. A signpost
 * points the way to "Save"; tapping "I said it out loud!" lights it up and
 * unlocks the "Complete" button.
 */
@Component({
  selector: 'app-savings-choice-confidence-link-step-view',
  standalone: true,
  templateUrl: './savings-choice-confidence-link-step-view.html',
  styleUrl: './savings-choice-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsChoiceConfidenceLinkStepView {
  readonly step = input.required<SavingsChoiceConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly saidIt = signal(false);

  finish(): void {
    if (!this.saidIt()) return;
    this.completed.emit();
  }
}
