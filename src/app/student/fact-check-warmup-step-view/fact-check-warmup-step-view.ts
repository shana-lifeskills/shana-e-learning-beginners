import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FactCheckStatement, FactCheckWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-fact-check-warmup-step-view',
  standalone: true,
  templateUrl: './fact-check-warmup-step-view.html',
  styleUrl: './fact-check-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactCheckWarmupStepView {
  readonly step = input.required<FactCheckWarmupStep>();
  readonly continued = output<void>();

  /** Ids of statements judged correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** The stamp that just missed on the active card ('true' | 'false' | null). */
  readonly missed = signal<'true' | 'false' | null>(null);
  /** True once the active card is solved — its "why" panel shows before advancing. */
  readonly revealed = signal(false);

  readonly total = computed(() => this.step().statements.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());
  readonly progressPercent = computed(() => Math.round((this.solvedCount() / this.total()) * 100));

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().statements.findIndex((s) => !solved.has(s.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeStatement = computed<FactCheckStatement>(() => this.step().statements[this.activeIndex()]);

  stamp(value: boolean): void {
    const statement = this.activeStatement();
    if (this.revealed() || this.solved().has(statement.id)) return;

    if (value === statement.isTrue) {
      this.missed.set(null);
      this.solved.update((set) => new Set(set).add(statement.id));
      this.revealed.set(true);
      return;
    }

    this.missed.set(value ? 'true' : 'false');
  }

  advance(): void {
    if (this.allSolved()) {
      this.continued.emit();
      return;
    }
    this.revealed.set(false);
    this.missed.set(null);
  }
}
