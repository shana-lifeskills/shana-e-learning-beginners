import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SimpleBudgetChallengeStep } from '../../core/models/module.model';

/**
 * "My Simple Budget" challenge of the week (Choices Module, Week 2). The learner
 * fills a three-part money plan (spend / save / use later) and marks whether
 * they followed it. Complete unlocks only when every part is filled; the plan is
 * then submitted.
 */
@Component({
  selector: 'app-simple-budget-challenge-step-view',
  standalone: true,
  templateUrl: './simple-budget-challenge-step-view.html',
  styleUrl: './simple-budget-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleBudgetChallengeStepView {
  readonly step = input.required<SimpleBudgetChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly spend = signal('');
  readonly save = signal('');
  readonly useLater = signal('');
  readonly followed = signal<'yes' | 'no' | null>(null);

  readonly planReady = computed(
    () => this.spend().trim().length > 0 && this.save().trim().length > 0 && this.useLater().trim().length > 0,
  );
  readonly canComplete = computed(() => this.planReady() && this.followed() !== null);

  setField(key: 'spend' | 'save' | 'useLater', value: string): void {
    ({ spend: this.spend, save: this.save, useLater: this.useLater })[key].set(value);
  }

  setFollowed(value: 'yes' | 'no'): void {
    this.followed.set(value);
  }

  complete(): void {
    if (!this.canComplete()) return;
    this.submitted.emit({
      'My plan — Spend': this.spend().trim(),
      'My plan — Save': this.save().trim(),
      'My plan — Use later': this.useLater().trim(),
      'Did I follow my plan?': this.followed() === 'yes' ? 'Yes' : 'No',
    });
  }
}
