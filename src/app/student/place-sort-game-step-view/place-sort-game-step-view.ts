import { Component, computed, input, output, signal } from '@angular/core';
import { PlaceSortGameStep } from '../../core/models/module.model';

@Component({
  selector: 'app-place-sort-game-step-view',
  standalone: true,
  templateUrl: './place-sort-game-step-view.html',
  styleUrl: './place-sort-game-step-view.scss',
})
export class PlaceSortGameStepView {
  readonly step = input.required<PlaceSortGameStep>();
  readonly continued = output<void>();

  readonly sortedIds = signal<Set<string>>(new Set());
  readonly selectedItemId = signal<string | null>(null);
  readonly wrongZoneId = signal<string | null>(null);
  private draggingId: string | null = null;

  readonly allSorted = computed(() => this.sortedIds().size === this.step().items.length);

  readonly wordBank = computed(() => this.step().items.filter((item) => !this.sortedIds().has(item.id)));

  itemsInZone(zoneId: string): { id: string; icon: string; label: string }[] {
    return this.step()
      .items.filter((item) => this.sortedIds().has(item.id) && item.correctZoneId === zoneId)
      .map((item) => ({ id: item.id, icon: item.icon, label: item.label }));
  }

  selectItem(itemId: string): void {
    this.selectedItemId.set(this.selectedItemId() === itemId ? null : itemId);
  }

  selectZone(zoneId: string): void {
    const itemId = this.selectedItemId();
    if (!itemId) return;
    this.attemptSort(itemId, zoneId);
  }

  onItemDragStart(event: DragEvent, itemId: string): void {
    this.draggingId = itemId;
    event.dataTransfer?.setData('text/plain', itemId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onZoneDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onZoneDrop(event: DragEvent, zoneId: string): void {
    event.preventDefault();
    const itemId = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!itemId) return;
    this.attemptSort(itemId, zoneId);
  }

  private attemptSort(itemId: string, zoneId: string): void {
    this.selectedItemId.set(null);
    const item = this.step().items.find((i) => i.id === itemId);
    if (!item) return;

    if (item.correctZoneId === zoneId) {
      this.sortedIds.update((ids) => new Set(ids).add(itemId));
      return;
    }

    this.wrongZoneId.set(zoneId);
    setTimeout(() => this.wrongZoneId.set(null), 500);
  }

  isZoneWrong(zoneId: string): boolean {
    return this.wrongZoneId() === zoneId;
  }

  playAgain(): void {
    this.sortedIds.set(new Set());
  }

  finish(): void {
    if (!this.allSorted()) return;
    this.continued.emit();
  }
}
