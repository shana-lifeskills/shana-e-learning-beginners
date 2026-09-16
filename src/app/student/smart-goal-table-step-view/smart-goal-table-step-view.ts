import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SmartGoalTableStep } from '../../core/models/module.model';

type Phase = 'goal' | 'table' | 'done';

/**
 * "Write your SMART goal" activity (Planning Module — Advanced, Week 3). A
 * goal statement, then an optional row-by-row SMART breakdown table. See
 * `SmartGoalTableStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-smart-goal-table-step-view',
  standalone: true,
  templateUrl: './smart-goal-table-step-view.html',
  styleUrl: './smart-goal-table-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartGoalTableStepView {
  readonly step = input.required<SmartGoalTableStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('goal');
  readonly goal = signal('');
  readonly rows = signal<Record<string, string>>({});

  readonly canLeaveGoal = computed(() => this.goal().trim().length > 0);

  readonly filledRows = computed(() =>
    this.step().rows.filter((r) => (this.rows()[r.letter] ?? '').trim().length > 0),
  );

  setGoal(value: string): void {
    this.goal.set(value);
  }

  setRow(letter: string, value: string): void {
    this.rows.update((map) => ({ ...map, [letter]: value }));
  }

  rowValue(letter: string): string {
    return this.rows()[letter] ?? '';
  }

  goTo(phase: Phase): void {
    this.phase.set(phase);
  }

  submit(): void {
    if (!this.canLeaveGoal()) return;
    const values: Record<string, string> = { myGoal: this.goal().trim() };
    for (const r of this.step().rows) {
      values[r.letter] = this.rowValue(r.letter).trim();
    }
    this.phase.set('done');
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
