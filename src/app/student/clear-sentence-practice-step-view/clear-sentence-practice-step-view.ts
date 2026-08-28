import { Component, computed, input, output, signal } from '@angular/core';
import { ClearSentenceDay, ClearSentencePracticeStep } from '../../core/models/module.model';

type Phase = 'intro' | 'days' | 'end';

@Component({
  selector: 'app-clear-sentence-practice-step-view',
  standalone: true,
  templateUrl: './clear-sentence-practice-step-view.html',
  styleUrl: './clear-sentence-practice-step-view.scss',
})
export class ClearSentencePracticeStepView {
  readonly step = input.required<ClearSentencePracticeStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('intro');

  private readonly activeDayOverride = signal<string | null>(null);
  /** Expression Log text per day id. */
  readonly dayLogs = signal<Record<string, string>>({});
  /** Which days the child has marked complete. */
  readonly completedDays = signal<Set<string>>(new Set());
  /** End-of-week reflection answers per reflection id. */
  readonly reflections = signal<Record<string, string>>({});

  readonly activeDayId = computed(() => this.activeDayOverride() ?? this.step().days[0]?.id ?? '');
  readonly activeDay = computed<ClearSentenceDay | null>(
    () => this.step().days.find((d) => d.id === this.activeDayId()) ?? null,
  );
  readonly activeDayNumber = computed(() => {
    const idx = this.step().days.findIndex((d) => d.id === this.activeDayId());
    return idx < 0 ? 1 : idx + 1;
  });

  readonly doneCount = computed(() => this.completedDays().size);
  readonly totalDays = computed(() => this.step().days.length);
  readonly allDaysDone = computed(() => this.doneCount() === this.totalDays());

  readonly activeLog = computed(() => this.dayLogs()[this.activeDayId()] ?? '');
  readonly activeLogLength = computed(() => this.activeLog().trim().length);
  readonly activeDayComplete = computed(() => this.completedDays().has(this.activeDayId()));

  readonly allReflectionsDone = computed(() =>
    this.step().endReflections.every((r) => (this.reflections()[r.id] ?? '').trim().length > 0),
  );

  dayNumberLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  isDayComplete(day: ClearSentenceDay): boolean {
    return this.completedDays().has(day.id);
  }

  start(): void {
    this.phase.set('days');
  }

  selectDay(day: ClearSentenceDay): void {
    this.activeDayOverride.set(day.id);
  }

  onLogInput(value: string): void {
    const id = this.activeDayId();
    this.dayLogs.update((map) => ({ ...map, [id]: value }));
  }

  markDayComplete(): void {
    if (this.activeLogLength() === 0) return;
    this.completedDays.update((set) => new Set(set).add(this.activeDayId()));
  }

  goToEndOfWeek(): void {
    if (!this.allDaysDone()) return;
    this.phase.set('end');
  }

  reflectionFor(id: string): string {
    return this.reflections()[id] ?? '';
  }

  onReflectionInput(id: string, value: string): void {
    this.reflections.update((map) => ({ ...map, [id]: value }));
  }

  finish(): void {
    if (!this.allReflectionsDone()) return;
    this.continued.emit();
  }
}
