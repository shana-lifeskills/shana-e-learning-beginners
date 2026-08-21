import { Component, computed, input, output, signal } from '@angular/core';
import { WarmupChatStep, WarmupQuestion } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-chat-step-view',
  standalone: true,
  templateUrl: './warmup-chat-step-view.html',
  styleUrl: './warmup-chat-step-view.scss',
})
export class WarmupChatStepView {
  readonly step = input.required<WarmupChatStep>();
  readonly submitted = output<Record<string, string>>();

  readonly answers = signal<Record<string, string>>({});
  readonly activeQuestionId = signal<string | null>(null);

  readonly allAnswered = computed(() => this.step().questions.every((q) => (this.answers()[q.id] ?? '').trim().length > 0));

  isAnswered(question: WarmupQuestion): boolean {
    return (this.answers()[question.id] ?? '').trim().length > 0;
  }

  recapLine(question: WarmupQuestion): string {
    const answer = this.answers()[question.id] ?? '';
    return question.recapTemplate.replace('{answer}', answer);
  }

  selectQuestion(id: string): void {
    this.activeQuestionId.set(this.activeQuestionId() === id ? null : id);
  }

  updateAnswer(id: string, value: string): void {
    this.answers.update((draft) => ({ ...draft, [id]: value }));
  }

  /** Saves the current question's answer, then opens the next unanswered one, if any. */
  confirmAnswer(id: string): void {
    if (!(this.answers()[id] ?? '').trim()) return;

    const next = this.step().questions.find((q) => q.id !== id && !this.isAnswered(q));
    this.activeQuestionId.set(next?.id ?? null);
  }

  finish(): void {
    if (!this.allAnswered()) return;
    this.submitted.emit(this.answers());
  }
}
