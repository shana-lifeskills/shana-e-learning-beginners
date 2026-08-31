import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ConsequenceConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Choices Module, Week 3. The affirmation
 * sits under a crystal ball; the learner says it out loud and taps to light the
 * ball, unlocking "Complete Week 3".
 */
@Component({
  selector: 'app-consequence-confidence-link-step-view',
  standalone: true,
  templateUrl: './consequence-confidence-link-step-view.html',
  styleUrl: './consequence-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsequenceConfidenceLinkStepView {
  readonly step = input.required<ConsequenceConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly saidIt = signal(false);

  light(): void {
    this.saidIt.set(true);
  }

  finish(): void {
    if (this.saidIt()) this.completed.emit();
  }
}
