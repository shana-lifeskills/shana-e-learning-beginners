import { Component, computed, input, output, signal } from '@angular/core';
import { PlanItRaceStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-plan-it-race-step-view',
  standalone: true,
  templateUrl: './plan-it-race-step-view.html',
  styleUrl: './plan-it-race-step-view.scss',
})
export class PlanItRaceStepView {
  readonly step = input.required<PlanItRaceStep>();
  readonly submitted = output<Record<string, string>>();

  readonly slots = signal<(string | null)[]>([null, null, null, null]);
  readonly downloading = signal(false);

  /** The place currently being dragged, and which slot (if any) it was picked up from. */
  private dragged: { placeId: string; fromSlot: number | null } | null = null;
  readonly dragOverIndex = signal<number | null>(null);
  readonly dragOverPool = signal(false);

  readonly pool = computed(() => {
    const placedIds = new Set(this.slots().filter((id): id is string => id !== null));
    return this.step().places.filter((place) => !placedIds.has(place.id));
  });

  readonly allFilled = computed(() => this.slots().every((id) => id !== null));

  placeAt(id: string): PlanItRaceStep['places'][number] | undefined {
    return this.step().places.find((place) => place.id === id);
  }

  placeInNextSlot(placeId: string): void {
    const current = this.slots();
    const emptyIndex = current.indexOf(null);
    if (emptyIndex === -1) return;
    const next = [...current];
    next[emptyIndex] = placeId;
    this.slots.set(next);
  }

  removeFromSlot(index: number): void {
    const next = [...this.slots()];
    next[index] = null;
    this.slots.set(next);
  }

  reset(): void {
    this.slots.set([null, null, null, null]);
  }

  onDragStartFromPool(event: DragEvent, placeId: string): void {
    this.dragged = { placeId, fromSlot: null };
    event.dataTransfer?.setData('text/plain', placeId);
  }

  onDragStartFromSlot(event: DragEvent, index: number): void {
    const placeId = this.slots()[index];
    if (!placeId) return;
    this.dragged = { placeId, fromSlot: index };
    event.dataTransfer?.setData('text/plain', placeId);
  }

  onDragEnd(): void {
    this.dragged = null;
    this.dragOverIndex.set(null);
    this.dragOverPool.set(false);
  }

  onDragOverSlot(event: DragEvent, index: number): void {
    event.preventDefault();
    this.dragOverIndex.set(index);
  }

  onDragLeaveSlot(index: number): void {
    if (this.dragOverIndex() === index) this.dragOverIndex.set(null);
  }

  onDropOnSlot(event: DragEvent, index: number): void {
    event.preventDefault();
    this.dragOverIndex.set(null);
    const dragged = this.dragged;
    this.dragged = null;
    if (!dragged) return;

    const current = this.slots();
    if (dragged.fromSlot === index) return;

    const next = [...current];
    const displaced = next[index];
    next[index] = dragged.placeId;
    if (dragged.fromSlot !== null) {
      // Reordering between two slots — swap so the displaced card doesn't vanish.
      next[dragged.fromSlot] = displaced;
    }
    this.slots.set(next);
  }

  onDragOverPool(event: DragEvent): void {
    event.preventDefault();
    this.dragOverPool.set(true);
  }

  onDragLeavePool(): void {
    this.dragOverPool.set(false);
  }

  onDropOnPool(event: DragEvent): void {
    event.preventDefault();
    this.dragOverPool.set(false);
    const dragged = this.dragged;
    this.dragged = null;
    if (!dragged || dragged.fromSlot === null) return;

    const next = [...this.slots()];
    next[dragged.fromSlot] = null;
    this.slots.set(next);
  }

  next(): void {
    if (!this.allFilled()) return;
    const values: Record<string, string> = {};
    this.slots().forEach((id, i) => {
      values[`stop-${i + 1}`] = this.placeAt(id!)?.label ?? '';
    });
    this.submitted.emit(values);
  }

  async downloadPlan(): Promise<void> {
    if (this.downloading() || !this.allFilled()) return;
    this.downloading.set(true);
    try {
      const rows = this.slots().map((id, i) => ({ label: `Stop ${i + 1}`, value: this.placeAt(id!)?.label ?? '' }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-afternoon-plan.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
