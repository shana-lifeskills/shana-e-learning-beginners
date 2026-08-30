import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core';
import { SolveItDifferentlyChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-solve-it-differently-challenge-step-view',
  standalone: true,
  templateUrl: './solve-it-differently-challenge-step-view.html',
  styleUrl: './solve-it-differently-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolveItDifferentlyChallengeStepView implements OnInit {
  readonly step = input.required<SolveItDifferentlyChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly pick = signal<string | null>(null);
  readonly notes = signal<Record<string, string>>({});
  readonly sent = signal(false);

  ngOnInit(): void {
    const blank: Record<string, string> = {};
    this.step().notes.forEach((n) => (blank[n.id] = ''));
    this.notes.set(blank);
  }

  readonly pickLabel = computed(() => this.step().picks.find((p) => p.id === this.pick())?.label ?? '');

  readonly ready = computed(() => {
    if (!this.pick()) return false;
    const n = this.notes();
    return this.step().notes.every((note) => (n[note.id] ?? '').trim().length > 0);
  });

  choosePick(id: string): void {
    if (this.sent()) return;
    this.pick.set(id);
  }

  setNote(id: string, value: string): void {
    this.notes.update((n) => ({ ...n, [id]: value }));
  }

  submit(): void {
    if (!this.ready() || this.sent()) return;
    const n = this.notes();
    const payload: Record<string, string> = { 'My problem': this.pickLabel() };
    this.step().notes.forEach((note) => (payload[note.label] = (n[note.id] ?? '').trim()));
    this.sent.set(true);
    this.submitted.emit(payload);
  }
}
