import { Component, computed, input, output, signal } from '@angular/core';
import { OpinionCornersStep } from '../../core/models/module.model';

type Corner = 'agree' | 'neutral' | 'disagree';

@Component({
  selector: 'app-opinion-corners-step-view',
  standalone: true,
  templateUrl: './opinion-corners-step-view.html',
  styleUrl: './opinion-corners-step-view.scss',
})
export class OpinionCornersStepView {
  readonly step = input.required<OpinionCornersStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<'corners' | 'debrief'>('corners');
  readonly sIndex = signal(0);
  readonly picks = signal<Record<string, Corner>>({});
  readonly debriefText = signal('');
  readonly posted = signal(false);

  readonly currentStatement = computed(() => this.step().statements[this.sIndex()] ?? null);
  readonly isLastStatement = computed(() => this.sIndex() === this.step().statements.length - 1);
  readonly currentPick = computed(() => {
    const statement = this.currentStatement();
    return statement ? this.picks()[statement.id] ?? null : null;
  });
  readonly canPost = computed(() => this.debriefText().trim().length > 0);

  choose(corner: Corner): void {
    const statement = this.currentStatement();
    if (!statement) return;
    this.picks.update((p) => ({ ...p, [statement.id]: corner }));
  }

  next(): void {
    if (!this.currentPick()) return;
    if (this.isLastStatement()) {
      this.phase.set('debrief');
      return;
    }
    this.sIndex.update((i) => i + 1);
  }

  setDebriefText(value: string): void {
    this.debriefText.set(value);
  }

  post(): void {
    if (!this.canPost() || this.posted()) return;
    this.posted.set(true);

    const values: Record<string, string> = { debrief: this.debriefText().trim() };
    for (const statement of this.step().statements) {
      const pick = this.picks()[statement.id];
      if (pick) values[statement.id] = pick;
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
