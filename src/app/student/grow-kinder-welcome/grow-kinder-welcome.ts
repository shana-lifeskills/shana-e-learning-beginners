import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-grow-kinder-welcome',
  standalone: true,
  templateUrl: './grow-kinder-welcome.html',
  styleUrl: './grow-kinder-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowKinderWelcome extends WelcomeVariantBase {
  @Input({ required: true }) gkw!: NonNullable<Lesson['growKinderWelcome']>;
}
