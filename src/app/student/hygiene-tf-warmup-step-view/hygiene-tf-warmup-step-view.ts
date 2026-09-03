import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { HygieneTfStatement, HygieneTfWarmupStep } from '../../core/models/module.model';

/**
 * "Warm-Up – True or False" game (Hygiene Module, Week 3). One statement card at
 * a time with big True / False buttons; a correct answer drops the statement
 * into a True or False tray and advances, a wrong answer wobbles and stays put.
 * Continue unlocks once every statement is sorted. Its own visual design — see
 * `HygieneTfWarmupStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-tf-warmup-step-view',
  standalone: true,
  templateUrl: './hygiene-tf-warmup-step-view.html',
  styleUrl: './hygiene-tf-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneTfWarmupStepView {
  readonly step = input.required<HygieneTfWarmupStep>();
  readonly continued = output<void>();

  /** Ids of statements answered correctly. */
  readonly solved = signal<Set<string>>(new Set());
  /** The verdict just tried on the active card while it is wrong. */
  readonly wrongVerdict = signal<boolean | null>(null);
  /** Praise line from the most recently solved statement. */
  readonly lastPraise = signal<string | null>(null);

  readonly total = computed(() => this.step().statements.length);
  readonly solvedCount = computed(() => this.solved().size);
  readonly progressPercent = computed(() => Math.round((this.solvedCount() / this.total()) * 100));
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

  tray(verdict: boolean): HygieneTfStatement[] {
    const solved = this.solved();
    return this.step().statements.filter((s) => solved.has(s.id) && s.answer === verdict);
  }

  answer(statement: HygieneTfStatement, verdict: boolean): void {
    if (this.solved().has(statement.id)) return;

    if (verdict === statement.answer) {
      this.wrongVerdict.set(null);
      this.lastPraise.set(statement.praise);
      this.solved.update((set) => {
        const next = new Set(set);
        next.add(statement.id);
        return next;
      });
      return;
    }

    this.wrongVerdict.set(verdict);
  }

  finish(): void {
    if (this.allSolved()) this.continued.emit();
  }
}
