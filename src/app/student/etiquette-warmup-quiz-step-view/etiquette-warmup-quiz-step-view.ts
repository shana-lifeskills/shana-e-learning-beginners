import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { EtiquetteWarmupQuizQuestion, EtiquetteWarmupQuizStep, ExerciseOption } from '../../core/models/module.model';

@Component({
  selector: 'app-etiquette-warmup-quiz-step-view',
  standalone: true,
  templateUrl: './etiquette-warmup-quiz-step-view.html',
  styleUrl: './etiquette-warmup-quiz-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EtiquetteWarmupQuizStepView {
  readonly step = input.required<EtiquetteWarmupQuizStep>();
  readonly continued = output<void>();

  /** Ids of questions the learner has answered correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** The option currently selected on the active question (cleared when it advances). */
  readonly picked = signal<string | null>(null);
  /** True after a wrong pick on the active question — drives the shake + nudge. */
  readonly wrong = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly progressPercent = computed(() => Math.round((this.solvedCount() / this.total()) * 100));
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  /** Index of the first not-yet-solved question — the only interactive card. */
  readonly activeIndex = computed(() => {
    const solved = this.solved();
    return this.step().questions.findIndex((q) => !solved.has(q.id));
  });

  questionState(index: number): 'done' | 'active' | 'locked' {
    const active = this.activeIndex();
    if (this.solved().has(this.step().questions[index].id)) return 'done';
    if (index === active || active === -1) return 'active';
    return 'locked';
  }

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  chosenOptionText(question: EtiquetteWarmupQuizQuestion): string {
    const chosen = question.options.find((o) => o.id === question.correctOptionId);
    return chosen?.text ?? '';
  }

  optionClass(question: EtiquetteWarmupQuizQuestion, option: ExerciseOption): string {
    if (this.solved().has(question.id)) {
      return option.id === question.correctOptionId ? 'is-correct' : '';
    }
    if (this.picked() === option.id) return this.wrong() ? 'is-wrong' : 'is-picked';
    return '';
  }

  pick(question: EtiquetteWarmupQuizQuestion, option: ExerciseOption): void {
    if (this.solved().has(question.id)) return;

    if (option.id === question.correctOptionId) {
      this.picked.set(null);
      this.wrong.set(false);
      this.solved.update((set) => {
        const next = new Set(set);
        next.add(question.id);
        return next;
      });
      return;
    }

    this.picked.set(option.id);
    this.wrong.set(true);
  }

  finish(): void {
    if (this.allSolved()) this.continued.emit();
  }
}
