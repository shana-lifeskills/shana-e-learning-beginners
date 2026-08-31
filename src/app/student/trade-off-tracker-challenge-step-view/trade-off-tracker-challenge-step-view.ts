import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { TradeOffTrackerChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  spotted: boolean;
  choose: string;
  give: string;
  done: boolean;
}

/**
 * "My Trade-Off Tracker" challenge of the week (Choices Module, Week 1). A
 * five-day journal accordion: each day the learner confirms they spotted a
 * choice, writes what they chose and what they gave up, and locks the day in.
 * Complete unlocks only once every day is logged; entries are then submitted.
 */
@Component({
  selector: 'app-trade-off-tracker-challenge-step-view',
  standalone: true,
  templateUrl: './trade-off-tracker-challenge-step-view.html',
  styleUrl: './trade-off-tracker-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOffTrackerChallengeStepView implements OnInit {
  readonly step = input.required<TradeOffTrackerChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);
  readonly openDay = signal(0);

  ngOnInit(): void {
    this.entries.set(
      Array.from({ length: this.step().dayCount }, () => ({
        spotted: false,
        choose: '',
        give: '',
        done: false,
      })),
    );
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDone = computed(() => this.total() > 0 && this.doneCount() === this.total());

  toggleOpen(index: number): void {
    this.openDay.set(this.openDay() === index ? -1 : index);
  }

  toggleSpotted(index: number): void {
    this.entries.update((list) =>
      list.map((e, i) => (i === index ? { ...e, spotted: !e.spotted } : e)),
    );
  }

  setField(index: number, key: 'choose' | 'give', value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  canSaveDay(index: number): boolean {
    const e = this.entries()[index];
    return !!e && !e.done && e.spotted && e.choose.trim().length > 0 && e.give.trim().length > 0;
  }

  saveDay(index: number): void {
    if (!this.canSaveDay(index)) return;
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, done: true } : e)));
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    this.openDay.set(nextOpen);
  }

  complete(): void {
    if (!this.allDone()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      payload[`Day ${i + 1} — I chose`] = e.choose.trim();
      payload[`Day ${i + 1} — I gave up`] = e.give.trim();
    });
    this.submitted.emit(payload);
  }
}
