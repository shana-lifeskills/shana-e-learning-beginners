import { Component, computed, input, output, signal } from '@angular/core';
import { ConfidencePlanStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-confidence-plan-step-view',
  standalone: true,
  templateUrl: './confidence-plan-step-view.html',
  styleUrl: './confidence-plan-step-view.scss',
})
export class ConfidencePlanStepView {
  readonly step = input.required<ConfidencePlanStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly draft = signal<Record<string, string>>({});
  readonly hasSubmitted = signal(false);
  readonly downloading = signal(false);

  readonly canSubmit = computed(() => this.step().fields.every((field) => (this.draft()[field.id] ?? '').trim().length > 0));

  updateField(id: string, value: string): void {
    this.draft.update((d) => ({ ...d, [id]: value }));
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.hasSubmitted.set(true);
    this.submitted.emit(this.draft());
  }

  async downloadPlan(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const rows = this.step().fields.map((field) => ({ label: field.label, value: this.draft()[field.id] ?? '' }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'confidence-plan.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
