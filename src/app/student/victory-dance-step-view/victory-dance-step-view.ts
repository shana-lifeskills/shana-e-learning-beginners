import { Component, computed, input, output, signal } from '@angular/core';
import { VictoryDanceStep } from '../../core/models/module.model';

@Component({
  selector: 'app-victory-dance-step-view',
  standalone: true,
  templateUrl: './victory-dance-step-view.html',
  styleUrl: './victory-dance-step-view.scss',
})
export class VictoryDanceStepView {
  readonly step = input.required<VictoryDanceStep>();
  readonly submitted = output<Record<string, string>>();

  readonly text = signal('');
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.text().trim().length > 0);

  updateText(value: string): void {
    this.text.set(value.slice(0, this.step().maxLength));
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit({ victoryText: this.text().trim() });
  }
}
