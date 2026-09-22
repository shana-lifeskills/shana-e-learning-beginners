import { Component, OnInit, computed, input, output, signal } from '@angular/core';
import { DiscussionFillBlankStep } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * A graded "discussion points" step in fill-in-the-blank form — the same
 * one-sentence-at-a-time flow and review screen as DiscussionTrueFalseStep,
 * but the learner taps the correct word out of a shared word bank instead of
 * a True/False choice. Picking wrong shows feedback and lets the student try
 * again instead of advancing.
 */
@Component({
  selector: 'app-discussion-fill-blank-step-view',
  standalone: true,
  templateUrl: './discussion-fill-blank-step-view.html',
  styleUrl: './discussion-fill-blank-step-view.scss',
})
export class DiscussionFillBlankStepView implements OnInit {
  readonly step = input.required<DiscussionFillBlankStep>();
  readonly submitted = output<Record<string, string>>();

  readonly activeIndex = signal(0);
  /** sentenceId -> the correctly-picked word, so the review screen can just print it. */
  readonly answers = signal<Record<string, string>>({});
  readonly bank = signal<string[]>([]);

  readonly selectedWord = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  ngOnInit(): void {
    this.bank.set(shuffled(this.step().sentences.map((s) => s.answer)));
  }

  readonly reviewing = computed(() => this.activeIndex() >= this.step().sentences.length);
  readonly currentSentence = computed(() => this.step().sentences[this.activeIndex()] ?? null);

  wordState(word: string): 'correct' | 'incorrect' | null {
    if (this.selectedWord() !== word) return null;
    return this.feedback();
  }

  selectWord(word: string): void {
    if (this.locked()) return;
    const sentence = this.currentSentence();
    if (!sentence) return;

    const correct = word === sentence.answer;
    this.selectedWord.set(word);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        if (correct) {
          this.answers.update((draft) => ({ ...draft, [sentence.id]: word }));
          this.bank.update((list) => {
            const idx = list.indexOf(word);
            return idx === -1 ? list : [...list.slice(0, idx), ...list.slice(idx + 1)];
          });
          this.selectedWord.set(null);
          this.feedback.set(null);
          this.locked.set(false);
          this.activeIndex.update((i) => i + 1);
        } else {
          this.selectedWord.set(null);
          this.feedback.set(null);
          this.locked.set(false);
        }
      },
      correct && sentence.feedbackText ? 1800 : 900,
    );
  }

  finish(): void {
    this.submitted.emit(this.answers());
  }
}
