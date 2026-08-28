import { Component, computed, input, output, signal } from '@angular/core';
import { ChallengeFeelingReportStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-feeling-report-step-view',
  standalone: true,
  templateUrl: './challenge-feeling-report-step-view.html',
  styleUrl: './challenge-feeling-report-step-view.scss',
})
export class ChallengeFeelingReportStepView {
  readonly step = input.required<ChallengeFeelingReportStep>();
  readonly submitted = output<Record<string, string>>();

  readonly draft = signal<Record<string, string>>({});
  readonly locked = signal(false);

  readonly canProceed = computed(() => this.step().fields.every((f) => (this.draft()[f.id] ?? '').trim().length > 0));

  updateField(id: string, value: string): void {
    this.draft.update((d) => ({ ...d, [id]: value }));
  }

  finish(): void {
    if (!this.canProceed() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit(this.draft());
  }
}
