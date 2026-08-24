import { Component, input, output } from '@angular/core';
import { WeeklyChallengeShowcaseStep } from '../../core/models/module.model';

@Component({
  selector: 'app-weekly-challenge-showcase-step-view',
  standalone: true,
  templateUrl: './weekly-challenge-showcase-step-view.html',
  styleUrl: './weekly-challenge-showcase-step-view.scss',
})
export class WeeklyChallengeShowcaseStepView {
  readonly step = input.required<WeeklyChallengeShowcaseStep>();
  readonly continued = output<void>();
}
