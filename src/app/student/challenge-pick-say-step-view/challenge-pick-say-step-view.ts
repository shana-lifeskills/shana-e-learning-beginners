import { Component, computed, input, output, signal } from '@angular/core';
import { ChallengePickSayOption, ChallengePickSayStep } from '../../core/models/module.model';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

@Component({
  selector: 'app-challenge-pick-say-step-view',
  standalone: true,
  templateUrl: './challenge-pick-say-step-view.html',
  styleUrl: './challenge-pick-say-step-view.scss',
})
export class ChallengePickSayStepView {
  readonly step = input.required<ChallengePickSayStep>();
  readonly continued = output<void>();

  readonly selectedId = signal<string | null>(null);
  readonly done = signal(false);

  readonly canFinish = computed(() => this.selectedId() !== null);

  letterFor(index: number): string {
    return LETTERS[index] ?? String(index + 1);
  }

  select(option: ChallengePickSayOption): void {
    if (this.done()) return;
    this.selectedId.set(option.id);
  }

  markDone(): void {
    if (!this.canFinish()) return;
    this.done.set(true);
  }

  finish(): void {
    this.continued.emit();
  }
}
