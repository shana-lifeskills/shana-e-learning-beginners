import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { WellnessFeelingsJournalStep } from '../../core/models/module.model';

/**
 * "Challenge of the Week" as a five-day feelings journal (Wellness Module, Week
 * 3). Each day is an expanding card with a few short write prompts and a Log Day
 * button; logged days bloom into a row of hearts. Self-reported, so Continue is
 * always available. Its own visual design — see `WellnessFeelingsJournalStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-feelings-journal-step-view',
  standalone: true,
  templateUrl: './wellness-feelings-journal-step-view.html',
  styleUrl: './wellness-feelings-journal-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessFeelingsJournalStepView {
  readonly step = input.required<WellnessFeelingsJournalStep>();
  readonly continued = output<void>();

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));
  readonly openDay = signal<number>(1);
  readonly loggedDays = signal<Set<number>>(new Set());

  readonly loggedCount = computed(() => this.loggedDays().size);
  readonly allLogged = computed(() => this.loggedCount() === this.step().dayCount);

  toggleDay(day: number): void {
    this.openDay.set(this.openDay() === day ? 0 : day);
  }

  isLogged(day: number): boolean {
    return this.loggedDays().has(day);
  }

  logDay(day: number): void {
    this.loggedDays.update((set) => new Set(set).add(day));
    const next = this.days().find((d) => d > day && !this.loggedDays().has(d));
    this.openDay.set(next ?? 0);
  }

  finish(): void {
    this.continued.emit();
  }
}
