import { Component, computed, input, output, signal } from '@angular/core';
import { GoalMatchupOption, GoalMatchupQuestion, GoalMatchupStep } from '../../core/models/module.model';

interface GoalMatchupAnswer {
  question: GoalMatchupQuestion;
  selectedOption: GoalMatchupOption;
  correct: boolean;
}

@Component({
  selector: 'app-goal-matchup-step-view',
  standalone: true,
  templateUrl: './goal-matchup-step-view.html',
  styleUrl: './goal-matchup-step-view.scss',
})
export class GoalMatchupStepView {
  readonly step = input.required<GoalMatchupStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly points = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly answered = signal(false);
  readonly results = signal<GoalMatchupAnswer[]>([]);

  readonly total = computed(() => this.step().questions.length);
  readonly reviewing = computed(() => this.activeIndex() >= this.total());
  readonly progressPercent = computed(() => ((this.activeIndex() + (this.answered() ? 1 : 0)) / this.total()) * 100);
  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.activeIndex() === this.total() - 1);

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  correctLetter(): string {
    const question = this.currentQuestion();
    if (!question) return '';
    const index = question.options.findIndex((o) => o.id === question.correctOptionId);
    return this.optionLetter(index);
  }

  resultLetter(answer: GoalMatchupAnswer): string {
    const index = answer.question.options.findIndex((o) => o.id === answer.selectedOption.id);
    return this.optionLetter(index);
  }

  resultCorrectLetter(answer: GoalMatchupAnswer): string {
    const index = answer.question.options.findIndex((o) => o.id === answer.question.correctOptionId);
    return this.optionLetter(index);
  }

  optionState(option: GoalMatchupOption): 'correct' | 'incorrect' | null {
    if (!this.answered()) return null;
    const question = this.currentQuestion();
    if (!question) return null;
    if (option.id === question.correctOptionId) return 'correct';
    if (option.id === this.selectedOptionId()) return 'incorrect';
    return null;
  }

  selectOption(option: GoalMatchupOption): void {
    if (this.answered()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId;
    this.selectedOptionId.set(option.id);
    this.answered.set(true);
    if (correct) this.points.update((p) => p + 1);

    this.results.update((draft) => [...draft, { question, selectedOption: option, correct }]);
  }

  next(): void {
    this.activeIndex.update((i) => i + 1);
    this.selectedOptionId.set(null);
    this.answered.set(false);
  }

  finish(): void {
    this.continued.emit();
  }
}
