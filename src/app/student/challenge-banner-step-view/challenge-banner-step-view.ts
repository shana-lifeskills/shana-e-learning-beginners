import { Component, input, output } from '@angular/core';
import { ChallengeBannerStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-banner-step-view',
  standalone: true,
  templateUrl: './challenge-banner-step-view.html',
  styleUrl: './challenge-banner-step-view.scss',
})
export class ChallengeBannerStepView {
  readonly step = input.required<ChallengeBannerStep>();
  readonly continued = output<void>();
}
