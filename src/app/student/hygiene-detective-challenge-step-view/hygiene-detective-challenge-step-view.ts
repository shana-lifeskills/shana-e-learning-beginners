import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { HygieneDetectiveChallengeStep, HygieneDetectiveClue } from '../../core/models/module.model';

/**
 * "Hygiene Detective" challenge of the week (Hygiene Module, Week 1). A
 * detective case file: the learner ticks off each hygiene habit as they spot it
 * over the five-day run. The Continue button unlocks only once every clue is
 * found. Its own visual design — see `HygieneDetectiveChallengeStep`.
 */
@Component({
  selector: 'app-hygiene-detective-challenge-step-view',
  standalone: true,
  templateUrl: './hygiene-detective-challenge-step-view.html',
  styleUrl: './hygiene-detective-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HygieneDetectiveChallengeStepView {
  readonly step = input.required<HygieneDetectiveChallengeStep>();
  readonly continued = output<void>();

  readonly found = signal<Record<string, boolean>>({});

  readonly days = computed(() => Array.from({ length: this.step().dayCount }, (_, i) => i + 1));
  readonly foundCount = computed(() => Object.values(this.found()).filter(Boolean).length);
  readonly allFound = computed(() => this.foundCount() === this.step().clues.length);

  isFound(clue: HygieneDetectiveClue): boolean {
    return !!this.found()[clue.id];
  }

  toggle(clue: HygieneDetectiveClue): void {
    this.found.update((draft) => ({ ...draft, [clue.id]: !draft[clue.id] }));
  }

  finish(): void {
    if (!this.allFound()) return;
    this.continued.emit();
  }
}
