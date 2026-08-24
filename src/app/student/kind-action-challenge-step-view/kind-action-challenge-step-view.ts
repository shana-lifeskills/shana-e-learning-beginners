import { Component, computed, input, output, signal } from '@angular/core';
import { KindActionChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-kind-action-challenge-step-view',
  standalone: true,
  templateUrl: './kind-action-challenge-step-view.html',
  styleUrl: './kind-action-challenge-step-view.scss',
})
export class KindActionChallengeStepView {
  readonly step = input.required<KindActionChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly draft = signal('');
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.draft().trim().length > 0);

  updateDraft(value: string): void {
    this.draft.set(value);
  }

  pick(suggestion: string): void {
    if (this.locked()) return;
    this.draft.set(suggestion);
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit({ kindAction: this.draft().trim() });
  }
}
