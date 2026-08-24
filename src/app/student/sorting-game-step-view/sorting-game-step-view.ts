import { Component, computed, input, output, signal } from '@angular/core';
import { SortingGameStep } from '../../core/models/module.model';

@Component({
  selector: 'app-sorting-game-step-view',
  standalone: true,
  templateUrl: './sorting-game-step-view.html',
  styleUrl: './sorting-game-step-view.scss',
})
export class SortingGameStepView {
  readonly step = input.required<SortingGameStep>();
  readonly continued = output<void>();

  readonly sortedIds = signal<Set<string>>(new Set());
  readonly selectedItemId = signal<string | null>(null);
  readonly wrongBinId = signal<string | null>(null);
  private draggingId: string | null = null;

  readonly allSorted = computed(() => this.sortedIds().size === this.step().items.length);
  readonly sortedCount = computed(() => this.sortedIds().size);
  readonly progressPercent = computed(() => Math.round((this.sortedCount() / this.step().items.length) * 100));

  readonly wordBank = computed(() => this.step().items.filter((item) => !this.sortedIds().has(item.id)));

  itemsInBin(binId: string): { id: string; label: string }[] {
    return this.step()
      .items.filter((item) => this.sortedIds().has(item.id) && item.correctBinId === binId)
      .map((item) => ({ id: item.id, label: item.label }));
  }

  selectItem(itemId: string): void {
    this.selectedItemId.set(this.selectedItemId() === itemId ? null : itemId);
  }

  selectBin(binId: string): void {
    const itemId = this.selectedItemId();
    if (!itemId) return;
    this.attemptSort(itemId, binId);
  }

  onItemDragStart(event: DragEvent, itemId: string): void {
    this.draggingId = itemId;
    event.dataTransfer?.setData('text/plain', itemId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onBinDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onBinDrop(event: DragEvent, binId: string): void {
    event.preventDefault();
    const itemId = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!itemId) return;
    this.attemptSort(itemId, binId);
  }

  private attemptSort(itemId: string, binId: string): void {
    this.selectedItemId.set(null);
    const item = this.step().items.find((i) => i.id === itemId);
    if (!item) return;

    if (item.correctBinId === binId) {
      this.sortedIds.update((ids) => new Set(ids).add(itemId));
      return;
    }

    this.wrongBinId.set(binId);
    setTimeout(() => this.wrongBinId.set(null), 500);
  }

  isBinWrong(binId: string): boolean {
    return this.wrongBinId() === binId;
  }

  finish(): void {
    if (!this.allSorted()) return;
    this.continued.emit();
  }
}
