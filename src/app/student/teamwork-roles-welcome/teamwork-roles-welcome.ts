import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Role lineup" welcome layout — Teamwork Module, Week 2 ("Roles in a Team").
 * A deliberately spare intro screen: a week pill, a two-tone title, a
 * hand-drawn line-up of four team members that pop in one by one, each wearing
 * a differently-coloured role badge and captioned with a role name, a short
 * caption, and a single Objective card. The week's teaching is left to the
 * lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-teamwork-roles-welcome',
  standalone: true,
  templateUrl: './teamwork-roles-welcome.html',
  styleUrl: './teamwork-roles-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkRolesWelcome extends WelcomeVariantBase {
  @Input({ required: true }) trw!: NonNullable<Lesson['teamworkRolesWelcome']>;
}
