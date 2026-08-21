import { Component, computed, input, output, signal } from '@angular/core';
import { IdentityPlannerStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-identity-planner-step-view',
  standalone: true,
  templateUrl: './identity-planner-step-view.html',
  styleUrl: './identity-planner-step-view.scss',
})
export class IdentityPlannerStepView {
  readonly step = input.required<IdentityPlannerStep>();
  readonly submitted = output<Record<string, string>>();

  readonly draft = signal<Record<string, string>>({});
  readonly exporting = signal(false);
  readonly locked = signal(false);

  readonly canProceed = computed(() => this.step().fields.every((f) => (this.draft()[f.id] ?? '').trim().length > 0));

  updateField(id: string, value: string): void {
    this.draft.update((d) => ({ ...d, [id]: value }));
  }

  async exportPlan(): Promise<void> {
    if (!this.canProceed() || this.exporting()) return;
    this.exporting.set(true);
    try {
      const values = this.draft();
      const svg = buildFieldsCardSvg(
        this.step().heading,
        this.step().fields.map((field) => ({ label: field.label, value: values[field.id] ?? '' }))
      );
      await downloadPngFromSvg(svg, 'my-identity-plan.png');
    } finally {
      this.exporting.set(false);
    }
  }

  continue(): void {
    if (!this.canProceed() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit(this.draft());
  }
}
