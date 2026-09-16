import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TrophyConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Self-Confidence Module — Advanced, Week 4
 * — the module's closing week). A calm trophy card with one line to carry
 * forward — nothing to fill in. Distinct from Weeks 1-3's confidence-link
 * variants. See `TrophyConfidenceLinkStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-trophy-confidence-link-step-view',
  standalone: true,
  templateUrl: './trophy-confidence-link-step-view.html',
  styleUrl: './trophy-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrophyConfidenceLinkStepView {
  readonly step = input.required<TrophyConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
