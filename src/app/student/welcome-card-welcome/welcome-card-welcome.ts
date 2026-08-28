import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-welcome-card-welcome',
  standalone: true,
  templateUrl: './welcome-card-welcome.html',
  styleUrl: './welcome-card-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wc!: NonNullable<Lesson['welcomeCard']>;
}
