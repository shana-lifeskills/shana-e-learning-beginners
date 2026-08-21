import { Component, computed, input, output, signal } from '@angular/core';
import { ChallengeTrackerStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-tracker-step-view',
  standalone: true,
  templateUrl: './challenge-tracker-step-view.html',
  styleUrl: './challenge-tracker-step-view.scss',
})
export class ChallengeTrackerStepView {
  readonly step = input.required<ChallengeTrackerStep>();
  readonly continued = output<void>();

  /** day label -> ticked, so re-opening the step keeps whatever was already checked off. */
  readonly checkedDays = signal<Set<string>>(new Set());

  readonly completedCount = computed(() => this.checkedDays().size);
  readonly totalDays = computed(() => this.step().days.length);
  readonly progressPercent = computed(() => Math.round((this.completedCount() / this.totalDays()) * 100));
  readonly allDaysChecked = computed(() => this.completedCount() === this.totalDays());

  isChecked(day: string): boolean {
    return this.checkedDays().has(day);
  }

  toggleDay(day: string): void {
    this.checkedDays.update((days) => {
      const next = new Set(days);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  }
}
