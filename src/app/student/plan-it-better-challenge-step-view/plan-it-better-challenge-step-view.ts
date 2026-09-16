import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PlanItBetterChallengeStep } from '../../core/models/module.model';

/**
 * "Challenge of the Week: Plan It Better!" (Planning Module — Advanced, Week
 * 1). The learner picks a planning strategy, names the activity to apply it
 * to, ticks the days they follow it on a 7-day tracker, then completes an
 * end-of-week reflection (days used, a 1–5 "felt more organized" rating, and a
 * short note). Submit is locked until strategy, activity, rating and note are
 * all set; then a proud summary card is shown. See `PlanItBetterChallengeStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-plan-it-better-challenge-step-view',
  standalone: true,
  templateUrl: './plan-it-better-challenge-step-view.html',
  styleUrl: './plan-it-better-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanItBetterChallengeStepView {
  readonly step = input.required<PlanItBetterChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly pickedStrategy = signal<string | null>(null);
  readonly customStrategy = signal('');
  readonly activity = signal('');
  readonly days = signal<Set<number>>(new Set());
  readonly rating = signal(0);
  readonly learned = signal('');
  readonly locked = signal(false);

  readonly ratingStars = [1, 2, 3, 4, 5];

  /** The strategy in effect — the custom text when typed, otherwise the picked chip. */
  readonly effectiveStrategy = computed(() => {
    const custom = this.customStrategy().trim();
    if (custom.length > 0) return custom;
    return this.pickedStrategy() ?? '';
  });

  readonly daysUsed = computed(() => this.days().size);

  readonly canSubmit = computed(
    () =>
      this.effectiveStrategy().length > 0 &&
      this.activity().trim().length > 0 &&
      this.rating() >= 1 &&
      this.learned().trim().length > 0,
  );

  pickStrategy(option: string): void {
    if (this.locked()) return;
    this.pickedStrategy.set(this.pickedStrategy() === option ? null : option);
  }

  setCustomStrategy(value: string): void {
    if (this.locked()) return;
    this.customStrategy.set(value);
    if (value.trim().length > 0) this.pickedStrategy.set(null);
  }

  setActivity(value: string): void {
    if (this.locked()) return;
    this.activity.set(value);
  }

  toggleDay(index: number): void {
    if (this.locked()) return;
    this.days.update((set) => {
      const next = new Set(set);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  isDayOn(index: number): boolean {
    return this.days().has(index);
  }

  setRating(value: number): void {
    if (this.locked()) return;
    this.rating.set(value);
  }

  setLearned(value: string): void {
    if (this.locked()) return;
    this.learned.set(value);
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit({
      strategy: this.effectiveStrategy(),
      activity: this.activity().trim(),
      daysUsed: String(this.daysUsed()),
      organizedRating: String(this.rating()),
      learned: this.learned().trim(),
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
