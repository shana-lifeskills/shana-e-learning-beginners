import { Component, computed, input, output, signal } from '@angular/core';
import { SmartGoalBuilderStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-smart-goal-builder-step-view',
  standalone: true,
  templateUrl: './smart-goal-builder-step-view.html',
  styleUrl: './smart-goal-builder-step-view.scss',
})
export class SmartGoalBuilderStepView {
  readonly step = input.required<SmartGoalBuilderStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly activityOverride = signal<string | null>(null);
  private readonly minutesOverride = signal<number | null>(null);
  private readonly timeOverride = signal<string | null>(null);
  private readonly weeksOverride = signal<number | null>(null);

  readonly selectedActivity = computed(() => this.activityOverride() ?? this.step().options.activities[0] ?? '');
  readonly selectedMinutes = computed(() => this.minutesOverride() ?? this.step().options.minutes[0] ?? 0);
  readonly selectedTime = computed(() => this.timeOverride() ?? this.step().options.times[0] ?? '');
  readonly selectedWeeks = computed(() => this.weeksOverride() ?? this.step().options.weeks[0] ?? 1);

  readonly customActivity = signal('');
  readonly confirmed = signal(false);
  readonly downloading = signal(false);

  readonly activityText = computed(() => this.customActivity().trim() || this.selectedActivity());

  readonly goalSentence = computed(() => {
    const weeks = this.selectedWeeks();
    const weekWord = weeks === 1 ? 'week' : 'weeks';
    return `I will ${this.activityText()} for ${this.selectedMinutes()} minutes ${this.selectedTime()} every day for ${weeks} ${weekWord}.`;
  });

  setActivity(value: string): void {
    this.activityOverride.set(value);
    this.confirmed.set(false);
  }

  setMinutes(value: string): void {
    this.minutesOverride.set(Number(value));
    this.confirmed.set(false);
  }

  setTime(value: string): void {
    this.timeOverride.set(value);
    this.confirmed.set(false);
  }

  setWeeks(value: string): void {
    this.weeksOverride.set(Number(value));
    this.confirmed.set(false);
  }

  updateCustomActivity(value: string): void {
    this.customActivity.set(value);
    this.confirmed.set(false);
  }

  toggleConfirmed(): void {
    this.confirmed.update((c) => !c);
  }

  async downloadGoal(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const svg = buildFieldsCardSvg(this.step().cardTitle, [{ label: this.step().previewLabel, value: this.goalSentence() }]);
      await downloadPngFromSvg(svg, 'my-smart-goal.png');
    } finally {
      this.downloading.set(false);
    }
  }

  next(): void {
    if (!this.confirmed()) return;
    this.submitted.emit({ goal: this.goalSentence() });
  }
}
