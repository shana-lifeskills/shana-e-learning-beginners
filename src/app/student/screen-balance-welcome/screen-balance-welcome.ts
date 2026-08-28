import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, ScreenBalanceSegment } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface ClockWedge {
  seg: ScreenBalanceSegment;
  /** `stroke-dasharray` for the arc: visible length then the rest of the circle. */
  dash: string;
  /** `stroke-dashoffset` that rotates this arc to start where the previous one ended. */
  offset: number;
  /** Hours label, e.g. "2h". */
  hoursLabel: string;
}

const RADIUS = 62;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-screen-balance-welcome',
  standalone: true,
  templateUrl: './screen-balance-welcome.html',
  styleUrl: './screen-balance-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenBalanceWelcome extends WelcomeVariantBase {
  @Input({ required: true }) sbw!: NonNullable<Lesson['screenBalanceWelcome']>;

  readonly radius = RADIUS;

  /** The donut wedges, each pre-rotated so they sit end to end around the day-clock. */
  get wedges(): ClockWedge[] {
    const total = this.sbw.segments.reduce((sum, s) => sum + s.hours, 0) || 1;
    let travelled = 0;
    return this.sbw.segments.map((seg) => {
      const length = (seg.hours / total) * CIRCUMFERENCE;
      // A 2px sliver of gap keeps the wedges visually separated.
      const gap = Math.max(length - 3, 0);
      const wedge: ClockWedge = {
        seg,
        dash: `${gap} ${CIRCUMFERENCE - gap}`,
        offset: -travelled,
        hoursLabel: `${seg.hours}h`,
      };
      travelled += length;
      return wedge;
    });
  }

  /** Clamped 0–100 fill for the self-control battery. */
  get meterFill(): number {
    return Math.max(0, Math.min(100, this.sbw.meterPercent));
  }
}
