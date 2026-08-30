import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SolutionMatchGameStep, SolutionMatchPair } from '../../core/models/module.model';

@Component({
  selector: 'app-solution-match-game-step-view',
  standalone: true,
  templateUrl: './solution-match-game-step-view.html',
  styleUrl: './solution-match-game-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionMatchGameStepView {
  readonly step = input.required<SolutionMatchGameStep>();
  readonly continued = output<void>();

  /** The problem peg the learner has picked up, if any. */
  readonly picked = signal<string | null>(null);
  /** Pair ids already wired correctly. */
  readonly linked = signal<Set<string>>(new Set());
  /** Pair id of the solution peg that just rejected a wrong match — drives the flash. */
  readonly rejected = signal<string | null>(null);

  /** Solutions shown in a stable, shuffled order (alphabetical) so they don't line up with the problems. */
  readonly solutionOrder = computed<SolutionMatchPair[]>(() =>
    [...this.step().pairs].sort((a, b) => a.solution.localeCompare(b.solution)),
  );

  readonly total = computed(() => this.step().pairs.length);
  readonly linkedCount = computed(() => this.linked().size);
  readonly allLinked = computed(() => this.linkedCount() === this.total());

  /** Stable colour index (0-based) for a pair, by its position in the problem list. */
  colourIndex(pairId: string): number {
    return this.step().pairs.findIndex((p) => p.id === pairId);
  }

  problemState(pairId: string): 'linked' | 'picked' | 'idle' {
    if (this.linked().has(pairId)) return 'linked';
    return this.picked() === pairId ? 'picked' : 'idle';
  }

  pickProblem(pairId: string): void {
    if (this.linked().has(pairId)) return;
    this.picked.set(this.picked() === pairId ? null : pairId);
  }

  chooseSolution(pairId: string): void {
    if (this.linked().has(pairId)) return;
    const problemId = this.picked();
    if (!problemId) return;

    if (problemId === pairId) {
      this.linked.update((set) => new Set(set).add(pairId));
      this.picked.set(null);
      return;
    }

    this.rejected.set(pairId);
    this.picked.set(null);
    setTimeout(() => this.rejected.set(null), 600);
  }

  finish(): void {
    if (this.allLinked()) this.continued.emit();
  }
}
