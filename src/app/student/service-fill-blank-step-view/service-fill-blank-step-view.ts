import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ServiceFillBlankStep } from '../../core/models/module.model';

interface Token {
  key: string;
  word: string;
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Service Warm-Up" fill-in-the-blank game (Service Module, Week 4). All answer
 * words sit shuffled in a word bank; each sentence has one blank. Tap a word,
 * then tap a blank — a right word snaps in green, a wrong word shakes the slot
 * and clears the pick. Used words leave the bank. Continue is withheld until
 * every blank is filled.
 */
@Component({
  selector: 'app-service-fill-blank-step-view',
  standalone: true,
  templateUrl: './service-fill-blank-step-view.html',
  styleUrl: './service-fill-blank-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceFillBlankStepView {
  readonly step = input.required<ServiceFillBlankStep>();
  readonly continued = output<void>();

  private readonly allTokens = computed<Token[]>(() =>
    shuffled(this.step().sentences.map((s, i) => ({ key: `t${i}`, word: s.answer }))),
  );

  /** sentenceId -> filled word */
  readonly filled = signal<Record<string, string>>({});
  /** token keys already placed */
  readonly usedKeys = signal<Set<string>>(new Set());
  readonly selectedKey = signal<string | null>(null);
  readonly wrongId = signal<string | null>(null);

  readonly bank = computed(() => this.allTokens().filter((t) => !this.usedKeys().has(t.key)));
  readonly sentences = computed(() => this.step().sentences);
  readonly allFilled = computed(
    () => Object.keys(this.filled()).length === this.step().sentences.length,
  );

  selectedWord(): string | null {
    const key = this.selectedKey();
    return key ? (this.allTokens().find((t) => t.key === key)?.word ?? null) : null;
  }

  isFilled(sentenceId: string): boolean {
    return sentenceId in this.filled();
  }

  filledWord(sentenceId: string): string {
    return this.filled()[sentenceId] ?? '';
  }

  isWrong(sentenceId: string): boolean {
    return this.wrongId() === sentenceId;
  }

  tapWord(key: string): void {
    if (this.wrongId()) return;
    this.selectedKey.set(this.selectedKey() === key ? null : key);
  }

  tapBlank(sentenceId: string): void {
    if (this.wrongId() || this.isFilled(sentenceId)) return;
    const key = this.selectedKey();
    if (!key) return;
    const token = this.allTokens().find((t) => t.key === key);
    const sentence = this.step().sentences.find((s) => s.id === sentenceId);
    if (!token || !sentence) return;

    if (token.word === sentence.answer) {
      this.filled.update((f) => ({ ...f, [sentenceId]: token.word }));
      this.usedKeys.update((k) => new Set(k).add(key));
      this.selectedKey.set(null);
    } else {
      this.wrongId.set(sentenceId);
      this.selectedKey.set(null);
      setTimeout(() => this.wrongId.set(null), 500);
    }
  }

  praiseFor(sentenceId: string): string {
    return this.step().sentences.find((s) => s.id === sentenceId)?.praise ?? '';
  }

  finish(): void {
    if (!this.allFilled()) return;
    this.continued.emit();
  }
}
