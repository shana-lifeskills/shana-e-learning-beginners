import { Component, input, output } from '@angular/core';
import { MemoryGameIntroStep } from '../../core/models/module.model';

@Component({
  selector: 'app-memory-game-intro-step-view',
  standalone: true,
  templateUrl: './memory-game-intro-step-view.html',
  styleUrl: './memory-game-intro-step-view.scss',
})
export class MemoryGameIntroStepView {
  readonly step = input.required<MemoryGameIntroStep>();
  readonly continued = output<void>();
}
