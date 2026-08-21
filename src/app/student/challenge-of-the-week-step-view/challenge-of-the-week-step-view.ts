import { Component, input, output } from '@angular/core';
import { ChallengeOfTheWeekStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-of-the-week-step-view',
  standalone: true,
  templateUrl: './challenge-of-the-week-step-view.html',
  styleUrl: './challenge-of-the-week-step-view.scss',
})
export class ChallengeOfTheWeekStepView {
  readonly step = input.required<ChallengeOfTheWeekStep>();
  readonly continued = output<void>();
}
