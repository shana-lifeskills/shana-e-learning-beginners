import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { HygieneWarmupQuizOption, HygieneWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Hygiene Warm-Up" multiple-choice game (Hygiene Module, Week 1). A row of
 * soap bubbles across the top shimmers full one at a time as questions are
 * answered correctly; one lettered question shows at a time; a wrong pick
 * wobbles and stays put; a right pick fills the next bubble and advances. The
 * Continue button is withheld until the bubble row is full. Its own visual
 * design — see `HygieneWarmupQuizStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './hygiene-warmup-quiz-step-view.html',
  styleUrl: './hygiene-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneWarmupQuizStepView {
  readonly step = input.required<HygieneWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  /** One entry per question; true once that question has been answered correctly. */
  readonly bubbles = computed(() => this.questions().map((_, i) => i < this.activeIndex()));

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: HygieneWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: HygieneWarmupQuizOption): void {
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
      correct ? 1400 : 800,
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
