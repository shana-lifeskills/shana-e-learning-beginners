import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-mind-cinema-welcome',
  standalone: true,
  templateUrl: './mind-cinema-welcome.html',
  styleUrl: './mind-cinema-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MindCinemaWelcome extends WelcomeVariantBase {
  @Input({ required: true }) mcw!: NonNullable<Lesson['mindCinemaWelcome']>;

  /** The frame list doubled, so the marquee can loop seamlessly. */
  get reel(): NonNullable<Lesson['mindCinemaWelcome']>['frames'] {
    return [...this.mcw.frames, ...this.mcw.frames];
  }
}
