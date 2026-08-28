import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-respect-circle-welcome',
  standalone: true,
  templateUrl: './respect-circle-welcome.html',
  styleUrl: './respect-circle-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespectCircleWelcome extends WelcomeVariantBase {
  @Input({ required: true }) rcw!: NonNullable<Lesson['respectCircleWelcome']>;
}
