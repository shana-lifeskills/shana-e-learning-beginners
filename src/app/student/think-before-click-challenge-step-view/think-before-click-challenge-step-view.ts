import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ThinkBeforeClickChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  checks: boolean[];
  safe: string;
  avoided: string;
  sealed: boolean;
}

@Component({
  selector: 'app-think-before-click-challenge-step-view',
  standalone: true,
  templateUrl: './think-before-click-challenge-step-view.html',
  styleUrl: './think-before-click-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinkBeforeClickChallengeStepView {
  readonly step = input.required<ThinkBeforeClickChallengeStep>();
  readonly continued = output<void>();

  /** Sparse per-day edits, keyed by day index — merged over the blank template in `days()`. */
  private readonly edits = signal<Record<number, Partial<DayEntry>>>({});

  readonly days = computed<DayEntry[]>(() => {
    const s = this.step();
    const edits = this.edits();
    return Array.from({ length: s.dayCount }, (_, i) => {
      const e = edits[i] ?? {};
      return {
        checks: s.checks.map((_, ci) => e.checks?.[ci] ?? false),
        safe: e.safe ?? '',
        avoided: e.avoided ?? '',
        sealed: e.sealed ?? false,
      };
    });
  });

  readonly sealedCount = computed(() => this.days().filter((d) => d.sealed).length);
  readonly allSealed = computed(() => this.sealedCount() === this.days().length);

  private patch(index: number, change: Partial<DayEntry>): void {
    this.edits.update((map) => ({ ...map, [index]: { ...map[index], ...change } }));
  }

  toggleCheck(dayIndex: number, checkIndex: number): void {
    const day = this.days()[dayIndex];
    if (day.sealed) return;
    this.patch(dayIndex, { checks: day.checks.map((v, i) => (i === checkIndex ? !v : v)) });
  }

  setSafe(dayIndex: number, value: string): void {
    this.patch(dayIndex, { safe: value });
  }

  setAvoided(dayIndex: number, value: string): void {
    this.patch(dayIndex, { avoided: value });
  }

  canSeal(index: number): boolean {
    const day = this.days()[index];
    if (day.sealed) return false;
    return day.checks.every(Boolean) && day.safe.trim().length > 0 && day.avoided.trim().length > 0;
  }

  seal(index: number): void {
    if (this.canSeal(index)) this.patch(index, { sealed: true });
  }

  finish(): void {
    if (this.allSealed()) this.continued.emit();
  }
}
