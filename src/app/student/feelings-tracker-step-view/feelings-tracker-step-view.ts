import { Component, computed, input, output, signal } from '@angular/core';
import { FeelingsTrackerStep } from '../../core/models/module.model';

interface DayEntry {
  feeling: string;
  why: string;
  say: string;
}

const EMPTY: DayEntry = { feeling: '', why: '', say: '' };

@Component({
  selector: 'app-feelings-tracker-step-view',
  standalone: true,
  templateUrl: './feelings-tracker-step-view.html',
  styleUrl: './feelings-tracker-step-view.scss',
})
export class FeelingsTrackerStepView {
  readonly step = input.required<FeelingsTrackerStep>();
  readonly continued = output<void>();

  readonly entries = signal<Record<number, DayEntry>>({});

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));

  readonly filledCount = computed(
    () => this.days().filter((d) => this.isDayFilled(d)).length,
  );
  readonly allFilled = computed(() => this.filledCount() === this.step().dayCount);

  entryFor(day: number): DayEntry {
    return this.entries()[day] ?? EMPTY;
  }

  isDayFilled(day: number): boolean {
    const e = this.entryFor(day);
    return e.feeling.trim().length > 0 && e.why.trim().length > 0 && e.say.trim().length > 0;
  }

  update(day: number, field: keyof DayEntry, value: string): void {
    this.entries.update((all) => ({
      ...all,
      [day]: { ...(all[day] ?? EMPTY), [field]: value },
    }));
  }

  finish(): void {
    if (!this.allFilled()) return;
    this.continued.emit();
  }
}
