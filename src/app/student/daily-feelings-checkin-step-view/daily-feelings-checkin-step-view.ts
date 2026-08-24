import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProgressService } from '../../core/services/progress.service';
import { DailyFeelingsCheckinStep } from '../../core/models/module.model';

const DAYS = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
];

/** JS `Date#getDay()` is 0 = Sunday .. 6 = Saturday; `DAYS` above is Monday-first. */
function todayDayId(): string {
  const jsDay = new Date().getDay();
  return DAYS[(jsDay + 6) % 7].id;
}

function checkinKey(dayId: string, slotId: string): string {
  return `${dayId}__${slotId}`;
}

@Component({
  selector: 'app-daily-feelings-checkin-step-view',
  standalone: true,
  templateUrl: './daily-feelings-checkin-step-view.html',
  styleUrl: './daily-feelings-checkin-step-view.scss',
})
export class DailyFeelingsCheckinStepView {
  private auth = inject(AuthService);
  private progressService = inject(ProgressService);

  readonly step = input.required<DailyFeelingsCheckinStep>();
  readonly submitted = output<Record<string, string>>();

  readonly days = DAYS;
  readonly selectedDayId = signal(todayDayId());
  readonly checkins = signal<Record<string, string>>({});

  readonly selectedDayComplete = computed(() =>
    this.step().timeSlots.every((slot) => !!this.checkins()[checkinKey(this.selectedDayId(), slot.id)])
  );

  constructor() {
    effect(() => {
      const exercise = this.step();
      const student = this.auth.currentUser();
      if (!student) return;
      const existing = this.progressService.getSubmissionsForExercise(exercise.id).find((s) => s.studentId === student.id);
      this.checkins.set(existing?.values ?? {});
    });
  }

  selectDay(dayId: string): void {
    this.selectedDayId.set(dayId);
  }

  moodFor(slotId: string): string | null {
    return this.checkins()[checkinKey(this.selectedDayId(), slotId)] ?? null;
  }

  pickMood(slotId: string, moodId: string): void {
    this.checkins.update((current) => ({ ...current, [checkinKey(this.selectedDayId(), slotId)]: moodId }));
  }

  finish(): void {
    if (!this.selectedDayComplete()) return;
    this.submitted.emit(this.checkins());
  }
}
