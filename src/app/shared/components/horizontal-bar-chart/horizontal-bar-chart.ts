import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BarChartRow {
  label: string;
  value: number;
  /** Pre-formatted for display (e.g. "GHS 399.00", "67%") — the chart never
   *  reformats a number itself, since money/percent/count all look different. */
  displayValue: string;
}

/**
 * A single-series horizontal bar chart — one hue (magnitude, not identity),
 * so no legend box is needed; the card's own title/subtitle says what's
 * plotted. Bar length is the real value; the label at the tip is direct-label
 * relief (several of this app's brand hues sit under the 3:1 mark contrast
 * floor against a white chart surface, so a visible label is mandatory, not
 * decorative — see the dataviz skill's contrast check).
 */
@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-bar-chart.html',
  styleUrl: './horizontal-bar-chart.scss',
})
export class HorizontalBarChart {
  readonly rows = input.required<BarChartRow[]>();
  /** One of the app's brand hues — already contrast/role-checked by the caller. */
  readonly color = input<string>('#2f7a8c');
  readonly emptyLabel = input<string>('No data yet.');

  readonly hoveredIndex = signal<number | null>(null);

  readonly maxValue = computed(() => Math.max(...this.rows().map((r) => r.value), 1));

  barWidthPercent(row: BarChartRow): number {
    return this.maxValue() === 0 ? 0 : Math.max((row.value / this.maxValue()) * 100, 2);
  }

  onHover(index: number): void {
    this.hoveredIndex.set(index);
  }

  onLeave(): void {
    this.hoveredIndex.set(null);
  }
}
