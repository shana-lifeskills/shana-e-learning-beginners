import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DiscussionMatchPair, DiscussionMatchStep } from '../../core/models/module.model';

@Component({
  selector: 'app-discussion-match-step-view',
  standalone: true,
  templateUrl: './discussion-match-step-view.html',
  styleUrl: './discussion-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionMatchStepView {
  readonly step = input.required<DiscussionMatchStep>();
  readonly continued = output<void>();

  /** The action the learner has selected, if any. */
  readonly picked = signal<string | null>(null);
  /** Pair ids already matched correctly. */
  readonly matched = signal<Set<string>>(new Set());
  /** Pair id of the result that just rejected a wrong match — drives the shake. */
  readonly rejected = signal<string | null>(null);

  /** Results in a stable shuffled order (alphabetical) so they don't line up with the actions. */
  readonly resultOrder = computed<DiscussionMatchPair[]>(() =>
    [...this.step().pairs].sort((a, b) => a.result.localeCompare(b.result)),
  );

  readonly total = computed(() => this.step().pairs.length);
  readonly matchedCount = computed(() => this.matched().size);
  readonly allMatched = computed(() => this.matchedCount() === this.total());

  actionState(pairId: string): 'matched' | 'picked' | 'idle' {
    if (this.matched().has(pairId)) return 'matched';
    return this.picked() === pairId ? 'picked' : 'idle';
  }

  pickAction(pairId: string): void {
    if (this.matched().has(pairId)) return;
    this.picked.set(this.picked() === pairId ? null : pairId);
  }

  chooseResult(pairId: string): void {
    if (this.matched().has(pairId)) return;
    const actionId = this.picked();
    if (!actionId) return;

    if (actionId === pairId) {
      this.matched.update((set) => new Set(set).add(pairId));
      this.picked.set(null);
      return;
    }

    this.rejected.set(pairId);
    this.picked.set(null);
    setTimeout(() => this.rejected.set(null), 600);
  }

  finish(): void {
    if (this.allMatched()) this.continued.emit();
  }
}
