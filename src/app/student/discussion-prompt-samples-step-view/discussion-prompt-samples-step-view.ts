import { Component, computed, input, output, signal } from '@angular/core';
import { DiscussionPromptSamplesStep } from '../../core/models/module.model';

@Component({
  selector: 'app-discussion-prompt-samples-step-view',
  standalone: true,
  templateUrl: './discussion-prompt-samples-step-view.html',
  styleUrl: './discussion-prompt-samples-step-view.scss',
})
export class DiscussionPromptSamplesStepView {
  readonly step = input.required<DiscussionPromptSamplesStep>();
  readonly continued = output<void>();

  readonly qIndex = signal(0);
  readonly draft = signal('');
  readonly submitted = signal(false);
  /** How many of the current question's sample answers have been revealed so far. */
  readonly revealedCount = signal(0);
  readonly showKeyLesson = signal(false);

  readonly currentPrompt = computed(() => this.step().prompts[this.qIndex()] ?? null);
  readonly canSubmit = computed(() => this.draft().trim().length > 0);
  readonly isLastQuestion = computed(() => this.qIndex() === this.step().prompts.length - 1);
  readonly allSamplesRevealed = computed(() => {
    const prompt = this.currentPrompt();
    return !prompt || this.revealedCount() >= prompt.sampleAnswers.length;
  });

  setDraft(value: string): void {
    this.draft.set(value);
  }

  submitAnswer(): void {
    if (!this.canSubmit()) return;
    this.submitted.set(true);
    // Reveal the first sample answer right away, per the spec — the rest come one at a time.
    this.revealedCount.set(1);
  }

  revealNextSample(): void {
    if (this.allSamplesRevealed()) return;
    this.revealedCount.update((count) => count + 1);
  }

  nextQuestion(): void {
    if (this.isLastQuestion()) {
      this.showKeyLesson.set(true);
      return;
    }
    this.qIndex.update((i) => i + 1);
    this.draft.set('');
    this.submitted.set(false);
    this.revealedCount.set(0);
  }

  finish(): void {
    this.continued.emit();
  }
}
