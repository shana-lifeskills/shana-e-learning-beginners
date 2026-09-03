import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { NutritionFillBlankSentence, NutritionFillBlankStep } from '../../core/models/module.model';

/**
 * "Fill in the Blank" game (Nutrition Module, Week 4). Tap a word from the bank
 * then the blank it belongs in: the right word snaps in and its token leaves
 * the bank, a wrong word shakes the strip and stays available. Continue unlocks
 * once every blank is filled. Its own visual design — see `NutritionFillBlankStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-nutrition-fill-blank-step-view',
  standalone: true,
  templateUrl: './nutrition-fill-blank-step-view.html',
  styleUrl: './nutrition-fill-blank-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionFillBlankStepView implements OnInit {
  readonly step = input.required<NutritionFillBlankStep>();
  readonly continued = output<void>();

  /** The word-bank order, shuffled once on init. */
  readonly bank = signal<string[]>([]);
  /** Sentence ids whose blank has been filled correctly. */
  readonly filled = signal<Set<string>>(new Set());
  /** The word tile the learner has picked up, if any. */
  readonly picked = signal<string | null>(null);
  /** Sentence id that just rejected a wrong word — drives the shake. */
  readonly rejectedId = signal<string | null>(null);
  /** Praise from the most recently filled sentence. */
  readonly lastPraise = signal<string | null>(null);

  ngOnInit(): void {
    const words = this.step().sentences.map((s) => s.answer);
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    this.bank.set(words);
  }

  readonly total = computed(() => this.step().sentences.length);
  readonly filledCount = computed(() => this.filled().size);
  readonly progressPercent = computed(() => Math.round((this.filledCount() / this.total()) * 100));
  readonly allFilled = computed(() => this.filledCount() === this.total());

  /** Words still available — an answer leaves the bank once its sentence is filled. */
  readonly remainingBank = computed(() => {
    const filled = this.filled();
    const copy = [...this.bank()];
    for (const s of this.step().sentences) {
      if (!filled.has(s.id)) continue;
      const idx = copy.indexOf(s.answer);
      if (idx !== -1) copy.splice(idx, 1);
    }
    return copy;
  });

  isFilled(sentence: NutritionFillBlankSentence): boolean {
    return this.filled().has(sentence.id);
  }

  isRejected(sentence: NutritionFillBlankSentence): boolean {
    return this.rejectedId() === sentence.id;
  }

  pickWord(word: string): void {
    this.picked.update((p) => (p === word ? null : word));
    this.rejectedId.set(null);
  }

  placeInBlank(sentence: NutritionFillBlankSentence): void {
    const word = this.picked();
    if (!word || this.filled().has(sentence.id)) return;

    if (word === sentence.answer) {
      this.filled.update((set) => {
        const next = new Set(set);
        next.add(sentence.id);
        return next;
      });
      this.lastPraise.set(sentence.praise);
      this.picked.set(null);
      this.rejectedId.set(null);
      return;
    }

    this.rejectedId.set(sentence.id);
    this.picked.set(null);
  }

  finish(): void {
    if (this.allFilled()) this.continued.emit();
  }
}
