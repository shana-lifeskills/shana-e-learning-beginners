import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ScreenTruthCheckStatement, ScreenTruthCheckStep } from '../../core/models/module.model';

type Verdict = 'true' | 'false';

@Component({
  selector: 'app-screen-truth-check-step-view',
  standalone: true,
  templateUrl: './screen-truth-check-step-view.html',
  styleUrl: './screen-truth-check-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenTruthCheckStepView {
  readonly step = input.required<ScreenTruthCheckStep>();
  readonly continued = output<void>();

  /** Rows the learner has ruled on correctly — these lock and can't be changed. */
  readonly locked = signal<Set<string>>(new Set());
  /** The most recent wrong verdict per row, cleared as soon as it's ruled correctly. */
  readonly misses = signal<Record<string, Verdict>>({});

  readonly total = computed(() => this.step().statements.length);
  readonly lockedCount = computed(() => this.locked().size);
  readonly progressPercent = computed(() =>
    this.total() ? Math.round((this.lockedCount() / this.total()) * 100) : 0,
  );
  readonly allLocked = computed(() => this.lockedCount() === this.total());

  /** SVG stroke-dashoffset for the scan ring (circumference ≈ 339.29 for r = 54). */
  readonly ringOffset = computed(() => 339.29 * (1 - this.lockedCount() / (this.total() || 1)));

  isLocked(id: string): boolean {
    return this.locked().has(id);
  }

  missFor(id: string): Verdict | null {
    return this.misses()[id] ?? null;
  }

  rule(statement: ScreenTruthCheckStatement, verdict: Verdict): void {
    if (this.isLocked(statement.id)) return;

    const correct = (verdict === 'true') === statement.answer;
    if (correct) {
      this.misses.update((m) => {
        const next = { ...m };
        delete next[statement.id];
        return next;
      });
      this.locked.update((set) => new Set(set).add(statement.id));
      return;
    }

    this.misses.update((m) => ({ ...m, [statement.id]: verdict }));
  }

  finish(): void {
    if (this.allLocked()) this.continued.emit();
  }
}
