import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SequenceOrderGameStep, SequenceOrderQuestion } from '../../core/models/module.model';

@Component({
  selector: 'app-sequence-order-game-step-view',
  standalone: true,
  templateUrl: './sequence-order-game-step-view.html',
  styleUrl: './sequence-order-game-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SequenceOrderGameStepView {
  readonly step = input.required<SequenceOrderGameStep>();
  readonly continued = output<void>();

  /** Ids of tasks committed as ordered correctly (after the learner taps "Next"). */
  readonly solved = signal<Set<string>>(new Set());
  /** Panel contents per task id, in panel order (null = empty). */
  readonly slotsByQ = signal<Record<string, (string | null)[]>>({});
  /** True briefly after a wrong ordering — drives the shake, then clears the panels. */
  readonly wrong = signal(false);
  /** True once the active task is ordered correctly — the spark panel shows before advancing. */
  readonly justSolved = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly doneCount = computed(() => this.solvedCount() + (this.justSolved() ? 1 : 0));
  readonly allSolved = computed(() => this.doneCount() === this.total());

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().questions.findIndex((q) => !solved.has(q.id));
    return idx === -1 ? this.total() - 1 : idx;
  });

  readonly activeQuestion = computed<SequenceOrderQuestion>(() => this.step().questions[this.activeIndex()]);

  /** Shuffled step cards for the tray (reversed correct order — stable, never identical for 3+ steps). */
  readonly shuffled = computed<string[]>(() => [...this.activeQuestion().steps].reverse());

  /** Panel contents for the active task. */
  readonly slots = computed<(string | null)[]>(() => {
    const q = this.activeQuestion();
    return this.slotsByQ()[q.id] ?? q.steps.map(() => null);
  });

  /** Tray cards not yet placed in a panel. */
  readonly tray = computed<string[]>(() => {
    const placed = new Set(this.slots().filter((s): s is string => s !== null));
    return this.shuffled().filter((s) => !placed.has(s));
  });

  private setSlots(next: (string | null)[]): void {
    this.slotsByQ.update((map) => ({ ...map, [this.activeQuestion().id]: next }));
  }

  place(card: string): void {
    if (this.wrong() || this.justSolved()) return;
    const next = [...this.slots()];
    const empty = next.indexOf(null);
    if (empty === -1) return;
    next[empty] = card;
    this.setSlots(next);
    if (!next.includes(null)) this.check();
  }

  clearSlot(index: number): void {
    if (this.wrong() || this.justSolved()) return;
    const next = [...this.slots()];
    next[index] = null;
    this.setSlots(next);
  }

  private check(): void {
    const question = this.activeQuestion();
    const correct = question.steps.every((s, i) => this.slots()[i] === s);
    if (correct) {
      this.justSolved.set(true);
      return;
    }
    this.wrong.set(true);
    setTimeout(() => {
      this.setSlots(this.activeQuestion().steps.map(() => null));
      this.wrong.set(false);
    }, 700);
  }

  advance(): void {
    const wasLast = this.allSolved();
    this.solved.update((set) => new Set(set).add(this.activeQuestion().id));
    this.justSolved.set(false);
    if (wasLast) this.continued.emit();
  }
}
