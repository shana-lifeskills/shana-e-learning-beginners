import { Component, computed, input, output, signal } from '@angular/core';
import { StrengthSnapshotStep } from '../../core/models/module.model';

@Component({
  selector: 'app-strength-snapshot-step-view',
  standalone: true,
  templateUrl: './strength-snapshot-step-view.html',
  styleUrl: './strength-snapshot-step-view.scss',
})
export class StrengthSnapshotStepView {
  readonly step = input.required<StrengthSnapshotStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly strength = signal('');
  readonly discovery = signal('');
  readonly posted = signal(false);

  readonly canPost = computed(() => this.strength().trim().length > 0 && this.discovery().trim().length > 0);

  setStrength(value: string): void {
    this.strength.set(value);
  }

  setDiscovery(value: string): void {
    this.discovery.set(value);
  }

  post(): void {
    if (!this.canPost() || this.posted()) return;
    this.posted.set(true);
    this.submitted.emit({ strength: this.strength().trim(), discovery: this.discovery().trim() });
  }

  finish(): void {
    this.continued.emit();
  }
}
