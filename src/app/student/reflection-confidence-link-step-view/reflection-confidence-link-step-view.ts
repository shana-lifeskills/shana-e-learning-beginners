import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReflectionConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Planning Module — Advanced, Week 4). A
 * rippling reflection-pool card with one line to carry forward — nothing to
 * fill in. See `ReflectionConfidenceLinkStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-reflection-confidence-link-step-view',
  standalone: true,
  templateUrl: './reflection-confidence-link-step-view.html',
  styleUrl: './reflection-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReflectionConfidenceLinkStepView {
  readonly step = input.required<ReflectionConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
