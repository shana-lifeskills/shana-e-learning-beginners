import { Component, input, output } from '@angular/core';
import { SmartGoalsLessonStep } from '../../core/models/module.model';

@Component({
  selector: 'app-smart-goals-lesson-step-view',
  standalone: true,
  templateUrl: './smart-goals-lesson-step-view.html',
  styleUrl: './smart-goals-lesson-step-view.scss',
})
export class SmartGoalsLessonStepView {
  readonly step = input.required<SmartGoalsLessonStep>();
  readonly continued = output<void>();
}
