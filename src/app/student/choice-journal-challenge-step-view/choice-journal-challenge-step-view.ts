import { Component, computed, input, output, signal } from '@angular/core';
import { ChoiceJournalChallengeStep } from '../../core/models/module.model';

interface JournalEntry {
  choice: string;
  meaning: string;
}

@Component({
  selector: 'app-choice-journal-challenge-step-view',
  standalone: true,
  templateUrl: './choice-journal-challenge-step-view.html',
  styleUrl: './choice-journal-challenge-step-view.scss',
})
export class ChoiceJournalChallengeStepView {
  readonly step = input.required<ChoiceJournalChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly entries = signal<JournalEntry[]>([
    { choice: '', meaning: '' },
    { choice: '', meaning: '' },
    { choice: '', meaning: '' },
  ]);
  readonly locked = signal(false);
  /** Swaps the page to the journal reveal in place — no route change. */
  readonly revealed = signal(false);

  readonly canSubmit = computed(() =>
    this.entries().every((e) => e.choice.trim().length > 0 && e.meaning.trim().length > 0)
  );

  setField(index: number, field: keyof JournalEntry, value: string): void {
    this.entries.update((entries) => entries.map((e, i) => (i === index ? { ...e, [field]: value } : e)));
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.revealed.set(true);

    const values: Record<string, string> = {};
    this.entries().forEach((entry, i) => {
      values[`day${i + 1}Choice`] = entry.choice;
      values[`day${i + 1}Meaning`] = entry.meaning;
    });
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
