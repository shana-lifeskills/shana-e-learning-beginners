import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ModuleOutcomeConfidenceLinkStep } from '../../core/models/module.model';

/**
 * The "Confidence Link" closing page for Choices Module, Week 4 — the module
 * finale. A certificate-style card carries the affirmation above a checklist of
 * the skills built across the module; the learner says the affirmation out loud
 * and taps to seal the certificate, unlocking "Complete the Module".
 */
@Component({
  selector: 'app-module-outcome-confidence-link-step-view',
  standalone: true,
  templateUrl: './module-outcome-confidence-link-step-view.html',
  styleUrl: './module-outcome-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleOutcomeConfidenceLinkStepView {
  readonly step = input.required<ModuleOutcomeConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly sealed = signal(false);

  seal(): void {
    this.sealed.set(true);
  }

  finish(): void {
    if (this.sealed()) this.completed.emit();
  }
}
