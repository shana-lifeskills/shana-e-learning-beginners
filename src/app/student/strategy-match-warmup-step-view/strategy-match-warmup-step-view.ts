import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { StrategyMatchPair, StrategyMatchWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-strategy-match-warmup-step-view',
  standalone: true,
  templateUrl: './strategy-match-warmup-step-view.html',
  styleUrl: './strategy-match-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyMatchWarmupStepView {
  readonly step = input.required<StrategyMatchWarmupStep>();
  readonly continued = output<void>();

  /** The problem "lock" the learner has selected, if any. */
  readonly picked = signal<string | null>(null);
  /** Pair ids already opened. */
  readonly opened = signal<Set<string>>(new Set());
  /** Pair id of the key that just rejected a wrong match — drives the shake. */
  readonly rejected = signal<string | null>(null);

  /** Strategy keys in a stable shuffled order (alphabetical) so they don't line up with the problems. */
  readonly keyOrder = computed<StrategyMatchPair[]>(() =>
    [...this.step().pairs].sort((a, b) => a.strategy.localeCompare(b.strategy)),
  );

  readonly total = computed(() => this.step().pairs.length);
  readonly openedCount = computed(() => this.opened().size);
  readonly allOpen = computed(() => this.openedCount() === this.total());

  lockState(pairId: string): 'open' | 'picked' | 'idle' {
    if (this.opened().has(pairId)) return 'open';
    return this.picked() === pairId ? 'picked' : 'idle';
  }

  pickLock(pairId: string): void {
    if (this.opened().has(pairId)) return;
    this.picked.set(this.picked() === pairId ? null : pairId);
  }

  chooseKey(pairId: string): void {
    if (this.opened().has(pairId)) return;
    const lockId = this.picked();
    if (!lockId) return;

    if (lockId === pairId) {
      this.opened.update((set) => new Set(set).add(pairId));
      this.picked.set(null);
      return;
    }

    this.rejected.set(pairId);
    this.picked.set(null);
    setTimeout(() => this.rejected.set(null), 600);
  }

  finish(): void {
    if (this.allOpen()) this.continued.emit();
  }
}
