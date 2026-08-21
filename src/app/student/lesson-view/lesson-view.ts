import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../core/models/module.model';

export type LessonStatus = 'completed' | 'current' | 'locked';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-view.html',
  styleUrl: './lesson-view.scss',
})
export class LessonViewComponent {
  readonly lesson = input.required<Lesson>();
  readonly status = input.required<LessonStatus>();
  readonly index = input(0);
  readonly selected = output<void>();

  activate(): void {
    if (this.status() === 'locked') return;
    this.selected.emit();
  }
}
