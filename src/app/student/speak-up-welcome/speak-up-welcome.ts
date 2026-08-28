import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-speak-up-welcome',
  standalone: true,
  templateUrl: './speak-up-welcome.html',
  styleUrl: './speak-up-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeakUpWelcome extends WelcomeVariantBase {
  @Input({ required: true }) suw!: NonNullable<Lesson['speakUpWelcome']>;
}
