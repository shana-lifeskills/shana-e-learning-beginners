import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DisciplineWarmupQuizOption, DisciplineWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Discipline Warm-Up" multiple-choice game (Discipline Module, Week 1). A row
 * of shields lights up as each question is answered correctly, one lettered
 * question shows at a time, a wrong pick shakes and stays put, a right pick
 * lights the next shield and advances. The Continue button is withheld until
 * every shield is lit, so the learner must answer all questions correctly.
 */
@Component({
  selector: 'app-discipline-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './discipline-warmup-quiz-step-view.html',
  styleUrl: './discipline-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisciplineWarmupQuizStepView {
  readonly step = input.required<DisciplineWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  readonly shields = computed(() => this.questions().map((_, i) => i < this.activeIndex()));

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: DisciplineWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: DisciplineWarmupQuizOption): void {
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
