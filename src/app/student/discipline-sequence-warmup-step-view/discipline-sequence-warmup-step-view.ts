import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DisciplineSequenceQuestion, DisciplineSequenceWarmupStep } from '../../core/models/module.model';

/**
 * "Discipline Warm-Up" sequencing game (Discipline Module, Week 4). One
 * question at a time: numbered slots and a shuffled tray of steps. Tapping a
 * step fills the next slot; tapping a filled slot sends it back. When every
 * slot is filled the order is checked — correct locks green and advances, wrong
 * shakes and clears. The Continue button is withheld until every question is
 * ordered correctly.
 */
@Component({
  selector: 'app-discipline-sequence-warmup-step-view',
  standalone: true,
  templateUrl: './discipline-sequence-warmup-step-view.html',
  styleUrl: './discipline-sequence-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisciplineSequenceWarmupStepView {
  readonly step = input.required<DisciplineSequenceWarmupStep>();
  readonly continued = output<void>();

  readonly solved = signal<Set<string>>(new Set());
  readonly slotsByQ = signal<Record<string, (string | null)[]>>({});
  readonly wrong = signal(false);
  readonly justSolved = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly doneCount = computed(() => this.solved().size + (this.justSolved() ? 1 : 0));
  readonly allSolved = computed(() => this.doneCount() === this.total());
  readonly progress = computed(() => this.step().questions.map((q, i) => i < this.doneCount()));

  readonly activeIndex = computed(() => {
    const solved = this.solved();
    const idx = this.step().questions.findIndex((q) => !solved.has(q.id));
    return idx === -1 ? this.total() - 1 : idx;
  });
  readonly activeQuestion = computed<DisciplineSequenceQuestion>(() => this.step().questions[this.activeIndex()]);

  /** Shuffled tray — reversed correct order, stable and never identical for 3+ steps. */
  readonly shuffled = computed<string[]>(() => [...this.activeQuestion().steps].reverse());

  readonly slots = computed<(string | null)[]>(() => {
    const q = this.activeQuestion();
    return this.slotsByQ()[q.id] ?? q.steps.map(() => null);
  });

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
    this.solved.update((set) => new Set(set).add(this.activeQuestion().id));
    this.justSolved.set(false);
  }

  finish(): void {
    this.continued.emit();
  }
}
