import { Component, computed, input, output, signal } from '@angular/core';
import { GoalChallengeTrackerStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-goal-challenge-tracker-step-view',
  standalone: true,
  templateUrl: './goal-challenge-tracker-step-view.html',
  styleUrl: './goal-challenge-tracker-step-view.scss',
})
export class GoalChallengeTrackerStepView {
  readonly step = input.required<GoalChallengeTrackerStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly goalOverride = signal<string | null>(null);
  readonly goalText = computed(() => this.goalOverride() ?? this.step().defaultGoal);

  readonly started = signal(false);
  readonly completedDays = signal<Set<number>>(new Set());
  readonly downloading = signal(false);

  readonly totalDays = computed(() => this.step().dayLabels.length);
  readonly completedCount = computed(() => this.completedDays().size);
  readonly allComplete = computed(() => this.totalDays() > 0 && this.completedCount() === this.totalDays());
  readonly progressPercent = computed(() => (this.totalDays() === 0 ? 0 : Math.round((this.completedCount() / this.totalDays()) * 100)));

  readonly currentQuote = computed(() => {
    const quotes = this.step().quotesByDaysComplete;
    const index = Math.min(this.completedCount(), quotes.length - 1);
    return quotes[index] ?? null;
  });

  updateGoal(value: string): void {
    this.goalOverride.set(value);
  }

  startChallenge(): void {
    if (!this.goalText().trim()) return;
    this.started.set(true);
  }

  isDayDone(day: number): boolean {
    return this.completedDays().has(day);
  }

  toggleDay(day: number): void {
    this.completedDays.update((days) => {
      const next = new Set(days);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  }

  async downloadGoal(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const svg = buildFieldsCardSvg(this.step().cardTitle, [
        { label: this.step().goalLabel, value: this.goalText() },
        { label: this.step().progressLabel, value: `${this.completedCount()}/${this.totalDays()} days` },
      ]);
      await downloadPngFromSvg(svg, 'my-3-day-goal-challenge.png');
    } finally {
      this.downloading.set(false);
    }
  }

  next(): void {
    if (!this.allComplete()) return;
    this.submitted.emit({ goal: this.goalText(), daysCompleted: String(this.completedCount()) });
  }
}
