import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Trade-off see-saw" welcome layout — Choices Module, Week 1 ("Understanding
 * Trade-offs"). A warm, friendly page for young learners built around a cartoon
 * see-saw that balances on a smiling coin: the "what you pick" seat sits down
 * and the "what you give up" seat tips up, so children see that spending on one
 * thing always means letting go of another. Purely presentational.
 */
@Component({
  selector: 'app-trade-off-welcome',
  standalone: true,
  templateUrl: './trade-off-welcome.html',
  styleUrl: './trade-off-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOffWelcome extends WelcomeVariantBase {
  @Input({ required: true }) tow!: NonNullable<Lesson['tradeOffWelcome']>;
}
