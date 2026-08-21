import { Component, input, output } from '@angular/core';
import { WarmupParadeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-parade-step-view',
  standalone: true,
  templateUrl: './warmup-parade-step-view.html',
  styleUrl: './warmup-parade-step-view.scss',
})
export class WarmupParadeStepView {
  readonly step = input.required<WarmupParadeStep>();
  readonly continued = output<void>();
}
