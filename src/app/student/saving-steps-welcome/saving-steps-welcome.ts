import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-saving-steps-welcome',
  standalone: true,
  templateUrl: './saving-steps-welcome.html',
  styleUrl: './saving-steps-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingStepsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ssw!: NonNullable<Lesson['savingStepsWelcome']>;
}
