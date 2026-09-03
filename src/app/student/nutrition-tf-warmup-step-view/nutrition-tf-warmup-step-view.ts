import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NutritionTfStatement, NutritionTfWarmupStep } from '../../core/models/module.model';

/**
 * "Warm-Up – True or False" game (Nutrition Module, Week 3). One statement card
 * at a time sits between a green "True" lane and a coral "False" lane, with a
 * row of dots tracking progress. A correct verdict slides the card off toward
 * that lane and brings up the next; a wrong verdict wobbles and stays put.
 * Continue unlocks once every statement is sorted. Its own visual design — see
 * `NutritionTfWarmupStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-tf-warmup-step-view',
  standalone: true,
  templateUrl: './nutrition-tf-warmup-step-view.html',
  styleUrl: './nutrition-tf-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionTfWarmupStepView {
  readonly step = input.required<NutritionTfWarmupStep>();
  readonly continued = output<void>();

  /** Ids of statements answered correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** The verdict just tried on the active card while it is wrong. */
  readonly wrongVerdict = signal<boolean | null>(null);
  /** The verdict of the card sliding away, so it can animate toward that lane. */
  readonly leavingVerdict = signal<boolean | null>(null);
  /** Praise line from the most recently solved statement. */
  readonly lastPraise = signal<string | null>(null);

  readonly total = computed(() => this.step().statements.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly allSolved = computed(() => this.solvedCount() === this.total());

  readonly activeStatement = computed(() => {
    const solved = this.solved();
    return this.step().statements.find((s) => !solved.has(s.id)) ?? null;
  });

  readonly activeNumber = computed(() => {
    const active = this.activeStatement();
    if (!active) return this.total();
    return this.step().statements.indexOf(active) + 1;
  });

  isSolved(statement: NutritionTfStatement): boolean {
    return this.solved().has(statement.id);
  }

  answer(statement: NutritionTfStatement, verdict: boolean): void {
    if (this.solved().has(statement.id) || this.leavingVerdict() !== null) return;

    if (verdict !== statement.answer) {
      this.wrongVerdict.set(verdict);
      return;
    }

    this.wrongVerdict.set(null);
    this.lastPraise.set(statement.praise);
    this.leavingVerdict.set(verdict);
    setTimeout(() => {
      this.solved.update((set) => {
        const next = new Set(set);
        next.add(statement.id);
        return next;
      });
      this.leavingVerdict.set(null);
    }, 340);
  }

  finish(): void {
    if (this.allSolved()) this.continued.emit();
  }
}
