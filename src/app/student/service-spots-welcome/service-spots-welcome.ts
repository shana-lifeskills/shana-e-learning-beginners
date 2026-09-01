import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Serve where you are" welcome layout — Service Module, Week 2 ("Serving at
 * Home and School"). A deliberately spare intro screen: a week pill, a
 * two-tone title, a hand-drawn scene of a house and a school joined by a
 * dotted path of small hearts, and a single Objective card. The week's
 * teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-service-spots-welcome',
  standalone: true,
  templateUrl: './service-spots-welcome.html',
  styleUrl: './service-spots-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceSpotsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ssw!: NonNullable<Lesson['serviceSpotsWelcome']>;
}
