import { Component, computed, input, output, signal } from '@angular/core';
import { TemperamentQuizStep } from '../../core/models/module.model';

type Letter = 'A' | 'B' | 'C' | 'D';

@Component({
  selector: 'app-temperament-quiz-step-view',
  standalone: true,
  templateUrl: './temperament-quiz-step-view.html',
  styleUrl: './temperament-quiz-step-view.scss',
})
export class TemperamentQuizStepView {
  readonly step = input.required<TemperamentQuizStep>();
  readonly continued = output<void>();

  readonly qIndex = signal(0);
  readonly tally = signal<Record<Letter, number>>({ A: 0, B: 0, C: 0, D: 0 });
  readonly finished = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.qIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.qIndex() === this.step().questions.length - 1);

  readonly result = computed(() => {
    const tally = this.tally();
    const winner = (['A', 'B', 'C', 'D'] as Letter[]).reduce((best, letter) =>
      tally[letter] > tally[best] ? letter : best
    , 'A' as Letter);
    return this.step().results.find((r) => r.letter === winner) ?? this.step().results[0];
  });

  answer(letter: Letter): void {
    this.tally.update((t) => ({ ...t, [letter]: t[letter] + 1 }));

    if (this.isLastQuestion()) {
      this.finished.set(true);
    } else {
      this.qIndex.update((i) => i + 1);
    }
  }

  retake(): void {
    this.qIndex.set(0);
    this.tally.set({ A: 0, B: 0, C: 0, D: 0 });
    this.finished.set(false);
  }

  finish(): void {
    this.continued.emit();
  }
}
