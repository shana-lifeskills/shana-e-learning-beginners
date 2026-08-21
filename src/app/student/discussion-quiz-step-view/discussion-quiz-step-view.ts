import { Component, computed, input, output, signal } from '@angular/core';
import { DiscussionQuizStep, ExerciseOption } from '../../core/models/module.model';

@Component({
  selector: 'app-discussion-quiz-step-view',
  standalone: true,
  templateUrl: './discussion-quiz-step-view.html',
  styleUrl: './discussion-quiz-step-view.scss',
})
export class DiscussionQuizStepView {
  readonly step = input.required<DiscussionQuizStep>();
  readonly submitted = output<Record<string, string>>();

  readonly activeIndex = signal(0);
  /** questionId -> the correctly-picked option's text, so the review screen can just print it. */
  readonly answers = signal<Record<string, string>>({});

  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly reviewing = computed(() => this.activeIndex() >= this.step().questions.length);
  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.activeIndex() === this.step().questions.length - 1);

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

    setTimeout(() => {
      if (correct) {
        this.answers.update((draft) => ({ ...draft, [question.id]: option.text }));
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        this.activeIndex.update((i) => i + 1);
      } else {
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
      }
    }, 900);
  }

  finish(): void {
    this.submitted.emit(this.answers());
  }
}
