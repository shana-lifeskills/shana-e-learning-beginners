import { Component, input, output } from '@angular/core';
import { BigQuestionStep } from '../../core/models/module.model';

@Component({
  selector: 'app-big-question-step-view',
  standalone: true,
  templateUrl: './big-question-step-view.html',
  styleUrl: './big-question-step-view.scss',
})
export class BigQuestionStepView {
  readonly step = input.required<BigQuestionStep>();
  readonly continued = output<void>();
}
