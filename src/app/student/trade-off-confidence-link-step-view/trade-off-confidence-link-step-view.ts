import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { TradeOffConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Choices Module, Week 1. A glowing medal
 * carries the week's affirmation; the learner taps "I said it out loud!" to
 * light the medal, which unlocks the "Complete Week 1" button.
 */
@Component({
  selector: 'app-trade-off-confidence-link-step-view',
  standalone: true,
  templateUrl: './trade-off-confidence-link-step-view.html',
  styleUrl: './trade-off-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOffConfidenceLinkStepView {
  readonly step = input.required<TradeOffConfidenceLinkStep>();
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
