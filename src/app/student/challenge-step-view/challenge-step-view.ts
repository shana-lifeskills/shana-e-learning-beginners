import { Component, input, output } from '@angular/core';
import { ChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-step-view',
  standalone: true,
  templateUrl: './challenge-step-view.html',
  styleUrl: './challenge-step-view.scss',
})
export class ChallengeStepView {
  readonly step = input.required<ChallengeStep>();
  readonly continued = output<void>();
}
