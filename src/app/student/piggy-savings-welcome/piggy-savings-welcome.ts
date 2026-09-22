import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-piggy-savings-welcome',
  standalone: true,
  templateUrl: './piggy-savings-welcome.html',
  styleUrl: './piggy-savings-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PiggySavingsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) psw!: NonNullable<Lesson['piggySavingsWelcome']>;
}
