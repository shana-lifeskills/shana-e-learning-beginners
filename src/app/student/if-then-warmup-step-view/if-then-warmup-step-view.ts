import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IfThenWarmupStep } from '../../core/models/module.model';

/**
 * "If… Then…" warm-up — Thinking module, Week 4. Each question pairs an "IF"
 * domino with a "THEN…" answer slot; writing an answer topples the domino and
 * lights the chain. The Continue button stays locked until every question has a
 * written answer.
 */
@Component({
  selector: 'app-if-then-warmup-step-view',
  standalone: true,
  templateUrl: './if-then-warmup-step-view.html',
  styleUrl: './if-then-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfThenWarmupStepView {
  readonly step = input.required<IfThenWarmupStep>();
  readonly continued = output<void>();

  readonly answers = signal<Record<string, string>>({});
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
