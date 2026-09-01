import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TeamworkWarmupQuizOption, TeamworkWarmupQuizStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * "Teamwork Warm-Up" multiple-choice game (Teamwork Module, Week 1). A "team
 * stack" of hands builds up from the bottom, one hand added each time a
 * question is answered correctly, one lettered question shows at a time, a
 * wrong pick shakes and stays put, a right pick adds the next hand and
 * advances. The Continue button is withheld until the stack is complete, so
 * the learner must answer every question correctly.
 */
@Component({
  selector: 'app-teamwork-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './teamwork-warmup-quiz-step-view.html',
  styleUrl: './teamwork-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkWarmupQuizStepView {
  readonly step = input.required<TeamworkWarmupQuizStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly currentQuestion = computed(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  /** One entry per question, bottom-up; true once that question has been answered correctly. */
  readonly hands = computed(() =>
    this.questions()
      .map((_, i) => i < this.activeIndex())
      .reverse(),
  );

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: TeamworkWarmupQuizOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: TeamworkWarmupQuizOption): void {
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
