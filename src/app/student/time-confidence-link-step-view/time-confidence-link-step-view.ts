import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TimeConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Planning Module — Advanced, Week 2). A calm
 * clock-face card with one line to carry into the week — nothing to fill in.
 * Distinct from Week 1's `plan-confidence-link`. See `TimeConfidenceLinkStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-time-confidence-link-step-view',
  standalone: true,
  templateUrl: './time-confidence-link-step-view.html',
  styleUrl: './time-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeConfidenceLinkStepView {
  readonly step = input.required<TimeConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
