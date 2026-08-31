import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ThinkAheadChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  asked: boolean;
  decision: string;
  result: string;
  done: boolean;
}

/**
 * "Think Ahead Challenge" challenge of the week (Choices Module, Week 3). A
 * five-day path: each day the learner confirms they asked the think-ahead
 * question before spending, then records a decision and its result. Complete
 * unlocks once every day is recorded; entries are then submitted.
 */
@Component({
  selector: 'app-think-ahead-challenge-step-view',
  standalone: true,
  templateUrl: './think-ahead-challenge-step-view.html',
  styleUrl: './think-ahead-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinkAheadChallengeStepView implements OnInit {
  readonly step = input.required<ThinkAheadChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);
  readonly openDay = signal(0);

  ngOnInit(): void {
    this.entries.set(
      Array.from({ length: this.step().dayCount }, () => ({
        asked: false,
        decision: '',
        result: '',
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

  toggleAsked(index: number): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, asked: !e.asked } : e)));
  }

  setField(index: number, key: 'decision' | 'result', value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  canSaveDay(index: number): boolean {
    const e = this.entries()[index];
    return !!e && !e.done && e.asked && e.decision.trim().length > 0 && e.result.trim().length > 0;
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
      payload[`Day ${i + 1} — Decision`] = e.decision.trim();
      payload[`Day ${i + 1} — Result`] = e.result.trim();
    });
    this.submitted.emit(payload);
  }
}
