import { Component, computed, input, output, signal } from '@angular/core';
import { ConfidenceLadderStep } from '../../core/models/module.model';

@Component({
  selector: 'app-confidence-ladder-step-view',
  standalone: true,
  templateUrl: './confidence-ladder-step-view.html',
  styleUrl: './confidence-ladder-step-view.scss',
})
export class ConfidenceLadderStepView {
  readonly step = input.required<ConfidenceLadderStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly challenge = signal('');
  readonly step1 = signal('');
  readonly step2 = signal('');
  readonly step3 = signal('');
  readonly locked = signal(false);
  readonly revealed = signal(false);

  readonly canSubmit = computed(
    () =>
      this.challenge().trim().length > 0 &&
      this.step1().trim().length > 0 &&
      this.step2().trim().length > 0 &&
      this.step3().trim().length > 0
  );

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.revealed.set(true);

    this.submitted.emit({
      challenge: this.challenge().trim(),
      step1: this.step1().trim(),
      step2: this.step2().trim(),
      step3: this.step3().trim(),
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
