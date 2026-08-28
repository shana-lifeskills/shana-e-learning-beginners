import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { BehaviourMatchPair, BehaviourMatchStep } from '../../core/models/module.model';

interface MeaningCard {
  pairId: string;
  meaning: string;
}

@Component({
  selector: 'app-behaviour-match-step-view',
  standalone: true,
  templateUrl: './behaviour-match-step-view.html',
  styleUrl: './behaviour-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BehaviourMatchStepView implements OnInit {
  readonly step = input.required<BehaviourMatchStep>();
  readonly continued = output<void>();

  /** Meanings in a stable shuffled order (set once). */
  readonly meanings = signal<MeaningCard[]>([]);
  /** pairId -> colour slot index, for pairs the learner has matched. */
  readonly matched = signal<Map<string, number>>(new Map());

  readonly pickedBehaviour = signal<string | null>(null);
  readonly pickedMeaning = signal<string | null>(null);
  /** Set briefly to the two picked ids when a wrong attempt is made. */
  readonly wrongFlash = signal<string | null>(null);

  ngOnInit(): void {
    const pairs = this.step().pairs;
    // Deterministic shuffle: reverse then rotate by 2, so meanings never sit
    // beside their behaviour but the order is stable across change detection.
    const rotated = [...pairs].reverse();
    const offset = rotated.slice(2).concat(rotated.slice(0, 2));
    this.meanings.set(offset.map((p) => ({ pairId: p.id, meaning: p.meaning })));
  }

  readonly total = computed(() => this.step().pairs.length);
  readonly matchedCount = computed(() => this.matched().size);
  readonly progressPercent = computed(() => Math.round((this.matchedCount() / this.total()) * 100));
  readonly allMatched = computed(() => this.matchedCount() === this.total());

  isMatched(pairId: string): boolean {
    return this.matched().has(pairId);
  }

  colourSlot(pairId: string): number | null {
    return this.matched().get(pairId) ?? null;
  }

  behaviourClass(pair: BehaviourMatchPair): string {
    if (this.isMatched(pair.id)) return 'is-matched slot-' + this.colourSlot(pair.id);
    if (this.pickedBehaviour() === pair.id) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  meaningClass(card: MeaningCard): string {
    if (this.isMatched(card.pairId)) return 'is-matched slot-' + this.colourSlot(card.pairId);
    if (this.pickedMeaning() === card.pairId) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  pickBehaviour(pair: BehaviourMatchPair): void {
    if (this.isMatched(pair.id) || this.wrongFlash()) return;
    this.pickedBehaviour.set(this.pickedBehaviour() === pair.id ? null : pair.id);
    this.tryResolve();
  }

  pickMeaning(card: MeaningCard): void {
    if (this.isMatched(card.pairId) || this.wrongFlash()) return;
    this.pickedMeaning.set(this.pickedMeaning() === card.pairId ? null : card.pairId);
    this.tryResolve();
  }

  private tryResolve(): void {
    const b = this.pickedBehaviour();
    const m = this.pickedMeaning();
    if (!b || !m) return;

    if (b === m) {
      this.matched.update((map) => {
        const next = new Map(map);
        next.set(b, next.size % 5);
        return next;
      });
      this.pickedBehaviour.set(null);
      this.pickedMeaning.set(null);
      return;
    }

    this.wrongFlash.set(`${b}|${m}`);
    setTimeout(() => {
      this.wrongFlash.set(null);
      this.pickedBehaviour.set(null);
      this.pickedMeaning.set(null);
    }, 650);
  }

  finish(): void {
    if (this.allMatched()) this.continued.emit();
  }
}
