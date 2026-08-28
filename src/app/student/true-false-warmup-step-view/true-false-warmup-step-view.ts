import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TrueFalseWarmupStatement, TrueFalseWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-true-false-warmup-step-view',
  standalone: true,
  templateUrl: './true-false-warmup-step-view.html',
  styleUrl: './true-false-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrueFalseWarmupStepView {
  readonly step = input.required<TrueFalseWarmupStep>();
  readonly continued = output<void>();

  /** Ids of statements stamped with the correct verdict. */
  readonly solved = signal<Set<string>>(new Set());
  /** The verdict currently being tried on the active card, while it is wrong. */
  readonly wrongVerdict = signal<boolean | null>(null);
  /** Praise line from the most recently solved statement. */
  readonly lastPraise = signal<string | null>(null);

  readonly total = computed(() => this.step().statements.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly progressPercent = computed(() => Math.round((this.solvedCount() / this.total()) * 100));
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  /** The first not-yet-solved statement — the only interactive card. */
  readonly activeStatement = computed(() => {
    const solved = this.solved();
    return this.step().statements.find((s) => !solved.has(s.id)) ?? null;
  });

  readonly activeNumber = computed(() => {
    const active = this.activeStatement();
    if (!active) return this.total();
    return this.step().statements.indexOf(active) + 1;
  });

  sortedInto(verdict: boolean): TrueFalseWarmupStatement[] {
    const solved = this.solved();
    return this.step().statements.filter((s) => solved.has(s.id) && s.answer === verdict);
  }

  stamp(statement: TrueFalseWarmupStatement, verdict: boolean): void {
    if (this.solved().has(statement.id)) return;

    if (verdict === statement.answer) {
      this.wrongVerdict.set(null);
      this.lastPraise.set(statement.praise);
      this.solved.update((set) => {
        const next = new Set(set);
        next.add(statement.id);
        return next;
      });
      return;
    }

    this.wrongVerdict.set(verdict);
  }

  finish(): void {
    if (this.allSolved()) this.continued.emit();
  }
}
