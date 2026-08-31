import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TradeOffQuizOption, TradeOffQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Trade-off Quiz Machine" warm-up (Choices Module, Week 1). A playful arcade
 * card: a coin track at the top fills as questions are answered, one lettered
 * multiple-choice question shows at a time, a wrong pick shakes and stays put,
 * a right pick drops a coin and advances. The Continue button is withheld until
 * every coin is collected, so the learner must answer all questions correctly.
 */
@Component({
  selector: 'app-trade-off-quiz-step-view',
  standalone: true,
  templateUrl: './trade-off-quiz-step-view.html',
  styleUrl: './trade-off-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOffQuizStepView {
  readonly step = input.required<TradeOffQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  readonly coins = computed(() =>
    this.questions().map((_, i) => i < this.activeIndex()),
  );

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: TradeOffQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: TradeOffQuizOption): void {
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
