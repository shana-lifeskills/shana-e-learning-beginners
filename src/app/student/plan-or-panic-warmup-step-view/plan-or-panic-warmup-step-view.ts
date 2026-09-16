import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PlanOrPanicScenario, PlanOrPanicWarmupStep } from '../../core/models/module.model';

/**
 * "Warm-Up – Plan or Panic?" game (Planning Module — Advanced, Week 1). One
 * scenario card at a time sits between a calm "Planned" bin and a frazzled
 * "Panic" bin; each correct sort drops the card into its bin (which fills with
 * a small stack) and brings up the next. A wrong choice shakes the card and
 * leaves it in play, so no wrong answer ever passes. Continue unlocks only once
 * every scenario is sorted. Its own visual design — see `PlanOrPanicWarmupStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-plan-or-panic-warmup-step-view',
  standalone: true,
  templateUrl: './plan-or-panic-warmup-step-view.html',
  styleUrl: './plan-or-panic-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanOrPanicWarmupStepView {
  readonly step = input.required<PlanOrPanicWarmupStep>();
  readonly continued = output<void>();

  /** Ids of scenarios sorted correctly, keyed to which bin they landed in. */
  readonly solved = signal<Map<string, boolean>>(new Map());
  /** The choice just tried on the active card while it is wrong. */
  readonly wrongChoice = signal<boolean | null>(null);
  /** The bin the card is dropping into, so it can animate that way. */
  readonly leavingChoice = signal<boolean | null>(null);
  /** Praise line from the most recently solved scenario. */
  readonly lastPraise = signal<string | null>(null);

  readonly total = computed(() => this.step().scenarios.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  readonly plannedCount = computed(() => [...this.solved().values()].filter((v) => v).length);
  readonly panicCount = computed(() => [...this.solved().values()].filter((v) => !v).length);

  readonly activeScenario = computed(() => {
    const solved = this.solved();
    return this.step().scenarios.find((s) => !solved.has(s.id)) ?? null;
  });

  readonly activeNumber = computed(() => {
    const active = this.activeScenario();
    if (!active) return this.total();
    return this.step().scenarios.indexOf(active) + 1;
  });

  choose(scenario: PlanOrPanicScenario, planned: boolean): void {
    if (this.solved().has(scenario.id) || this.leavingChoice() !== null) return;

    if (planned !== scenario.planned) {
      this.wrongChoice.set(planned);
      return;
    }

    this.wrongChoice.set(null);
    this.lastPraise.set(scenario.praise);
    this.leavingChoice.set(planned);
    setTimeout(() => {
      this.solved.update((map) => {
        const next = new Map(map);
        next.set(scenario.id, planned);
        return next;
      });
      this.leavingChoice.set(null);
    }, 340);
  }

  finish(): void {
    if (this.allSolved()) this.continued.emit();
  }
}
