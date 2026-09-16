import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { VoiceConfidenceLinkStep } from '../../core/models/module.model';

/**
 * "Confidence Link" affirmation (Self-Confidence Module — Advanced, Week 2).
 * A calm speech-bubble card with one line to carry into the week — nothing
 * to fill in. Distinct from Week 1's `plan-confidence-link`. See
 * `VoiceConfidenceLinkStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-voice-confidence-link-step-view',
  standalone: true,
  templateUrl: './voice-confidence-link-step-view.html',
  styleUrl: './voice-confidence-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceConfidenceLinkStepView {
  readonly step = input.required<VoiceConfidenceLinkStep>();
  readonly continued = output<void>();

  finish(): void {
    this.continued.emit();
  }
}
