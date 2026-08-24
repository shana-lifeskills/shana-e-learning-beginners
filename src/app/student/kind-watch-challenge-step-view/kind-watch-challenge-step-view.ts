import { Component, input, output } from '@angular/core';
import { KindWatchChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-kind-watch-challenge-step-view',
  standalone: true,
  templateUrl: './kind-watch-challenge-step-view.html',
  styleUrl: './kind-watch-challenge-step-view.scss',
})
export class KindWatchChallengeStepView {
  readonly step = input.required<KindWatchChallengeStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
