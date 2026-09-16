import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DayPlannerBlock, DayPlannerGridStep } from '../../core/models/module.model';

interface PlacedBlock {
  id: string;
  hours: number;
}

type DragPayload = { source: 'tray' | 'grid'; id: string };

/**
 * "Build Your Day" 24-hour planner (Planning Module — Advanced, Week 2). Real
 * cursor drag-and-drop: drag task blocks from the tray onto the day bar,
 * reorder by dragging, drag back to the tray to remove, resize with an hours
 * stepper. The plan must total exactly 24 hours to continue; any arrangement
 * is accepted. On submit an auto-review reflects the learner's own choices
 * back. See `DayPlannerGridStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-day-planner-grid-step-view',
  standalone: true,
  templateUrl: './day-planner-grid-step-view.html',
  styleUrl: './day-planner-grid-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayPlannerGridStepView {
  readonly step = input.required<DayPlannerGridStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly placed = signal<PlacedBlock[]>([]);
  readonly selectedTrayId = signal<string | null>(null);
  readonly locked = signal(false);
  private dragPayload: DragPayload | null = null;

  readonly total = computed(() => this.step().totalHours);
  readonly placedHours = computed(() => this.placed().reduce((sum, p) => sum + p.hours, 0));
  readonly remaining = computed(() => this.total() - this.placedHours());
  readonly isComplete = computed(() => this.remaining() === 0);
  readonly hourTicks = computed(() => Array.from({ length: this.total() / 4 + 1 }, (_, i) => i * 4));

  readonly trayBlocks = computed<DayPlannerBlock[]>(() => {
    const placedIds = new Set(this.placed().map((p) => p.id));
    return this.step().blocks.filter((b) => !placedIds.has(b.id));
  });

  readonly placedView = computed(() =>
    this.placed().map((p) => {
      const block = this.blockDef(p.id);
      return {
        id: p.id,
        hours: p.hours,
        label: block?.label ?? p.id,
        icon: block?.icon ?? '',
        suggested: block?.suggestedHours ?? p.hours,
        shortened: block ? p.hours < block.suggestedHours : false,
      };
    }),
  );

  /* --- review (used after submit) --- */
  readonly leftOutLabels = computed(() => this.trayBlocks().map((b) => b.label));
  readonly shortenedLabels = computed(() => this.placedView().filter((p) => p.shortened).map((p) => p.label));
  readonly biggestLabel = computed(() => {
    const view = this.placedView();
    if (!view.length) return '';
    return view.reduce((max, p) => (p.hours > max.hours ? p : max)).label;
  });

  readonly canSubmit = computed(() => this.isComplete() && this.placed().length > 0 && !this.locked());

  private blockDef(id: string): DayPlannerBlock | undefined {
    return this.step().blocks.find((b) => b.id === id);
  }

  /* --- placement --- */
  private placeFromTray(id: string, beforeId?: string): void {
    if (this.locked() || this.placed().some((p) => p.id === id)) return;
    const remaining = this.remaining();
    if (remaining < 1) return;
    const suggested = this.blockDef(id)?.suggestedHours ?? 1;
    const hours = Math.max(1, Math.min(suggested, remaining));
    this.placed.update((list) => this.insert(list, { id, hours }, beforeId));
    this.selectedTrayId.set(null);
  }

  private movePlaced(id: string, beforeId?: string): void {
    if (this.locked() || id === beforeId) return;
    this.placed.update((list) => {
      const current = list.find((p) => p.id === id);
      if (!current) return list;
      return this.insert(
        list.filter((p) => p.id !== id),
        current,
        beforeId,
      );
    });
  }

  private insert(list: PlacedBlock[], item: PlacedBlock, beforeId?: string): PlacedBlock[] {
    if (!beforeId) return [...list, item];
    const index = list.findIndex((p) => p.id === beforeId);
    if (index < 0) return [...list, item];
    return [...list.slice(0, index), item, ...list.slice(index)];
  }

  removeToTray(id: string): void {
    if (this.locked()) return;
    this.placed.update((list) => list.filter((p) => p.id !== id));
  }

  bump(id: string, delta: number): void {
    if (this.locked()) return;
    this.placed.update((list) =>
      list.map((p) => {
        if (p.id !== id) return p;
        const ceiling = delta > 0 ? p.hours + this.remaining() : p.hours;
        const next = Math.max(1, Math.min(p.hours + delta, Math.max(1, ceiling)));
        return { ...p, hours: next };
      }),
    );
  }

  /* --- HTML5 drag-and-drop --- */
  onTrayDragStart(event: DragEvent, id: string): void {
    this.dragPayload = { source: 'tray', id };
    event.dataTransfer?.setData('text/plain', id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  onPlacedDragStart(event: DragEvent, id: string): void {
    this.dragPayload = { source: 'grid', id };
    event.dataTransfer?.setData('text/plain', id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  onGridDrop(event: DragEvent, beforeId?: string): void {
    event.preventDefault();
    const payload = this.dragPayload;
    this.dragPayload = null;
    if (!payload) return;
    if (payload.source === 'tray') {
      this.placeFromTray(payload.id, beforeId);
    } else {
      this.movePlaced(payload.id, beforeId);
    }
  }

  onTrayDrop(event: DragEvent): void {
    event.preventDefault();
    const payload = this.dragPayload;
    this.dragPayload = null;
    if (payload?.source === 'grid') this.removeToTray(payload.id);
  }

  /* --- tap fallback --- */
  tapTrayBlock(id: string): void {
    if (this.locked()) return;
    this.selectedTrayId.set(this.selectedTrayId() === id ? null : id);
  }

  tapGrid(): void {
    const selected = this.selectedTrayId();
    if (selected) this.placeFromTray(selected);
  }

  /* --- submit --- */
  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    const values: Record<string, string> = {};
    for (const p of this.placedView()) {
      values[p.id] = `${p.hours}h`;
    }
    values['totalHours'] = `${this.placedHours()}`;
    values['leftOut'] = this.leftOutLabels().join(', ') || 'none';
    values['shortened'] = this.shortenedLabels().join(', ') || 'none';
    values['biggest'] = this.biggestLabel();
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
