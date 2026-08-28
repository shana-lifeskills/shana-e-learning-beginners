import { Component, computed, input, output, signal } from '@angular/core';
import { PoliteOrNotMoment, PoliteOrNotStep } from '../../core/models/module.model';

type Phase = 'intro' | 'playing' | 'end';
type Choice = 'polite' | 'not-polite';

@Component({
  selector: 'app-polite-or-not-step-view',
  standalone: true,
  templateUrl: './polite-or-not-step-view.html',
  styleUrl: './polite-or-not-step-view.scss',
})
export class PoliteOrNotStepView {
  readonly step = input.required<PoliteOrNotStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('intro');
  readonly activeIndex = signal(0);
  readonly choice = signal<Choice | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly revealed = signal(false);
  readonly kindChoices = signal(0);

  readonly total = computed(() => this.step().moments.length);
  readonly currentMoment = computed<PoliteOrNotMoment | null>(
    () => this.step().moments[this.activeIndex()] ?? null,
  );
  readonly answeredCorrectly = computed(() => this.feedback() === 'correct');

  dotState(index: number): 'done' | 'active' | 'todo' {
    if (index < this.activeIndex()) return 'done';
    if (index === this.activeIndex()) return 'active';
    return 'todo';
  }

  private isCorrect(choice: Choice, moment: PoliteOrNotMoment): boolean {
    return (choice === 'polite') === moment.isPolite;
  }

  start(): void {
    this.phase.set('playing');
  }

  pick(choice: Choice): void {
    if (this.answeredCorrectly()) return;
    const moment = this.currentMoment();
    if (!moment) return;

    this.choice.set(choice);
    if (this.isCorrect(choice, moment)) {
      this.feedback.set('correct');
      this.kindChoices.update((n) => n + 1);
    } else {
      this.feedback.set('incorrect');
    }
  }

  reveal(): void {
    this.revealed.set(true);
  }

  correctChoiceFor(moment: PoliteOrNotMoment): Choice {
    return moment.isPolite ? 'polite' : 'not-polite';
  }

  nextMoment(): void {
    if (!this.answeredCorrectly()) return;
    this.choice.set(null);
    this.feedback.set(null);
    this.revealed.set(false);

    if (this.activeIndex() + 1 >= this.total()) {
      this.phase.set('end');
    } else {
      this.activeIndex.update((i) => i + 1);
    }
  }

  restart(): void {
    this.phase.set('intro');
    this.activeIndex.set(0);
    this.choice.set(null);
    this.feedback.set(null);
    this.revealed.set(false);
    this.kindChoices.set(0);
  }

  finish(): void {
    this.continued.emit();
  }
}
