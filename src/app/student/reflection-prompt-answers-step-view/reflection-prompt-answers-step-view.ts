import { Component, computed, input, output, signal } from '@angular/core';
import { ReflectionPromptAnswersStep } from '../../core/models/module.model';

@Component({
  selector: 'app-reflection-prompt-answers-step-view',
  standalone: true,
  templateUrl: './reflection-prompt-answers-step-view.html',
  styleUrl: './reflection-prompt-answers-step-view.scss',
})
export class ReflectionPromptAnswersStepView {
  readonly step = input.required<ReflectionPromptAnswersStep>();
  readonly continued = output<void>();

  readonly qIndex = signal(0);
  readonly draft = signal('');
  readonly submitted = signal(false);
  /** How many of the current question's peer answers have been revealed so far. */
  readonly revealedCount = signal(0);
  /** Swaps in the optional "keep exploring" card after the last question, when the step sets one. */
  readonly showClosing = signal(false);

  readonly currentPrompt = computed(() => this.step().prompts[this.qIndex()] ?? null);
  readonly canSubmit = computed(() => this.draft().trim().length > 0);
  readonly isLastQuestion = computed(() => this.qIndex() === this.step().prompts.length - 1);
  readonly allAnswersRevealed = computed(() => {
    const prompt = this.currentPrompt();
    return !prompt || this.revealedCount() >= prompt.peerAnswers.length;
  });

  setDraft(value: string): void {
    this.draft.set(value);
  }

  submitAnswer(): void {
    if (!this.canSubmit()) return;
    this.submitted.set(true);
    // Reveal the first peer answer right away — the rest come one at a time.
    this.revealedCount.set(1);
  }

  revealNextAnswer(): void {
    if (this.allAnswersRevealed()) return;
    this.revealedCount.update((count) => count + 1);
  }

  advance(): void {
    if (this.isLastQuestion()) {
      if (this.step().closingHeading) {
        this.showClosing.set(true);
      } else {
        this.continued.emit();
      }
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
