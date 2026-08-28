import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-goal-welcome',
  standalone: true,
  templateUrl: './goal-welcome.html',
  styleUrl: './goal-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalWelcome extends WelcomeVariantBase {
  @Input({ required: true }) gw!: NonNullable<Lesson['goalWelcome']>;
}
