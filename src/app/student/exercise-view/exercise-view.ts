import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseOption, MultipleChoiceExercise } from '../../core/models/module.model';

export interface ExerciseAnswer {
  optionId: string;
  correct: boolean;
}

@Component({
  selector: 'app-exercise-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-view.html',
  styleUrl: './exercise-view.scss',
})
export class ExerciseView {
  readonly exercise = input.required<MultipleChoiceExercise>();
  readonly answered = output<ExerciseAnswer>();

  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  constructor() {
    // Whenever the parent hands us a new exercise, wipe local selection state.
    effect(() => {
      this.exercise();
      this.selectedOptionId.set(null);
      this.feedback.set(null);
      this.locked.set(false);
    });
  }

  selectOption(option: ExerciseOption): void {
    if (this.locked()) return;

    const correct = option.id === this.exercise().correctOptionId;
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(() => {
      if (correct) {
        this.answered.emit({ optionId: option.id, correct: true });
      } else {
        this.feedback.set(null);
        this.selectedOptionId.set(null);
        this.locked.set(false);
        this.answered.emit({ optionId: option.id, correct: false });
      }
    }, 800);
  }

  optionState(option: ExerciseOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }
}
