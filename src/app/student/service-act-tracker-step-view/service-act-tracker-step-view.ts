import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ServiceActTrackerStep } from '../../core/models/module.model';

interface DayEntry {
  did: string;
  who: string;
  reaction: string;
  done: boolean;
}

/**
 * "One Act of Service" challenge of the week (Service Module, Week 1). A
 * five-day kindness log accordion: each day the learner writes what helpful
 * thing they did, who they helped, and how the person reacted, then locks the
 * day in. Complete unlocks only once every day is logged; entries are then
 * submitted.
 */
@Component({
  selector: 'app-service-act-tracker-step-view',
  standalone: true,
  templateUrl: './service-act-tracker-step-view.html',
  styleUrl: './service-act-tracker-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceActTrackerStepView implements OnInit {
  readonly step = input.required<ServiceActTrackerStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);
  readonly openDay = signal(0);

  ngOnInit(): void {
    this.entries.set(
      Array.from({ length: this.step().dayCount }, () => ({
        did: '',
        who: '',
        reaction: '',
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

  setField(index: number, key: 'did' | 'who' | 'reaction', value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  canSaveDay(index: number): boolean {
    const e = this.entries()[index];
    return (
      !!e &&
      !e.done &&
      e.did.trim().length > 0 &&
      e.who.trim().length > 0 &&
      e.reaction.trim().length > 0
    );
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
      payload[`Day ${i + 1} — What I did`] = e.did.trim();
      payload[`Day ${i + 1} — Who I helped`] = e.who.trim();
      payload[`Day ${i + 1} — How they reacted`] = e.reaction.trim();
    });
    this.submitted.emit(payload);
  }
}
