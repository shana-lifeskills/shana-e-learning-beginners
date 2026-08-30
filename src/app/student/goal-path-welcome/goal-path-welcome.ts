import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GoalPathStep, Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlacedStep {
  step: GoalPathStep;
  n: number;
  /** Which side of the spine the stone sits on. */
  side: 'left' | 'right';
}

@Component({
  selector: 'app-goal-path-welcome',
  standalone: true,
  templateUrl: './goal-path-welcome.html',
  styleUrl: './goal-path-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalPathWelcome extends WelcomeVariantBase {
  @Input({ required: true }) gpw!: NonNullable<Lesson['goalPathWelcome']>;

  /** Steps ordered top-to-bottom for rendering — highest number sits nearest the goal flag. */
  get stepsTopDown(): PlacedStep[] {
    return this.gpw.steps
      .map((step, i): PlacedStep => ({
        step,
        n: i + 1,
        side: i % 2 === 0 ? 'left' : 'right',
      }))
      .reverse();
  }
}
