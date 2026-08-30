import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-creative-staircase-welcome',
  standalone: true,
  templateUrl: './creative-staircase-welcome.html',
  styleUrl: './creative-staircase-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreativeStaircaseWelcome extends WelcomeVariantBase {
  @Input({ required: true }) csw!: NonNullable<Lesson['creativeStaircaseWelcome']>;

  /** Total rungs including the ground and summit blocks — drives the staircase height scale. */
  get rungCount(): number {
    return this.csw.steps.length + 2;
  }
}
