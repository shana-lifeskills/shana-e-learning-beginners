import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { StrategicThinkerLinkStep } from '../../core/models/module.model';

@Component({
  selector: 'app-strategic-thinker-link-step-view',
  standalone: true,
  templateUrl: './strategic-thinker-link-step-view.html',
  styleUrl: './strategic-thinker-link-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategicThinkerLinkStepView {
  readonly step = input.required<StrategicThinkerLinkStep>();
  readonly completed = output<void>();

  /** Indexes of questions the learner has ticked — purely a self-check flourish. */
  readonly ticked = signal<Set<number>>(new Set());

  toggle(index: number): void {
    this.ticked.update((set) => {
      const next = new Set(set);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }
}
