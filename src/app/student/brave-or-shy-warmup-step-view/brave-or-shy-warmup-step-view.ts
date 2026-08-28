import { Component, computed, input, output, signal } from '@angular/core';
import {
  BraveOrShyOption,
  BraveOrShyPictureQuestion,
  BraveOrShyWarmupStep,
} from '../../core/models/module.model';

type Phase = 'intro' | 'look' | 'voice' | 'try' | 'reflect' | 'done';

const ORDER: Phase[] = ['intro', 'look', 'voice', 'try', 'reflect', 'done'];

@Component({
  selector: 'app-brave-or-shy-warmup-step-view',
  standalone: true,
  templateUrl: './brave-or-shy-warmup-step-view.html',
  styleUrl: './brave-or-shy-warmup-step-view.scss',
})
export class BraveOrShyWarmupStepView {
  readonly step = input.required<BraveOrShyWarmupStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('intro');

  readonly pictureAnswers = signal<Record<string, string>>({});
  readonly voiceAnswer = signal<string | null>(null);
  readonly tryDone = signal(false);
  readonly reflectAnswer = signal<'yes' | 'no' | null>(null);
  readonly imageErrors = signal<Set<string>>(new Set());

  /** 0-based index into the 5 stepper segments (done counts as past the last). */
  readonly stepIndex = computed(() => Math.min(ORDER.indexOf(this.phase()), 4));

  readonly lookComplete = computed(() => {
    const answers = this.pictureAnswers();
    return this.step().pictureQuestions.every((q) => !!answers[q.id]);
  });
  readonly voiceComplete = computed(() => this.voiceAnswer() !== null);
  readonly reflectComplete = computed(() => this.reflectAnswer() !== null);

  readonly canAdvance = computed(() => {
    switch (this.phase()) {
      case 'look':
        return this.lookComplete();
      case 'voice':
        return this.voiceComplete();
      case 'try':
        return this.tryDone();
      case 'reflect':
        return this.reflectComplete();
      default:
        return true;
    }
  });

  readonly nextLabel = computed(() => (this.phase() === 'reflect' ? 'Finish!' : 'Next'));

  pictureState(q: BraveOrShyPictureQuestion, option: BraveOrShyOption): 'correct' | 'incorrect' | null {
    const picked = this.pictureAnswers()[q.id];
    if (picked !== option.id) return null;
    return option.id === q.correctOptionId ? 'correct' : 'incorrect';
  }

  pictureFeedback(q: BraveOrShyPictureQuestion): string | null {
    return this.pictureAnswers()[q.id] ? q.feedbackText : null;
  }

  selectPicture(q: BraveOrShyPictureQuestion, option: BraveOrShyOption): void {
    this.pictureAnswers.update((a) => ({ ...a, [q.id]: option.id }));
  }

  imageFailed(id: string): boolean {
    return this.imageErrors().has(id);
  }

  onImageError(id: string): void {
    this.imageErrors.update((s) => new Set(s).add(id));
  }

  voiceState(option: BraveOrShyOption): 'correct' | 'incorrect' | null {
    if (this.voiceAnswer() === null) return null;
    return option.id === this.step().voiceQuestion.correctOptionId ? 'correct' : 'incorrect';
  }

  readonly voiceFeedback = computed(() => {
    const picked = this.voiceAnswer();
    if (picked === null) return null;
    const q = this.step().voiceQuestion;
    return picked === q.correctOptionId ? q.feedbackText : q.wrongFeedbackText;
  });

  readonly voiceFeedbackCorrect = computed(
    () => this.voiceAnswer() !== null && this.voiceAnswer() === this.step().voiceQuestion.correctOptionId
  );

  playClip(text: string, rate: number): void {
    const speech = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!speech) return;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    speech.speak(utterance);
  }

  selectVoice(option: BraveOrShyOption): void {
    this.voiceAnswer.set(option.id);
  }

  markTryDone(): void {
    this.tryDone.set(true);
  }

  selectReflect(value: 'yes' | 'no'): void {
    this.reflectAnswer.set(value);
  }

  next(): void {
    if (!this.canAdvance()) return;
    const i = ORDER.indexOf(this.phase());
    if (i < ORDER.length - 1) this.phase.set(ORDER[i + 1]);
  }

  back(): void {
    const i = ORDER.indexOf(this.phase());
    if (i > 0) this.phase.set(ORDER[i - 1]);
  }

  playAgain(): void {
    this.pictureAnswers.set({});
    this.voiceAnswer.set(null);
    this.tryDone.set(false);
    this.reflectAnswer.set(null);
    this.phase.set('intro');
  }

  finish(): void {
    this.continued.emit();
  }
}
