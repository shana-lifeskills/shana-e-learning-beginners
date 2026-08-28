import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-speak-up-club-welcome',
  standalone: true,
  templateUrl: './speak-up-club-welcome.html',
  styleUrl: './speak-up-club-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeakUpClubWelcome extends WelcomeVariantBase {
  @Input({ required: true }) scw!: NonNullable<Lesson['speakUpClubWelcome']>;

  /** Reads a line aloud with the browser's speech synthesis, for the "Listen" button. */
  speakText(text: string): void {
    const speech = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!speech) return;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    speech.speak(utterance);
  }
}
