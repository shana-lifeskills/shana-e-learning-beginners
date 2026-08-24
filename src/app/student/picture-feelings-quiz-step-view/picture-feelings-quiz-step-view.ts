import { Component, computed, input, output, signal } from '@angular/core';
import { PictureFeelingsQuizOption, PictureFeelingsQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

@Component({
  selector: 'app-picture-feelings-quiz-step-view',
  standalone: true,
  templateUrl: './picture-feelings-quiz-step-view.html',
  styleUrl: './picture-feelings-quiz-step-view.scss',
})
export class PictureFeelingsQuizStepView {
  readonly step = input.required<PictureFeelingsQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.activeIndex() === this.step().questions.length - 1);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: PictureFeelingsQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: PictureFeelingsQuizOption): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId || (question.acceptableOptionIds?.includes(option.id) ?? false);
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        if (correct) this.activeIndex.update((i) => i + 1);
      },
      correct ? 1800 : 900
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
