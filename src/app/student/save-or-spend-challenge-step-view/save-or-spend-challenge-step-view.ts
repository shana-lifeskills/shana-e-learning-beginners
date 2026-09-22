import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { SaveOrSpendChallengeStep } from '../../core/models/module.model';

type Choice = 'save' | 'spend' | null;

/**
 * "Save or Spend?" challenge of the week (Savings Module, Week 2). For each
 * day the learner picks Save or Spend and records why. Complete unlocks once
 * every day has both a choice and a reason; the log is then submitted.
 */
@Component({
  selector: 'app-save-or-spend-challenge-step-view',
  standalone: true,
  templateUrl: './save-or-spend-challenge-step-view.html',
  styleUrl: './save-or-spend-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveOrSpendChallengeStepView implements OnInit {
  readonly step = input.required<SaveOrSpendChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly choices = signal<Choice[]>([]);
  readonly reasons = signal<string[]>([]);

  ngOnInit(): void {
    const n = this.step().dayCount;
    this.choices.set(Array.from({ length: n }, () => null));
    this.reasons.set(Array.from({ length: n }, () => ''));
  }

  isDayDone(i: number): boolean {
    return this.choices()[i] !== null && this.reasons()[i].trim().length > 0;
  }

  readonly doneCount = computed(() => this.choices().filter((_, i) => this.isDayDone(i)).length);
  readonly canComplete = computed(() => this.step().dayCount > 0 && this.doneCount() === this.step().dayCount);

  choose(i: number, choice: 'save' | 'spend'): void {
    this.choices.update((list) => list.map((c, idx) => (idx === i ? choice : c)));
  }

  setReason(i: number, value: string): void {
    this.reasons.update((list) => list.map((r, idx) => (idx === i ? value : r)));
  }

  complete(): void {
    if (!this.canComplete()) return;
    const values: Record<string, string> = {};
    this.choices().forEach((c, i) => {
      values[`Day ${i + 1} — I chose`] = c === 'save' ? this.step().saveLabel : this.step().spendLabel;
      values[`Day ${i + 1} — Why`] = this.reasons()[i].trim();
    });
    this.submitted.emit(values);
  }
}
