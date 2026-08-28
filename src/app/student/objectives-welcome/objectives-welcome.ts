import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-objectives-welcome',
  standalone: true,
  templateUrl: './objectives-welcome.html',
  styleUrl: './objectives-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectivesWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ow!: NonNullable<Lesson['objectivesWelcome']>;
}
