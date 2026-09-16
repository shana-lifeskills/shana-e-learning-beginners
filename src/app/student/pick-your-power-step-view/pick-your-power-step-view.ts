import { Component, computed, input, output, signal } from '@angular/core';
import { PickYourPowerStep } from '../../core/models/module.model';

/** Cycles through 5 pastel card colors, in the order the grid lists options. */
const VARIANTS = ['gold', 'teal', 'pink', 'green', 'peach'] as const;

@Component({
  selector: 'app-pick-your-power-step-view',
  standalone: true,
  templateUrl: './pick-your-power-step-view.html',
  styleUrl: './pick-your-power-step-view.scss',
})
export class PickYourPowerStepView {
  readonly step = input.required<PickYourPowerStep>();
  readonly continued = output<void>();

  readonly selectedIndex = signal<number | null>(null);
  readonly canContinue = computed(() => this.selectedIndex() !== null);

  variantFor(index: number): string {
    return VARIANTS[index % VARIANTS.length];
  }

  choose(index: number): void {
    this.selectedIndex.set(index);
  }

  chooseAgain(): void {
    this.selectedIndex.set(null);
  }

  finish(): void {
    if (!this.canContinue()) return;
    this.continued.emit();
  }
}
