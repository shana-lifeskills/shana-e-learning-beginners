import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { StoryCarouselStep } from '../../core/models/module.model';

const AUTO_PLAY_INTERVAL_MS = 3500;

@Component({
  selector: 'app-story-carousel-step-view',
  standalone: true,
  templateUrl: './story-carousel-step-view.html',
  styleUrl: './story-carousel-step-view.scss',
})
export class StoryCarouselStepView {
  private destroyRef = inject(DestroyRef);

  readonly step = input.required<StoryCarouselStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly autoPlaying = signal(false);

  private autoPlayTimer?: ReturnType<typeof setInterval>;

  readonly currentSlide = computed(() => this.step().slides[this.activeIndex()]);
  readonly isFirst = computed(() => this.activeIndex() === 0);
  readonly isLast = computed(() => this.activeIndex() === this.step().slides.length - 1);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopAutoPlay());
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  prev(): void {
    if (!this.isFirst()) this.activeIndex.update((i) => i - 1);
  }

  next(): void {
    if (!this.isLast()) {
      this.activeIndex.update((i) => i + 1);
    } else {
      this.stopAutoPlay();
    }
  }

  toggleAutoPlay(): void {
    if (this.autoPlaying()) {
      this.stopAutoPlay();
      return;
    }
    this.autoPlaying.set(true);
    this.autoPlayTimer = setInterval(() => {
      if (this.isLast()) {
        this.stopAutoPlay();
        return;
      }
      this.activeIndex.update((i) => i + 1);
      if (this.isLast()) this.stopAutoPlay();
    }, AUTO_PLAY_INTERVAL_MS);
  }

  private stopAutoPlay(): void {
    this.autoPlaying.set(false);
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = undefined;
  }
}
