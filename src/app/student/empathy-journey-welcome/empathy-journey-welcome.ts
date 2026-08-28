import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-empathy-journey-welcome',
  standalone: true,
  templateUrl: './empathy-journey-welcome.html',
  styleUrl: './empathy-journey-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpathyJourneyWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ejw!: NonNullable<Lesson['empathyJourneyWelcome']>;

  /** Which sample-answer option is picked — a decorative recap, not graded or saved. */
  readonly feelingsCheckSelectedId = signal<string | null>(null);

  selectFeelingsOption(optionId: string): void {
    this.feelingsCheckSelectedId.set(optionId);
  }
}
