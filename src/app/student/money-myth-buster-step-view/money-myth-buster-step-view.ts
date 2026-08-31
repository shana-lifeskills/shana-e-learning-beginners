import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MoneyMythBusterStep } from '../../core/models/module.model';

/**
 * "Money Myth Buster" warm-up (Choices Module, Week 3). One claim at a time; the
 * learner stamps FACT or MYTH. A correct stamp thumps on and advances; a wrong
 * stamp shakes and the claim stays open. Continue is withheld until every claim
 * is settled.
 */
@Component({
  selector: 'app-money-myth-buster-step-view',
  standalone: true,
  templateUrl: './money-myth-buster-step-view.html',
  styleUrl: './money-myth-buster-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMythBusterStepView {
  readonly step = input.required<MoneyMythBusterStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly picked = signal<'fact' | 'myth' | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly statements = computed(() => this.step().statements);
  readonly current = computed(() => this.statements()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.statements().length);
  readonly cases = computed(() => this.statements().map((_, i) => i < this.activeIndex()));

  stampState(value: 'fact' | 'myth'): 'correct' | 'incorrect' | null {
    if (this.picked() !== value) return null;
    return this.feedback();
  }

  pick(value: 'fact' | 'myth'): void {
    if (this.locked()) return;
    const claim = this.current();
    if (!claim) return;

    const correct = (value === 'fact') === claim.isFact;
    this.picked.set(value);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        this.picked.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        if (correct) this.activeIndex.update((i) => i + 1);
      },
      correct ? 1400 : 750,
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
