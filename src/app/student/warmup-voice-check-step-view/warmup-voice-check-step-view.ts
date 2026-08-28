import { Component, computed, input, output, signal } from '@angular/core';
import { WarmupVoiceCheckOption, WarmupVoiceCheckStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

@Component({
  selector: 'app-warmup-voice-check-step-view',
  standalone: true,
  templateUrl: './warmup-voice-check-step-view.html',
  styleUrl: './warmup-voice-check-step-view.scss',
})
export class WarmupVoiceCheckStepView {
  readonly step = input.required<WarmupVoiceCheckStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  optionState(option: WarmupVoiceCheckOption): 'correct' | 'incorrect' | null {
    if (this.selectedOptionId() !== option.id) return null;
    return this.feedback();
  }

  listen(): void {
    const question = this.currentQuestion();
    if (!question) return;
    const speech = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!speech) return;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(question.listenText);
    utterance.rate = 0.95;
    speech.speak(utterance);
  }

  selectOption(option: WarmupVoiceCheckOption): void {
    if (this.locked()) return;
    const question = this.currentQuestion();
    if (!question) return;

    const correct = option.id === question.correctOptionId;
    this.selectedOptionId.set(option.id);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        this.selectedOptionId.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        if (correct) this.activeIndex.update((i) => i + 1);
      },
      correct ? 1800 : 900
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
