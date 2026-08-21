import { Component, computed, input, output, signal } from '@angular/core';
import { DiscussionMcqStep, ExerciseOption } from '../../core/models/module.model';

@Component({
  selector: 'app-discussion-mcq-step-view',
  standalone: true,
  templateUrl: './discussion-mcq-step-view.html',
  styleUrl: './discussion-mcq-step-view.scss',
})
export class DiscussionMcqStepView {
  readonly step = input.required<DiscussionMcqStep>();
  readonly submitted = output<Record<string, string>>();

  readonly activeIndex = signal(0);
  /** questionId -> selected option's text, so the review screen can just print it. */
  readonly answers = signal<Record<string, string>>({});

  readonly reviewing = computed(() => this.activeIndex() >= this.step().questions.length);
  readonly currentQuestion = computed(() => this.step().questions[this.activeIndex()] ?? null);
  readonly isLastQuestion = computed(() => this.activeIndex() === this.step().questions.length - 1);

  selectOption(questionId: string, option: ExerciseOption): void {
    this.answers.update((draft) => ({ ...draft, [questionId]: option.text }));
  }

  next(): void {
    const question = this.currentQuestion();
    if (!question || !this.answers()[question.id]) return;
    this.activeIndex.update((i) => i + 1);
  }

  finish(): void {
    this.submitted.emit(this.answers());
  }
}
