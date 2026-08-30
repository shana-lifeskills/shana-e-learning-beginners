import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ExerciseOption, SmartChoicesQuestion, SmartChoicesWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-smart-choices-warmup-step-view',
  standalone: true,
  templateUrl: './smart-choices-warmup-step-view.html',
  styleUrl: './smart-choices-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartChoicesWarmupStepView {
  readonly step = input.required<SmartChoicesWarmupStep>();
  readonly continued = output<void>();

  /** Ids of questions whose smart move has been locked in. */
  readonly solved = signal<Set<string>>(new Set());
  /** The option currently shaking after a wrong pick (cleared on the next try). */
  readonly wrong = signal<string | null>(null);
  /** True once the active question is solved — the "Smart move!" panel shows before advancing. */
  readonly justSolved = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().questions.findIndex((q) => !solved.has(q.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeQuestion = computed<SmartChoicesQuestion>(() => this.step().questions[this.activeIndex()]);

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  optionClass(option: ExerciseOption): string {
    const question = this.activeQuestion();
    if (this.solved().has(question.id)) {
      return option.id === question.correctOptionId ? 'is-smart' : 'is-dim';
    }
    return this.wrong() === option.id ? 'is-wrong' : '';
  }

  pick(option: ExerciseOption): void {
    const question = this.activeQuestion();
    if (this.justSolved() || this.solved().has(question.id)) return;

    if (option.id === question.correctOptionId) {
      this.wrong.set(null);
      this.solved.update((set) => new Set(set).add(question.id));
      this.justSolved.set(true);
      return;
    }

    this.wrong.set(option.id);
  }

  advance(): void {
    if (this.allSolved()) {
      this.continued.emit();
      return;
    }
    this.justSolved.set(false);
  }
}
