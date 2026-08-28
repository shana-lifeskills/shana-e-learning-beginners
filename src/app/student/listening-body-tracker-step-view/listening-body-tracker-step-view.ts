import { Component, computed, input, output, signal } from '@angular/core';
import { ListeningBodyTrackerStep } from '../../core/models/module.model';

type ChecklistAnswer = 'yes' | 'not-yet';

interface ReflectionAnswers {
  easiest: string;
  hardest: string;
  why: string;
}

interface MessageSegment {
  text: string;
  highlight: 'yes' | 'no' | null;
}

/** Splits the mascot's message on the yes/no labels so they can be highlighted inline. */
function splitMessage(message: string, yesLabel: string, noLabel: string): MessageSegment[] {
  const pattern = new RegExp(`(${escapeRegExp(yesLabel)}|${escapeRegExp(noLabel)})`, 'g');
  return message
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      highlight: part === yesLabel ? 'yes' : part === noLabel ? 'no' : null,
    }));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Component({
  selector: 'app-listening-body-tracker-step-view',
  standalone: true,
  templateUrl: './listening-body-tracker-step-view.html',
  styleUrl: './listening-body-tracker-step-view.scss',
})
export class ListeningBodyTrackerStepView {
  readonly step = input.required<ListeningBodyTrackerStep>();
  readonly continued = output<void>();

  readonly conversationIndices = [0, 1];

  readonly mascotMessageSegments = computed(() => splitMessage(this.step().mascotMessage, this.step().yesLabel, this.step().notYetLabel));

  readonly answers = signal<Record<string, ChecklistAnswer>>({});
  readonly reflections = signal<Record<number, ReflectionAnswers>>({
    0: { easiest: '', hardest: '', why: '' },
    1: { easiest: '', hardest: '', why: '' },
  });

  readonly allChecked = computed(() => {
    const map = this.answers();
    return this.conversationIndices.every((ci) => this.step().checklistItems.every((item) => map[this.key(ci, item.id)] != null));
  });

  private key(conversationIndex: number, itemId: string): string {
    return `${conversationIndex}__${itemId}`;
  }

  answerFor(conversationIndex: number, itemId: string): ChecklistAnswer | null {
    return this.answers()[this.key(conversationIndex, itemId)] ?? null;
  }

  cycleAnswer(conversationIndex: number, itemId: string): void {
    const current = this.answerFor(conversationIndex, itemId);
    const next: ChecklistAnswer = current === 'yes' ? 'not-yet' : 'yes';
    this.answers.update((map) => ({ ...map, [this.key(conversationIndex, itemId)]: next }));
  }

  reflectionFor(conversationIndex: number): ReflectionAnswers {
    return this.reflections()[conversationIndex];
  }

  updateReflection(conversationIndex: number, field: keyof ReflectionAnswers, value: string): void {
    this.reflections.update((map) => ({
      ...map,
      [conversationIndex]: { ...map[conversationIndex], [field]: value },
    }));
  }

  finish(): void {
    if (!this.allChecked()) return;
    this.continued.emit();
  }
}
