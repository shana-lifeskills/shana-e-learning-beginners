import { Component, input, output } from '@angular/core';
import { KindnessBannerChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-kindness-banner-challenge-step-view',
  standalone: true,
  templateUrl: './kindness-banner-challenge-step-view.html',
  styleUrl: './kindness-banner-challenge-step-view.scss',
})
export class KindnessBannerChallengeStepView {
  readonly step = input.required<KindnessBannerChallengeStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
