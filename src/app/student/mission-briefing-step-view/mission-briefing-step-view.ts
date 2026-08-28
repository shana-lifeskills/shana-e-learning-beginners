import { Component, input, output } from '@angular/core';
import { MissionBriefingStep } from '../../core/models/module.model';

@Component({
  selector: 'app-mission-briefing-step-view',
  standalone: true,
  templateUrl: './mission-briefing-step-view.html',
  styleUrl: './mission-briefing-step-view.scss',
})
export class MissionBriefingStepView {
  readonly step = input.required<MissionBriefingStep>();
  readonly continued = output<void>();

  start(): void {
    this.continued.emit();
  }
}
