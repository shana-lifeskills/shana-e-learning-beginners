import { Component, computed, input, output, signal } from '@angular/core';
import { SlowTalkChallengeStep } from '../../core/models/module.model';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

@Component({
  selector: 'app-slow-talk-challenge-step-view',
  standalone: true,
  templateUrl: './slow-talk-challenge-step-view.html',
  styleUrl: './slow-talk-challenge-step-view.scss',
})
export class SlowTalkChallengeStepView {
  readonly step = input.required<SlowTalkChallengeStep>();
  readonly continued = output<void>();

  readonly days = DAYS;
  readonly doneDays = signal<Set<number>>(new Set());

  readonly count = computed(() => this.doneDays().size);
  readonly percent = computed(() => Math.round((this.count() / 7) * 100));
  readonly canFinish = computed(() => this.count() > 0);

  isDone(i: number): boolean {
    return this.doneDays().has(i);
  }

  toggleDay(i: number): void {
    this.doneDays.update((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  startOver(): void {
    this.doneDays.set(new Set());
  }

  finish(): void {
    this.continued.emit();
  }
}
