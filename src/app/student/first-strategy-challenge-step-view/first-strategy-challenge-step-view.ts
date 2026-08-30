import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { FirstStrategyChallengeStep, FirstStrategyTask } from '../../core/models/module.model';

@Component({
  selector: 'app-first-strategy-challenge-step-view',
  standalone: true,
  templateUrl: './first-strategy-challenge-step-view.html',
  styleUrl: './first-strategy-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstStrategyChallengeStepView implements OnInit {
  readonly step = input.required<FirstStrategyChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** Id of the task the learner pinned. */
  readonly picked = signal<string | null>(null);
  /** Typed text for each step slot, keyed by field id. */
  readonly answers = signal<Record<string, string>>({});
  /** 'plan' while building, 'recap' once the plan is stamped. */
  readonly phase = signal<'plan' | 'recap'>('plan');

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().stepFields.forEach((f) => (blank[f.id] = ''));
    this.answers.set(blank);
  }

  readonly pickedTask = computed<FirstStrategyTask | null>(
    () => this.step().tasks.find((t) => t.id === this.picked()) ?? null,
  );

  readonly allFilled = computed(() => {
    const a = this.answers();
    return this.step().stepFields.every((f) => (a[f.id] ?? '').trim().length > 0);
  });

  readonly canSubmit = computed(() => !!this.picked() && this.allFilled());

  pick(id: string): void {
    if (this.phase() === 'recap') return;
    this.picked.set(id);
  }

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  submit(): void {
    if (!this.canSubmit() || this.phase() === 'recap') return;
    this.phase.set('recap');
  }

  finish(): void {
    const task = this.pickedTask();
    const a = this.answers();
    const payload: Record<string, string> = { 'My task': task?.label ?? '' };
    this.step().stepFields.forEach((f, i) => (payload[`Step ${i + 1}`] = (a[f.id] ?? '').trim()));
    this.submitted.emit(payload);
  }
}
