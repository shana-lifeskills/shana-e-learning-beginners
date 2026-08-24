import { Component, computed, input, output, signal } from '@angular/core';
import { FeelingsMatchStep } from '../../core/models/module.model';

@Component({
  selector: 'app-feelings-match-step-view',
  standalone: true,
  templateUrl: './feelings-match-step-view.html',
  styleUrl: './feelings-match-step-view.scss',
})
export class FeelingsMatchStepView {
  readonly step = input.required<FeelingsMatchStep>();
  readonly continued = output<void>();

  readonly matchedIds = signal<Set<string>>(new Set());
  readonly selectedWordId = signal<string | null>(null);
  readonly wrongFaceId = signal<string | null>(null);
  private draggingId: string | null = null;

  readonly allMatched = computed(() => this.matchedIds().size === this.step().pairs.length);
  readonly matchedCount = computed(() => this.matchedIds().size);
  readonly progressPercent = computed(() => Math.round((this.matchedCount() / this.step().pairs.length) * 100));

  readonly wordBank = computed(() => this.step().pairs.filter((pair) => !this.matchedIds().has(pair.id)));

  faceLabel(faceId: string): string | null {
    if (!this.matchedIds().has(faceId)) return null;
    return this.step().pairs.find((pair) => pair.id === faceId)?.label ?? null;
  }

  isFaceMatched(faceId: string): boolean {
    return this.matchedIds().has(faceId);
  }

  isFaceWrong(faceId: string): boolean {
    return this.wrongFaceId() === faceId;
  }

  selectWord(wordId: string): void {
    if (this.wrongFaceId()) return;
    this.selectedWordId.set(this.selectedWordId() === wordId ? null : wordId);
  }

  selectFace(faceId: string): void {
    if (this.isFaceMatched(faceId) || this.wrongFaceId()) return;
    const wordId = this.selectedWordId();
    if (!wordId) return;
    this.attemptMatch(wordId, faceId);
  }

  onWordDragStart(event: DragEvent, wordId: string): void {
    this.draggingId = wordId;
    event.dataTransfer?.setData('text/plain', wordId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onFaceDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFaceDrop(event: DragEvent, faceId: string): void {
    event.preventDefault();
    if (this.isFaceMatched(faceId)) return;
    const wordId = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!wordId) return;
    this.attemptMatch(wordId, faceId);
  }

  private attemptMatch(wordId: string, faceId: string): void {
    this.selectedWordId.set(null);

    if (wordId === faceId) {
      this.matchedIds.update((ids) => new Set(ids).add(faceId));
      return;
    }

    this.wrongFaceId.set(faceId);
    setTimeout(() => this.wrongFaceId.set(null), 500);
  }

  startOver(): void {
    this.matchedIds.set(new Set());
    this.selectedWordId.set(null);
    this.wrongFaceId.set(null);
  }

  finish(): void {
    if (!this.allMatched()) return;
    this.continued.emit();
  }
}
