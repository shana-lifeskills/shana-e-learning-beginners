import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { PauseBeforePostingStep } from '../../core/models/module.model';

interface DayEntry {
  checks: boolean[];
  decision: string;
  done: boolean;
}

@Component({
  selector: 'app-pause-before-posting-step-view',
  standalone: true,
  templateUrl: './pause-before-posting-step-view.html',
  styleUrl: './pause-before-posting-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseBeforePostingStepView implements OnInit {
  readonly step = input.required<PauseBeforePostingStep>();
  readonly submitted = output<Record<string, string>>();

  readonly days = signal<DayEntry[]>([]);
  readonly openDay = signal(0);
  readonly pledged = signal(false);

  ngOnInit(): void {
    const s = this.step();
    this.days.set(
      Array.from({ length: s.dayCount }, () => ({
        checks: s.checkItems.map(() => false),
        decision: '',
        done: false,
      })),
    );
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.days().filter((d) => d.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDone = computed(() => this.total() > 0 && this.doneCount() === this.total());

  /** red = nothing done, amber = both checks ticked, green = logged. */
  lightState(index: number): 'red' | 'amber' | 'green' {
    const day = this.days()[index];
    if (!day) return 'red';
    if (day.done) return 'green';
    if (day.checks.every((c) => c)) return 'amber';
    return 'red';
  }

  canLogDay(index: number): boolean {
    const day = this.days()[index];
    if (!day || day.done) return false;
    return day.checks.every((c) => c) && day.decision.trim().length > 0;
  }

  selectDay(index: number): void {
    this.openDay.set(index);
  }

  toggleCheck(dayIndex: number, checkIndex: number): void {
    if (this.days()[dayIndex]?.done) return;
    this.days.update((list) =>
      list.map((d, i) =>
        i === dayIndex ? { ...d, checks: d.checks.map((c, ci) => (ci === checkIndex ? !c : c)) } : d,
      ),
    );
  }

  setDecision(dayIndex: number, value: string): void {
    this.days.update((list) => list.map((d, i) => (i === dayIndex ? { ...d, decision: value } : d)));
  }

  logDay(dayIndex: number): void {
    if (!this.canLogDay(dayIndex)) return;
    this.days.update((list) => list.map((d, i) => (i === dayIndex ? { ...d, done: true } : d)));
    const next = this.days().findIndex((d) => !d.done);
    if (next !== -1) this.openDay.set(next);
  }

  togglePledge(): void {
    this.pledged.update((p) => !p);
  }

  complete(): void {
    if (!this.allDone() || !this.pledged()) return;
    const payload: Record<string, string> = {};
    this.days().forEach((d, i) => {
      payload[`Day ${i + 1} — good decision`] = d.decision.trim();
    });
    payload['My confidence link'] = this.step().confidenceStatement;
    this.submitted.emit(payload);
  }
}
