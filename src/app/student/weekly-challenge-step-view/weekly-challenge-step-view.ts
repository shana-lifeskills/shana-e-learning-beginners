import { Component, computed, input, output, signal } from '@angular/core';
import { WeeklyChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-weekly-challenge-step-view',
  standalone: true,
  templateUrl: './weekly-challenge-step-view.html',
  styleUrl: './weekly-challenge-step-view.scss',
})
export class WeeklyChallengeStepView {
  readonly step = input.required<WeeklyChallengeStep>();
  readonly continued = output<void>();

  readonly checkedDays = signal<Set<number>>(new Set());

  readonly allDaysChecked = computed(() => this.checkedDays().size >= this.step().days.length);

  isChecked(index: number): boolean {
    return this.checkedDays().has(index);
  }

  toggleDay(index: number): void {
    const next = new Set(this.checkedDays());
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this.checkedDays.set(next);
  }
}
