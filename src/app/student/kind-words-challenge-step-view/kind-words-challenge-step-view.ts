import { Component, input, output } from '@angular/core';
import { KindWordsChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-kind-words-challenge-step-view',
  standalone: true,
  templateUrl: './kind-words-challenge-step-view.html',
  styleUrl: './kind-words-challenge-step-view.scss',
})
export class KindWordsChallengeStepView {
  readonly step = input.required<KindWordsChallengeStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
