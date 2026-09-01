import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TeamworkFillBlankStep } from '../../core/models/module.model';

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
 * "Teamwork Warm-Up" fill-in-the-blank game (Teamwork Module, Week 4). One
 * sentence shows at a time with a single blank; all answer words sit shuffled
 * in a word bank below. Tapping the right word snaps it into the blank and
 * advances; a wrong word shakes the blank and clears. A progress meter fills
 * as each blank is completed. Continue is withheld until every sentence is
 * done.
 */
@Component({
  selector: 'app-teamwork-fill-blank-step-view',
  standalone: true,
  templateUrl: './teamwork-fill-blank-step-view.html',
  styleUrl: './teamwork-fill-blank-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkFillBlankStepView {
  readonly step = input.required<TeamworkFillBlankStep>();
  readonly continued = output<void>();

  private readonly allTokens = computed<Token[]>(() =>
    shuffled(this.step().sentences.map((s, i) => ({ key: `t${i}`, word: s.answer }))),
  );

  readonly activeIndex = signal(0);
  readonly usedKeys = signal<Set<string>>(new Set());
  readonly wrong = signal(false);
  readonly justFilled = signal(false);

  readonly sentences = computed(() => this.step().sentences);
  readonly current = computed(() => this.sentences()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.sentences().length);
  readonly bank = computed(() => this.allTokens().filter((t) => !this.usedKeys().has(t.key)));
  readonly nodes = computed(() => this.sentences().map((_, i) => i < this.activeIndex()));

  tapWord(token: Token): void {
    if (this.wrong() || this.justFilled()) return;
    const sentence = this.current();
    if (!sentence) return;

    if (token.word === sentence.answer) {
      this.usedKeys.update((k) => new Set(k).add(token.key));
      this.justFilled.set(true);
      setTimeout(() => {
        this.justFilled.set(false);
        this.activeIndex.update((i) => i + 1);
      }, 1200);
    } else {
      this.wrong.set(true);
      setTimeout(() => this.wrong.set(false), 500);
    }
  }

  finish(): void {
    if (!this.allDone()) return;
    this.continued.emit();
  }
}
