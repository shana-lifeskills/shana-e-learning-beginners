import { Component, computed, input, output, signal } from '@angular/core';
import { DiscussionTrueFalseStep } from '../../core/models/module.model';

/**
 * A graded "discussion points" step in True/False form — the same
 * one-statement-at-a-time flow and review screen as DiscussionQuizStep, but
 * each statement is judged True or False: picking wrong shows feedback and
 * lets the student try again instead of advancing.
 */
@Component({
  selector: 'app-discussion-true-false-step-view',
  standalone: true,
  templateUrl: './discussion-true-false-step-view.html',
  styleUrl: './discussion-true-false-step-view.scss',
})
export class DiscussionTrueFalseStepView {
  readonly step = input.required<DiscussionTrueFalseStep>();
  readonly submitted = output<Record<string, string>>();

  readonly activeIndex = signal(0);
  /** statementId -> "True"/"False", so the review screen can just print it. */
  readonly answers = signal<Record<string, string>>({});

  readonly selectedVerdict = signal<boolean | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly reviewing = computed(() => this.activeIndex() >= this.step().statements.length);
  readonly currentStatement = computed(() => this.step().statements[this.activeIndex()] ?? null);

  verdictState(verdict: boolean): 'correct' | 'incorrect' | null {
    if (this.selectedVerdict() !== verdict) return null;
    return this.feedback();
  }

  selectVerdict(verdict: boolean): void {
    if (this.locked()) return;
    const statement = this.currentStatement();
    if (!statement) return;

    const correct = verdict === statement.answer;
    this.selectedVerdict.set(verdict);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        if (correct) {
          this.answers.update((draft) => ({ ...draft, [statement.id]: verdict ? 'True' : 'False' }));
          this.selectedVerdict.set(null);
          this.feedback.set(null);
          this.locked.set(false);
          this.activeIndex.update((i) => i + 1);
        } else {
          this.selectedVerdict.set(null);
          this.feedback.set(null);
          this.locked.set(false);
        }
      },
      correct && statement.feedbackText ? 1800 : 900,
    );
  }

  finish(): void {
    this.submitted.emit(this.answers());
  }
}
