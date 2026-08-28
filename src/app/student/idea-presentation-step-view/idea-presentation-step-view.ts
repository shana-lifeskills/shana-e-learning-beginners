import { Component, computed, input, output, signal } from '@angular/core';
import { IdeaPresentationStep, IdeaPresentationTopic } from '../../core/models/module.model';

@Component({
  selector: 'app-idea-presentation-step-view',
  standalone: true,
  templateUrl: './idea-presentation-step-view.html',
  styleUrl: './idea-presentation-step-view.scss',
})
export class IdeaPresentationStepView {
  readonly step = input.required<IdeaPresentationStep>();
  readonly continued = output<void>();

  readonly topicId = signal<string | null>(null);
  readonly buildAnswers = signal<Record<string, string>>({});
  readonly presented = signal(false);
  readonly reflectAnswers = signal<Record<string, string>>({});

  readonly buildDone = computed(() =>
    this.step().buildFields.every((f) => (this.buildAnswers()[f.id] ?? '').trim().length > 0),
  );
  readonly reflectDone = computed(() =>
    this.step().reflectFields.every((f) => (this.reflectAnswers()[f.id] ?? '').trim().length > 0),
  );
  readonly allDone = computed(
    () => !!this.topicId() && this.buildDone() && this.presented() && this.reflectDone(),
  );

  selectTopic(topic: IdeaPresentationTopic): void {
    this.topicId.set(topic.id);
  }

  buildValue(id: string): string {
    return this.buildAnswers()[id] ?? '';
  }

  reflectValue(id: string): string {
    return this.reflectAnswers()[id] ?? '';
  }

  onBuild(id: string, value: string): void {
    this.buildAnswers.update((m) => ({ ...m, [id]: value }));
  }

  onReflect(id: string, value: string): void {
    this.reflectAnswers.update((m) => ({ ...m, [id]: value }));
  }

  togglePresented(): void {
    this.presented.update((v) => !v);
  }

  finish(): void {
    if (!this.allDone()) return;
    this.continued.emit();
  }
}
