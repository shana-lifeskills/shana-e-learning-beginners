import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GrowthConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Self-Confidence Module — Advanced, Week 3).
 * A calm sprouting-plant card with one line to carry into the week —
 * nothing to fill in. Distinct from Week 1's `plan-confidence-link` and
 * Week 2's `voice-confidence-link`. See `GrowthConfidenceLinkStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-growth-confidence-link-step-view',
  standalone: true,
  templateUrl: './growth-confidence-link-step-view.html',
  styleUrl: './growth-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowthConfidenceLinkStepView {
  readonly step = input.required<GrowthConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
