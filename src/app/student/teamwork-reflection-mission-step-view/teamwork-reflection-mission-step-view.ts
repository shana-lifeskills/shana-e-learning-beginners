import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { TeamworkReflectionMissionStep } from '../../core/models/module.model';

interface DayEntry {
  checks: boolean[];
  done: boolean;
}

/**
 * "Teamwork Reflection Mission" final challenge (Teamwork Module, Week 4). A
 * multi-day self-observation grid plus a one-time structured reflection.
 * Complete unlocks only when every day is logged and every reflection line is
 * filled; the reflection is then submitted.
 */
@Component({
  selector: 'app-teamwork-reflection-mission-step-view',
  standalone: true,
  templateUrl: './teamwork-reflection-mission-step-view.html',
  styleUrl: './teamwork-reflection-mission-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkReflectionMissionStepView implements OnInit {
  readonly step = input.required<TeamworkReflectionMissionStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<DayEntry[]>([]);
  readonly openDay = signal(0);
  readonly reflection = signal<Record<string, string>>({});

  ngOnInit(): void {
    const s = this.step();
    this.entries.set(
      Array.from({ length: s.dayCount }, () => ({
        checks: s.habitItems.map(() => false),
        done: false,
      })),
    );
    this.reflection.set(Object.fromEntries(s.reflectionFields.map((f) => [f.id, ''])));
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDaysLogged = computed(() => this.total() > 0 && this.doneCount() === this.total());
  readonly reflectionReady = computed(() =>
    this.step().reflectionFields.every((f) => (this.reflection()[f.id] ?? '').trim().length > 0),
  );
  readonly canComplete = computed(() => this.allDaysLogged() && this.reflectionReady());

  toggleOpen(index: number): void {
    this.openDay.set(this.openDay() === index ? -1 : index);
  }

  toggleCheck(dayIndex: number, itemIndex: number): void {
    this.entries.update((list) =>
      list.map((e, i) =>
        i === dayIndex ? { ...e, checks: e.checks.map((c, ci) => (ci === itemIndex ? !c : c)) } : e,
      ),
    );
  }

  canLogDay(index: number): boolean {
    const e = this.entries()[index];
    return !!e && !e.done && e.checks.every((c) => c);
  }

  logDay(index: number): void {
    if (!this.canLogDay(index)) return;
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, done: true } : e)));
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    this.openDay.set(nextOpen);
  }

  setReflection(fieldId: string, value: string): void {
    this.reflection.update((r) => ({ ...r, [fieldId]: value }));
  }

  complete(): void {
    if (!this.canComplete()) return;
    const payload: Record<string, string> = {};
    this.step().reflectionFields.forEach((f) => {
      payload[f.label] = (this.reflection()[f.id] ?? '').trim();
    });
    this.submitted.emit(payload);
  }
}
