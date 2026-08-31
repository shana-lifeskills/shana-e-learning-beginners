import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { StepSequenceQuestion, StepSequenceStep } from '../../core/models/module.model';

/**
 * "Step Sorter" warm-up (Choices Module, Week 4). Three step chips per question
 * start shuffled in a tray; the learner taps them into numbered slots. A wrong
 * order shakes and stays; a correct order locks and advances. Continue is
 * withheld until every question is ordered correctly.
 */
@Component({
  selector: 'app-step-sequence-step-view',
  standalone: true,
  templateUrl: './step-sequence-step-view.html',
  styleUrl: './step-sequence-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepSequenceStepView implements OnInit {
  readonly step = input.required<StepSequenceStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  /** Step indices sitting in each numbered slot, or null. */
  readonly slots = signal<(number | null)[]>([]);
  /** Step indices still waiting in the tray, in shuffled display order. */
  readonly tray = signal<number[]>([]);
  readonly wrong = signal(false);
  readonly solved = signal(false);

  readonly questions = computed(() => this.step().questions);
  readonly current = computed<StepSequenceQuestion | null>(() => this.questions()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.questions().length);
  readonly progress = computed(() => this.questions().map((_, i) => i < this.activeIndex()));
  readonly allFilled = computed(() => this.slots().length > 0 && this.slots().every((s) => s !== null));

  ngOnInit(): void {
    this.loadQuestion();
  }

  private loadQuestion(): void {
    const q = this.questions()[this.activeIndex()];
    if (!q) return;
    const n = q.steps.length;
    // Rotate left by one so the tray never starts in the right order.
    this.tray.set(Array.from({ length: n }, (_, i) => (i + 1) % n));
    this.slots.set(Array.from({ length: n }, () => null));
    this.wrong.set(false);
    this.solved.set(false);
  }

  stepText(index: number): string {
    return this.current()?.steps[index] ?? '';
  }

  placeStep(stepIndex: number): void {
    if (this.solved()) return;
    const slots = [...this.slots()];
    const target = slots.indexOf(null);
    if (target === -1) return;
    slots[target] = stepIndex;
    this.slots.set(slots);
    this.tray.set(this.tray().filter((s) => s !== stepIndex));
    this.wrong.set(false);
  }

  clearSlot(slotIndex: number): void {
    if (this.solved()) return;
    const slots = [...this.slots()];
    const stepIndex = slots[slotIndex];
    if (stepIndex === null) return;
    slots[slotIndex] = null;
    this.slots.set(slots);
    this.tray.set([...this.tray(), stepIndex]);
    this.wrong.set(false);
  }

  check(): void {
    if (!this.allFilled() || this.solved()) return;
    const correct = this.slots().every((s, i) => s === i);
    if (correct) {
      this.solved.set(true);
      setTimeout(() => {
        this.activeIndex.update((i) => i + 1);
        this.loadQuestion();
      }, 1100);
    } else {
      this.wrong.set(true);
      setTimeout(() => this.wrong.set(false), 500);
    }
  }

  finish(): void {
    this.continued.emit();
  }
}
