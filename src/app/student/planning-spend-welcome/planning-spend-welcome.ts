import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-planning-spend-welcome',
  standalone: true,
  templateUrl: './planning-spend-welcome.html',
  styleUrl: './planning-spend-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanningSpendWelcome extends WelcomeVariantBase {
  @Input({ required: true }) psw!: NonNullable<Lesson['planningSpendWelcome']>;
}
