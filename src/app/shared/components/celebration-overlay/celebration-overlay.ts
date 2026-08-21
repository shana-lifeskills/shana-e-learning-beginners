import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GamificationService } from '../../../core/services/gamification.service';
import { RewardEvent } from '../../../core/models/gamification.model';

const ICONS: Record<RewardEvent['kind'], string> = {
  star: '⭐',
  badge: '🎖️',
  trophy: '🏆',
};

const AUTO_HIDE_MS = 2200;

@Component({
  selector: 'app-celebration-overlay',
  standalone: true,
  templateUrl: './celebration-overlay.html',
  styleUrl: './celebration-overlay.scss',
})
export class CelebrationOverlay {
  private gamification = inject(GamificationService);
  private destroyRef = inject(DestroyRef);
  private hideTimeout?: ReturnType<typeof setTimeout>;

  readonly visible = signal(false);
  readonly icon = signal('⭐');
  readonly message = signal('');

  constructor() {
    this.gamification.rewardEvent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.show(event);
    });
  }

  dismiss(): void {
    clearTimeout(this.hideTimeout);
    this.visible.set(false);
  }

  private show(event: RewardEvent): void {
    clearTimeout(this.hideTimeout);
    this.icon.set(ICONS[event.kind]);
    this.message.set(event.message);
    this.visible.set(false);

    // Re-trigger the pop-in animation even if a reward fires back-to-back.
    requestAnimationFrame(() => {
      this.visible.set(true);
      this.hideTimeout = setTimeout(() => this.visible.set(false), AUTO_HIDE_MS);
    });
  }
}
