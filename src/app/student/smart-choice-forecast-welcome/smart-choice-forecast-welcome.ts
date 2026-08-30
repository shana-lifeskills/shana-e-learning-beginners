import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Smart choice forecast" welcome layout — Thinking module, Week 4 ("Making
 * Smart Choices"). A warm sunshine-yellow page whose board shows a central "you
 * decide" node forking into two branches; each branch stacks a choice card, a
 * "then this happens" consequence card and an outcome badge, so the learner
 * sees how thinking ahead changes where a decision leads. Purely presentational.
 */
@Component({
  selector: 'app-smart-choice-forecast-welcome',
  standalone: true,
  templateUrl: './smart-choice-forecast-welcome.html',
  styleUrl: './smart-choice-forecast-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartChoiceForecastWelcome extends WelcomeVariantBase {
  @Input({ required: true }) scf!: NonNullable<Lesson['smartChoiceForecastWelcome']>;
}
