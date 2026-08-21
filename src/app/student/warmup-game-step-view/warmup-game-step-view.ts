import { Component, input, output } from '@angular/core';
import { WarmupGameStep } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-game-step-view',
  standalone: true,
  templateUrl: './warmup-game-step-view.html',
  styleUrl: './warmup-game-step-view.scss',
})
export class WarmupGameStepView {
  readonly step = input.required<WarmupGameStep>();
  readonly continued = output<void>();
}
