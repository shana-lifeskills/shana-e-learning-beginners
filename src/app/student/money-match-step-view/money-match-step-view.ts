import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { MoneyMatchPair, MoneyMatchStep } from '../../core/models/module.model';

interface MeaningCard {
  pairId: string;
  meaning: string;
}

/**
 * "Money Match" warm-up (Choices Module, Week 2). Term coin-cards on the left,
 * shuffled meaning slots on the right. Tap a term then a meaning: a correct pair
 * locks with a shared colour, a wrong pair shakes and clears. Continue is
 * withheld until the whole board is matched.
 */
@Component({
  selector: 'app-money-match-step-view',
  standalone: true,
  templateUrl: './money-match-step-view.html',
  styleUrl: './money-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMatchStepView implements OnInit {
  readonly step = input.required<MoneyMatchStep>();
  readonly continued = output<void>();

  readonly meanings = signal<MeaningCard[]>([]);
  /** pairId -> colour slot index, for pairs already matched. */
  readonly matched = signal<Map<string, number>>(new Map());

  readonly pickedTerm = signal<string | null>(null);
  readonly pickedMeaning = signal<string | null>(null);
  readonly wrongFlash = signal<string | null>(null);

  ngOnInit(): void {
    const pairs = this.step().pairs;
    // Deterministic shuffle: rotate the meanings by two so none line up with
    // their term, but the order is stable across change detection.
    const rotated = pairs.slice(2).concat(pairs.slice(0, 2)).reverse();
    this.meanings.set(rotated.map((p) => ({ pairId: p.id, meaning: p.meaning })));
  }

  readonly total = computed(() => this.step().pairs.length);
  readonly matchedCount = computed(() => this.matched().size);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.matchedCount() / this.total()) * 100),
  );
  readonly allMatched = computed(() => this.total() > 0 && this.matchedCount() === this.total());

  isMatched(pairId: string): boolean {
    return this.matched().has(pairId);
  }

  colourSlot(pairId: string): number | null {
    return this.matched().get(pairId) ?? null;
  }

  termClass(pair: MoneyMatchPair): string {
    if (this.isMatched(pair.id)) return 'is-matched slot-' + this.colourSlot(pair.id);
    if (this.pickedTerm() === pair.id) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  meaningClass(card: MeaningCard): string {
    if (this.isMatched(card.pairId)) return 'is-matched slot-' + this.colourSlot(card.pairId);
    if (this.pickedMeaning() === card.pairId) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  pickTerm(pair: MoneyMatchPair): void {
    if (this.isMatched(pair.id) || this.wrongFlash()) return;
    this.pickedTerm.set(this.pickedTerm() === pair.id ? null : pair.id);
    this.tryResolve();
  }

  pickMeaning(card: MeaningCard): void {
    if (this.isMatched(card.pairId) || this.wrongFlash()) return;
    this.pickedMeaning.set(this.pickedMeaning() === card.pairId ? null : card.pairId);
    this.tryResolve();
  }

  private tryResolve(): void {
    const t = this.pickedTerm();
    const m = this.pickedMeaning();
    if (!t || !m) return;

    if (t === m) {
      this.matched.update((map) => {
        const next = new Map(map);
        next.set(t, next.size % 4);
        return next;
      });
      this.pickedTerm.set(null);
      this.pickedMeaning.set(null);
      return;
    }

    this.wrongFlash.set(`${t}|${m}`);
    setTimeout(() => {
      this.wrongFlash.set(null);
      this.pickedTerm.set(null);
      this.pickedMeaning.set(null);
    }, 650);
  }

  finish(): void {
    if (this.allMatched()) this.continued.emit();
  }
}
