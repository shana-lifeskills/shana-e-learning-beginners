import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { StepOrderTask, StepOrderWarmupStep } from '../../core/models/module.model';

/** Deterministic shuffle so a task's tray order is stable across re-renders. */
function shuffle(steps: string[]): string[] {
  const out = [...steps];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.join('|') === steps.join('|') ? out.reverse() : out;
}

@Component({
  selector: 'app-step-order-warmup-step-view',
  standalone: true,
  templateUrl: './step-order-warmup-step-view.html',
  styleUrl: './step-order-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOrderWarmupStepView {
  readonly step = input.required<StepOrderWarmupStep>();
  readonly continued = output<void>();

  /** Ids of tasks ordered correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** Steps placed on the rungs for the ACTIVE task, bottom rung first; null = empty. */
  readonly placedRaw = signal<(string | null)[] | null>(null);
  /** True while a wrong order shakes before it clears. */
  readonly wrong = signal(false);
  /** True once the active task is solved — brief "correct" state before advancing. */
  readonly justSolved = signal(false);

  readonly total = computed(() => this.step().tasks.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().tasks.findIndex((t) => !solved.has(t.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeTask = computed<StepOrderTask>(() => this.step().tasks[this.activeIndex()]);

  /** The rung slots for the active task, always the right length. */
  readonly slots = computed<(string | null)[]>(() => {
    const n = this.activeTask().steps.length;
    const raw = this.placedRaw();
    return raw && raw.length === n ? raw : new Array(n).fill(null);
  });

  /** Tray = shuffled steps not yet placed. */
  readonly tray = computed<string[]>(() => {
    const shuffled = shuffle(this.activeTask().steps);
    const used = new Set(this.slots().filter((s): s is string => s !== null));
    return shuffled.filter((s) => !used.has(s));
  });

  /** Rungs rendered top (goal end) to bottom (start end); slots are stored bottom-first. */
  readonly rungs = computed(() => {
    const s = this.slots();
    return s
      .map((value, idx) => ({ value, idx, n: idx + 1 }))
      .slice()
      .reverse();
  });

  placeStep(stepText: string): void {
    if (this.justSolved() || this.wrong()) return;
    const next = [...this.slots()];
    const firstEmpty = next.indexOf(null);
    if (firstEmpty === -1) return;
    next[firstEmpty] = stepText;
    this.placedRaw.set(next);
    if (!next.includes(null)) this.check(next);
  }

  removeStep(idx: number): void {
    if (this.justSolved() || this.wrong()) return;
    const next = [...this.slots()];
    next[idx] = null;
    this.placedRaw.set(next);
  }

  private check(filled: (string | null)[]): void {
    const correct = this.activeTask().steps;
    if (filled.every((s, i) => s === correct[i])) {
      this.justSolved.set(true);
      return;
    }
    this.wrong.set(true);
    setTimeout(() => {
      this.placedRaw.set(new Array(correct.length).fill(null));
      this.wrong.set(false);
    }, 700);
  }

  advance(): void {
    this.solved.update((set) => new Set(set).add(this.activeTask().id));
    this.justSolved.set(false);
    this.placedRaw.set(null);
    if (this.allSolved()) this.continued.emit();
  }
}
