import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Self-control dial" welcome layout — Discipline Module, Week 2
 * ("Self-Control"). A deliberately spare intro screen: a week pill, a two-tone
 * title, a hand-drawn half-circle gauge whose needle eases from a red "react"
 * zone round to a green "steady" zone, and a single Objective card. The week's
 * teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-self-control-dial-welcome',
  standalone: true,
  templateUrl: './self-control-dial-welcome.html',
  styleUrl: './self-control-dial-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfControlDialWelcome extends WelcomeVariantBase {
  @Input({ required: true }) scd!: NonNullable<Lesson['selfControlDialWelcome']>;
}
