import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Routine loop" welcome layout — Discipline Module, Week 3 ("Following
 * Routines"). A deliberately spare intro screen: a week pill, a two-tone title,
 * a hand-drawn circular day-loop whose four stops (morning, school, home,
 * night) light up in turn around the ring, and a single Objective card. The
 * week's teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-routine-loop-welcome',
  standalone: true,
  templateUrl: './routine-loop-welcome.html',
  styleUrl: './routine-loop-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineLoopWelcome extends WelcomeVariantBase {
  @Input({ required: true }) rlw!: NonNullable<Lesson['routineLoopWelcome']>;
}
