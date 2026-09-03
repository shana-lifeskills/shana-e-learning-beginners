import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { HygieneHabitMatchPair, HygieneHabitMatchStep } from '../../core/models/module.model';

interface PurposeCard {
  pairId: string;
  purpose: string;
}

/**
 * "Warm-Up – Matching" game (Hygiene Module, Week 2). Tap a habit then the
 * purpose it serves: a correct pair links up in a colour and locks, a wrong
 * pair flashes and clears. Continue unlocks once every pair is matched. Its own
 * visual design — see `HygieneHabitMatchStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-habit-match-step-view',
  standalone: true,
  templateUrl: './hygiene-habit-match-step-view.html',
  styleUrl: './hygiene-habit-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneHabitMatchStepView implements OnInit {
  readonly step = input.required<HygieneHabitMatchStep>();
  readonly continued = output<void>();

  /** Purposes in a stable shuffled order (set once). */
  readonly purposes = signal<PurposeCard[]>([]);
  /** pairId -> colour slot index, for pairs the learner has matched. */
  readonly matched = signal<Map<string, number>>(new Map());

  readonly pickedHabit = signal<string | null>(null);
  readonly pickedPurpose = signal<string | null>(null);
  /** Set briefly to the two picked ids when a wrong attempt is made. */
  readonly wrongFlash = signal<string | null>(null);

  ngOnInit(): void {
    const pairs = this.step().pairs;
    // Deterministic shuffle: reverse then rotate by 1, so a purpose never sits
    // beside its habit but the order is stable across change detection.
    const rotated = [...pairs].reverse();
    const shuffled = rotated.slice(1).concat(rotated.slice(0, 1));
    this.purposes.set(shuffled.map((p) => ({ pairId: p.id, purpose: p.purpose })));
  }

  readonly total = computed(() => this.step().pairs.length);
  readonly matchedCount = computed(() => this.matched().size);
  readonly progressPercent = computed(() => Math.round((this.matchedCount() / this.total()) * 100));
  readonly allMatched = computed(() => this.matchedCount() === this.total());

  isMatched(pairId: string): boolean {
    return this.matched().has(pairId);
  }

  slot(pairId: string): number | null {
    return this.matched().get(pairId) ?? null;
  }

  habitClass(pair: HygieneHabitMatchPair): string {
    if (this.isMatched(pair.id)) return 'is-matched slot-' + this.slot(pair.id);
    if (this.pickedHabit() === pair.id) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  purposeClass(card: PurposeCard): string {
    if (this.isMatched(card.pairId)) return 'is-matched slot-' + this.slot(card.pairId);
    if (this.pickedPurpose() === card.pairId) return this.wrongFlash() ? 'is-wrong' : 'is-picked';
    return '';
  }

  pickHabit(pair: HygieneHabitMatchPair): void {
    if (this.isMatched(pair.id) || this.wrongFlash()) return;
    this.pickedHabit.set(this.pickedHabit() === pair.id ? null : pair.id);
    this.tryResolve();
  }

  pickPurpose(card: PurposeCard): void {
    if (this.isMatched(card.pairId) || this.wrongFlash()) return;
    this.pickedPurpose.set(this.pickedPurpose() === card.pairId ? null : card.pairId);
    this.tryResolve();
  }

  private tryResolve(): void {
    const h = this.pickedHabit();
    const p = this.pickedPurpose();
    if (!h || !p) return;

    if (h === p) {
      this.matched.update((map) => {
        const next = new Map(map);
        next.set(h, next.size % 5);
        return next;
      });
      this.pickedHabit.set(null);
      this.pickedPurpose.set(null);
      return;
    }

    this.wrongFlash.set(`${h}|${p}`);
    setTimeout(() => {
      this.wrongFlash.set(null);
      this.pickedHabit.set(null);
      this.pickedPurpose.set(null);
    }, 650);
  }

  finish(): void {
    if (this.allMatched()) this.continued.emit();
  }
}
