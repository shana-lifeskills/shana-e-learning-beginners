import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { WeeklyAttentionChallengeStep } from '../../core/models/module.model';

/**
 * "Challenge of the Week" closing step — Thinking module, Week 1. Lists three
 * daily attention practices, a three-day tick tracker, and a reflection
 * question. Submitting with every day ticked and the reflection written stamps
 * the card complete; Finish then emits the reflection so the week can close and
 * award a star.
 */
@Component({
  selector: 'app-weekly-attention-challenge-step-view',
  standalone: true,
  templateUrl: './weekly-attention-challenge-step-view.html',
  styleUrl: './weekly-attention-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyAttentionChallengeStepView {
  readonly step = input.required<WeeklyAttentionChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** Indexes of the days the learner has ticked off. */
  readonly doneDays = signal<Set<number>>(new Set());
  readonly reflection = signal('');
  readonly sampleShown = signal(false);
  /** 'track' while filling in, 'done' once the card is stamped. */
  readonly phase = signal<'track' | 'done'>('track');

  readonly allDaysDone = computed(() => this.doneDays().size === this.step().dayLabels.length);
  readonly reflectionFilled = computed(() => this.reflection().trim().length > 0);
  readonly canSubmit = computed(() => this.allDaysDone() && this.reflectionFilled());

  isDayDone(i: number): boolean {
    return this.doneDays().has(i);
  }

  toggleDay(i: number): void {
    if (this.phase() === 'done') return;
    this.doneDays.update((set) => {
      const next = new Set(set);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  setReflection(value: string): void {
    this.reflection.set(value);
  }

  toggleSample(): void {
    if (!this.reflectionFilled()) return;
    this.sampleShown.update((v) => !v);
  }

  submit(): void {
    if (!this.canSubmit() || this.phase() === 'done') return;
    this.phase.set('done');
  }

  finish(): void {
    const payload: Record<string, string> = {};
    this.step().dayLabels.forEach((label) => (payload[label] = 'Practised'));
    payload['What changed when you slowed down'] = this.reflection().trim();
    this.submitted.emit(payload);
  }
}
