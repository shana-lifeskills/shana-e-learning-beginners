import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Smart money checklist" welcome layout — Choices Module, Week 4 ("Smart
 * Financial Decision-Making"). A cream clipboard whose decision questions tick
 * off one after another and end in a "SMART CHOICE" stamp, so children see that
 * a good money decision is a set of questions you work through. Purely
 * presentational.
 */
@Component({
  selector: 'app-smart-decision-welcome',
  standalone: true,
  templateUrl: './smart-decision-welcome.html',
  styleUrl: './smart-decision-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartDecisionWelcome extends WelcomeVariantBase {
  @Input({ required: true }) sdw!: NonNullable<Lesson['smartDecisionWelcome']>;
}
