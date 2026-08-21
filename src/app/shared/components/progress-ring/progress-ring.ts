import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  templateUrl: './progress-ring.html',
  styleUrl: './progress-ring.scss',
})
export class ProgressRing {
  readonly percent = input(0);
  readonly color = input('#ff6f59');
  readonly size = input(72);

  private readonly radius = 30;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly dashOffset = computed(() => {
    const clamped = Math.max(0, Math.min(100, this.percent()));
    return this.circumference - (clamped / 100) * this.circumference;
  });
}
