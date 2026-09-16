import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PatternSpotterChallengeStep } from '../../core/models/module.model';

/**
 * "Challenge of the Week: Pattern Spotter" (Planning Module — Advanced, Week
 * 2). Follow the planner for three days, then note one adjustment and one
 * pattern discovered. Submit is locked until the pattern note is written. See
 * `PatternSpotterChallengeStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-pattern-spotter-challenge-step-view',
  standalone: true,
  templateUrl: './pattern-spotter-challenge-step-view.html',
  styleUrl: './pattern-spotter-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatternSpotterChallengeStepView {
  readonly step = input.required<PatternSpotterChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly days = signal<Set<number>>(new Set());
  readonly adjust = signal('');
  readonly pattern = signal('');
  readonly locked = signal(false);

  readonly daysDone = computed(() => this.days().size);
  readonly canSubmit = computed(() => this.pattern().trim().length > 0 && !this.locked());

  isDayOn(index: number): boolean {
    return this.days().has(index);
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

  setAdjust(value: string): void {
    if (this.locked()) return;
    this.adjust.set(value);
  }

  setPattern(value: string): void {
    if (this.locked()) return;
    this.pattern.set(value);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    this.submitted.emit({
      daysFollowed: `${this.daysDone()} of 3`,
      adjustment: this.adjust().trim() || 'none noted',
      pattern: this.pattern().trim(),
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
