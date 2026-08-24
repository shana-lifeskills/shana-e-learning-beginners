import { Component, computed, input, output, signal } from '@angular/core';
import { YesNoQuizStep } from '../../core/models/module.model';

@Component({
  selector: 'app-yes-no-quiz-step-view',
  standalone: true,
  templateUrl: './yes-no-quiz-step-view.html',
  styleUrl: './yes-no-quiz-step-view.scss',
})
export class YesNoQuizStepView {
  readonly step = input.required<YesNoQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedAnswer = signal<'yes' | 'no' | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);

  answerState(answer: 'yes' | 'no'): 'correct' | 'incorrect' | null {
    if (this.selectedAnswer() !== answer) return null;
    return this.feedback();
  }

  selectAnswer(answer: 'yes' | 'no'): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = answer === question.correctAnswer;
    this.selectedAnswer.set(answer);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        this.selectedAnswer.set(null);
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
