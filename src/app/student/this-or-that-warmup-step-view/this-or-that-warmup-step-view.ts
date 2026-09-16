import { Component, computed, input, output, signal } from '@angular/core';
import { ThisOrThatWarmupStep } from '../../core/models/module.model';

type Choice = 'A' | 'B';

@Component({
  selector: 'app-this-or-that-warmup-step-view',
  standalone: true,
  templateUrl: './this-or-that-warmup-step-view.html',
  styleUrl: './this-or-that-warmup-step-view.scss',
})
export class ThisOrThatWarmupStepView {
  readonly step = input.required<ThisOrThatWarmupStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<'pick' | 'recap'>('pick');
  readonly answers = signal<Record<string, Choice>>({});
  readonly shareText = signal('');
  readonly posted = signal(false);

  readonly allAnswered = computed(() => this.step().questions.every((q) => this.answers()[q.id] != null));
  readonly canPost = computed(() => this.shareText().trim().length > 0);

  pick(questionId: string, choice: Choice): void {
    this.answers.update((a) => ({ ...a, [questionId]: choice }));
  }

  goToRecap(): void {
    if (!this.allAnswered()) return;
    this.phase.set('recap');
  }

  setShareText(value: string): void {
    this.shareText.set(value);
  }

  post(): void {
    if (!this.canPost() || this.posted()) return;
    this.posted.set(true);

    const values: Record<string, string> = { strength: this.shareText().trim() };
    for (const q of this.step().questions) {
      values[q.id] = this.answers()[q.id] === 'A' ? q.optionA.label : q.optionB.label;
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
