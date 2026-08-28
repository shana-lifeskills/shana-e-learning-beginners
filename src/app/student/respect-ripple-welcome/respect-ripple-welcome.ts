import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, RespectRippleNode } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlacedNode {
  node: RespectRippleNode;
  /** Percent coordinates within the square ripple stage. */
  x: number;
  y: number;
  /** Staggered glow delay, in seconds. */
  delay: number;
}

@Component({
  selector: 'app-respect-ripple-welcome',
  standalone: true,
  templateUrl: './respect-ripple-welcome.html',
  styleUrl: './respect-ripple-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespectRippleWelcome extends WelcomeVariantBase {
  @Input({ required: true }) rrw!: NonNullable<Lesson['respectRippleWelcome']>;

  /** Friend nodes spread evenly around the ripple, starting from the top. */
  get placedNodes(): PlacedNode[] {
    const nodes = this.rrw.nodes;
    const count = nodes.length || 1;
    return nodes.map((node, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      return {
        node,
        x: 50 + 42 * Math.cos(angle),
        y: 50 + 42 * Math.sin(angle),
        delay: 0.4 + i * 0.45,
      };
    });
  }
}
