import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TeamworkTfWarmupStep } from '../../core/models/module.model';

/**
 * "Teamwork Warm-Up" true/false game (Teamwork Module, Week 3). A connected-dot
 * conversation meter fills as each statement is judged, one statement shows at
 * a time with big True / False buttons, a wrong pick shakes and stays put, a
 * right pick fills the next dot and advances. The Continue button is withheld
 * until the meter is full, so the learner must judge every statement correctly.
 */
@Component({
  selector: 'app-teamwork-tf-warmup-step-view',
  standalone: true,
  templateUrl: './teamwork-tf-warmup-step-view.html',
  styleUrl: './teamwork-tf-warmup-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamworkTfWarmupStepView {
  readonly step = input.required<TeamworkTfWarmupStep>();
  readonly continued = output<void>();

  readonly activeIndex = signal(0);
  readonly picked = signal<boolean | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly locked = signal(false);

  readonly statements = computed(() => this.step().statements);
  readonly current = computed(() => this.statements()[this.activeIndex()] ?? null);
  readonly allDone = computed(() => this.activeIndex() >= this.statements().length);
  readonly dots = computed(() => this.statements().map((_, i) => i < this.activeIndex()));

  verdictState(value: boolean): 'correct' | 'incorrect' | null {
    if (this.picked() !== value) return null;
    return this.feedback();
  }

  choose(value: boolean): void {
    if (this.locked()) return;
    const statement = this.current();
    if (!statement) return;

    const correct = value === statement.answer;
    this.picked.set(value);
    this.feedback.set(correct ? 'correct' : 'incorrect');
    this.locked.set(true);

    setTimeout(
      () => {
        this.picked.set(null);
        this.feedback.set(null);
        this.locked.set(false);
        if (correct) this.activeIndex.update((i) => i + 1);
      },
      correct ? 1400 : 800,
    );
  }

  finish(): void {
    this.continued.emit();
  }
}
