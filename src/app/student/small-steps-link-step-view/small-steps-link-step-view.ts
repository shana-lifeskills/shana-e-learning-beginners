import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SmallStepsLinkStep } from '../../core/models/module.model';

@Component({
  selector: 'app-small-steps-link-step-view',
  standalone: true,
  templateUrl: './small-steps-link-step-view.html',
  styleUrl: './small-steps-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallStepsLinkStepView {
  readonly step = input.required<SmallStepsLinkStep>();
  readonly completed = output<void>();

  readonly markers = [0, 1, 2, 3];
}
