import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { WellnessWarmupQuizOption, WellnessWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Wellness Warm-Up" multiple-choice game (Wellness Module, Week 1). A friendly
 * sun in the centre gains one golden ray for every question answered correctly;
 * one lettered question shows at a time; a wrong pick shivers and stays put; a
 * right pick lights the next ray and advances. The Continue button is withheld
 * until the sun is full. Its own visual design — see `WellnessWarmupQuizStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './wellness-warmup-quiz-step-view.html',
  styleUrl: './wellness-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessWarmupQuizStepView {
  readonly step = input.required<WellnessWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  /** One entry per question; true once that question has been answered correctly. */
  readonly rays = computed(() => this.questions().map((_, i) => i < this.activeIndex()));

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: WellnessWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: WellnessWarmupQuizOption): void {
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
