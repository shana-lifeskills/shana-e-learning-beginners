import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ServiceConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Service Module, Week 1. A glowing
 * helping-hand badge carries the week's affirmation; the learner taps "I said
 * it out loud!" to light the badge, which unlocks the "Complete Week 1" button.
 */
@Component({
  selector: 'app-service-confidence-link-step-view',
  standalone: true,
  templateUrl: './service-confidence-link-step-view.html',
  styleUrl: './service-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceConfidenceLinkStepView {
  readonly step = input.required<ServiceConfidenceLinkStep>();
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
