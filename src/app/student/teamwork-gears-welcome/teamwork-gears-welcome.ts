import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Meshing gears" welcome layout — Teamwork Module, Week 4 ("Respect and
 * Cooperation"). A deliberately spare intro screen: a week pill, a two-tone
 * title, a hand-drawn pair of interlocking gears that turn together in
 * opposite directions, a short caption, and a single Objective card. The
 * week's teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-teamwork-gears-welcome',
  standalone: true,
  templateUrl: './teamwork-gears-welcome.html',
  styleUrl: './teamwork-gears-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkGearsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) tgw!: NonNullable<Lesson['teamworkGearsWelcome']>;

  /** Eight evenly-spaced angles, used to lay out each gear's teeth. */
  readonly toothAngles = [0, 45, 90, 135, 180, 225, 270, 315];
}
