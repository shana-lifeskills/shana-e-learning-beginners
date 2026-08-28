import { Component, input, output, signal } from '@angular/core';
import { FastOrClearOption, FastOrClearWarmupStep } from '../../core/models/module.model';

type Phase = 'intro' | 'question' | 'done';

@Component({
  selector: 'app-fast-or-clear-warmup-step-view',
  standalone: true,
  templateUrl: './fast-or-clear-warmup-step-view.html',
  styleUrl: './fast-or-clear-warmup-step-view.scss',
})
export class FastOrClearWarmupStepView {
  readonly step = input.required<FastOrClearWarmupStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('intro');
  readonly selectedId = signal<string | null>(null);
  readonly wrongId = signal<string | null>(null);

  readonly LETTERS = ['A', 'B', 'C', 'D'];

  isCorrect(option: FastOrClearOption): boolean {
    return this.selectedId() === option.id && option.id === this.step().correctOptionId;
  }

  isWrong(option: FastOrClearOption): boolean {
    return this.wrongId() === option.id;
  }

  get answered(): boolean {
    return this.selectedId() === this.step().correctOptionId;
  }

  play(): void {
    this.phase.set('question');
  }

  select(option: FastOrClearOption): void {
    if (this.answered) return;
    if (option.id === this.step().correctOptionId) {
      this.selectedId.set(option.id);
      this.wrongId.set(null);
    } else {
      this.wrongId.set(option.id);
      setTimeout(() => this.wrongId.set(null), 900);
    }
  }

  seeWhy(): void {
    this.phase.set('done');
  }

  playAgain(): void {
    this.selectedId.set(null);
    this.wrongId.set(null);
    this.phase.set('intro');
  }

  finish(): void {
    this.continued.emit();
  }
}
