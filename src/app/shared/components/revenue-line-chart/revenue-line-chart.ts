import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RevenuePoint {
  date: string; // YYYY-MM-DD
  revenuePesewas: number;
}

const WIDTH = 640;
const HEIGHT = 180;
const PAD_LEFT = 8;
const PAD_RIGHT = 8;
const PAD_TOP = 12;
const PAD_BOTTOM = 8;

/**
 * Single-series area/line chart (magnitude over time) — one hue, so no
 * legend box; the card's title already says what's plotted. The crosshair
 * tracks the pointer and snaps to the nearest day, per the dataviz skill's
 * interaction spec: readers aim at a date, never at a 2px line.
 */
@Component({
  selector: 'app-revenue-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-line-chart.html',
  styleUrl: './revenue-line-chart.scss',
})
export class RevenueLineChart {
  readonly points = input.required<RevenuePoint[]>();
  readonly color = input<string>('#2f7a8c');

  readonly hoveredIndex = signal<number | null>(null);

  readonly width = WIDTH;
  readonly height = HEIGHT;

  private readonly maxValue = computed(() => Math.max(...this.points().map((p) => p.revenuePesewas), 1));

  private readonly plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  private readonly plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  readonly coords = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return [];
    const step = pts.length > 1 ? this.plotWidth / (pts.length - 1) : 0;
    return pts.map((p, i) => ({
      x: PAD_LEFT + step * i,
      y: PAD_TOP + this.plotHeight - (p.revenuePesewas / this.maxValue()) * this.plotHeight,
      point: p,
    }));
  });

  readonly linePath = computed(() => {
    const c = this.coords();
    if (c.length === 0) return '';
    return c.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');
  });

  /** Same path, closed down to the baseline — the ~10% opacity area wash. */
  readonly areaPath = computed(() => {
    const c = this.coords();
    if (c.length === 0) return '';
    const baseline = PAD_TOP + this.plotHeight;
    const first = c[0];
    const last = c[c.length - 1];
    return `${this.linePath()} L ${last.x.toFixed(1)} ${baseline} L ${first.x.toFixed(1)} ${baseline} Z`;
  });

  /** Clean 0 / mid / max y-axis ticks, thousands-comma'd. */
  readonly yTicks = computed(() => {
    const max = this.maxValue();
    const vals = [max, max / 2, 0];
    return vals.map((v) => ({
      value: v,
      y: PAD_TOP + this.plotHeight - (v / max) * this.plotHeight,
      label: `GHS ${Math.round(v / 100).toLocaleString('en-GH')}`,
    }));
  });

  onPointerMove(event: PointerEvent): void {
    const rect = (event.currentTarget as Element).getBoundingClientRect();
    const xInViewBox = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const c = this.coords();
    if (c.length === 0) return;
    let nearest = 0;
    let nearestDist = Infinity;
    c.forEach((pt, i) => {
      const dist = Math.abs(pt.x - xInViewBox);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    this.hoveredIndex.set(nearest);
  }

  onPointerLeave(): void {
    this.hoveredIndex.set(null);
  }

  dateLabel(date: string): string {
    return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  amountLabel(pesewas: number): string {
    return `GHS ${(pesewas / 100).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
  }
}
