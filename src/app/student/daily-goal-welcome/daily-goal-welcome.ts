import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-daily-goal-welcome',
  standalone: true,
  templateUrl: './daily-goal-welcome.html',
  styleUrl: './daily-goal-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyGoalWelcome extends WelcomeVariantBase {
  @Input({ required: true }) dgw!: NonNullable<Lesson['dailyGoalWelcome']>;
}
