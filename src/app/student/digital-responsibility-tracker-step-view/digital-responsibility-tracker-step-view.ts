import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DigitalResponsibilityHabit, DigitalResponsibilityTrackerStep } from '../../core/models/module.model';

type Tick = 'yes' | 'no';

@Component({
  selector: 'app-digital-responsibility-tracker-step-view',
  standalone: true,
  templateUrl: './digital-responsibility-tracker-step-view.html',
  styleUrl: './digital-responsibility-tracker-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalResponsibilityTrackerStepView {
  readonly step = input.required<DigitalResponsibilityTrackerStep>();
  readonly continued = output<void>();

  /** YES/NO ticks keyed by `${habitId}:${dayIndex}`. */
  readonly ticks = signal<Record<string, Tick>>({});
  /** Final reflection answers keyed by field id. */
  readonly reflection = signal<Record<string, string>>({});
  readonly pledged = signal(false);

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i));
  readonly cellTotal = computed(() => this.step().habits.length * this.step().dayCount);
  readonly loggedCount = computed(() => Object.keys(this.ticks()).length);
  readonly gridComplete = computed(() => this.loggedCount() === this.cellTotal());

  readonly reflectionComplete = computed(() => {
    const r = this.reflection();
    return this.step().reflectionFields.every((f) => (r[f.id] ?? '').trim().length > 0);
  });

  readonly ready = computed(
    () => this.gridComplete() && this.reflectionComplete() && this.pledged(),
  );

  private key(habitId: string, day: number): string {
    return `${habitId}:${day}`;
  }

  tickFor(habitId: string, day: number): Tick | null {
    return this.ticks()[this.key(habitId, day)] ?? null;
  }

  /** How many days this habit was ticked YES — powers the per-habit streak strip. */
  yesDays(habitId: string): number {
    const ticks = this.ticks();
    return this.days().filter((d) => ticks[this.key(habitId, d)] === 'yes').length;
  }

  setTick(habitId: string, day: number, value: Tick): void {
    this.ticks.update((t) => ({ ...t, [this.key(habitId, day)]: value }));
  }

  setReflection(id: string, value: string): void {
    this.reflection.update((r) => ({ ...r, [id]: value }));
  }

  togglePledge(): void {
    this.pledged.update((v) => !v);
  }

  finish(): void {
    if (this.ready()) this.continued.emit();
  }

  trackHabit = (_: number, habit: DigitalResponsibilityHabit) => habit.id;
}
