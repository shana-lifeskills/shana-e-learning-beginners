import { Injectable, signal } from '@angular/core';

export type SidekickMood = 'wave' | 'happy' | 'cheer' | 'thinking' | 'oops';

export interface SidekickState {
  message: string;
  mood: SidekickMood;
  visible: boolean;
}

/**
 * Global state for Ollie's floating reaction bubble. Any component can make
 * Ollie speak/react by calling `say()` — the sidekick component just renders
 * whatever this service currently holds, so it can appear on any page. Uses
 * the expressive animated avatar (rather than Ollie's static photo) since it
 * needs to switch between moods.
 */
@Injectable({ providedIn: 'root' })
export class SidekickService {
  readonly state = signal<SidekickState>({
    message: 'Hi! I’m Ollie!',
    mood: 'wave',
    visible: false,
  });

  private hideTimeout?: ReturnType<typeof setTimeout>;

  say(message: string, mood: SidekickMood = 'happy', autoHideMs = 0): void {
    clearTimeout(this.hideTimeout);
    this.state.set({ message, mood, visible: true });

    if (autoHideMs > 0) {
      this.hideTimeout = setTimeout(() => this.hide(), autoHideMs);
    }
  }

  hide(): void {
    this.state.update((s) => ({ ...s, visible: false }));
  }
}
