import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Consequence chain" welcome layout — Choices Module, Week 3 ("Consequences of
 * Money Choices"). A warm sunset page built around a cartoon domino run: a coin
 * leans into the first tile and each following tile names the next thing that
 * happens, so children see that one money choice sets off a chain of results.
 * Purely presentational.
 */
@Component({
  selector: 'app-consequence-chain-welcome',
  standalone: true,
  templateUrl: './consequence-chain-welcome.html',
  styleUrl: './consequence-chain-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsequenceChainWelcome extends WelcomeVariantBase {
  @Input({ required: true }) ccw!: NonNullable<Lesson['consequenceChainWelcome']>;
}
