import { Component, computed, input, output, signal } from '@angular/core';
import { ChallengeTrackerStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-tracker-step-view',
  standalone: true,
  templateUrl: './challenge-tracker-step-view.html',
  styleUrl: './challenge-tracker-step-view.scss',
})
export class ChallengeTrackerStepView {
  readonly step = input.required<ChallengeTrackerStep>();
  readonly continued = output<void>();

  /** day label -> ticked, so re-opening the step keeps whatever was already checked off. */
  readonly checkedDays = signal<Set<string>>(new Set());

  readonly completedCount = computed(() => this.checkedDays().size);
  readonly totalDays = computed(() => this.step().days.length);
  readonly progressPercent = computed(() => Math.round((this.completedCount() / this.totalDays()) * 100));
  readonly allDaysChecked = computed(() => this.completedCount() === this.totalDays());

  /** day label -> the free-text note the learner typed for that day, when `dailyNoteLabel` is set. */
  readonly dayNotes = signal<Map<string, string>>(new Map());

  /** prompt id -> the learner's written answer, when `reflectionPrompts` is set. */
  readonly reflectionAnswers = signal<Map<string, string>>(new Map());

  /** True when there are no closing reflection prompts, or every one has a non-blank answer. */
  readonly reflectionComplete = computed(() => {
    const prompts = this.step().reflectionPrompts ?? [];
    return prompts.every((p) => (this.reflectionAnswers().get(p.id) ?? '').trim().length > 0);
  });

  /** The Continue button unlocks once every day is ticked and every reflection prompt is answered. */
  readonly canContinue = computed(() => this.allDaysChecked() && this.reflectionComplete());

  isChecked(day: string): boolean {
    return this.checkedDays().has(day);
  }

  noteFor(day: string): string {
    return this.dayNotes().get(day) ?? '';
  }

  setNote(day: string, value: string): void {
    this.dayNotes.update((notes) => {
      const next = new Map(notes);
      next.set(day, value);
      return next;
    });
  }

  reflectionFor(id: string): string {
    return this.reflectionAnswers().get(id) ?? '';
  }

  setReflection(id: string, value: string): void {
    this.reflectionAnswers.update((answers) => {
      const next = new Map(answers);
      next.set(id, value);
      return next;
    });
  }

  toggleDay(day: string): void {
    this.checkedDays.update((days) => {
      const next = new Set(days);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  }
}
