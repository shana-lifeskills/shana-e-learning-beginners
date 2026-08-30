import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-pause-button-welcome',
  standalone: true,
  templateUrl: './pause-button-welcome.html',
  styleUrl: './pause-button-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseButtonWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pbw!: NonNullable<Lesson['pauseButtonWelcome']>;
}
