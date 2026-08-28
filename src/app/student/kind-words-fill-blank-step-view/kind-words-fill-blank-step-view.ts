import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { KindWordsBlankSentence, KindWordsFillBlankStep } from '../../core/models/module.model';

interface SentenceView {
  sentence: KindWordsBlankSentence;
  chips: string[];
}

/** Deterministic shuffle so the chip order is stable between change-detection runs. */
function shuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

@Component({
  selector: 'app-kind-words-fill-blank-step-view',
  standalone: true,
  templateUrl: './kind-words-fill-blank-step-view.html',
  styleUrl: './kind-words-fill-blank-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KindWordsFillBlankStepView {
  readonly step = input.required<KindWordsFillBlankStep>();
  readonly continued = output<void>();

  /** The word locked into each sentence's blank, keyed by sentence id. */
  readonly filled = signal<Record<string, string>>({});
  /** The most recent wrong chip per sentence, cleared on a correct pick. */
  readonly misses = signal<Record<string, string>>({});

  readonly views = computed<SentenceView[]>(() =>
    this.step().sentences.map((sentence, i) => ({
      sentence,
      chips: shuffle([...sentence.answers, ...sentence.distractors], i + 1),
    })),
  );

  readonly total = computed(() => this.step().sentences.length);
  readonly doneCount = computed(() => Object.keys(this.filled()).length);
  readonly progressPercent = computed(() =>
    this.total() ? Math.round((this.doneCount() / this.total()) * 100) : 0,
  );
  readonly allDone = computed(() => this.doneCount() === this.total());

  filledWord(id: string): string | null {
    return this.filled()[id] ?? null;
  }

  missWord(id: string): string | null {
    return this.misses()[id] ?? null;
  }

  pick(sentence: KindWordsBlankSentence, word: string): void {
    if (this.filledWord(sentence.id)) return;

    if (sentence.answers.includes(word)) {
      this.misses.update((m) => {
        const next = { ...m };
        delete next[sentence.id];
        return next;
      });
      this.filled.update((f) => ({ ...f, [sentence.id]: word }));
      return;
    }

    this.misses.update((m) => ({ ...m, [sentence.id]: word }));
  }

  finish(): void {
    if (this.allDone()) this.continued.emit();
  }
}
