import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { TimeReflectionWorksheetStep } from '../../core/models/module.model';

interface WorksheetRow {
  name: string;
  rank: string | null;
}

/**
 * "Personal Reflection Worksheet" activity (Planning Module — Advanced, Week
 * 1). A clipboard-style worksheet: the learner lists weekly activities, ranks
 * how well they plan each, picks one to plan better, and writes a short
 * reason. Submit is locked until every field is filled; then a filled-in
 * worksheet card is shown. See `TimeReflectionWorksheetStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-time-reflection-worksheet-step-view',
  standalone: true,
  templateUrl: './time-reflection-worksheet-step-view.html',
  styleUrl: './time-reflection-worksheet-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeReflectionWorksheetStepView implements OnInit {
  readonly step = input.required<TimeReflectionWorksheetStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly rows = signal<WorksheetRow[]>([]);
  readonly focusIndex = signal<number | null>(null);
  readonly reason = signal('');
  readonly locked = signal(false);

  ngOnInit(): void {
    const count = this.step().rowCount;
    this.rows.set(Array.from({ length: count }, () => ({ name: '', rank: null })));
  }

  /** Rows the learner has named — the only ones eligible to be the "plan better" pick. */
  readonly namedRows = computed(() =>
    this.rows()
      .map((row, index) => ({ row, index }))
      .filter((entry) => entry.row.name.trim().length > 0),
  );

  readonly canSubmit = computed(() => {
    const rows = this.rows();
    const allFilled = rows.every((r) => r.name.trim().length > 0 && r.rank !== null);
    const focus = this.focusIndex();
    const focusValid = focus !== null && rows[focus]?.name.trim().length > 0;
    return allFilled && focusValid && this.reason().trim().length > 0;
  });

  setName(index: number, value: string): void {
    if (this.locked()) return;
    this.rows.update((rows) => rows.map((r, i) => (i === index ? { ...r, name: value } : r)));
    // If the chosen "plan better" row was cleared, drop the selection.
    if (this.focusIndex() === index && value.trim().length === 0) {
      this.focusIndex.set(null);
    }
  }

  setRank(index: number, rank: string): void {
    if (this.locked()) return;
    this.rows.update((rows) => rows.map((r, i) => (i === index ? { ...r, rank } : r)));
  }

  setFocus(index: number): void {
    if (this.locked()) return;
    this.focusIndex.set(index);
  }

  setReason(value: string): void {
    if (this.locked()) return;
    this.reason.set(value);
  }

  readonly focusRow = computed(() => {
    const focus = this.focusIndex();
    return focus !== null ? this.rows()[focus] ?? null : null;
  });

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);

    const values: Record<string, string> = {};
    this.rows().forEach((row, i) => {
      values[`activity${i + 1}`] = row.name.trim();
      values[`planning${i + 1}`] = row.rank ?? '';
    });
    values['focusActivity'] = this.focusRow()?.name.trim() ?? '';
    values['reason'] = this.reason().trim();
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
