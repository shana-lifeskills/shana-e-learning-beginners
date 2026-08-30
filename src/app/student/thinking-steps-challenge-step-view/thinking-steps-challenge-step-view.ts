import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ThinkingStepsChallengeStep } from '../../core/models/module.model';

/**
 * "Challenge of the Week" closing step — Thinking module, Week 2. Three
 * connected step slots ask the learner to write one problem they solved this
 * week (the problem, two solutions, the best one). Submitting with all three
 * filled prints a "solved" receipt; Finish then emits the example so the week
 * can close and award a star.
 */
@Component({
  selector: 'app-thinking-steps-challenge-step-view',
  standalone: true,
  templateUrl: './thinking-steps-challenge-step-view.html',
  styleUrl: './thinking-steps-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinkingStepsChallengeStepView {
  readonly step = input.required<ThinkingStepsChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly answers = signal<Record<string, string>>({});
  readonly sampleShown = signal(false);
  /** 'build' while filling the slots, 'done' once the receipt is printed. */
  readonly phase = signal<'build' | 'done'>('build');

  readonly filledCount = computed(() => {
    const a = this.answers();
    return this.step().steps.filter((s) => (a[s.id] ?? '').trim().length > 0).length;
  });
  readonly allFilled = computed(() => this.filledCount() === this.step().steps.length);

  answerFor(id: string): string {
    return this.answers()[id] ?? '';
  }

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  toggleSample(): void {
    this.sampleShown.update((v) => !v);
  }

  submit(): void {
    if (!this.allFilled() || this.phase() === 'done') return;
    this.phase.set('done');
  }

  finish(): void {
    const a = this.answers();
    const payload: Record<string, string> = {};
    this.step().steps.forEach((s) => (payload[s.prompt] = (a[s.id] ?? '').trim()));
    this.submitted.emit(payload);
  }
}
