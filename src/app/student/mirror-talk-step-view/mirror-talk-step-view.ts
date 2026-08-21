import { Component, input, output, signal } from '@angular/core';
import { MirrorTalkStep } from '../../core/models/module.model';

@Component({
  selector: 'app-mirror-talk-step-view',
  standalone: true,
  templateUrl: './mirror-talk-step-view.html',
  styleUrl: './mirror-talk-step-view.scss',
})
export class MirrorTalkStepView {
  readonly step = input.required<MirrorTalkStep>();
  readonly submitted = output<Record<string, string>>();

  readonly draft = signal('');
  readonly added = signal(false);

  updateDraft(value: string): void {
    this.draft.set(value);
  }

  add(): void {
    if (!this.draft().trim()) return;
    this.added.set(true);
  }

  editAgain(): void {
    this.added.set(false);
  }

  finish(): void {
    this.submitted.emit({ answer: this.draft().trim() });
  }
}
