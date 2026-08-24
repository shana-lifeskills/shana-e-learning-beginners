import { Component, input, output } from '@angular/core';
import { KindnessCornerChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-kindness-corner-challenge-step-view',
  standalone: true,
  templateUrl: './kindness-corner-challenge-step-view.html',
  styleUrl: './kindness-corner-challenge-step-view.scss',
})
export class KindnessCornerChallengeStepView {
  readonly step = input.required<KindnessCornerChallengeStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
