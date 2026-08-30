import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ThinkItThroughStatement, ThinkItThroughWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-think-it-through-warmup-step-view',
  standalone: true,
  templateUrl: './think-it-through-warmup-step-view.html',
  styleUrl: './think-it-through-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinkItThroughWarmupStepView {
  readonly step = input.required<ThinkItThroughWarmupStep>();
  readonly continued = output<void>();

  /** Ids of statements judged correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** The lamp that just missed on the active card ('true' | 'false' | null). */
  readonly missed = signal<'true' | 'false' | null>(null);
  /** True once the active card is solved — its "why" panel shows before advancing. */
  readonly revealed = signal(false);

  readonly total = computed(() => this.step().statements.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().statements.findIndex((s) => !solved.has(s.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeStatement = computed<ThinkItThroughStatement>(() => this.step().statements[this.activeIndex()]);

  /** Which lamp is lit: the correct answer once solved, the missed one while retrying, else none. */
  lampState(lamp: 'true' | 'false' | 'amber'): 'on' | 'off' {
    if (lamp === 'amber') return this.missed() && !this.revealed() ? 'on' : 'off';
    if (this.revealed()) {
      return (lamp === 'true') === this.activeStatement().isTrue ? 'on' : 'off';
    }
    return 'off';
  }

  judge(value: boolean): void {
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
