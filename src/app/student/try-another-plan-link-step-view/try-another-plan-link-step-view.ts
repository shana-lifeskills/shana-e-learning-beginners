import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TryAnotherPlanLinkStep } from '../../core/models/module.model';

@Component({
  selector: 'app-try-another-plan-link-step-view',
  standalone: true,
  templateUrl: './try-another-plan-link-step-view.html',
  styleUrl: './try-another-plan-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryAnotherPlanLinkStepView {
  readonly step = input.required<TryAnotherPlanLinkStep>();
  readonly completed = output<void>();
}
