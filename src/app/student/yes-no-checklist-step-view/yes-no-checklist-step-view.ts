import { Component, computed, input, output, signal } from '@angular/core';
import { YesNoChecklistStep } from '../../core/models/module.model';

type QuestionState = 'unanswered' | 'correct' | 'incorrect';

@Component({
  selector: 'app-yes-no-checklist-step-view',
  standalone: true,
  templateUrl: './yes-no-checklist-step-view.html',
  styleUrl: './yes-no-checklist-step-view.scss',
})
export class YesNoChecklistStepView {
  readonly step = input.required<YesNoChecklistStep>();
  readonly continued = output<void>();

  readonly states = signal<Record<string, QuestionState>>({});
  readonly selections = signal<Record<string, 'yes' | 'no'>>({});
  readonly locked = signal<Record<string, boolean>>({});

  readonly allCorrect = computed(() => this.step().questions.every((q) => this.states()[q.id] === 'correct'));

  stateFor(questionId: string): QuestionState {
    return this.states()[questionId] ?? 'unanswered';
  }

  selectionFor(questionId: string): 'yes' | 'no' | null {
    return this.selections()[questionId] ?? null;
  }

  isLocked(questionId: string): boolean {
    return this.locked()[questionId] ?? false;
  }

  selectAnswer(questionId: string, answer: 'yes' | 'no', correctAnswer: 'yes' | 'no'): void {
    if (this.isLocked(questionId)) return;

    const correct = answer === correctAnswer;
    this.selections.update((s) => ({ ...s, [questionId]: answer }));
    this.states.update((s) => ({ ...s, [questionId]: correct ? 'correct' : 'incorrect' }));

    if (!correct) {
      this.locked.update((l) => ({ ...l, [questionId]: true }));
      setTimeout(() => {
        this.states.update((s) => ({ ...s, [questionId]: 'unanswered' }));
        this.selections.update((s) => {
          const next = { ...s };
          delete next[questionId];
          return next;
        });
        this.locked.update((l) => ({ ...l, [questionId]: false }));
      }, 900);
    }
  }

  finish(): void {
    this.continued.emit();
  }
}
