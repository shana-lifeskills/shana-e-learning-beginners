import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Helping hands" welcome layout — Service Module, Week 1 ("What is Service?").
 * A deliberately spare intro screen: a week pill, a two-tone title, a
 * hand-drawn scene of one open hand passing a glowing heart across to another
 * waiting hand while small sparkles rise, and a single Objective card. The
 * week's teaching is left to the lesson steps. Purely presentational.
 */
@Component({
  selector: 'app-service-hands-welcome',
  standalone: true,
  templateUrl: './service-hands-welcome.html',
  styleUrl: './service-hands-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceHandsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) shw!: NonNullable<Lesson['serviceHandsWelcome']>;
}
