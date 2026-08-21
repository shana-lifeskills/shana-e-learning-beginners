import { Component, computed, input, output, signal } from '@angular/core';
import { DayPlannerStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-day-planner-step-view',
  standalone: true,
  templateUrl: './day-planner-step-view.html',
  styleUrl: './day-planner-step-view.scss',
})
export class DayPlannerStepView {
  readonly step = input.required<DayPlannerStep>();
  readonly submitted = output<Record<string, string>>();
  /** Fired once the student is done previewing/downloading their day-plan card. */
  readonly continued = output<void>();

  readonly draft = signal<Record<string, string>>({});
  readonly locked = signal(false);
  readonly showPreview = signal(false);
  readonly downloading = signal(false);

  readonly canSubmit = computed(() => this.step().sections.every((s) => (this.draft()[s.id] ?? '').trim().length > 0));

  updateSection(id: string, value: string): void {
    this.draft.update((d) => ({ ...d, [id]: value }));
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit(this.draft());
  }

  togglePreview(): void {
    this.showPreview.update((show) => !show);
  }

  async downloadCard(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const values = this.draft();
      const svg = buildFieldsCardSvg(
        this.step().heading,
        this.step().sections.map((section) => ({ label: section.label, value: values[section.id] ?? '' }))
      );
      await downloadPngFromSvg(svg, 'my-pretend-day.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
