import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { PoliteMessageChallengeStep } from '../../core/models/module.model';

interface DayEntry {
  checks: boolean[];
  rewrite: string;
  done: boolean;
}

@Component({
  selector: 'app-polite-message-challenge-step-view',
  standalone: true,
  templateUrl: './polite-message-challenge-step-view.html',
  styleUrl: './polite-message-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliteMessageChallengeStepView implements OnInit {
  readonly step = input.required<PoliteMessageChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly days = signal<DayEntry[]>([]);
  readonly pledged = signal(false);

  ngOnInit(): void {
    const s = this.step();
    this.days.set(
      Array.from({ length: s.dayCount }, () => ({
        checks: s.checkItems.map(() => false),
        rewrite: '',
        done: false,
      })),
    );
  }

  readonly doneCount = computed(() => this.days().filter((d) => d.done).length);
  readonly total = computed(() => this.step().dayCount);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDone = computed(() => this.total() > 0 && this.doneCount() === this.total());

  canFinishDay(index: number): boolean {
    const day = this.days()[index];
    if (!day || day.done) return false;
    return day.checks.every((c) => c) && day.rewrite.trim().length > 0;
  }

  toggleCheck(dayIndex: number, checkIndex: number): void {
    this.days.update((list) =>
      list.map((d, i) =>
        i === dayIndex ? { ...d, checks: d.checks.map((c, ci) => (ci === checkIndex ? !c : c)) } : d,
      ),
    );
  }

  setRewrite(dayIndex: number, value: string): void {
    this.days.update((list) => list.map((d, i) => (i === dayIndex ? { ...d, rewrite: value } : d)));
  }

  finishDay(dayIndex: number): void {
    if (!this.canFinishDay(dayIndex)) return;
    this.days.update((list) => list.map((d, i) => (i === dayIndex ? { ...d, done: true } : d)));
  }

  togglePledge(): void {
    this.pledged.update((p) => !p);
  }

  complete(): void {
    if (!this.allDone() || !this.pledged()) return;
    const payload: Record<string, string> = {};
    this.days().forEach((d, i) => {
      payload[`Day ${i + 1} — polite rewrite`] = d.rewrite.trim();
    });
    payload['My confidence link'] = this.step().confidenceStatement;
    this.submitted.emit(payload);
  }
}
