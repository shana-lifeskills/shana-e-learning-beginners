import { Component, input, output, signal } from '@angular/core';
import { ChallengeConfidenceWeekStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-confidence-week-step-view',
  standalone: true,
  templateUrl: './challenge-confidence-week-step-view.html',
  styleUrl: './challenge-confidence-week-step-view.scss',
})
export class ChallengeConfidenceWeekStepView {
  readonly step = input.required<ChallengeConfidenceWeekStep>();
  readonly continued = output<void>();

  readonly remembered = signal(true);

  toggleRemembered(): void {
    this.remembered.update((v) => !v);
  }
}
