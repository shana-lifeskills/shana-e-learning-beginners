import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { CreativeProjectChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-creative-project-challenge-step-view',
  standalone: true,
  templateUrl: './creative-project-challenge-step-view.html',
  styleUrl: './creative-project-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreativeProjectChallengeStepView implements OnInit {
  readonly step = input.required<CreativeProjectChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly pick = signal<string | null>(null);
  readonly ticked = signal<Set<string>>(new Set());
  readonly answers = signal<Record<string, string>>({});
  readonly sent = signal(false);

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().fields.forEach((f) => (blank[f.id] = ''));
    this.answers.set(blank);
  }

  readonly pickLabel = computed(() => this.step().options.find((o) => o.id === this.pick())?.label ?? '');
  readonly tickedCount = computed(() => this.ticked().size);

  readonly ready = computed(() => {
    if (!this.pick()) return false;
    if (this.ticked().size !== this.step().steps.length) return false;
    const a = this.answers();
    return this.step().fields.every((f) => (a[f.id] ?? '').trim().length > 0);
  });

  choosePick(id: string): void {
    if (this.sent()) return;
    this.pick.set(id);
  }

  toggleStep(id: string): void {
    if (this.sent()) return;
    this.ticked.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  setAnswer(id: string, value: string): void {
    this.answers.update((a) => ({ ...a, [id]: value }));
  }

  submit(): void {
    if (!this.ready() || this.sent()) return;
    const a = this.answers();
    const payload: Record<string, string> = { 'My project': this.pickLabel() };
    this.step().fields.forEach((f) => (payload[f.label] = (a[f.id] ?? '').trim()));
    this.sent.set(true);
    this.submitted.emit(payload);
  }
}
