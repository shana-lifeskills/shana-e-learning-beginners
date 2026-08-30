import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PausePlanChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-pause-plan-challenge-step-view',
  standalone: true,
  templateUrl: './pause-plan-challenge-step-view.html',
  styleUrl: './pause-plan-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PausePlanChallengeStepView {
  readonly step = input.required<PausePlanChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** The learner's journal entry. */
  readonly entry = signal('');
  /** 'write' while journaling, 'recap' once the entry is saved. */
  readonly phase = signal<'write' | 'recap'>('write');

  readonly canSubmit = computed(() => this.entry().trim().length > 0);

  setEntry(value: string): void {
    this.entry.set(value);
  }

  submit(): void {
    if (!this.canSubmit() || this.phase() === 'recap') return;
    this.phase.set('recap');
  }

  finish(): void {
    this.submitted.emit({ [this.step().journalLabel]: this.entry().trim() });
  }
}
