import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Consistency streak" welcome layout — Discipline Module, Week 4
 * ("Consistency & Responsibility"). A deliberately spare intro screen: a week
 * pill, a two-tone title, a hand-drawn seven-day streak strip whose stamps
 * fill in one after another over a climbing growth bar, and a single Objective
 * card. The week's teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-consistency-streak-welcome',
  standalone: true,
  templateUrl: './consistency-streak-welcome.html',
  styleUrl: './consistency-streak-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsistencyStreakWelcome extends WelcomeVariantBase {
  @Input({ required: true }) csw!: NonNullable<Lesson['consistencyStreakWelcome']>;

  readonly days = [0, 1, 2, 3, 4, 5, 6];
}
