import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ServiceKindnessPlanStep } from '../../core/models/module.model';

interface ActEntry {
  act: string;
  when: string;
  who: string;
  didIt: boolean;
  changed: string;
  done: boolean;
}

function emptyAct(): ActEntry {
  return { act: '', when: '', who: '', didIt: false, changed: '', done: false };
}

/**
 * "Kindness in Action Plan" challenge of the week (Service Module, Week 3). An
 * accordion of three act cards: each is planned (what / when / who), then
 * after doing it the learner ticks it complete and notes what changed, and
 * locks the card in. Complete unlocks once all three cards are logged; entries
 * are then submitted.
 */
@Component({
  selector: 'app-service-kindness-plan-step-view',
  standalone: true,
  templateUrl: './service-kindness-plan-step-view.html',
  styleUrl: './service-kindness-plan-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceKindnessPlanStepView implements OnInit {
  readonly step = input.required<ServiceKindnessPlanStep>();
  readonly submitted = output<Record<string, string>>();

  readonly entries = signal<ActEntry[]>([]);
  readonly openAct = signal(0);

  ngOnInit(): void {
    this.entries.set(Array.from({ length: this.step().actCount }, emptyAct));
  }

  readonly total = computed(() => this.step().actCount);
  readonly doneCount = computed(() => this.entries().filter((e) => e.done).length);
  readonly progressPercent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.doneCount() / this.total()) * 100),
  );
  readonly allDone = computed(() => this.total() > 0 && this.doneCount() === this.total());

  toggleOpen(index: number): void {
    this.openAct.set(this.openAct() === index ? -1 : index);
  }

  setField(index: number, key: 'act' | 'when' | 'who' | 'changed', value: string): void {
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  }

  toggleDidIt(index: number): void {
    this.entries.update((list) =>
      list.map((e, i) => (i === index && !e.done ? { ...e, didIt: !e.didIt } : e)),
    );
  }

  canSaveAct(index: number): boolean {
    const e = this.entries()[index];
    return (
      !!e &&
      !e.done &&
      e.act.trim().length > 0 &&
      e.when.trim().length > 0 &&
      e.who.trim().length > 0 &&
      e.didIt &&
      e.changed.trim().length > 0
    );
  }

  saveAct(index: number): void {
    if (!this.canSaveAct(index)) return;
    this.entries.update((list) => list.map((e, i) => (i === index ? { ...e, done: true } : e)));
    const nextOpen = this.entries().findIndex((e, i) => i !== index && !e.done);
    this.openAct.set(nextOpen);
  }

  complete(): void {
    if (!this.allDone()) return;
    const payload: Record<string, string> = {};
    this.entries().forEach((e, i) => {
      payload[`Act ${i + 1}`] =
        `${e.act.trim()} — when: ${e.when.trim()}; who: ${e.who.trim()}; what changed: ${e.changed.trim()}`;
    });
    this.submitted.emit(payload);
  }
}
