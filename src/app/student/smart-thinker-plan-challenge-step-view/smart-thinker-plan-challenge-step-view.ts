import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SmartThinkerPlanChallengeStep } from '../../core/models/module.model';

/**
 * "Final Challenge: The Smart Thinker Plan" — Thinking module, Week 4. A gold
 * medal fills a segment for each of five days the learner pauses before a
 * decision; at the end they write up one real decision. Submitting with every
 * day marked and the example written lights the medal; Finish then emits the
 * write-up so the module can close and award a star.
 */
@Component({
  selector: 'app-smart-thinker-plan-challenge-step-view',
  standalone: true,
  templateUrl: './smart-thinker-plan-challenge-step-view.html',
  styleUrl: './smart-thinker-plan-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartThinkerPlanChallengeStepView {
  readonly step = input.required<SmartThinkerPlanChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly doneDays = signal<Set<number>>(new Set());
  readonly decision = signal('');
  readonly answers = signal<Record<string, string>>({});
  readonly sampleShown = signal(false);
  /** 'plan' while filling in, 'done' once the medal is earned. */
  readonly phase = signal<'plan' | 'done'>('plan');

  readonly daysDone = computed(() => this.doneDays().size);
  readonly allDaysDone = computed(() => this.daysDone() === this.step().dayLabels.length);
  readonly exampleFilled = computed(() => {
    const a = this.answers();
    return (
      this.decision().trim().length > 0 &&
      this.step().exampleQuestions.every((q) => (a[q.id] ?? '').trim().length > 0)
    );
  });
  readonly canSubmit = computed(() => this.allDaysDone() && this.exampleFilled());

  isDayDone(i: number): boolean {
    return this.doneDays().has(i);
  }

  toggleDay(i: number): void {
    if (this.phase() === 'done') return;
    this.doneDays.update((set) => {
      const next = new Set(set);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

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
    if (!this.canSubmit() || this.phase() === 'done') return;
    this.phase.set('done');
  }

  finish(): void {
    const a = this.answers();
    const payload: Record<string, string> = {
      'Days completed': `${this.daysDone()} / ${this.step().dayLabels.length}`,
      'My decision': this.decision().trim(),
    };
    this.step().exampleQuestions.forEach((q) => (payload[q.prompt] = (a[q.id] ?? '').trim()));
    this.submitted.emit(payload);
  }
}
