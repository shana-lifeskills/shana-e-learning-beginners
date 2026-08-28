import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { FillBlankSentence, FillBlankWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-fill-blank-warmup-step-view',
  standalone: true,
  templateUrl: './fill-blank-warmup-step-view.html',
  styleUrl: './fill-blank-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillBlankWarmupStepView implements OnInit {
  readonly step = input.required<FillBlankWarmupStep>();
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
    // Drop one bank entry per sentence that has been filled.
    for (const s of this.step().sentences) {
      if (!filled.has(s.id)) continue;
      const idx = copy.indexOf(s.answer);
      if (idx !== -1) copy.splice(idx, 1);
    }
    return copy;
  });

  wordFor(sentence: FillBlankSentence): string | null {
    return this.filled().has(sentence.id) ? sentence.answer : null;
  }

  pickWord(word: string): void {
    this.picked.update((p) => (p === word ? null : word));
    this.rejectedId.set(null);
  }

  placeInBlank(sentence: FillBlankSentence): void {
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
