import { Component, computed, input, output, signal } from '@angular/core';
import { ExerciseOption, SameOrDifferentQuizStep } from '../../core/models/module.model';

@Component({
  selector: 'app-same-or-different-quiz-step-view',
  standalone: true,
  templateUrl: './same-or-different-quiz-step-view.html',
  styleUrl: './same-or-different-quiz-step-view.scss',
})
export class SameOrDifferentQuizStepView {
  readonly step = input.required<SameOrDifferentQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly score = computed(() => Math.min(this.activeIndex(), this.step().questions.length));
  readonly progressPercent = computed(() => ((this.activeIndex() + 1) / this.step().questions.length) * 100);

  optionState(option: ExerciseOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: ExerciseOption): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId;
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
      correct ? 1400 : 900
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
