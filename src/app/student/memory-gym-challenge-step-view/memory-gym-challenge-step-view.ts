import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MemoryGymChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  items: string;
  strategies: Set<string>;
  how: string;
}

/**
 * "Challenge of the Week" closing step — Thinking module, Week 3. A three-day
 * memory-gym log: each day the learner lists five items, tags the strategies
 * they used and writes how the recall went. Submitting with all three days
 * logged prints a training summary; Finish then emits the log so the week can
 * close and award a star.
 */
@Component({
  selector: 'app-memory-gym-challenge-step-view',
  standalone: true,
  templateUrl: './memory-gym-challenge-step-view.html',
  styleUrl: './memory-gym-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryGymChallengeStepView {
  readonly step = input.required<MemoryGymChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** One entry per day, created lazily as the learner types. */
  readonly entries = signal<Record<number, DayEntry>>({});
  readonly sampleShown = signal(false);
  /** 'log' while filling in, 'done' once the summary is shown. */
  readonly phase = signal<'log' | 'done'>('log');

  entry(day: number): DayEntry {
    return this.entries()[day] ?? { items: '', strategies: new Set<string>(), how: '' };
  }

  dayComplete(day: number): boolean {
    const e = this.entry(day);
    return e.items.trim().length > 0 && e.strategies.size > 0 && e.how.trim().length > 0;
  }

  readonly completedCount = computed(() => {
    // referenced so the signal is tracked
    this.entries();
    return this.step().dayLabels.reduce((n, _, i) => n + (this.dayComplete(i) ? 1 : 0), 0);
  });
  readonly allComplete = computed(() => this.completedCount() === this.step().dayLabels.length);

  private patch(day: number, change: Partial<DayEntry>): void {
    this.entries.update((map) => {
      const current = map[day] ?? { items: '', strategies: new Set<string>(), how: '' };
      return { ...map, [day]: { ...current, ...change } };
    });
  }

  setItems(day: number, value: string): void {
    this.patch(day, { items: value });
  }

  setHow(day: number, value: string): void {
    this.patch(day, { how: value });
  }

  hasStrategy(day: number, id: string): boolean {
    return this.entry(day).strategies.has(id);
  }

  toggleStrategy(day: number, id: string): void {
    if (this.phase() === 'done') return;
    const next = new Set(this.entry(day).strategies);
    next.has(id) ? next.delete(id) : next.add(id);
    this.patch(day, { strategies: next });
  }

  toggleSample(): void {
    this.sampleShown.update((v) => !v);
  }

  submit(): void {
    if (!this.allComplete() || this.phase() === 'done') return;
    this.phase.set('done');
  }

  strategyLabels(day: number): string {
    const chosen = this.entry(day).strategies;
    return this.step().strategies
      .filter((s) => chosen.has(s.id))
      .map((s) => s.label)
      .join(', ');
  }

  finish(): void {
    const payload: Record<string, string> = {};
    this.step().dayLabels.forEach((label, i) => {
      const e = this.entry(i);
      payload[`${label} — items`] = e.items.trim();
      payload[`${label} — strategies`] = this.strategyLabels(i);
      payload[`${label} — how it went`] = e.how.trim();
    });
    this.submitted.emit(payload);
  }
}
