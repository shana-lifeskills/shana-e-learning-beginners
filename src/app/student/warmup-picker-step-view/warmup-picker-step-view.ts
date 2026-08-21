import { Component, computed, input, output, signal } from '@angular/core';
import { WarmupPickerStep } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-picker-step-view',
  standalone: true,
  templateUrl: './warmup-picker-step-view.html',
  styleUrl: './warmup-picker-step-view.scss',
})
export class WarmupPickerStepView {
  readonly step = input.required<WarmupPickerStep>();
  readonly submitted = output<Record<string, string>>();

  readonly selectedIds = signal<Set<string>>(new Set());
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.selectedIds().size > 0);

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  toggle(id: string): void {
    if (this.locked()) return;
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    const picks = this.step()
      .options.filter((o) => this.selectedIds().has(o.id))
      .map((o) => o.label);
    this.submitted.emit({ wishes: picks.join(', ') });
  }
}
