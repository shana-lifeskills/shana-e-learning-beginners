import { Component, computed, input, output } from '@angular/core';
import { ChallengeConfidenceStep } from '../../core/models/module.model';

@Component({
  selector: 'app-challenge-confidence-step-view',
  standalone: true,
  templateUrl: './challenge-confidence-step-view.html',
  styleUrl: './challenge-confidence-step-view.scss',
})
export class ChallengeConfidenceStepView {
  readonly step = input.required<ChallengeConfidenceStep>();
  readonly continued = output<void>();

  /** Splits the flat-layout heading into a lead phrase + last word, so the last word can be colored differently, e.g. "Challenge of the" + "Week". */
  readonly headingLead = computed(() => this.step().badge.split(' ').slice(0, -1).join(' '));
  readonly headingLast = computed(() => this.step().badge.split(' ').slice(-1)[0]);
}
