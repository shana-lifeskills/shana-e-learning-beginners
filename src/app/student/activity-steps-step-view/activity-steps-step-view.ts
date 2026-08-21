import { Component, computed, input, output, signal } from '@angular/core';
import { ActivityStepsStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-activity-steps-step-view',
  standalone: true,
  templateUrl: './activity-steps-step-view.html',
  styleUrl: './activity-steps-step-view.scss',
})
export class ActivityStepsStepView {
  readonly step = input.required<ActivityStepsStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly answers = signal<string[]>([]);
  readonly hasSubmitted = signal(false);
  readonly downloading = signal(false);

  readonly filledCount = computed(() => this.currentAnswers().filter((a) => a.trim().length > 0).length);
  readonly canSubmit = computed(() => this.filledCount() === this.step().steps.length);

  private currentAnswers(): string[] {
    const saved = this.answers();
    return this.step().steps.map((_, i) => saved[i] ?? '');
  }

  answerAt(index: number): string {
    return this.currentAnswers()[index] ?? '';
  }

  updateAnswer(index: number, value: string): void {
    const next = this.currentAnswers();
    next[index] = value;
    this.answers.set(next);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.hasSubmitted.set(true);
    const values: Record<string, string> = {};
    this.currentAnswers().forEach((value, i) => {
      values[`step-${i + 1}`] = value;
    });
    this.submitted.emit(values);
  }

  async downloadPlan(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const rows = this.currentAnswers().map((value, i) => ({ label: `Step ${i + 1}`, value }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-morning-plan.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
