import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ServiceProjectFinalStep } from '../../core/models/module.model';

/**
 * "My Service Project" final challenge (Service Module, Week 4 — module
 * finale). One project, planned (what / when / who) then reflected on
 * (finished? / what changed / who benefited). "Complete the Module" unlocks
 * once every field is filled and the finished box is ticked; the write-up is
 * then submitted.
 */
@Component({
  selector: 'app-service-project-final-step-view',
  standalone: true,
  templateUrl: './service-project-final-step-view.html',
  styleUrl: './service-project-final-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceProjectFinalStepView {
  readonly step = input.required<ServiceProjectFinalStep>();
  readonly submitted = output<Record<string, string>>();

  readonly what = signal('');
  readonly when = signal('');
  readonly who = signal('');
  readonly finished = signal(false);
  readonly changed = signal('');
  readonly benefited = signal('');

  readonly planReady = computed(
    () => this.what().trim().length > 0 && this.when().trim().length > 0 && this.who().trim().length > 0,
  );
  readonly allDone = computed(
    () =>
      this.planReady() &&
      this.finished() &&
      this.changed().trim().length > 0 &&
      this.benefited().trim().length > 0,
  );

  toggleFinished(): void {
    this.finished.set(!this.finished());
  }

  complete(): void {
    if (!this.allDone()) return;
    this.submitted.emit({
      'What I did': this.what().trim(),
      'When I did it': this.when().trim(),
      'Who it helped': this.who().trim(),
      'What changed': this.changed().trim(),
      'Who benefited': this.benefited().trim(),
    });
  }
}
