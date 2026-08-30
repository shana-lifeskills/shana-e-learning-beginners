import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { MemoryTestWarmupStep } from '../../core/models/module.model';

/**
 * "Memory Test" warm-up — Thinking module, Week 3. A study phase shows the word
 * list with a countdown ring; when it runs out (or the learner taps "I've
 * memorised them") the list hides and the recall questions appear. The Continue
 * button stays locked until every question has a written answer.
 */
@Component({
  selector: 'app-memory-test-warmup-step-view',
  standalone: true,
  templateUrl: './memory-test-warmup-step-view.html',
  styleUrl: './memory-test-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryTestWarmupStepView implements OnDestroy {
  readonly step = input.required<MemoryTestWarmupStep>();
  readonly continued = output<void>();

  /** 'intro' before the timer starts, 'study' while memorising, 'recall' once hidden. */
  readonly phase = signal<'intro' | 'study' | 'recall'>('intro');
  readonly secondsLeft = signal(0);
  readonly answers = signal<Record<string, string>>({});
  readonly revealed = signal<Set<string>>(new Set());

  private timerId: ReturnType<typeof setInterval> | null = null;

  readonly total = computed(() => this.step().questions.length);
  readonly answeredCount = computed(() => {
    const answers = this.answers();
    return this.step().questions.filter((q) => (answers[q.id] ?? '').trim().length > 0).length;
  });
  readonly allAnswered = computed(() => this.answeredCount() === this.total());

  /** Fraction of the study time still remaining, for the countdown ring. */
  readonly ringFraction = computed(() => {
    const whole = this.step().studySeconds || 1;
    return this.secondsLeft() / whole;
  });

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startStudy(): void {
    this.phase.set('study');
    this.secondsLeft.set(this.step().studySeconds);
    this.clearTimer();
    this.timerId = setInterval(() => {
      const next = this.secondsLeft() - 1;
      if (next <= 0) {
        this.secondsLeft.set(0);
        this.toRecall();
      } else {
        this.secondsLeft.set(next);
      }
    }, 1000);
  }

  toRecall(): void {
    this.clearTimer();
    this.phase.set('recall');
  }

  isAnswered(id: string): boolean {
    return (this.answers()[id] ?? '').trim().length > 0;
  }

  onInput(id: string, value: string): void {
    this.answers.update((map) => ({ ...map, [id]: value }));
  }

  toggleSample(id: string): void {
    if (!this.isAnswered(id)) return;
    this.revealed.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  advance(): void {
    if (this.allAnswered()) this.continued.emit();
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
