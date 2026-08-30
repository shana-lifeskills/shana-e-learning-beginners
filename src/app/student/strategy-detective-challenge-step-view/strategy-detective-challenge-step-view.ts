import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { StrategyDetectiveChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-strategy-detective-challenge-step-view',
  standalone: true,
  templateUrl: './strategy-detective-challenge-step-view.html',
  styleUrl: './strategy-detective-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyDetectiveChallengeStepView implements OnInit {
  readonly step = input.required<StrategyDetectiveChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** Typed answer for each case-file line, keyed by field id. */
  readonly answers = signal<Record<string, string>>({});
  /** 'file' while filling, 'recap' once the case is filed. */
  readonly phase = signal<'file' | 'recap'>('file');

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().fields.forEach((f) => (blank[f.id] = ''));
    this.answers.set(blank);
  }

  readonly allFilled = computed(() => {
    const a = this.answers();
    return this.step().fields.every((f) => (a[f.id] ?? '').trim().length > 0);
  });

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  submit(): void {
    if (!this.allFilled() || this.phase() === 'recap') return;
    this.phase.set('recap');
  }

  finish(): void {
    const a = this.answers();
    const payload: Record<string, string> = {};
    this.step().fields.forEach((f) => (payload[f.label] = (a[f.id] ?? '').trim()));
    this.submitted.emit(payload);
  }
}
