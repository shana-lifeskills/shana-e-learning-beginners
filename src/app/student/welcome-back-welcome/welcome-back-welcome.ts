import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-welcome-back-welcome',
  standalone: true,
  templateUrl: './welcome-back-welcome.html',
  styleUrl: './welcome-back-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBackWelcome extends WelcomeVariantBase {
  @Input({ required: true }) lesson!: Lesson;
  /** The module's theme colour, used for the banner's `--accent`. */
  @Input() themeColor: string | null = null;

  /** Mirrors `ModulePlayer.module()` for the banner accent — only `themeColor` is referenced. */
  module(): { themeColor: string | null } {
    return { themeColor: this.themeColor };
  }

  /** Strips a leading "STAGE: " label off a lesson title. */
  lessonQuotedTitle(lesson: Lesson): string {
    return lesson.title.replace(/^[^:]+:\s*/, '');
  }
}
