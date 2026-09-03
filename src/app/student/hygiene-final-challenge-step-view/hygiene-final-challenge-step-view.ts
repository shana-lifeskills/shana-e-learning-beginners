import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { HygieneChecklistTask, HygieneFinalChallengeStep, HygieneFinalField } from '../../core/models/module.model';

/**
 * "My Hygiene Habit Tracker" — the final challenge of the Hygiene Module. A
 * five-day habit grid plus a few short reflection fields. The submit button
 * unlocks once the grid is full and every field has an answer; submitting
 * saves the written answers for the trainer to read. See
 * `HygieneFinalChallengeStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-hygiene-final-challenge-step-view',
  standalone: true,
  templateUrl: './hygiene-final-challenge-step-view.html',
  styleUrl: './hygiene-final-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneFinalChallengeStepView {
  readonly step = input.required<HygieneFinalChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** "taskId:day" -> ticked. */
  readonly ticks = signal<Record<string, boolean>>({});
  /** fieldId -> text. */
  readonly answers = signal<Record<string, string>>({});

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));
  readonly totalCells = computed(() => this.step().tasks.length * this.step().dayCount);
  readonly tickedCount = computed(() => Object.values(this.ticks()).filter(Boolean).length);
  readonly gridComplete = computed(() => this.tickedCount() === this.totalCells());
  readonly fieldsComplete = computed(() => this.step().fields.every((f) => (this.answers()[f.id] ?? '').trim().length > 0));
  readonly canSubmit = computed(() => this.gridComplete() && this.fieldsComplete());

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

  answerFor(field: HygieneFinalField): string {
    return this.answers()[field.id] ?? '';
  }

  setAnswer(field: HygieneFinalField, value: string): void {
    this.answers.update((draft) => ({ ...draft, [field.id]: value }));
  }

  submit(): void {
    if (!this.canSubmit()) return;
    const payload: Record<string, string> = {};
    for (const field of this.step().fields) {
      payload[field.label] = (this.answers()[field.id] ?? '').trim();
    }
    this.submitted.emit(payload);
  }
}
