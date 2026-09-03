import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Moving body" welcome layout — Wellness Module, Week 2. A fresh teal-to-coral
 * card, a two-tone title, an SVG kid mid-stretch inside a slowly pulsing energy
 * ring, a friendly caption, a row of body-care habit chips, and the objective
 * on a rounded card. Purely presentational — see `LessonWellnessBodyWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-wellness-body-welcome',
  standalone: true,
  templateUrl: './wellness-body-welcome.html',
  styleUrl: './wellness-body-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellnessBodyWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wbw!: NonNullable<Lesson['wellnessBodyWelcome']>;
}
