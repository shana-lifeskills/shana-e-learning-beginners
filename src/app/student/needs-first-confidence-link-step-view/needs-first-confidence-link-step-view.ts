import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NeedsFirstConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Budgeting Module, Week 2. The
 * learner taps "I said it out loud!" to light the coin badge, which unlocks
 * the "Complete" button.
 */
@Component({
  selector: 'app-needs-first-confidence-link-step-view',
  standalone: true,
  templateUrl: './needs-first-confidence-link-step-view.html',
  styleUrl: './needs-first-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedsFirstConfidenceLinkStepView {
  readonly step = input.required<NeedsFirstConfidenceLinkStep>();
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
