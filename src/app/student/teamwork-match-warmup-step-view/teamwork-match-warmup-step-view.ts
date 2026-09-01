import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TeamworkMatchWarmupStep } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Teamwork Warm-Up" matching game (Teamwork Module, Week 2). Fixed role rows
 * on the left are drop targets; shuffled action cards are dragged (or
 * tap-selected then tap-placed) onto the role they belong to. A wrong drop
 * shakes and bounces back; a correct drop locks into the row. The Continue
 * button is withheld until every role is matched.
 */
@Component({
  selector: 'app-teamwork-match-warmup-step-view',
  standalone: true,
  templateUrl: './teamwork-match-warmup-step-view.html',
  styleUrl: './teamwork-match-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkMatchWarmupStepView {
  readonly step = input.required<TeamworkMatchWarmupStep>();
  readonly continued = output<void>();

  private readonly shuffleTick = signal(0);
  readonly actionBank = computed(() => {
    this.shuffleTick();
    return shuffled(this.step().pairs);
  });

  readonly matchedIds = signal<Set<string>>(new Set());
  readonly selectedActionId = signal<string | null>(null);
  readonly wrongRowId = signal<string | null>(null);
  private draggingId: string | null = null;

  readonly remaining = computed(() => this.actionBank().filter((p) => !this.matchedIds().has(p.id)));
  readonly allMatched = computed(() => this.matchedIds().size === this.step().pairs.length);

  rowAction(rowId: string): string | null {
    if (!this.matchedIds().has(rowId)) return null;
    return this.step().pairs.find((p) => p.id === rowId)?.action ?? null;
  }

  isRowMatched(rowId: string): boolean {
    return this.matchedIds().has(rowId);
  }

  isRowWrong(rowId: string): boolean {
    return this.wrongRowId() === rowId;
  }

  selectAction(actionId: string): void {
    if (this.wrongRowId()) return;
    this.selectedActionId.set(this.selectedActionId() === actionId ? null : actionId);
  }

  placeOnRow(rowId: string): void {
    if (this.isRowMatched(rowId) || this.wrongRowId()) return;
    const actionId = this.selectedActionId();
    if (!actionId) return;
    this.attemptMatch(actionId, rowId);
  }

  onActionDragStart(event: DragEvent, actionId: string): void {
    this.draggingId = actionId;
    event.dataTransfer?.setData('text/plain', actionId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onRowDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onRowDrop(event: DragEvent, rowId: string): void {
    event.preventDefault();
    if (this.isRowMatched(rowId)) return;
    const actionId = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!actionId) return;
    this.attemptMatch(actionId, rowId);
  }

  private attemptMatch(actionId: string, rowId: string): void {
    this.selectedActionId.set(null);

    if (actionId === rowId) {
      this.matchedIds.update((ids) => new Set(ids).add(rowId));
      return;
    }

    this.wrongRowId.set(rowId);
    setTimeout(() => this.wrongRowId.set(null), 500);
  }

  startOver(): void {
    this.matchedIds.set(new Set());
    this.selectedActionId.set(null);
    this.wrongRowId.set(null);
    this.shuffleTick.update((t) => t + 1);
  }

  finish(): void {
    if (!this.allMatched()) return;
    this.continued.emit();
  }
}
