import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DisciplineMatchWarmupStep } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Discipline Warm-Up" matching game (Discipline Module, Week 3). Fixed Action
 * rows on the left are drop targets; shuffled Result cards on the right are
 * dragged (or tap-selected then tap-placed) onto the routine they produce. A
 * wrong drop shakes and bounces back; a correct drop locks into the row. The
 * Continue button is withheld until every row is matched.
 */
@Component({
  selector: 'app-discipline-match-warmup-step-view',
  standalone: true,
  templateUrl: './discipline-match-warmup-step-view.html',
  styleUrl: './discipline-match-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisciplineMatchWarmupStepView {
  readonly step = input.required<DisciplineMatchWarmupStep>();
  readonly continued = output<void>();

  private readonly shuffleTick = signal(0);
  readonly resultBank = computed(() => {
    this.shuffleTick();
    return shuffled(this.step().pairs);
  });

  readonly matchedIds = signal<Set<string>>(new Set());
  readonly selectedResultId = signal<string | null>(null);
  readonly wrongRowId = signal<string | null>(null);
  private draggingId: string | null = null;

  readonly remaining = computed(() => this.resultBank().filter((p) => !this.matchedIds().has(p.id)));
  readonly allMatched = computed(() => this.matchedIds().size === this.step().pairs.length);

  rowResult(rowId: string): string | null {
    if (!this.matchedIds().has(rowId)) return null;
    return this.step().pairs.find((p) => p.id === rowId)?.result ?? null;
  }

  isRowMatched(rowId: string): boolean {
    return this.matchedIds().has(rowId);
  }

  isRowWrong(rowId: string): boolean {
    return this.wrongRowId() === rowId;
  }

  selectResult(resultId: string): void {
    if (this.wrongRowId()) return;
    this.selectedResultId.set(this.selectedResultId() === resultId ? null : resultId);
  }

  placeOnRow(rowId: string): void {
    if (this.isRowMatched(rowId) || this.wrongRowId()) return;
    const resultId = this.selectedResultId();
    if (!resultId) return;
    this.attemptMatch(resultId, rowId);
  }

  onResultDragStart(event: DragEvent, resultId: string): void {
    this.draggingId = resultId;
    event.dataTransfer?.setData('text/plain', resultId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onRowDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onRowDrop(event: DragEvent, rowId: string): void {
    event.preventDefault();
    if (this.isRowMatched(rowId)) return;
    const resultId = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!resultId) return;
    this.attemptMatch(resultId, rowId);
  }

  private attemptMatch(resultId: string, rowId: string): void {
    this.selectedResultId.set(null);

    if (resultId === rowId) {
      this.matchedIds.update((ids) => new Set(ids).add(rowId));
      return;
    }

    this.wrongRowId.set(rowId);
    setTimeout(() => this.wrongRowId.set(null), 500);
  }

  startOver(): void {
    this.matchedIds.set(new Set());
    this.selectedResultId.set(null);
    this.wrongRowId.set(null);
    this.shuffleTick.update((t) => t + 1);
  }

  finish(): void {
    if (!this.allMatched()) return;
    this.continued.emit();
  }
}
