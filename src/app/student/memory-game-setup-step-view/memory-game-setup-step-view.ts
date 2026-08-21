import { Component, input, output } from '@angular/core';
import { MemoryGameSetupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-memory-game-setup-step-view',
  standalone: true,
  templateUrl: './memory-game-setup-step-view.html',
  styleUrl: './memory-game-setup-step-view.scss',
})
export class MemoryGameSetupStepView {
  readonly step = input.required<MemoryGameSetupStep>();
  readonly continued = output<void>();
}
