import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { WellnessHabitMatchPair, WellnessHabitMatchStep } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Wellness Warm-Up" matching game (Wellness Module, Week 2). Fixed healthy-habit
 * rows are the targets; shuffled benefit chips sit in a bank below. Tap a
 * benefit, then tap the habit it belongs to — a wrong pick shivers and clears,
 * a correct pick locks the benefit into the row with a tick. The Continue
 * button is withheld until every habit is matched. Its own visual design — see
 * `WellnessHabitMatchStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-habit-match-step-view',
  standalone: true,
  templateUrl: './wellness-habit-match-step-view.html',
  styleUrl: './wellness-habit-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessHabitMatchStepView {
  readonly step = input.required<WellnessHabitMatchStep>();
  readonly continued = output<void>();

  private readonly shuffleTick = signal(0);
  readonly benefitBank = computed(() => {
    this.shuffleTick();
    return shuffled(this.step().pairs);
  });

  readonly matchedIds = signal<Set<string>>(new Set());
  readonly selectedBenefitId = signal<string | null>(null);
  readonly wrongRowId = signal<string | null>(null);

  readonly remaining = computed(() => this.benefitBank().filter((p) => !this.matchedIds().has(p.id)));
  readonly allMatched = computed(() => this.matchedIds().size === this.step().pairs.length);

  rowBenefit(rowId: string): string | null {
    if (!this.matchedIds().has(rowId)) return null;
    return this.step().pairs.find((p) => p.id === rowId)?.benefit ?? null;
  }

  isRowMatched(rowId: string): boolean {
    return this.matchedIds().has(rowId);
  }

  isRowWrong(rowId: string): boolean {
    return this.wrongRowId() === rowId;
  }

  selectBenefit(benefitId: string): void {
    if (this.wrongRowId()) return;
    this.selectedBenefitId.set(this.selectedBenefitId() === benefitId ? null : benefitId);
  }

  placeOnRow(rowId: string): void {
    if (this.isRowMatched(rowId) || this.wrongRowId()) return;
    const benefitId = this.selectedBenefitId();
    if (!benefitId) return;

    this.selectedBenefitId.set(null);

    if (benefitId === rowId) {
      this.matchedIds.update((ids) => new Set(ids).add(rowId));
      return;
    }

    this.wrongRowId.set(rowId);
    setTimeout(() => this.wrongRowId.set(null), 500);
  }

  startOver(): void {
    this.matchedIds.set(new Set());
    this.selectedBenefitId.set(null);
    this.wrongRowId.set(null);
    this.shuffleTick.update((t) => t + 1);
  }

  finish(): void {
    if (!this.allMatched()) return;
    this.continued.emit();
  }

  trackPair(_: number, pair: WellnessHabitMatchPair): string {
    return pair.id;
  }
}
