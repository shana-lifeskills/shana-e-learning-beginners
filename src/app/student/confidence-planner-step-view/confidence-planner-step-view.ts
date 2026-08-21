import { Component, ElementRef, computed, inject, input, output, signal } from '@angular/core';
import { ConfidencePlannerStep, SpeakUpIdea } from '../../core/models/module.model';

interface PlanItem {
  id: string;
  icon: string;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-confidence-planner-step-view',
  standalone: true,
  templateUrl: './confidence-planner-step-view.html',
  styleUrl: './confidence-planner-step-view.scss',
})
export class ConfidencePlannerStepView {
  readonly step = input.required<ConfidencePlannerStep>();
  readonly continued = output<void>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly today = new Date();

  readonly todayLabel = this.today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  /** The last 7 days ending today, shown as short weekday initials with today highlighted. */
  readonly weekDays = computed(() => {
    const labels: { key: string; label: string; isToday: boolean }[] = [];
    for (let offset = 6; offset >= 0; offset--) {
      const date = new Date(this.today);
      date.setDate(date.getDate() - offset);
      labels.push({
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2),
        isToday: offset === 0,
      });
    }
    return labels;
  });

  readonly planItems = signal<PlanItem[]>([]);
  readonly customEmoji = signal('');
  readonly customText = signal('');

  readonly sharedCount = computed(() => this.planItems().filter((item) => item.done).length);
  readonly totalCount = computed(() => this.planItems().length);
  readonly allDone = computed(() => this.totalCount() > 0 && this.sharedCount() === this.totalCount());

  private nextId = 0;

  selectCustomEmoji(emoji: string): void {
    this.customEmoji.set(emoji);
  }

  updateCustomText(value: string): void {
    this.customText.set(value);
  }

  addIdea(idea: SpeakUpIdea): void {
    if (this.planItems().some((item) => item.label === idea.label)) return;
    this.planItems.update((items) => [...items, { id: `idea-${this.nextId++}`, icon: idea.icon, label: idea.label, done: false }]);
  }

  addCustom(): void {
    const text = this.customText().trim();
    if (!text) return;
    const icon = this.customEmoji() || this.step().customEmojis[0];
    this.planItems.update((items) => [...items, { id: `custom-${this.nextId++}`, icon, label: text, done: false }]);
    this.customText.set('');
  }

  removeItem(id: string): void {
    this.planItems.update((items) => items.filter((item) => item.id !== id));
  }

  toggleDone(id: string): void {
    let justCompleted = false;
    this.planItems.update((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        const done = !item.done;
        if (done) justCompleted = true;
        return { ...item, done };
      })
    );

    if (justCompleted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.step().voiceMessage);
      window.speechSynthesis.speak(utterance);
    }
  }

  scrollToPlanner(): void {
    this.elementRef.nativeElement.querySelector('.planner-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  celebrationText(): string {
    const count = this.sharedCount();
    return this.step()
      .celebrationTemplate.replace('{count}', String(count))
      .replace('{moment}', count === 1 ? 'moment' : 'moments');
  }
}
