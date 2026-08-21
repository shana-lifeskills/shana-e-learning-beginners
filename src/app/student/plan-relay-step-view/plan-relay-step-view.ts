import { Component, computed, input, output, signal } from '@angular/core';
import { PlanRelayStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-plan-relay-step-view',
  standalone: true,
  templateUrl: './plan-relay-step-view.html',
  styleUrl: './plan-relay-step-view.scss',
})
export class PlanRelayStepView {
  readonly step = input.required<PlanRelayStep>();
  readonly submitted = output<Record<string, string>>();

  /** Slot index -> placed option id. Indices with no entry are still empty. */
  private readonly slotMap = signal<Record<number, string>>({});
  readonly checked = signal<'correct' | 'incorrect' | null>(null);
  readonly downloading = signal(false);

  /** The option currently being dragged, and which slot (if any) it was picked up from. */
  private dragged: { optionId: string; fromIndex: number | null } | null = null;
  readonly dragOverIndex = signal<number | null>(null);
  readonly dragOverPool = signal(false);

  readonly slotCount = computed(() => this.step().options.length);
  readonly slots = computed(() => {
    const map = this.slotMap();
    return Array.from({ length: this.slotCount() }, (_, i) => map[i] ?? null);
  });

  readonly pool = computed(() => {
    const placedIds = new Set(Object.values(this.slotMap()));
    return this.step().options.filter((option) => !placedIds.has(option.id));
  });

  readonly allFilled = computed(() => Object.keys(this.slotMap()).length === this.slotCount());

  optionAt(id: string): PlanRelayStep['options'][number] | undefined {
    return this.step().options.find((option) => option.id === id);
  }

  placeInNextSlot(optionId: string): void {
    const map = this.slotMap();
    let target = -1;
    for (let i = 0; i < this.slotCount(); i++) {
      if (map[i] === undefined) {
        target = i;
        break;
      }
    }
    if (target === -1) return;
    this.slotMap.update((m) => ({ ...m, [target]: optionId }));
    this.checked.set(null);
  }

  removeFromSlot(index: number): void {
    const next = { ...this.slotMap() };
    delete next[index];
    this.slotMap.set(next);
    this.checked.set(null);
  }

  reset(): void {
    this.slotMap.set({});
    this.checked.set(null);
  }

  onDragStartFromPool(event: DragEvent, optionId: string): void {
    this.dragged = { optionId, fromIndex: null };
    event.dataTransfer?.setData('text/plain', optionId);
  }

  onDragStartFromSlot(event: DragEvent, index: number): void {
    const optionId = this.slots()[index];
    if (!optionId) return;
    this.dragged = { optionId, fromIndex: index };
    event.dataTransfer?.setData('text/plain', optionId);
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
    if (!dragged || dragged.fromIndex === index) return;

    const next = { ...this.slotMap() };
    const displaced = next[index];
    next[index] = dragged.optionId;
    if (dragged.fromIndex !== null) {
      // Reordering between two slots — swap so the displaced card doesn't vanish.
      if (displaced !== undefined) next[dragged.fromIndex] = displaced;
      else delete next[dragged.fromIndex];
    }
    this.slotMap.set(next);
    this.checked.set(null);
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
    if (!dragged || dragged.fromIndex === null) return;

    const next = { ...this.slotMap() };
    delete next[dragged.fromIndex];
    this.slotMap.set(next);
    this.checked.set(null);
  }

  checkAnswer(): void {
    if (!this.allFilled()) return;
    const order = this.slots();
    const isCorrect = this.step().correctOrder.every((id, i) => id === order[i]);
    this.checked.set(isCorrect ? 'correct' : 'incorrect');
  }

  next(): void {
    if (this.checked() !== 'correct') return;
    const values: Record<string, string> = {};
    this.slots().forEach((id, i) => {
      values[`step-${i + 1}`] = this.optionAt(id!)?.label ?? '';
    });
    this.submitted.emit(values);
  }

  async downloadPlan(): Promise<void> {
    if (this.downloading() || this.checked() !== 'correct') return;
    this.downloading.set(true);
    try {
      const rows = this.slots().map((id, i) => ({ label: `Step ${i + 1}`, value: this.optionAt(id!)?.label ?? '' }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-plan-relay.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
