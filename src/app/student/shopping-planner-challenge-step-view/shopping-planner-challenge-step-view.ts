import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ShoppingPlannerChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  asked: boolean[];
  choice: string;
  open: boolean;
  done: boolean;
}

/**
 * "Shopping Planner" challenge of the week (Budgeting Module, Week 3). A
 * multi-day accordion — each day the learner confirms they asked themselves
 * the checkpoint questions before buying, then writes one smart choice they
 * made. Complete unlocks only once every day is logged; the log is then
 * submitted.
 */
@Component({
  selector: 'app-shopping-planner-challenge-step-view',
  standalone: true,
  templateUrl: './shopping-planner-challenge-step-view.html',
  styleUrl: './shopping-planner-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingPlannerChallengeStepView implements OnInit {
  readonly step = input.required<ShoppingPlannerChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);

  ngOnInit(): void {
    const s = this.step();
    this.entries.set(
      Array.from({ length: s.dayCount }, (_, i) => ({
        asked: s.askQuestions.map(() => false),
        choice: '',
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
    return !!e && !e.done && e.asked.every((a) => a) && e.choice.trim().length > 0;
  }

  toggleOpen(index: number): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, open: !e.open } : e)));
  }

  toggleAsked(dayIndex: number, questionIndex: number): void {
    this.entries.update((list) =>
      list.map((e, i) =>
        i === dayIndex ? { ...e, asked: e.asked.map((a, ai) => (ai === questionIndex ? !a : a)) } : e,
      ),
    );
  }

  setChoice(index: number, value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, choice: value } : e)));
  }

  logDay(index: number): void {
    if (!this.canLogDay(index)) return;
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, done: true, open: false } : e)));
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    if (nextOpen !== -1) {
      this.entries.update((list) => list.map((e, i) => (i === nextOpen ? { ...e, open: true } : e)));
    }
  }

  complete(): void {
    if (!this.allDaysLogged()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      payload[`Day ${i + 1} — Smart choice`] = e.choice.trim();
    });
    this.submitted.emit(payload);
  }
}
