import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { HygieneConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Hygiene Module, Week 1. A shining
 * bar-of-soap medal carries the week's affirmation; the learner taps "I said it
 * out loud!" to light the medal, which unlocks the "Complete Week 1" button.
 * Its own visual design — see `HygieneConfidenceLinkStep`.
 */
@Component({
  selector: 'app-hygiene-confidence-link-step-view',
  standalone: true,
  templateUrl: './hygiene-confidence-link-step-view.html',
  styleUrl: './hygiene-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneConfidenceLinkStepView {
  readonly step = input.required<HygieneConfidenceLinkStep>();
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
