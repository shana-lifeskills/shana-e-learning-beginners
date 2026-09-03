import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { HygieneChecklistChallengeStep, HygieneChecklistTask } from '../../core/models/module.model';

/**
 * "My Hygiene Checklist" challenge of the week (Hygiene Module, Week 2). A
 * weekly habit grid: daily hygiene tasks down the side, a column per day, a
 * tappable cell for each. A day earns a star once every task is ticked; the
 * Continue button unlocks once the whole grid is filled. Its own visual design
 * — see `HygieneChecklistChallengeStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-checklist-challenge-step-view',
  standalone: true,
  templateUrl: './hygiene-checklist-challenge-step-view.html',
  styleUrl: './hygiene-checklist-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneChecklistChallengeStepView {
  readonly step = input.required<HygieneChecklistChallengeStep>();
  readonly continued = output<void>();

  /** "taskId:day" -> ticked. */
  readonly ticks = signal<Record<string, boolean>>({});

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));
  readonly totalCells = computed(() => this.step().tasks.length * this.step().dayCount);
  readonly tickedCount = computed(() => Object.values(this.ticks()).filter(Boolean).length);
  readonly allDone = computed(() => this.tickedCount() === this.totalCells());

  private key(task: HygieneChecklistTask, day: number): string {
    return `${task.id}:${day}`;
  }

  isTicked(task: HygieneChecklistTask, day: number): boolean {
    return !!this.ticks()[this.key(task, day)];
  }

  toggle(task: HygieneChecklistTask, day: number): void {
    const k = this.key(task, day);
    this.ticks.update((draft) => ({ ...draft, [k]: !draft[k] }));
  }

  dayComplete(day: number): boolean {
    return this.step().tasks.every((task) => this.isTicked(task, day));
  }

  finish(): void {
    if (!this.allDone()) return;
    this.continued.emit();
  }
}
