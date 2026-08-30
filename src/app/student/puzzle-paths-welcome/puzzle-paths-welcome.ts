import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, PuzzlePathRoute } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlacedRoute {
  route: PuzzlePathRoute;
  /** SVG path from the problem node to the solved flag, bowing out by index. */
  d: string;
  /** Percent coordinates for the approach chip along the trail. */
  labelX: number;
  labelY: number;
  /** Staggered draw delay, in seconds. */
  delay: number;
}

@Component({
  selector: 'app-puzzle-paths-welcome',
  standalone: true,
  templateUrl: './puzzle-paths-welcome.html',
  styleUrl: './puzzle-paths-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzlePathsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ppw!: NonNullable<Lesson['puzzlePathsWelcome']>;

  /** Trails fan out symmetrically between the problem (40,80) and solved (260,80) nodes. */
  get placedRoutes(): PlacedRoute[] {
    const routes = this.ppw.routes;
    const count = routes.length || 1;
    const spread = 58;
    return routes.map((route, i) => {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const bowY = 80 + (t - 0.5) * 2 * spread;
      // y of the cubic's midpoint (t=0.5) for control points sharing bowY.
      const midY = 20 + 0.75 * bowY;
      return {
        route,
        d: `M 40 80 C 110 ${bowY}, 190 ${bowY}, 260 80`,
        labelX: 50,
        labelY: (midY / 160) * 100,
        delay: 0.3 + i * 0.35,
      };
    });
  }
}
