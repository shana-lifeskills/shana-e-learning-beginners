import { Component, computed, input, output, signal } from '@angular/core';
import { FeelingsExplorerMoment, FeelingsExplorerOption, FeelingsExplorerStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

type Phase = 'idle' | 'playing' | 'complete';

@Component({
  selector: 'app-feelings-explorer-step-view',
  standalone: true,
  templateUrl: './feelings-explorer-step-view.html',
  styleUrl: './feelings-explorer-step-view.scss',
})
export class FeelingsExplorerStepView {
  readonly step = input.required<FeelingsExplorerStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('idle');
  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);
  readonly showShareHint = signal(false);

  readonly total = computed(() => this.step().moments.length);
  readonly currentMoment = computed<FeelingsExplorerMoment | null>(
    () => this.step().moments[this.activeIndex()] ?? null,
  );
  readonly doneCount = computed(() => (this.phase() === 'complete' ? this.total() : this.activeIndex()));
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  momentNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  private acceptableIds(moment: FeelingsExplorerMoment): string[] {
    return moment.acceptableOptionIds?.length ? moment.acceptableOptionIds : [moment.correctOptionId];
  }

  stepDotState(index: number): 'done' | 'active' | 'todo' {
    if (this.phase() === 'complete' || index < this.activeIndex()) return 'done';
    if (index === this.activeIndex() && this.phase() === 'playing') return 'active';
    return 'todo';
  }

  optionState(option: FeelingsExplorerOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  start(): void {
    this.phase.set('playing');
  }

  selectOption(option: FeelingsExplorerOption): void {
    if (this.locked()) return;
    const moment = this.currentMoment();
    if (!moment) return;

    const correct = this.acceptableIds(moment).includes(option.id);
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(correct);
  }

  tryAgain(): void {
    this.selectedOptionId.set(null);
    this.feedback.set(null);
    this.locked.set(false);
  }

  nextMoment(): void {
    if (this.feedback() !== 'correct') return;
    this.selectedOptionId.set(null);
    this.feedback.set(null);
    this.locked.set(false);

    if (this.activeIndex() + 1 >= this.total()) {
      this.phase.set('complete');
    } else {
      this.activeIndex.update((i) => i + 1);
    }
  }

  exploreAgain(): void {
    this.activeIndex.set(0);
    this.selectedOptionId.set(null);
    this.feedback.set(null);
    this.locked.set(false);
    this.showShareHint.set(false);
    this.phase.set('playing');
  }

  toggleShareHint(): void {
    this.showShareHint.update((v) => !v);
  }

  finish(): void {
    this.continued.emit();
  }
}
