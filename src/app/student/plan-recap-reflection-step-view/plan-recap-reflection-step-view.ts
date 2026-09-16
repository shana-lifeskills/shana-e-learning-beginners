import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PlanRecapQuestion, PlanRecapReflectionStep } from '../../core/models/module.model';

/**
 * "Week 2 Recap: Reflect and Refine" (Planning Module — Advanced, Week 2). A
 * review journal looking back on the Week 1 challenge — short-text prompts and
 * 1–5 rating scales. Every question must be answered before Submit; then a
 * summary card with a learner tip is shown. See `PlanRecapReflectionStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-plan-recap-reflection-step-view',
  standalone: true,
  templateUrl: './plan-recap-reflection-step-view.html',
  styleUrl: './plan-recap-reflection-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanRecapReflectionStepView {
  readonly step = input.required<PlanRecapReflectionStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly text = signal<Record<string, string>>({});
  readonly scale = signal<Record<string, number>>({});
  readonly locked = signal(false);

  readonly ratings = [1, 2, 3, 4, 5];

  readonly canSubmit = computed(() =>
    this.step().questions.every((q) =>
      q.kind === 'text' ? (this.text()[q.id] ?? '').trim().length > 0 : (this.scale()[q.id] ?? 0) >= 1,
    ),
  );

  setText(id: string, value: string): void {
    if (this.locked()) return;
    this.text.update((map) => ({ ...map, [id]: value }));
  }

  setScale(id: string, value: number): void {
    if (this.locked()) return;
    this.scale.update((map) => ({ ...map, [id]: value }));
  }

  scaleValue(id: string): number {
    return this.scale()[id] ?? 0;
  }

  scaleCaption(q: PlanRecapQuestion): string {
    const value = this.scaleValue(q.id);
    if (value < 1 || !q.scaleLabels) return '';
    return q.scaleLabels[value - 1] ?? '';
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);

    const values: Record<string, string> = {};
    for (const q of this.step().questions) {
      values[q.id] =
        q.kind === 'text'
          ? (this.text()[q.id] ?? '').trim()
          : `${this.scaleValue(q.id)} — ${this.scaleCaption(q)}`;
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
