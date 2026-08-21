import { Component, computed, input, output, signal } from '@angular/core';
import { ConfidenceGoalTrackerStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

interface GoalItem {
  id: string;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-confidence-goal-tracker-step-view',
  standalone: true,
  templateUrl: './confidence-goal-tracker-step-view.html',
  styleUrl: './confidence-goal-tracker-step-view.scss',
})
export class ConfidenceGoalTrackerStepView {
  readonly step = input.required<ConfidenceGoalTrackerStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly goalsOverride = signal<GoalItem[] | null>(null);
  readonly goals = computed(
    () => this.goalsOverride() ?? this.step().defaultGoals.map((label, i) => ({ id: `default-${i}`, label, done: false }))
  );

  readonly draft = signal('');
  readonly downloading = signal(false);

  readonly totalCount = computed(() => this.goals().length);
  readonly doneCount = computed(() => this.goals().filter((g) => g.done).length);
  readonly allDone = computed(() => this.totalCount() > 0 && this.doneCount() === this.totalCount());

  updateDraft(value: string): void {
    this.draft.set(value);
  }

  addGoal(): void {
    const label = this.draft().trim();
    if (!label) return;
    const id = `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.goalsOverride.set([...this.goals(), { id, label, done: false }]);
    this.draft.set('');
  }

  toggleDone(id: string): void {
    this.goalsOverride.set(this.goals().map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  }

  async downloadGoals(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const rows = this.goals().map((g) => ({ label: g.done ? '✓ Done' : 'Goal', value: g.label }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-confidence-goals.png');
    } finally {
      this.downloading.set(false);
    }
  }

  next(): void {
    if (!this.allDone()) return;
    this.submitted.emit({ goals: this.goals().map((g) => g.label).join(', ') });
  }
}
