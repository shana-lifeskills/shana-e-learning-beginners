import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NutritionWarmupQuizOption, NutritionWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** Food emoji that drop into the lunchbox, one per correct answer. */
const FOODS = ['🍎', '🥕', '🥛', '🍞', '🍌', '🧀'];

/**
 * "Nutrition Warm-Up" multiple-choice game (Nutrition Module, Week 1). An open
 * lunchbox in the centre packs one more food item for every question answered
 * correctly; one lettered question shows at a time; a wrong pick wobbles and
 * stays put; a right pick packs the next item and advances. The Continue button
 * is withheld until the lunchbox is full. Its own visual design — see
 * `NutritionWarmupQuizStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './nutrition-warmup-quiz-step-view.html',
  styleUrl: './nutrition-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionWarmupQuizStepView {
  readonly step = input.required<NutritionWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  /** One slot per question — filled with a food once that question is answered correctly. */
  readonly slots = computed(() =>
    this.questions().map((_, i) => ({
      food: FOODS[i] ?? '🍏',
      packed: i < this.activeIndex(),
    })),
  );

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: NutritionWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: NutritionWarmupQuizOption): void {
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
