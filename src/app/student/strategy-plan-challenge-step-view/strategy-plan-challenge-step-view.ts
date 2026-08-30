import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { StrategyPlanChallengeStep, StrategyPlanGoal } from '../../core/models/module.model';

@Component({
  selector: 'app-strategy-plan-challenge-step-view',
  standalone: true,
  templateUrl: './strategy-plan-challenge-step-view.html',
  styleUrl: './strategy-plan-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyPlanChallengeStepView implements OnInit {
  readonly step = input.required<StrategyPlanChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly picked = signal<string | null>(null);
  readonly steps = signal<Record<string, string>>({});
  readonly reflection = signal('');
  readonly phase = signal<'plan' | 'done'>('plan');

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().stepFields.forEach((f) => (blank[f.id] = ''));
    this.steps.set(blank);
  }

  readonly pickedGoal = computed<StrategyPlanGoal | null>(
    () => this.step().goals.find((g) => g.id === this.picked()) ?? null,
  );

  readonly stepsFilled = computed(() => {
    const s = this.steps();
    return this.step().stepFields.every((f) => (s[f.id] ?? '').trim().length > 0);
  });

  readonly canSubmit = computed(
    () => !!this.picked() && this.stepsFilled() && this.reflection().trim().length > 0,
  );

  pick(id: string): void {
    if (this.phase() === 'done') return;
    this.picked.set(id);
  }

  setStep(id: string, value: string): void {
    this.steps.update((s) => ({ ...s, [id]: value }));
  }

  setReflection(value: string): void {
    this.reflection.set(value);
  }

  submit(): void {
    if (!this.canSubmit() || this.phase() === 'done') return;
    this.phase.set('done');
  }

  finish(): void {
    const goal = this.pickedGoal();
    const s = this.steps();
    const payload: Record<string, string> = { Goal: goal?.label ?? '' };
    this.step().stepFields.forEach((f, i) => (payload[`Step ${i + 1}`] = (s[f.id] ?? '').trim()));
    payload[this.step().reflectionLabel] = this.reflection().trim();
    this.submitted.emit(payload);
  }
}
