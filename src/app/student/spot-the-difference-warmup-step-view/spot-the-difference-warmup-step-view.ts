import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SpotTheDifferenceWarmupStep } from '../../core/models/module.model';

/**
 * "Spot the Difference" warm-up — Thinking module, Week 1. Two hand-drawn SVG
 * scenes sit side by side with a few planted differences; below them the learner
 * writes an answer to each observation question. Answering a question ticks a
 * magnifier along the "clues found" trail and unlocks that card's sample-answer
 * reveal. The Continue button stays locked until every question has a written
 * answer, then an encouraging feedback banner appears.
 */
@Component({
  selector: 'app-spot-the-difference-warmup-step-view',
  standalone: true,
  templateUrl: './spot-the-difference-warmup-step-view.html',
  styleUrl: './spot-the-difference-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotTheDifferenceWarmupStepView {
  readonly step = input.required<SpotTheDifferenceWarmupStep>();
  readonly continued = output<void>();

  /** Current text in each answer box, keyed by question id. */
  readonly answers = signal<Record<string, string>>({});
  /** Ids of questions whose sample answer the learner has revealed. */
  readonly revealed = signal<Set<string>>(new Set());

  readonly total = computed(() => this.step().questions.length);
  readonly answeredCount = computed(() => {
    const answers = this.answers();
    return this.step().questions.filter((q) => (answers[q.id] ?? '').trim().length > 0).length;
  });
  readonly allAnswered = computed(() => this.answeredCount() === this.total());

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
