import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SavingsWarmupQuizOption, SavingsWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Fill the Savings Jar" multiple-choice warm-up (Savings Module, Week 1). A
 * glass jar fills with one coin per correct answer. A wrong pick shakes and the
 * question stays put; the Continue button is withheld until the jar is full, so
 * the learner must answer every question correctly.
 */
@Component({
  selector: 'app-savings-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './savings-warmup-quiz-step-view.html',
  styleUrl: './savings-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsWarmupQuizStepView {
  readonly step = input.required<SavingsWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  readonly coins = computed(() => this.questions().map((_, i) => i < this.activeIndex()));
  readonly fillPercent = computed(() => (this.activeIndex() / Math.max(this.questions().length, 1)) * 100);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: SavingsWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: SavingsWarmupQuizOption): void {
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
