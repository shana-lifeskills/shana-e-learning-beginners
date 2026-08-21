import { Component, input, output } from '@angular/core';
import { ChallengeMinimalStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-minimal-step-view',
  standalone: true,
  templateUrl: './challenge-minimal-step-view.html',
  styleUrl: './challenge-minimal-step-view.scss',
})
export class ChallengeMinimalStepView {
  readonly step = input.required<ChallengeMinimalStep>();
  readonly continued = output<void>();
}
