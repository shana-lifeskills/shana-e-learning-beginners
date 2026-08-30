import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { CreativeObjectChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-creative-object-challenge-step-view',
  standalone: true,
  templateUrl: './creative-object-challenge-step-view.html',
  styleUrl: './creative-object-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreativeObjectChallengeStepView implements OnInit {
  readonly step = input.required<CreativeObjectChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  /** Typed answer for each field, keyed by field id. */
  readonly answers = signal<Record<string, string>>({});
  readonly sent = signal(false);

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().fields.forEach((f) => (blank[f.id] = ''));
    this.answers.set(blank);
  }

  readonly allFilled = computed(() => {
    const a = this.answers();
    return this.step().fields.every((f) => (a[f.id] ?? '').trim().length > 0);
  });

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  stepLetter(index: number): string {
    return String(index + 1);
  }

  submit(): void {
    if (!this.allFilled() || this.sent()) return;
    const a = this.answers();
    const payload: Record<string, string> = {};
    this.step().fields.forEach((f) => (payload[f.label] = (a[f.id] ?? '').trim()));
    this.sent.set(true);
    this.submitted.emit(payload);
  }
}
