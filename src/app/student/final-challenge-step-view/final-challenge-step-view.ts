import { Component, computed, input, output, signal } from '@angular/core';
import { FinalChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-final-challenge-step-view',
  standalone: true,
  templateUrl: './final-challenge-step-view.html',
  styleUrl: './final-challenge-step-view.scss',
})
export class FinalChallengeStepView {
  readonly step = input.required<FinalChallengeStep>();
  readonly continued = output<void>();

  readonly quoteIndex = signal(0);
  readonly quote = computed(() => this.step().confidenceQuotes[this.quoteIndex() % this.step().confidenceQuotes.length]);

  tryAnother(): void {
    this.quoteIndex.update((i) => i + 1);
  }

  finish(): void {
    this.continued.emit();
  }
}
