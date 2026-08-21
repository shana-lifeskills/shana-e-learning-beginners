import { Component, input, output, signal } from '@angular/core';
import { ConfidenceLinkStep } from '../../core/models/module.model';

type PlanTabsView = 'hero' | 'day' | 'brave';

@Component({
  selector: 'app-confidence-link-step-view',
  standalone: true,
  imports: [],
  templateUrl: './confidence-link-step-view.html',
  styleUrl: './confidence-link-step-view.scss',
})
export class ConfidenceLinkStepView {
  readonly step = input.required<ConfidenceLinkStep>();
  readonly completed = output<void>();

  readonly planTabsView = signal<PlanTabsView>('hero');

  showPlanTab(view: PlanTabsView): void {
    this.planTabsView.set(view);
  }
}
