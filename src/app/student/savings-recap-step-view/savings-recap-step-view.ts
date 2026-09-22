import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SavingsRecapStep } from '../../core/models/module.model';

/** "Recap" page (Savings Module, Week 2): the week's key points as a short list of numbered coins. */
@Component({
  selector: 'app-savings-recap-step-view',
  standalone: true,
  templateUrl: './savings-recap-step-view.html',
  styleUrl: './savings-recap-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsRecapStepView {
  readonly step = input.required<SavingsRecapStep>();
  readonly continued = output<void>();
}
