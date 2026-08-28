import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-digital-manners-welcome',
  standalone: true,
  templateUrl: './digital-manners-welcome.html',
  styleUrl: './digital-manners-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalMannersWelcome extends WelcomeVariantBase {
  @Input({ required: true }) dmw!: NonNullable<Lesson['digitalMannersWelcome']>;
}
