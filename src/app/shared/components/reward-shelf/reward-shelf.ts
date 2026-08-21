import { Component, input } from '@angular/core';
import { RewardTotals } from '../../../core/models/gamification.model';

export interface RewardShelfHighlights {
  starsThisWeek: number;
  badgesAlmostUnlocked: number;
}

@Component({
  selector: 'app-reward-shelf',
  standalone: true,
  templateUrl: './reward-shelf.html',
  styleUrl: './reward-shelf.scss',
})
export class RewardShelf {
  readonly totals = input.required<RewardTotals>();
  /** Optional per-card subtext; omit on pages (like the rewards page) that just want the raw totals. */
  readonly highlights = input<RewardShelfHighlights | null>(null);
}
