import { Component, computed, input, output, signal } from '@angular/core';
import { RiskOrRewardStep } from '../../core/models/module.model';

type Pick = 'yes' | 'maybe' | 'no';

@Component({
  selector: 'app-risk-or-reward-step-view',
  standalone: true,
  templateUrl: './risk-or-reward-step-view.html',
  styleUrl: './risk-or-reward-step-view.scss',
})
export class RiskOrRewardStepView {
  readonly step = input.required<RiskOrRewardStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<'intro' | 'challenges' | 'reflection' | 'wrapup'>('intro');
  readonly cIndex = signal(0);
  readonly picks = signal<Record<string, Pick>>({});
  readonly reflectionChallenge = signal('');
  readonly reflectionAction = signal('');
  readonly posted = signal(false);

  readonly currentChallenge = computed(() => this.step().challenges[this.cIndex()] ?? null);
  readonly isLastChallenge = computed(() => this.cIndex() === this.step().challenges.length - 1);
  readonly currentPick = computed(() => {
    const challenge = this.currentChallenge();
    return challenge ? this.picks()[challenge.id] ?? null : null;
  });
  readonly currentFeedback = computed(() => {
    const pick = this.currentPick();
    if (!pick) return null;
    if (pick === 'yes') return this.step().yesFeedback;
    if (pick === 'maybe') return this.step().maybeFeedback;
    return this.step().noFeedback;
  });
  readonly canPost = computed(
    () => this.reflectionChallenge().trim().length > 0 && this.reflectionAction().trim().length > 0
  );

  begin(): void {
    this.phase.set('challenges');
  }

  choose(pick: Pick): void {
    const challenge = this.currentChallenge();
    if (!challenge || this.currentPick()) return;
    this.picks.update((p) => ({ ...p, [challenge.id]: pick }));
  }

  next(): void {
    if (!this.currentPick()) return;
    if (this.isLastChallenge()) {
      this.phase.set('reflection');
      return;
    }
    this.cIndex.update((i) => i + 1);
  }

  setReflectionChallenge(value: string): void {
    this.reflectionChallenge.set(value);
  }

  setReflectionAction(value: string): void {
    this.reflectionAction.set(value);
  }

  post(): void {
    if (!this.canPost() || this.posted()) return;
    this.posted.set(true);
    this.phase.set('wrapup');

    const values: Record<string, string> = {
      challenge: this.reflectionChallenge().trim(),
      action: this.reflectionAction().trim(),
    };
    for (const challenge of this.step().challenges) {
      const pick = this.picks()[challenge.id];
      if (pick) values[challenge.id] = pick;
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
