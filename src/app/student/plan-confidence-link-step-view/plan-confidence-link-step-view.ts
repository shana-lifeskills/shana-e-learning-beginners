import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PlanConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Planning Module — Advanced, Week 1). A calm
 * card with one line to carry into the week — nothing to fill in. See
 * `PlanConfidenceLinkStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-plan-confidence-link-step-view',
  standalone: true,
  templateUrl: './plan-confidence-link-step-view.html',
  styleUrl: './plan-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConfidenceLinkStepView {
  readonly step = input.required<PlanConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
