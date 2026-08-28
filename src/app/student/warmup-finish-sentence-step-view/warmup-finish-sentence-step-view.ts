import { Component, computed, input, output, signal } from '@angular/core';
import { WarmupFinishSentenceItem, WarmupFinishSentenceStep } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-finish-sentence-step-view',
  standalone: true,
  templateUrl: './warmup-finish-sentence-step-view.html',
  styleUrl: './warmup-finish-sentence-step-view.scss',
})
export class WarmupFinishSentenceStepView {
  readonly step = input.required<WarmupFinishSentenceStep>();
  readonly continued = output<void>();

  /** Current text typed into each sentence, keyed by item id. */
  readonly answers = signal<Record<string, string>>({});
  /** Which sentences have been checked (locked in), keyed by item id. */
  readonly checked = signal<Record<string, boolean>>({});
  /** Which sentences currently show their hint, keyed by item id. */
  readonly hints = signal<Record<string, boolean>>({});

  readonly doneCount = computed(() => Object.values(this.checked()).filter(Boolean).length);
  readonly total = computed(() => this.step().items.length);
  readonly allDone = computed(() => this.doneCount() === this.total());
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );

  answerFor(item: WarmupFinishSentenceItem): string {
    return this.answers()[item.id] ?? '';
  }

  isChecked(item: WarmupFinishSentenceItem): boolean {
    return !!this.checked()[item.id];
  }

  showsHint(item: WarmupFinishSentenceItem): boolean {
    return !!this.hints()[item.id];
  }

  canCheck(item: WarmupFinishSentenceItem): boolean {
    return this.answerFor(item).trim().length > 0 && !this.isChecked(item);
  }

  onInput(item: WarmupFinishSentenceItem, value: string): void {
    this.answers.update((map) => ({ ...map, [item.id]: value }));
  }

  check(item: WarmupFinishSentenceItem): void {
    if (!this.canCheck(item)) return;
    this.checked.update((map) => ({ ...map, [item.id]: true }));
  }

  toggleHint(item: WarmupFinishSentenceItem): void {
    this.hints.update((map) => ({ ...map, [item.id]: !map[item.id] }));
  }

  finish(): void {
    if (!this.allDone()) return;
    this.continued.emit();
  }
}
