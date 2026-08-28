import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { KindCommentChallengeStep } from '../../core/models/module.model';

interface JournalEntry {
  actions: boolean[];
  fields: Record<string, string>;
  done: boolean;
}

@Component({
  selector: 'app-kind-comment-challenge-step-view',
  standalone: true,
  templateUrl: './kind-comment-challenge-step-view.html',
  styleUrl: './kind-comment-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KindCommentChallengeStepView implements OnInit {
  readonly step = input.required<KindCommentChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<JournalEntry[]>([]);
  readonly openDay = signal<number>(0);
  readonly pledged = signal(false);

  ngOnInit(): void {
    const s = this.step();
    this.entries.set(
      Array.from({ length: s.dayCount }, () => ({
        actions: s.dailyActions.map(() => false),
        fields: Object.fromEntries(s.trackFields.map((f) => [f.id, ''])),
        done: false,
      })),
    );
  }

  readonly total = computed(() => this.step().dayCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDone = computed(() => this.total() > 0 && this.doneCount() === this.total());

  toggleOpen(index: number): void {
    this.openDay.set(this.openDay() === index ? -1 : index);
  }

  toggleAction(dayIndex: number, actionIndex: number): void {
    this.entries.update((list) =>
      list.map((e, i) =>
        i === dayIndex ? { ...e, actions: e.actions.map((a, ai) => (ai === actionIndex ? !a : a)) } : e,
      ),
    );
  }

  setField(dayIndex: number, fieldId: string, value: string): void {
    this.entries.update((list) =>
      list.map((e, i) => (i === dayIndex ? { ...e, fields: { ...e.fields, [fieldId]: value } } : e)),
    );
  }

  canSaveDay(index: number): boolean {
    const entry = this.entries()[index];
    if (!entry || entry.done) return false;
    return (
      entry.actions.every((a) => a) &&
      this.step().trackFields.every((f) => (entry.fields[f.id] ?? '').trim().length > 0)
    );
  }

  saveDay(index: number): void {
    if (!this.canSaveDay(index)) return;
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, done: true } : e)));
    // Jump the accordion to the next unfinished day, if any.
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    this.openDay.set(nextOpen);
  }

  togglePledge(): void {
    this.pledged.update((p) => !p);
  }

  complete(): void {
    if (!this.allDone() || !this.pledged()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      this.step().trackFields.forEach((f) => {
        payload[`Day ${i + 1} — ${f.label}`] = (e.fields[f.id] ?? '').trim();
      });
    });
    payload['My confidence link'] = this.step().confidenceStatement;
    this.submitted.emit(payload);
  }
}
