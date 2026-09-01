import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Discipline compass" welcome layout — Discipline Module, Week 1
 * ("Understanding Discipline"). A deliberately spare intro screen: a week pill,
 * a two-tone title, a hand-drawn compass whose needle swings round to a
 * "right choice" mark, and a single Objective card. The week's teaching is left
 * to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-discipline-compass-welcome',
  standalone: true,
  templateUrl: './discipline-compass-welcome.html',
  styleUrl: './discipline-compass-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisciplineCompassWelcome extends WelcomeVariantBase {
  @Input({ required: true }) dcw!: NonNullable<Lesson['disciplineCompassWelcome']>;
}
