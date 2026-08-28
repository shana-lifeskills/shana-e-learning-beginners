import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-celebrate-welcome',
  standalone: true,
  templateUrl: './celebrate-welcome.html',
  styleUrl: './celebrate-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebrateWelcome extends WelcomeVariantBase {
  @Input({ required: true }) cw!: NonNullable<Lesson['celebrateWelcome']>;
}
