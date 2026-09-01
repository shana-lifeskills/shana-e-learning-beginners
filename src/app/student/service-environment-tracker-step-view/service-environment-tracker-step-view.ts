import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ServiceEnvironmentTrackerStep } from '../../core/models/module.model';

type Place = 'home' | 'school';

interface Act {
  what: string;
  where: Place | null;
  result: string;
}

interface DayEntry {
  acts: Act[];
  done: boolean;
}

function emptyAct(): Act {
  return { what: '', where: null, result: '' };
}

/**
 * "Service Tracker – My Environment" challenge of the week (Service Module,
 * Week 2). A five-day log: each day the learner records at least two acts of
 * service (what / where / result) and locks the day in. A summary panel then
 * shows the total act count and asks for the most helpful action. Complete
 * unlocks once every day is logged and the most-helpful field is filled;
 * entries are then submitted.
 */
@Component({
  selector: 'app-service-environment-tracker-step-view',
  standalone: true,
  templateUrl: './service-environment-tracker-step-view.html',
  styleUrl: './service-environment-tracker-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceEnvironmentTrackerStepView implements OnInit {
  readonly step = input.required<ServiceEnvironmentTrackerStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);
  readonly openDay = signal(0);
  readonly mostHelpful = signal('');

  ngOnInit(): void {
    const min = Math.max(1, this.step().minActsPerDay);
    this.entries.set(
      Array.from({ length: this.step().dayCount }, () => ({
        acts: Array.from({ length: min }, emptyAct),
        done: false,
      })),
    );
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDaysDone = computed(() => this.total() > 0 && this.doneCount() === this.total());
  readonly allDone = computed(() => this.allDaysDone() && this.mostHelpful().trim().length > 0);

  readonly totalActs = computed(() =>
    this.entries()
      .filter((e) => e.done)
      .reduce((sum, e) => sum + e.acts.filter((a) => this.actComplete(a)).length, 0),
  );

  readonly countLine = computed(() =>
    this.step().countTemplate.replace('{n}', String(this.totalActs())),
  );

  private actComplete(a: Act): boolean {
    return a.what.trim().length > 0 && a.where !== null && a.result.trim().length > 0;
  }

  toggleOpen(index: number): void {
    this.openDay.set(this.openDay() === index ? -1 : index);
  }

  setActField(day: number, act: number, key: 'what' | 'result', value: string): void {
    this.entries.update((list) =>
      list.map((e, i) =>
        i === day
          ? { ...e, acts: e.acts.map((a, j) => (j === act ? { ...a, [key]: value } : a)) }
          : e,
      ),
    );
  }

  setActPlace(day: number, act: number, place: Place): void {
    this.entries.update((list) =>
      list.map((e, i) =>
        i === day
          ? { ...e, acts: e.acts.map((a, j) => (j === act ? { ...a, where: place } : a)) }
          : e,
      ),
    );
  }

  addAct(day: number): void {
    this.entries.update((list) =>
      list.map((e, i) => (i === day && !e.done ? { ...e, acts: [...e.acts, emptyAct()] } : e)),
    );
  }

  canSaveDay(index: number): boolean {
    const e = this.entries()[index];
    if (!e || e.done) return false;
    const complete = e.acts.filter((a) => this.actComplete(a)).length;
    return complete >= Math.max(1, this.step().minActsPerDay);
  }

  saveDay(index: number): void {
    if (!this.canSaveDay(index)) return;
    this.entries.update((list) =>
      list.map((e, i) =>
        i === index
          ? { ...e, done: true, acts: e.acts.filter((a) => this.actComplete(a)) }
          : e,
      ),
    );
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    this.openDay.set(nextOpen);
  }

  placeLabel(place: Place | null): string {
    if (place === 'home') return this.step().homeLabel;
    if (place === 'school') return this.step().schoolLabel;
    return '';
  }

  complete(): void {
    if (!this.allDone()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      e.acts.forEach((a, j) => {
        payload[`Day ${i + 1} — Act ${j + 1}`] =
          `${a.what.trim()} (${this.placeLabel(a.where)}) — ${a.result.trim()}`;
      });
    });
    payload['Total acts of service'] = String(this.totalActs());
    payload['My most helpful action'] = this.mostHelpful().trim();
    this.submitted.emit(payload);
  }
}
