import { Component, computed, input, output, signal } from '@angular/core';
import { SharingCircleStep } from '../../core/models/module.model';

@Component({
  selector: 'app-sharing-circle-step-view',
  standalone: true,
  templateUrl: './sharing-circle-step-view.html',
  styleUrl: './sharing-circle-step-view.scss',
})
export class SharingCircleStepView {
  readonly step = input.required<SharingCircleStep>();
  readonly submitted = output<Record<string, string>>();

  readonly selectedId = signal<string | null>(null);
  readonly text = signal('');
  readonly locked = signal(false);

  readonly selectedOption = computed(() => this.step().options.find((o) => o.id === this.selectedId()) ?? null);
  readonly canSubmit = computed(() => this.selectedId() !== null && this.text().trim().length > 0);

  isSelected(id: string): boolean {
    return this.selectedId() === id;
  }

  select(id: string): void {
    if (this.locked()) return;
    if (this.selectedId() !== id) this.text.set('');
    this.selectedId.set(id);
  }

  updateText(value: string): void {
    this.text.set(value);
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    const picked = this.selectedOption();
    this.submitted.emit({ shared: picked?.title ?? '', response: this.text().trim() });
  }
}
