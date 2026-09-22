import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { NeedsFirstBudgetChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  need: string;
  want: string;
  coversFirst: 'need' | 'want' | null;
  open: boolean;
  done: boolean;
}

/**
 * "Needs First Budget Game" challenge of the week (Budgeting Module, Week 2).
 * A five-day accordion — each day the learner writes one Need, one Want, and
 * decides which their budget should cover first. Complete unlocks only once
 * every day is logged; the log is then submitted.
 */
@Component({
  selector: 'app-needs-first-budget-challenge-step-view',
  standalone: true,
  templateUrl: './needs-first-budget-challenge-step-view.html',
  styleUrl: './needs-first-budget-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedsFirstBudgetChallengeStepView implements OnInit {
  readonly step = input.required<NeedsFirstBudgetChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);

  ngOnInit(): void {
    this.entries.set(
      Array.from({ length: this.step().dayCount }, (_, i) => ({
        need: '',
        want: '',
        coversFirst: null,
        open: i === 0,
        done: false,
      })),
    );
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDaysLogged = computed(() => this.total() > 0 && this.doneCount() === this.total());

  canLogDay(index: number): boolean {
    const e = this.entries()[index];
    return !!e && !e.done && e.need.trim().length > 0 && e.want.trim().length > 0 && e.coversFirst !== null;
  }

  toggleOpen(index: number): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, open: !e.open } : e)));
  }

  setField(index: number, key: 'need' | 'want', value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  setCoversFirst(index: number, value: 'need' | 'want'): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, coversFirst: value } : e)));
  }

  logDay(index: number): void {
    if (!this.canLogDay(index)) return;
    this.entries.update((list) =>
      list.map((e, i) => (i === index ? { ...e, done: true, open: false } : e)),
    );
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    if (nextOpen !== -1) {
      this.entries.update((list) => list.map((e, i) => (i === nextOpen ? { ...e, open: true } : e)));
    }
  }

  complete(): void {
    if (!this.allDaysLogged()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      payload[`Day ${i + 1} — Need`] = e.need.trim();
      payload[`Day ${i + 1} — Want`] = e.want.trim();
      payload[`Day ${i + 1} — Budget covers`] = e.coversFirst === 'need' ? 'Need' : 'Want';
    });
    this.submitted.emit(payload);
  }
}
