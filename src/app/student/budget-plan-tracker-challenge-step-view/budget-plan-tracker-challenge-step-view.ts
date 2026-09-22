import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { BudgetPlanTrackerChallengeStep } from '../../core/models/module.model';

/**
 * "My First Budget" challenge of the week (Budgeting Module, Week 1). The
 * learner plans a pretend 20-coin budget (spend / save / keep for later),
 * then logs a short daily tracker. Complete unlocks only once the plan is
 * filled in and every tracked day is logged; the plan is then submitted.
 */
@Component({
  selector: 'app-budget-plan-tracker-challenge-step-view',
  standalone: true,
  templateUrl: './budget-plan-tracker-challenge-step-view.html',
  styleUrl: './budget-plan-tracker-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetPlanTrackerChallengeStepView implements OnInit {
  readonly step = input.required<BudgetPlanTrackerChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly spend = signal('');
  readonly save = signal('');
  readonly keep = signal('');
  readonly daysLogged = signal<boolean[]>([]);

  ngOnInit(): void {
    this.daysLogged.set(Array.from({ length: this.step().dayCount }, () => false));
  }

  readonly planReady = computed(
    () => this.spend().trim().length > 0 && this.save().trim().length > 0 && this.keep().trim().length > 0,
  );
  readonly loggedCount = computed(() => this.daysLogged().filter((d) => d).length);
  readonly progressPercent = computed(() => {
    const total = this.step().dayCount;
    return total === 0 ? 0 : Math.round((this.loggedCount() / total) * 100);
  });
  readonly allDaysLogged = computed(() => this.step().dayCount > 0 && this.loggedCount() === this.step().dayCount);
  readonly canComplete = computed(() => this.planReady() && this.allDaysLogged());

  setField(key: 'spend' | 'save' | 'keep', value: string): void {
    ({ spend: this.spend, save: this.save, keep: this.keep })[key].set(value);
  }

  toggleDay(index: number): void {
    this.daysLogged.update((days) => days.map((d, i) => (i === index ? !d : d)));
  }

  complete(): void {
    if (!this.canComplete()) return;
    this.submitted.emit({
      'My plan — Spend': this.spend().trim(),
      'My plan — Save': this.save().trim(),
      'My plan — Keep for later': this.keep().trim(),
      'Days tracked': `${this.loggedCount()} / ${this.step().dayCount}`,
    });
  }
}
