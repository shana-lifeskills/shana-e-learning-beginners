import { Component, computed, input, output, signal } from '@angular/core';
import { StrengthMapStep } from '../../core/models/module.model';

interface StrengthStop {
  strength: string;
  action: string;
}

const STOP_ICONS = ['🧭', '📍', '🏁'];

@Component({
  selector: 'app-strength-map-step-view',
  standalone: true,
  templateUrl: './strength-map-step-view.html',
  styleUrl: './strength-map-step-view.scss',
})
export class StrengthMapStepView {
  readonly step = input.required<StrengthMapStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly stopIcons = STOP_ICONS;

  readonly stops = signal<StrengthStop[]>([
    { strength: '', action: '' },
    { strength: '', action: '' },
    { strength: '', action: '' },
  ]);
  readonly locked = signal(false);
  readonly revealed = signal(false);

  readonly canSubmit = computed(() =>
    this.stops().every((s) => s.strength.trim().length > 0 && s.action.trim().length > 0)
  );

  setField(index: number, field: keyof StrengthStop, value: string): void {
    this.stops.update((stops) => stops.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.revealed.set(true);

    const values: Record<string, string> = {};
    this.stops().forEach((stop, i) => {
      values[`stop${i + 1}Strength`] = stop.strength;
      values[`stop${i + 1}Action`] = stop.action;
    });
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
