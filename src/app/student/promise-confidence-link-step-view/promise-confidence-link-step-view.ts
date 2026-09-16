import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PromiseConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Planning Module — Advanced, Week 3). A
 * ribbon-seal card with one line to carry into the week — nothing to fill in.
 * Distinct from Weeks 1–2's confidence links. See `PromiseConfidenceLinkStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-promise-confidence-link-step-view',
  standalone: true,
  templateUrl: './promise-confidence-link-step-view.html',
  styleUrl: './promise-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromiseConfidenceLinkStepView {
  readonly step = input.required<PromiseConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
