import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-recap-quiz-welcome',
  standalone: true,
  templateUrl: './recap-quiz-welcome.html',
  styleUrl: './recap-quiz-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecapQuizWelcome extends WelcomeVariantBase {
  @Input({ required: true }) rqw!: NonNullable<Lesson['recapQuizWelcome']>;

  readonly recapQuizSelectedId = signal<string | null>(null);
  readonly recapQuizFeedback = signal<'correct' | 'incorrect' | null>(null);

  selectRecapQuizOption(optionId: string, correctOptionId: string): void {
    if (this.recapQuizFeedback() === 'correct') return;
    const correct = optionId === correctOptionId;
    this.recapQuizSelectedId.set(optionId);
    this.recapQuizFeedback.set(correct ? 'correct' : 'incorrect');

    if (!correct) {
      setTimeout(() => {
        this.recapQuizSelectedId.set(null);
        this.recapQuizFeedback.set(null);
      }, 900);
    }
  }
}
