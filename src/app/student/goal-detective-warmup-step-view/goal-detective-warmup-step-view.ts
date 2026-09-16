import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { GoalDetectiveStatement, GoalDetectiveWarmupStep } from '../../core/models/module.model';

type Bin = 'wish' | 'goal';

/**
 * "Warm-Up Game: Goal Detective!" (Planning Module — Advanced, Week 3). Real
 * cursor drag-and-drop of statement cards onto "Wish" or "Goal" folders — a
 * correct drop files the card away, a wrong drop shakes and returns it to the
 * tray. A tap-to-select fallback is also offered. Continue unlocks once every
 * statement is sorted. See `GoalDetectiveWarmupStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-goal-detective-warmup-step-view',
  standalone: true,
  templateUrl: './goal-detective-warmup-step-view.html',
  styleUrl: './goal-detective-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalDetectiveWarmupStepView {
  readonly step = input.required<GoalDetectiveWarmupStep>();
  readonly continued = output<void>();

  /** id -> the bin it was correctly filed into. */
  readonly sorted = signal<Map<string, Bin>>(new Map());
  readonly selectedId = signal<string | null>(null);
  /** id of the card currently shaking after a wrong attempt. */
  readonly wrongId = signal<string | null>(null);
  private dragId: string | null = null;

  readonly total = computed(() => this.step().statements.length);
  readonly sortedCount = computed(() => this.sorted().size);
  readonly allSorted = computed(() => this.sortedCount() === this.total());

  readonly trayStatements = computed(() => this.step().statements.filter((s) => !this.sorted().has(s.id)));

  filedIn(bin: Bin): GoalDetectiveStatement[] {
    const sorted = this.sorted();
    return this.step().statements.filter((s) => sorted.get(s.id) === bin);
  }

  isSelected(id: string): boolean {
    return this.selectedId() === id;
  }

  isWrong(id: string): boolean {
    return this.wrongId() === id;
  }

  selectCard(id: string): void {
    this.selectedId.set(this.selectedId() === id ? null : id);
  }

  /* --- drag-and-drop --- */
  onDragStart(event: DragEvent, id: string): void {
    this.dragId = id;
    event.dataTransfer?.setData('text/plain', id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, bin: Bin): void {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain') || this.dragId;
    this.dragId = null;
    if (!id) return;
    this.attempt(id, bin);
  }

  /* --- tap fallback --- */
  tapBin(bin: Bin): void {
    const id = this.selectedId();
    if (!id) return;
    this.attempt(id, bin);
  }

  private attempt(id: string, bin: Bin): void {
    this.selectedId.set(null);
    if (this.sorted().has(id)) return;
    const statement = this.step().statements.find((s) => s.id === id);
    if (!statement) return;

    if (statement.kind === bin) {
      this.wrongId.set(null);
      this.sorted.update((map) => {
        const next = new Map(map);
        next.set(id, bin);
        return next;
      });
      return;
    }

    this.wrongId.set(id);
    setTimeout(() => this.wrongId.set(null), 500);
  }

  finish(): void {
    if (this.allSorted()) this.continued.emit();
  }
}
