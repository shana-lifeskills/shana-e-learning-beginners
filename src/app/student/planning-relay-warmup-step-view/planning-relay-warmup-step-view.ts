import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PlanningRelayWarmupStep } from '../../core/models/module.model';

/**
 * "Warm-Up Game: Planning Relay" (Planning Module — Advanced, Week 4). Drag
 * the 5 planning-cycle checkpoints into order along a relay track, then Check
 * against the one correct sequence — a wrong arrangement shows a retry hint
 * and must be fixed. Once correct, a follow-up text prompt appears. See
 * `PlanningRelayWarmupStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-planning-relay-warmup-step-view',
  standalone: true,
  templateUrl: './planning-relay-warmup-step-view.html',
  styleUrl: './planning-relay-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningRelayWarmupStepView {
  readonly step = input.required<PlanningRelayWarmupStep>();
  readonly continued = output<void>();

  /** Slot index -> placed option id. */
  private readonly slotMap = signal<Record<number, string>>({});
  readonly checked = signal<'correct' | 'incorrect' | null>(null);
  readonly followUp = signal('');

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
    return this.step().options.filter((o) => !placedIds.has(o.id));
  });

  readonly allFilled = computed(() => Object.keys(this.slotMap()).length === this.slotCount());
  readonly isCorrect = computed(() => this.checked() === 'correct');
  readonly canContinue = computed(() => this.isCorrect() && this.followUp().trim().length > 0);

  optionById(id: string) {
    return this.step().options.find((o) => o.id === id);
  }

  placeInNextSlot(optionId: string): void {
    if (this.isCorrect()) return;
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
    if (this.isCorrect()) return;
    const next = { ...this.slotMap() };
    delete next[index];
    this.slotMap.set(next);
    this.checked.set(null);
  }

  onDragStartFromPool(event: DragEvent, optionId: string): void {
    if (this.isCorrect()) return;
    this.dragged = { optionId, fromIndex: null };
    event.dataTransfer?.setData('text/plain', optionId);
  }

  onDragStartFromSlot(event: DragEvent, index: number): void {
    if (this.isCorrect()) return;
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
    if (!dragged || this.isCorrect() || dragged.fromIndex === index) return;

    const next = { ...this.slotMap() };
    const displaced = next[index];
    next[index] = dragged.optionId;
    if (dragged.fromIndex !== null) {
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
    if (!dragged || this.isCorrect() || dragged.fromIndex === null) return;

    const next = { ...this.slotMap() };
    delete next[dragged.fromIndex];
    this.slotMap.set(next);
    this.checked.set(null);
  }

  checkAnswer(): void {
    if (!this.allFilled()) return;
    const order = this.slots();
    const correct = this.step().correctOrder.every((id, i) => id === order[i]);
    this.checked.set(correct ? 'correct' : 'incorrect');
  }

  setFollowUp(value: string): void {
    this.followUp.set(value);
  }

  finish(): void {
    if (!this.canContinue()) return;
    this.continued.emit();
  }
}
