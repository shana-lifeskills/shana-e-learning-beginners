import { Component, computed, input, output, signal } from '@angular/core';
import { FeelingsPictureChoiceOption, FeelingsPictureChoiceStep } from '../../core/models/module.model';

@Component({
  selector: 'app-feelings-picture-choice-step-view',
  standalone: true,
  templateUrl: './feelings-picture-choice-step-view.html',
  styleUrl: './feelings-picture-choice-step-view.scss',
})
export class FeelingsPictureChoiceStepView {
  readonly step = input.required<FeelingsPictureChoiceStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.activeIndex() === this.step().questions.length - 1);
  readonly progressPercent = computed(() => (this.activeIndex() / this.step().questions.length) * 100);

  selectOption(option: FeelingsPictureChoiceOption): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId;
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');

    if (!correct) {
      this.locked.set(true);
      setTimeout(() => {
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
      }, 900);
    }
  }

  nextQuestion(): void {
    this.selectedOptionId.set(null);
    this.feedback.set(null);
    this.activeIndex.update((i) => i + 1);
  }

  playAgain(): void {
    this.activeIndex.set(0);
    this.selectedOptionId.set(null);
    this.feedback.set(null);
  }

  finish(): void {
    this.continued.emit();
  }
}
