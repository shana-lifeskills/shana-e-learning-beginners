import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ProblemScenarioWarmupStep } from '../../core/models/module.model';

/**
 * "What Would You Do?" warm-up — Thinking module, Week 2. A comic panel draws
 * the tricky moment, then the learner answers a stack of speech-bubble
 * questions. Each written answer fills the "solved" meter and unlocks that
 * bubble's sample answer; the Continue button stays locked until every question
 * has an answer, at which point an optional feedback line appears.
 */
@Component({
  selector: 'app-problem-scenario-warmup-step-view',
  standalone: true,
  templateUrl: './problem-scenario-warmup-step-view.html',
  styleUrl: './problem-scenario-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemScenarioWarmupStepView {
  readonly step = input.required<ProblemScenarioWarmupStep>();
  readonly continued = output<void>();

  readonly answers = signal<Record<string, string>>({});
  readonly revealed = signal<Set<string>>(new Set());

  readonly total = computed(() => this.step().questions.length);
  readonly answeredCount = computed(() => {
    const answers = this.answers();
    return this.step().questions.filter((q) => (answers[q.id] ?? '').trim().length > 0).length;
  });
  readonly allAnswered = computed(() => this.answeredCount() === this.total());
  readonly meterPercent = computed(() => Math.round((this.answeredCount() / this.total()) * 100));

  isAnswered(id: string): boolean {
    return (this.answers()[id] ?? '').trim().length > 0;
  }

  onInput(id: string, value: string): void {
    this.answers.update((map) => ({ ...map, [id]: value }));
  }

  toggleSample(id: string): void {
    if (!this.isAnswered(id)) return;
    this.revealed.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  advance(): void {
    if (this.allAnswered()) this.continued.emit();
  }
}
