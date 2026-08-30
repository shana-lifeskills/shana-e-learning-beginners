import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, SolutionPathStep } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlottedStep {
  step: SolutionPathStep;
  n: number;
  /** Coordinates within the 380 × 200 scene viewBox. */
  x: number;
  y: number;
  delay: number;
}

/** Anchor points the solution path is drawn through — a low "problem" tangle
 *  climbing to the right to the "solved" target, with the three middle points
 *  used as the numbered stations. */
const ROUTE: ReadonlyArray<readonly [number, number]> = [
  [34, 156],
  [112, 128],
  [190, 104],
  [268, 92],
  [346, 54],
];

@Component({
  selector: 'app-solution-path-welcome',
  standalone: true,
  templateUrl: './solution-path-welcome.html',
  styleUrl: './solution-path-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPathWelcome extends WelcomeVariantBase {
  @Input({ required: true }) spw!: NonNullable<Lesson['solutionPathWelcome']>;

  readonly routePoints = ROUTE.map(([x, y]) => `${x},${y}`).join(' ');
  readonly problem = ROUTE[0];
  readonly solved = ROUTE[ROUTE.length - 1];

  /** The three inner route anchors, captioned with the problem-solving steps. */
  get plottedSteps(): PlottedStep[] {
    return this.spw.steps.slice(0, 3).map((step, i) => {
      const [x, y] = ROUTE[i + 1];
      return { step, n: i + 1, x, y, delay: 0.4 + i * 0.35 };
    });
  }
}
