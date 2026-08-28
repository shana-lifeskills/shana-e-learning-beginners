import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ScreenTimePlanChallengeStep } from '../../core/models/module.model';

type FollowAnswer = 'yes' | 'no';

@Component({
  selector: 'app-screen-time-plan-challenge-step-view',
  standalone: true,
  templateUrl: './screen-time-plan-challenge-step-view.html',
  styleUrl: './screen-time-plan-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenTimePlanChallengeStepView {
  readonly step = input.required<ScreenTimePlanChallengeStep>();
  readonly continued = output<void>();

  /** Plan-row values keyed by field id. */
  readonly plan = signal<Record<string, string>>({});
  /** Per-day "did I follow my plan?" answers, keyed by day index. */
  readonly logs = signal<Record<number, FollowAnswer>>({});
  readonly pledged = signal(false);

  readonly planComplete = computed(() => {
    const plan = this.plan();
    return this.step().planFields.every((f) => (plan[f.id] ?? '').trim().length > 0);
  });

  readonly loggedCount = computed(() => Object.keys(this.logs()).length);
  readonly allLogged = computed(() => this.loggedCount() === this.step().dayCount);
  readonly followedCount = computed(
    () => Object.values(this.logs()).filter((a) => a === 'yes').length,
  );

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i));
  readonly ready = computed(() => this.planComplete() && this.allLogged() && this.pledged());

  setPlan(id: string, value: string): void {
    this.plan.update((p) => ({ ...p, [id]: value }));
  }

  answerFor(day: number): FollowAnswer | null {
    return this.logs()[day] ?? null;
  }

  log(day: number, answer: FollowAnswer): void {
    if (!this.planComplete()) return;
    this.logs.update((l) => ({ ...l, [day]: answer }));
  }

  togglePledge(): void {
    this.pledged.update((v) => !v);
  }

  finish(): void {
    if (this.ready()) this.continued.emit();
  }
}
