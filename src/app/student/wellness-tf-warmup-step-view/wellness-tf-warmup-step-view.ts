import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { WellnessTfStatement, WellnessTfWarmupStep } from '../../core/models/module.model';

/**
 * "Warm-Up – True or False" game (Wellness Module, Week 3). One feelings
 * statement card at a time between a thumbs-up "True" side and a thumbs-down
 * "False" side; a correct verdict floats the card onto that side and advances,
 * a wrong verdict wobbles and stays put. Continue unlocks once every statement
 * is sorted. Its own visual design — see `WellnessTfWarmupStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-tf-warmup-step-view',
  standalone: true,
  templateUrl: './wellness-tf-warmup-step-view.html',
  styleUrl: './wellness-tf-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessTfWarmupStepView {
  readonly step = input.required<WellnessTfWarmupStep>();
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

  tray(verdict: boolean): WellnessTfStatement[] {
    const solved = this.solved();
    return this.step().statements.filter((s) => solved.has(s.id) && s.answer === verdict);
  }

  answer(statement: WellnessTfStatement, verdict: boolean): void {
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
