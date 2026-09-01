import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Puzzle team" welcome layout — Teamwork Module, Week 1 ("What is Teamwork?").
 * A deliberately spare intro screen: a week pill, a two-tone title, a
 * hand-drawn scene of four labelled puzzle pieces that slide in from the
 * corners and interlock into one complete square, a short caption, and a
 * single Objective card. The week's teaching is left to the lesson steps.
 * Purely presentational.
 */
@Component({
  selector: 'app-teamwork-puzzle-welcome',
  standalone: true,
  templateUrl: './teamwork-puzzle-welcome.html',
  styleUrl: './teamwork-puzzle-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkPuzzleWelcome extends WelcomeVariantBase {
  @Input({ required: true }) tpw!: NonNullable<Lesson['teamworkPuzzleWelcome']>;
}
