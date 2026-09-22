import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { SavingsJarChallengeStep } from '../../core/models/module.model';

/**
 * "Start Your Saving Jar" challenge of the week (Savings Module, Week 1). The
 * learner ticks that their jar or box is ready, then for each day types how
 * much they saved (real or pretend) and drops it in the jar. Complete unlocks
 * once the jar is ready and every day is logged; the amounts are then submitted.
 */
@Component({
  selector: 'app-savings-jar-challenge-step-view',
  standalone: true,
  templateUrl: './savings-jar-challenge-step-view.html',
  styleUrl: './savings-jar-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsJarChallengeStepView implements OnInit {
  readonly step = input.required<SavingsJarChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly jarReady = signal(false);
  readonly amounts = signal<string[]>([]);
  readonly saved = signal<boolean[]>([]);

  ngOnInit(): void {
    const n = this.step().dayCount;
    this.amounts.set(Array.from({ length: n }, () => ''));
    this.saved.set(Array.from({ length: n }, () => false));
  }

  readonly savedCount = computed(() => this.saved().filter((s) => s).length);
  readonly total = computed(() =>
    this.amounts().reduce((sum, a, i) => (this.saved()[i] ? sum + (parseFloat(a) || 0) : sum), 0),
  );
  readonly fillPercent = computed(() => Math.round((this.savedCount() / Math.max(this.step().dayCount, 1)) * 100));
  readonly canComplete = computed(() => this.jarReady() && this.savedCount() === this.step().dayCount);

  setAmount(index: number, value: string): void {
    this.amounts.update((list) => list.map((a, i) => (i === index ? value : a)));
  }

  canDrop(index: number): boolean {
    return !this.saved()[index] && (parseFloat(this.amounts()[index]) || 0) > 0;
  }

  drop(index: number): void {
    if (!this.canDrop(index)) return;
    this.saved.update((list) => list.map((s, i) => (i === index ? true : s)));
  }

  complete(): void {
    if (!this.canComplete()) return;
    const values: Record<string, string> = { 'Jar or box ready': 'Yes' };
    this.amounts().forEach((a, i) => (values[`Day ${i + 1} saved`] = a.trim()));
    values['Total saved'] = String(this.total());
    this.submitted.emit(values);
  }
}
