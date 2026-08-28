import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PrivacyProtectorChallengeStep } from '../../core/models/module.model';

type Asked = 'yes' | 'no' | null;

interface DayLog {
  asked: Asked;
  response: string;
}

@Component({
  selector: 'app-privacy-protector-challenge-step-view',
  standalone: true,
  templateUrl: './privacy-protector-challenge-step-view.html',
  styleUrl: './privacy-protector-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyProtectorChallengeStepView {
  readonly step = input.required<PrivacyProtectorChallengeStep>();
  readonly continued = output<void>();

  private readonly listEdits = signal<Record<number, string>>({});
  private readonly dayEdits = signal<Record<number, Partial<DayLog>>>({});
  readonly practised = signal(false);

  readonly listItems = computed(() =>
    Array.from({ length: this.step().listCount }, (_, i) => this.listEdits()[i] ?? ''),
  );

  readonly days = computed<DayLog[]>(() =>
    Array.from({ length: this.step().dayCount }, (_, i) => {
      const e = this.dayEdits()[i] ?? {};
      return { asked: e.asked ?? null, response: e.response ?? '' };
    }),
  );

  readonly listDone = computed(() => this.listItems().every((v) => v.trim().length > 0));
  readonly logDone = computed(() => this.days().every((d) => d.asked !== null && d.response.trim().length > 0));
  readonly allDone = computed(() => this.listDone() && this.practised() && this.logDone());

  readonly filledCount = computed(() => this.listItems().filter((v) => v.trim().length > 0).length);
  readonly loggedCount = computed(() => this.days().filter((d) => d.asked !== null && d.response.trim().length > 0).length);

  setListItem(index: number, value: string): void {
    this.listEdits.update((map) => ({ ...map, [index]: value }));
  }

  setAsked(index: number, asked: Asked): void {
    this.dayEdits.update((map) => ({ ...map, [index]: { ...map[index], asked } }));
  }

  setResponse(index: number, value: string): void {
    this.dayEdits.update((map) => ({ ...map, [index]: { ...map[index], response: value } }));
  }

  togglePractised(): void {
    this.practised.update((v) => !v);
  }

  finish(): void {
    if (this.allDone()) this.continued.emit();
  }
}
