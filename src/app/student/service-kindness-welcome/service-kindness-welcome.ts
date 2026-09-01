import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Kindness + responsibility" welcome layout — Service Module, Week 3
 * ("Kindness and Responsibility"). A deliberately spare intro screen: a week
 * pill, a two-tone title, a hand-drawn "heart + checkmark badge = service
 * star" equation, and a single Objective card. The week's teaching is left to
 * the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-service-kindness-welcome',
  standalone: true,
  templateUrl: './service-kindness-welcome.html',
  styleUrl: './service-kindness-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceKindnessWelcome extends WelcomeVariantBase {
  @Input({ required: true }) skw!: NonNullable<Lesson['serviceKindnessWelcome']>;
}
