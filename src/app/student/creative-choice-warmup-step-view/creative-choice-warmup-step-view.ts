import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CreativeChoiceQuestion, CreativeChoiceWarmupStep, ExerciseOption } from '../../core/models/module.model';

@Component({
  selector: 'app-creative-choice-warmup-step-view',
  standalone: true,
  templateUrl: './creative-choice-warmup-step-view.html',
  styleUrl: './creative-choice-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreativeChoiceWarmupStepView {
  readonly step = input.required<CreativeChoiceWarmupStep>();
  readonly continued = output<void>();

  /** Ids of questions whose creative option has been found. */
  readonly solved = signal<Set<string>>(new Set());
  /** The plain option currently dimmed after a wrong pick (cleared on the next try). */
  readonly picked = signal<string | null>(null);
  /** True once the active question is solved — the spark panel shows before advancing. */
  readonly justSolved = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  /** Index of the question currently on screen. */
  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().questions.findIndex((q) => !solved.has(q.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeQuestion = computed<CreativeChoiceQuestion>(() => this.step().questions[this.activeIndex()]);

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  optionClass(option: ExerciseOption): string {
    const question = this.activeQuestion();
    if (this.solved().has(question.id)) {
      return option.id === question.correctOptionId ? 'is-creative' : 'is-faded';
    }
    return this.picked() === option.id ? 'is-plain' : '';
  }

  pick(option: ExerciseOption): void {
    const question = this.activeQuestion();
    if (this.justSolved() || this.solved().has(question.id)) return;

    if (option.id === question.correctOptionId) {
      this.picked.set(null);
      this.solved.update((set) => new Set(set).add(question.id));
      this.justSolved.set(true);
      return;
    }

    this.picked.set(option.id);
  }

  /** Dismiss the spark panel — the next unsolved question slides in, or the step finishes. */
  advance(): void {
    if (this.allSolved()) {
      this.continued.emit();
      return;
    }
    this.justSolved.set(false);
  }
}
