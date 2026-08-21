import { Component, input, output } from '@angular/core';
import { ReflectionStep } from '../../core/models/module.model';

@Component({
  selector: 'app-reflection-step-view',
  standalone: true,
  templateUrl: './reflection-step-view.html',
  styleUrl: './reflection-step-view.scss',
})
export class ReflectionStepView {
  readonly step = input.required<ReflectionStep>();
  readonly continued = output<void>();
}
