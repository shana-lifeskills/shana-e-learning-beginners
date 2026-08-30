import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImaginationSparkNode, Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface PlacedSpark {
  node: ImaginationSparkNode;
  /** Percent coordinates within the square burst stage. */
  x: number;
  y: number;
  /** Staggered float delay, in seconds. */
  delay: number;
}

@Component({
  selector: 'app-imagination-spark-welcome',
  standalone: true,
  templateUrl: './imagination-spark-welcome.html',
  styleUrl: './imagination-spark-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImaginationSparkWelcome extends WelcomeVariantBase {
  @Input({ required: true }) isw!: NonNullable<Lesson['imaginationSparkWelcome']>;

  /** Idea bubbles spread evenly around the lightbulb, starting from the top. */
  get placedSparks(): PlacedSpark[] {
    const nodes = this.isw.nodes;
    const count = nodes.length || 1;
    return nodes.map((node, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      return {
        node,
        x: 50 + 40 * Math.cos(angle),
        y: 50 + 40 * Math.sin(angle),
        delay: 0.3 + i * 0.4,
      };
    });
  }
}
