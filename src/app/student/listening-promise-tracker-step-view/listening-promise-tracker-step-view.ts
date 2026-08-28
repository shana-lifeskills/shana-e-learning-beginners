import { Component, computed, input, output, signal } from '@angular/core';
import { ListeningPromiseCriterion, ListeningPromiseOption, ListeningPromiseQuestion, ListeningPromiseTrackerStep } from '../../core/models/module.model';

interface DayAnswers {
  who: string | null;
  topic: string | null;
  keptPromise: string | null;
  wentWell: string | null;
  difficult: string | null;
  emojiReflection: string | null;
}

const EMPTY_DAY: DayAnswers = {
  who: null,
  topic: null,
  keptPromise: null,
  wentWell: null,
  difficult: null,
  emojiReflection: null,
};

@Component({
  selector: 'app-listening-promise-tracker-step-view',
  standalone: true,
  templateUrl: './listening-promise-tracker-step-view.html',
  styleUrl: './listening-promise-tracker-step-view.scss',
})
export class ListeningPromiseTrackerStepView {
  readonly step = input.required<ListeningPromiseTrackerStep>();
  readonly continued = output<void>();

  readonly phase = signal<'form' | 'done'>('form');

  readonly selectedHabitId = signal<string | null>(null);
  readonly promiseText = signal('');

  private readonly activeDayIdOverride = signal<string | null>(null);
  readonly dailyAnswers = signal<Record<string, DayAnswers>>({});

  readonly midWeekAnswers = signal<Record<string, string>>({});
  readonly endWeekAnswers = signal<Record<string, string>>({});
  readonly checkedCriteria = signal<Set<string>>(new Set());

  readonly activeDayId = computed(() => this.activeDayIdOverride() ?? this.step().days[0]?.id ?? '');

  readonly currentDayAnswers = computed<DayAnswers>(() => this.dailyAnswers()[this.activeDayId()] ?? EMPTY_DAY);

  readonly habitProgress = computed(() => (this.selectedHabitId() ? 1 : 0));

  readonly dailyLogProgress = computed(() => {
    const answers = this.dailyAnswers();
    return this.step().days.filter((day) => {
      const a = answers[day.id];
      return !!a && !!a.who && !!a.topic && !!a.keptPromise && !!a.wentWell && !!a.difficult;
    }).length;
  });

  readonly midWeekProgress = computed(() => {
    const answers = this.midWeekAnswers();
    return this.step().midWeekQuestions.filter((q) => !!answers[q.id]).length;
  });

  readonly endWeekProgress = computed(() => {
    const answers = this.endWeekAnswers();
    return this.step().endWeekQuestions.filter((q) => !!answers[q.id]).length;
  });

  readonly successProgress = computed(() => this.checkedCriteria().size);

  readonly allCriteriaChecked = computed(() => this.checkedCriteria().size === this.step().successCriteria.length);

  selectDay(dayId: string): void {
    this.activeDayIdOverride.set(dayId);
  }

  selectHabit(option: ListeningPromiseOption): void {
    this.selectedHabitId.set(option.id);
  }

  setPromiseText(value: string): void {
    this.promiseText.set(value);
  }

  selectDailyAnswer(field: keyof DayAnswers, option: ListeningPromiseOption): void {
    const dayId = this.activeDayId();
    this.dailyAnswers.update((all) => ({
      ...all,
      [dayId]: { ...(all[dayId] ?? EMPTY_DAY), [field]: option.id },
    }));
  }

  dailyOptionState(field: keyof DayAnswers, option: ListeningPromiseOption): boolean {
    return this.currentDayAnswers()[field] === option.id;
  }

  selectMidWeek(question: ListeningPromiseQuestion, option: ListeningPromiseOption): void {
    this.midWeekAnswers.update((all) => ({ ...all, [question.id]: option.id }));
  }

  selectEndWeek(question: ListeningPromiseQuestion, option: ListeningPromiseOption): void {
    this.endWeekAnswers.update((all) => ({ ...all, [question.id]: option.id }));
  }

  toggleCriterion(criterion: ListeningPromiseCriterion): void {
    this.checkedCriteria.update((set) => {
      const next = new Set(set);
      if (next.has(criterion.id)) next.delete(criterion.id);
      else next.add(criterion.id);
      return next;
    });
  }

  complete(): void {
    if (!this.allCriteriaChecked()) return;
    this.phase.set('done');
  }

  restart(): void {
    this.continued.emit();
  }
}
