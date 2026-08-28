import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShareIdeaOption, WhatCanIShareStep } from '../../core/models/module.model';

interface SharedEntry {
  name: string;
  emoji: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-what-can-i-share-step-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './what-can-i-share-step-view.html',
  styleUrl: './what-can-i-share-step-view.scss',
})
export class WhatCanIShareStepView {
  readonly step = input.required<WhatCanIShareStep>();
  readonly continued = output<void>();

  readonly selectedIdeaId = signal<string | null>(null);
  readonly name = signal('');
  readonly reflection = signal('');
  readonly shares = signal<SharedEntry[]>([]);
  readonly justShared = signal(false);

  readonly selectedIdea = computed<ShareIdeaOption | null>(
    () => this.step().ideas.find((i) => i.id === this.selectedIdeaId()) ?? null
  );

  readonly canShare = computed(
    () => !!this.selectedIdea() && this.name().trim().length > 0 && this.reflection().trim().length > 0
  );

  readonly canFinish = computed(() => this.shares().length > 0);

  chooseIdea(id: string): void {
    this.selectedIdeaId.set(id);
  }

  onReflectionInput(value: string): void {
    this.reflection.set(value.slice(0, this.step().maxChars));
  }

  share(): void {
    const idea = this.selectedIdea();
    if (!idea || !this.canShare()) return;
    this.shares.update((list) => [
      { name: this.name().trim(), emoji: idea.emoji, title: idea.title, text: this.reflection().trim() },
      ...list,
    ]);
    this.justShared.set(true);
    this.selectedIdeaId.set(null);
    this.name.set('');
    this.reflection.set('');
  }

  finish(): void {
    this.continued.emit();
  }
}
