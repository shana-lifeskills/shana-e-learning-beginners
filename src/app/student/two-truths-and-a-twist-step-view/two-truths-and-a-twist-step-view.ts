import { Component, computed, input, output, signal } from '@angular/core';
import { TwoTruthsAndATwistStep } from '../../core/models/module.model';

/** Which text field currently holds a value, keyed by field id. */
type FieldId = 'truth1' | 'truth2' | 'twist';

@Component({
  selector: 'app-two-truths-and-a-twist-step-view',
  standalone: true,
  templateUrl: './two-truths-and-a-twist-step-view.html',
  styleUrl: './two-truths-and-a-twist-step-view.scss',
})
export class TwoTruthsAndATwistStepView {
  readonly step = input.required<TwoTruthsAndATwistStep>();
  readonly continued = output<void>();

  /** Which screen is showing — swapped in place (no route change) so the page reads as two short steps instead of one long scroll. */
  readonly phase = signal<'write' | 'reveal'>('write');

  readonly truth1 = signal('');
  readonly truth2 = signal('');
  readonly twist = signal('');
  readonly revealed = signal(false);

  readonly canReveal = computed(
    () => this.truth1().trim().length > 0 && this.truth2().trim().length > 0 && this.twist().trim().length > 0
  );

  setField(field: FieldId, value: string): void {
    if (field === 'truth1') this.truth1.set(value);
    else if (field === 'truth2') this.truth2.set(value);
    else this.twist.set(value);
  }

  fillExample(): void {
    const step = this.step();
    this.truth1.set(step.exampleTruth1);
    this.truth2.set(step.exampleTruth2);
    this.twist.set(step.exampleTwist);
  }

  pickTwistForMe(): void {
    // A light random nudge for the twist field when it's still empty — the
    // student can always overwrite it before revealing.
    if (this.twist().trim().length > 0) return;
    this.twist.set(this.step().exampleTwist);
  }

  reset(): void {
    this.truth1.set('');
    this.truth2.set('');
    this.twist.set('');
    this.revealed.set(false);
  }

  goToReveal(): void {
    if (!this.canReveal()) return;
    this.phase.set('reveal');
  }

  backToWrite(): void {
    this.phase.set('write');
  }

  reveal(): void {
    if (!this.canReveal()) return;
    this.revealed.set(true);
  }

  finish(): void {
    this.continued.emit();
  }
}
