import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { ImagineCreateChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-imagine-create-challenge-step-view',
  standalone: true,
  templateUrl: './imagine-create-challenge-step-view.html',
  styleUrl: './imagine-create-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagineCreateChallengeStepView implements OnInit {
  readonly step = input.required<ImagineCreateChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly pick = signal<string | null>(null);
  readonly answers = signal<Record<string, string>>({});
  readonly sent = signal(false);

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().fields.forEach((f) => (blank[f.id] = ''));
    this.answers.set(blank);
  }

  readonly pickLabel = computed(() => this.step().picks.find((p) => p.id === this.pick())?.label ?? '');

  readonly ready = computed(() => {
    if (!this.pick()) return false;
    const a = this.answers();
    return this.step().fields.every((f) => (a[f.id] ?? '').trim().length > 0);
  });

  choosePick(id: string): void {
    if (this.sent()) return;
    this.pick.set(id);
  }

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  submit(): void {
    if (!this.ready() || this.sent()) return;
    const a = this.answers();
    const payload: Record<string, string> = { 'I imagined': this.pickLabel() };
    this.step().fields.forEach((f) => (payload[f.label] = (a[f.id] ?? '').trim()));
    this.sent.set(true);
    this.submitted.emit(payload);
  }
}
