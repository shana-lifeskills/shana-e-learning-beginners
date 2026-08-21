import { Component, computed, input, output, signal } from '@angular/core';
import { ChallengeChecklistStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-checklist-step-view',
  standalone: true,
  templateUrl: './challenge-checklist-step-view.html',
  styleUrl: './challenge-checklist-step-view.scss',
})
export class ChallengeChecklistStepView {
  readonly step = input.required<ChallengeChecklistStep>();
  readonly continued = output<void>();

  readonly doneIds = signal<Set<string>>(new Set());

  readonly doneCount = computed(() => this.doneIds().size);
  readonly progressPercent = computed(() => {
    const total = this.step().items.length;
    return total === 0 ? 0 : Math.round((this.doneCount() / total) * 100);
  });

  isDone(id: string): boolean {
    return this.doneIds().has(id);
  }

  toggle(id: string): void {
    this.doneIds.update((ids) => {
      const next = new Set(ids);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
