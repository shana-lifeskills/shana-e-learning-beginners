import { Component, computed, input, output, signal } from '@angular/core';
import { BraveBodyChallengeStep, BraveBodyStep } from '../../core/models/module.model';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

@Component({
  selector: 'app-brave-body-challenge-step-view',
  standalone: true,
  templateUrl: './brave-body-challenge-step-view.html',
  styleUrl: './brave-body-challenge-step-view.scss',
})
export class BraveBodyChallengeStepView {
  readonly step = input.required<BraveBodyChallengeStep>();
  readonly continued = output<void>();

  readonly doneStepIds = signal<Set<string>>(new Set());
  readonly todayDone = signal(false);

  /** Mon–Sun of the current week with their dates; the entry for today is flagged. */
  readonly week = computed(() => {
    const now = new Date();
    const dow = (now.getDay() + 6) % 7; // 0 = Monday
    const monday = new Date(now);
    monday.setDate(now.getDate() - dow);
    return DAY_NAMES.map((name, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return { name, date: d.getDate(), isToday: i === dow };
    });
  });

  readonly stepDone = (id: string) => this.doneStepIds().has(id);
  readonly allStepsDone = computed(() => this.step().steps.every((s) => this.doneStepIds().has(s.id)));

  readonly currentStep = computed<BraveBodyStep | null>(() => {
    if (this.allStepsDone()) return null;
    return this.step().steps.find((s) => !this.doneStepIds().has(s.id)) ?? null;
  });

  readonly streakDone = computed(() => (this.todayDone() ? 1 : 0));

  markStep(id: string): void {
    this.doneStepIds.update((s) => new Set(s).add(id));
  }

  hearSentence(sentence: string): void {
    const speech = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!speech) return;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.9;
    speech.speak(utterance);
  }

  tapDone(): void {
    if (!this.allStepsDone()) return;
    this.todayDone.set(true);
  }

  finish(): void {
    this.continued.emit();
  }
}
