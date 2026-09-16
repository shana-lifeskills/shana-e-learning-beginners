import { Component, computed, input, output, signal } from '@angular/core';
import { ChoicesBoardStep } from '../../core/models/module.model';

@Component({
  selector: 'app-choices-board-step-view',
  standalone: true,
  templateUrl: './choices-board-step-view.html',
  styleUrl: './choices-board-step-view.scss',
})
export class ChoicesBoardStepView {
  readonly step = input.required<ChoicesBoardStep>();
  readonly continued = output<void>();

  readonly sIndex = signal(0);
  /** Choice indices the student has tapped in the current scenario (so their feedback shows). */
  readonly revealed = signal<number[]>([]);
  readonly finished = signal(false);

  readonly currentScenario = computed(() => this.step().scenarios[this.sIndex()] ?? null);
  readonly isLastScenario = computed(() => this.sIndex() === this.step().scenarios.length - 1);
  readonly correctReached = computed(() => {
    const scenario = this.currentScenario();
    if (!scenario) return false;
    return this.revealed().some((i) => scenario.choices[i]?.correct);
  });

  isRevealed(index: number): boolean {
    return this.revealed().includes(index);
  }

  pick(index: number): void {
    if (this.isRevealed(index)) return;
    this.revealed.update((r) => [...r, index]);
  }

  next(): void {
    if (!this.correctReached()) return;
    if (this.isLastScenario()) {
      this.finished.set(true);
      return;
    }
    this.sIndex.update((i) => i + 1);
    this.revealed.set([]);
  }

  finish(): void {
    this.continued.emit();
  }
}
