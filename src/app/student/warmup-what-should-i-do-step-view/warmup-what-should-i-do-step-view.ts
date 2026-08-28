import { Component, computed, input, output, signal } from '@angular/core';
import { WarmupWhatShouldIDoOption, WarmupWhatShouldIDoStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

@Component({
  selector: 'app-warmup-what-should-i-do-step-view',
  standalone: true,
  templateUrl: './warmup-what-should-i-do-step-view.html',
  styleUrl: './warmup-what-should-i-do-step-view.scss',
})
export class WarmupWhatShouldIDoStepView {
  readonly step = input.required<WarmupWhatShouldIDoStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: WarmupWhatShouldIDoOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: WarmupWhatShouldIDoOption): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId;
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    if (correct) {
      setTimeout(() => {
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        this.activeIndex.update((i) => i + 1);
      }, 1600);
    }
  }

  /** Resets the current question so the student can pick again — the only way forward after a wrong answer. */
  tryAgain(): void {
    this.selectedOptionId.set(null);
    this.feedback.set(null);
    this.locked.set(false);
  }

  finish(): void {
    this.continued.emit();
  }
}
