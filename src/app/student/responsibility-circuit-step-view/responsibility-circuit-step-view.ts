import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ExerciseOption, ResponsibilityCircuitQuestion, ResponsibilityCircuitStep } from '../../core/models/module.model';

@Component({
  selector: 'app-responsibility-circuit-step-view',
  standalone: true,
  templateUrl: './responsibility-circuit-step-view.html',
  styleUrl: './responsibility-circuit-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsibilityCircuitStepView {
  readonly step = input.required<ResponsibilityCircuitStep>();
  readonly continued = output<void>();

  /** Ids of nodes the learner has powered (answered correctly). */
  readonly powered = signal<Set<string>>(new Set());
  /** Option currently selected on the active node. */
  readonly picked = signal<string | null>(null);
  /** True right after a wrong pick — drives the spark + shake. */
  readonly sparked = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly poweredCount = computed(() => this.powered().size);
  readonly allPowered = computed(() => this.poweredCount() === this.total());

  /** Index of the first unpowered node — the only interactive one. */
  readonly activeIndex = computed(() => {
    const powered = this.powered();
    return this.step().questions.findIndex((q) => !powered.has(q.id));
  });

  nodeState(index: number): 'lit' | 'active' | 'dim' {
    if (this.powered().has(this.step().questions[index].id)) return 'lit';
    const active = this.activeIndex();
    if (index === active || active === -1) return 'active';
    return 'dim';
  }

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  chosenOptionText(question: ResponsibilityCircuitQuestion): string {
    return question.options.find((o) => o.id === question.correctOptionId)?.text ?? '';
  }

  optionClass(question: ResponsibilityCircuitQuestion, option: ExerciseOption): string {
    if (this.powered().has(question.id)) {
      return option.id === question.correctOptionId ? 'is-correct' : '';
    }
    if (this.picked() === option.id) return this.sparked() ? 'is-wrong' : 'is-picked';
    return '';
  }

  pick(question: ResponsibilityCircuitQuestion, option: ExerciseOption): void {
    if (this.powered().has(question.id)) return;

    if (option.id === question.correctOptionId) {
      this.picked.set(null);
      this.sparked.set(false);
      this.powered.update((set) => {
        const next = new Set(set);
        next.add(question.id);
        return next;
      });
      return;
    }

    this.picked.set(option.id);
    this.sparked.set(true);
  }

  finish(): void {
    if (this.allPowered()) this.continued.emit();
  }
}
