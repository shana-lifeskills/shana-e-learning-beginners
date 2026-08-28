import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { DigitalEtiquetteTrackerStep } from '../../core/models/module.model';

@Component({
  selector: 'app-digital-etiquette-tracker-step-view',
  standalone: true,
  templateUrl: './digital-etiquette-tracker-step-view.html',
  styleUrl: './digital-etiquette-tracker-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalEtiquetteTrackerStepView implements OnInit {
  readonly step = input.required<DigitalEtiquetteTrackerStep>();
  readonly submitted = output<Record<string, string>>();

  /** grid[habitIndex][dayIndex] — true = yes, false = no, null = not set. */
  readonly grid = signal<(boolean | null)[][]>([]);
  readonly reflections = signal<Record<string, string>>({});
  readonly pledged = signal(false);

  ngOnInit(): void {
    const s = this.step();
    this.grid.set(s.habits.map(() => Array.from({ length: s.dayCount }, () => null)));
    this.reflections.set(Object.fromEntries(s.reflectionFields.map((f) => [f.id, ''])));
  }

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));
  readonly totalCells = computed(() => this.step().habits.length * this.step().dayCount);
  readonly setCells = computed(() =>
    this.grid().reduce((sum, row) => sum + row.filter((c) => c !== null).length, 0),
  );
  readonly progressPercent = computed(() =>
    this.totalCells() === 0 ? 0 : Math.round((this.setCells() / this.totalCells()) * 100),
  );
  readonly gridComplete = computed(() => this.setCells() === this.totalCells());
  readonly reflectionComplete = computed(() =>
    this.step().reflectionFields.every((f) => (this.reflections()[f.id] ?? '').trim().length > 0),
  );
  readonly workComplete = computed(() => this.gridComplete() && this.reflectionComplete());
  readonly readyToFinish = computed(() => this.workComplete() && this.pledged());

  cellValue(habitIndex: number, dayIndex: number): boolean | null {
    return this.grid()[habitIndex]?.[dayIndex] ?? null;
  }

  setCell(habitIndex: number, dayIndex: number, value: boolean): void {
    this.grid.update((rows) =>
      rows.map((row, r) =>
        r === habitIndex ? row.map((c, d) => (d === dayIndex ? value : c)) : row,
      ),
    );
  }

  setReflection(id: string, value: string): void {
    this.reflections.update((map) => ({ ...map, [id]: value }));
  }

  togglePledge(): void {
    this.pledged.update((p) => !p);
  }

  complete(): void {
    if (!this.readyToFinish()) return;
    const s = this.step();
    const payload: Record<string, string> = {};
    s.habits.forEach((habit, h) => {
      const marks = this.grid()[h].map((c) => (c ? s.yesLabel : s.noLabel)).join(', ');
      payload[habit] = marks;
    });
    s.reflectionFields.forEach((f) => {
      payload[f.label] = (this.reflections()[f.id] ?? '').trim();
    });
    payload['My confidence link'] = s.confidenceStatement;
    this.submitted.emit(payload);
  }
}
