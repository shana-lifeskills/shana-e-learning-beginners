import { Component, computed, input, output, signal } from '@angular/core';
import { DetectiveChallengeStep } from '../../core/models/module.model';

type Phase = 'intro' | 'mission' | 'confidence';

@Component({
  selector: 'app-detective-challenge-step-view',
  standalone: true,
  templateUrl: './detective-challenge-step-view.html',
  styleUrl: './detective-challenge-step-view.scss',
})
export class DetectiveChallengeStepView {
  readonly step = input.required<DetectiveChallengeStep>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('intro');
  readonly checkedCriteria = signal<Set<string>>(new Set());

  readonly allChecked = computed(
    () => this.step().successCriteria.length > 0 && this.checkedCriteria().size === this.step().successCriteria.length
  );

  startMission(): void {
    this.phase.set('mission');
  }

  toggleCriterion(id: string): void {
    this.checkedCriteria.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isChecked(id: string): boolean {
    return this.checkedCriteria().has(id);
  }

  finishMission(): void {
    if (!this.allChecked()) return;
    this.phase.set('confidence');
  }

  finish(): void {
    this.continued.emit();
  }
}
