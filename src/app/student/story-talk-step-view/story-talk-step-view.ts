import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { StoryTalkStep } from '../../core/models/module.model';

/**
 * "Let's Talk About the Story" free-response Q&A (Planning Module — Advanced,
 * Week 1). Each question: the learner types an answer (required), submits, then
 * reveals a suggested/model answer or a list of what other learners said,
 * followed by a lesson tip. Nothing is graded — the only gate is that every
 * question must be answered in the learner's own words before Continue appears.
 * Its own design — see `StoryTalkStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-story-talk-step-view',
  standalone: true,
  templateUrl: './story-talk-step-view.html',
  styleUrl: './story-talk-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryTalkStepView {
  readonly step = input.required<StoryTalkStep>();
  readonly continued = output<void>();

  readonly index = signal(0);
  readonly draft = signal('');
  readonly submitted = signal(false);

  readonly total = computed(() => this.step().questions.length);
  readonly question = computed(() => this.step().questions[this.index()] ?? null);
  readonly isLast = computed(() => this.index() === this.total() - 1);
  readonly canSubmit = computed(() => this.draft().trim().length > 0);

  setDraft(value: string): void {
    this.draft.set(value);
  }

  submit(): void {
    if (!this.canSubmit() || this.submitted()) return;
    this.submitted.set(true);
  }

  advance(): void {
    if (!this.submitted()) return;
    if (this.isLast()) {
      this.continued.emit();
      return;
    }
    this.index.update((i) => i + 1);
    this.draft.set('');
    this.submitted.set(false);
  }
}
