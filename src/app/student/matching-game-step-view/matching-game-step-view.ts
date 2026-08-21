import { Component, computed, input, output, signal } from '@angular/core';
import { MatchingGameStep, MatchingPair } from '../../core/models/module.model';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

@Component({
  selector: 'app-matching-game-step-view',
  standalone: true,
  templateUrl: './matching-game-step-view.html',
  styleUrl: './matching-game-step-view.scss',
})
export class MatchingGameStepView {
  readonly step = input.required<MatchingGameStep>();
  readonly continued = output<void>();

  private readonly shuffleTick = signal(0);

  readonly pictureOrder = computed<MatchingPair[]>(() => {
    this.shuffleTick();
    return shuffled(this.step().pairs);
  });
  readonly nameOrder = computed<MatchingPair[]>(() => {
    this.shuffleTick();
    return shuffled(this.step().pairs);
  });

  readonly selectedPictureId = signal<string | null>(null);
  readonly selectedNameId = signal<string | null>(null);
  readonly matchedIds = signal<Set<string>>(new Set());
  readonly wrongFlash = signal<{ picture: string; name: string } | null>(null);
  readonly attempts = signal(0);

  readonly score = computed(() => this.matchedIds().size);
  readonly allMatched = computed(() => this.matchedIds().size === this.step().pairs.length);

  cardState(id: string, side: 'picture' | 'name'): 'matched' | 'selected' | 'wrong' | null {
    if (this.matchedIds().has(id)) return 'matched';
    const flash = this.wrongFlash();
    if (flash && ((side === 'picture' && flash.picture === id) || (side === 'name' && flash.name === id))) return 'wrong';
    const selected = side === 'picture' ? this.selectedPictureId() : this.selectedNameId();
    if (selected === id) return 'selected';
    return null;
  }

  selectPicture(id: string): void {
    if (this.matchedIds().has(id) || this.wrongFlash()) return;
    if (this.selectedPictureId() === id) {
      this.selectedPictureId.set(null);
      return;
    }
    this.selectedPictureId.set(id);
    this.tryMatch(id, this.selectedNameId());
  }

  selectName(id: string): void {
    if (this.matchedIds().has(id) || this.wrongFlash()) return;
    if (this.selectedNameId() === id) {
      this.selectedNameId.set(null);
      return;
    }
    this.selectedNameId.set(id);
    this.tryMatch(this.selectedPictureId(), id);
  }

  private tryMatch(pictureId: string | null, nameId: string | null): void {
    if (!pictureId || !nameId) return;

    this.attempts.update((a) => a + 1);

    if (pictureId === nameId) {
      this.matchedIds.update((ids) => new Set(ids).add(pictureId));
      this.selectedPictureId.set(null);
      this.selectedNameId.set(null);
      return;
    }

    this.wrongFlash.set({ picture: pictureId, name: nameId });
    setTimeout(() => {
      this.wrongFlash.set(null);
      this.selectedPictureId.set(null);
      this.selectedNameId.set(null);
    }, 600);
  }

  playAgain(): void {
    this.matchedIds.set(new Set());
    this.selectedPictureId.set(null);
    this.selectedNameId.set(null);
    this.wrongFlash.set(null);
    this.attempts.set(0);
    this.shuffleTick.update((t) => t + 1);
  }

  finish(): void {
    this.continued.emit();
  }
}
