import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DiscussionSequenceStep } from '../../core/models/module.model';

/** Deterministic shuffle so the tray order is stable across re-renders. */
function shuffle(steps: string[]): string[] {
  const out = [...steps];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.join('|') === steps.join('|') ? out.reverse() : out;
}

@Component({
  selector: 'app-discussion-sequence-step-view',
  standalone: true,
  templateUrl: './discussion-sequence-step-view.html',
  styleUrl: './discussion-sequence-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionSequenceStepView {
  readonly step = input.required<DiscussionSequenceStep>();
  readonly continued = output<void>();

  /** Steps placed on the numbered slots, slot 1 first; null = empty. */
  readonly placed = signal<(string | null)[]>([]);
  /** True while a wrong order shakes before it clears. */
  readonly wrong = signal(false);
  /** True once the order is correct. */
  readonly solved = signal(false);

  readonly slots = computed<(string | null)[]>(() => {
    const n = this.step().steps.length;
    const p = this.placed();
    return p.length === n ? p : new Array(n).fill(null);
  });

  readonly tray = computed<string[]>(() => {
    const used = new Set(this.slots().filter((s): s is string => s !== null));
    return shuffle(this.step().steps).filter((s) => !used.has(s));
  });

  place(stepText: string): void {
    if (this.solved() || this.wrong()) return;
    const next = [...this.slots()];
    const firstEmpty = next.indexOf(null);
    if (firstEmpty === -1) return;
    next[firstEmpty] = stepText;
    this.placed.set(next);
    if (!next.includes(null)) this.check(next);
  }

  remove(idx: number): void {
    if (this.solved() || this.wrong()) return;
    const next = [...this.slots()];
    next[idx] = null;
    this.placed.set(next);
  }

  private check(filled: (string | null)[]): void {
    const correct = this.step().steps;
    if (filled.every((s, i) => s === correct[i])) {
      this.solved.set(true);
      return;
    }
    this.wrong.set(true);
    setTimeout(() => {
      this.placed.set(new Array(correct.length).fill(null));
      this.wrong.set(false);
    }, 700);
  }

  finish(): void {
    if (this.solved()) this.continued.emit();
  }
}
