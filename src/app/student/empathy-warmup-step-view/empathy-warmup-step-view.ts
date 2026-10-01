import { Component, input, output, signal } from '@angular/core';
import { EmpathyWarmupOption, EmpathyWarmupStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** A single-question warm-up — pick wrong and try again, pick right and
 *  read the feedback before continuing. No hero image (unlike the other
 *  warmup-quiz variants) since this one doesn't need one. */
@Component({
  selector: 'app-empathy-warmup-step-view',
  standalone: true,
  templateUrl: './empathy-warmup-step-view.html',
  styleUrl: './empathy-warmup-step-view.scss',
})
export class EmpathyWarmupStepView {
  readonly step = input.required<EmpathyWarmupStep>();
  readonly continued = output<void>();

  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: EmpathyWarmupOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  selectOption(option: EmpathyWarmupOption): void {
    if (this.locked()) return;
    const correct = option.id === this.step().correctOptionId;
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');

    if (correct) {
      this.locked.set(true);
      return;
    }

    // Wrong answers just get a beat to see the shake, then reset so the
    // student can try again — same "retry until correct" pattern as the
    // other warm-up quizzes.
    setTimeout(() => {
      this.selectedOptionId.set(null);
      this.feedback.set(null);
    }, 900);
  }

  finish(): void {
    this.continued.emit();
  }
}
