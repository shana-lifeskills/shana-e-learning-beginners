import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SavingsMatchWarmupStep } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Match the Money Words" warm-up (Savings Module, Week 2). The learner taps a
 * word on the left, then the meaning they think fits on the right. A right
 * pair locks together with a matching coin number; a wrong pair shakes and
 * both sides unlock so they can try again. Continue is withheld until every
 * word is matched.
 */
@Component({
  selector: 'app-savings-match-warmup-step-view',
  standalone: true,
  templateUrl: './savings-match-warmup-step-view.html',
  styleUrl: './savings-match-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsMatchWarmupStepView {
  readonly step = input.required<SavingsMatchWarmupStep>();
  readonly continued = output<void>();

  readonly meanings = computed(() => shuffled(this.step().pairs));
  readonly matchedIds = signal<string[]>([]);
  readonly selectedWordId = signal<string | null>(null);
  readonly wrongMeaningId = signal<string | null>(null);

  readonly allMatched = computed(() => this.matchedIds().length === this.step().pairs.length);

  /** 1-based order in which a pair was matched, or 0 while it is still open. */
  matchNumber(id: string): number {
    return this.matchedIds().indexOf(id) + 1;
  }

  selectWord(id: string): void {
    if (this.matchNumber(id) || this.wrongMeaningId()) return;
    this.selectedWordId.set(this.selectedWordId() === id ? null : id);
  }

  pickMeaning(id: string): void {
    const word = this.selectedWordId();
    if (!word || this.matchNumber(id) || this.wrongMeaningId()) return;
    if (word === id) {
      this.matchedIds.update((ids) => [...ids, id]);
      this.selectedWordId.set(null);
      return;
    }
    this.wrongMeaningId.set(id);
    setTimeout(() => {
      this.wrongMeaningId.set(null);
      this.selectedWordId.set(null);
    }, 700);
  }

  finish(): void {
    if (!this.allMatched()) return;
    this.continued.emit();
  }
}
