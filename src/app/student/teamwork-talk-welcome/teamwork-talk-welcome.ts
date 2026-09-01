import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Talk and listen" welcome layout — Teamwork Module, Week 3 ("Communication in
 * Teams"). A deliberately spare intro screen: a week pill, a two-tone title, a
 * hand-drawn scene of two team members with a speech bubble travelling back and
 * forth between them while small listening ears pulse, a short caption, and a
 * single Objective card. The week's teaching is left to the lesson steps.
 * Purely presentational.
 */
@Component({
  selector: 'app-teamwork-talk-welcome',
  standalone: true,
  templateUrl: './teamwork-talk-welcome.html',
  styleUrl: './teamwork-talk-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkTalkWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ttw!: NonNullable<Lesson['teamworkTalkWelcome']>;
}
