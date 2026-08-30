import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, StrategyBlueprintMove } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlottedMove {
  move: StrategyBlueprintMove;
  n: number;
  /** Coordinates within the 380 × 240 blueprint viewBox. */
  x: number;
  y: number;
  /** Staggered draw-in delay, in seconds. */
  delay: number;
}

/** Anchor points the planned route is drawn through — a low "problem" pin
 *  climbing in an arc over the obstacle to the "goal" flag, top right. */
const ROUTE: ReadonlyArray<readonly [number, number]> = [
  [46, 202],
  [116, 150],
  [196, 104],
  [280, 116],
  [340, 58],
];

@Component({
  selector: 'app-strategy-blueprint-welcome',
  standalone: true,
  templateUrl: './strategy-blueprint-welcome.html',
  styleUrl: './strategy-blueprint-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyBlueprintWelcome extends WelcomeVariantBase {
  @Input({ required: true }) sbp!: NonNullable<Lesson['strategyBlueprintWelcome']>;

  readonly routePoints = ROUTE.map(([x, y]) => `${x},${y}`).join(' ');
  readonly problem = ROUTE[0];
  readonly goal = ROUTE[ROUTE.length - 1];

  /** Numbered move markers spaced evenly by distance along the planned route. */
  get plottedMoves(): PlottedMove[] {
    const moves = this.sbp.moves;
    const count = moves.length;
    if (!count) return [];

    // Cumulative length of the polyline so markers sit at equal arc-length.
    const seg: { len: number; a: readonly [number, number]; b: readonly [number, number] }[] = [];
    let total = 0;
    for (let i = 0; i < ROUTE.length - 1; i++) {
      const a = ROUTE[i];
      const b = ROUTE[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      seg.push({ len, a, b });
      total += len;
    }

    return moves.map((move, i) => {
      const target = (total * (i + 1)) / (count + 1);
      let walked = 0;
      let x = ROUTE[0][0];
      let y = ROUTE[0][1];
      for (const s of seg) {
        if (walked + s.len >= target) {
          const t = (target - walked) / s.len;
          x = s.a[0] + (s.b[0] - s.a[0]) * t;
          y = s.a[1] + (s.b[1] - s.a[1]) * t;
          break;
        }
        walked += s.len;
      }
      return { move, n: i + 1, x, y, delay: 0.4 + i * 0.35 };
    });
  }
}
