import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-mastery-hero-welcome',
  standalone: true,
  templateUrl: './mastery-hero-welcome.html',
  styleUrl: './mastery-hero-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasteryHeroWelcome extends WelcomeVariantBase {
  @Input({ required: true }) lesson!: Lesson;

  /** Strips a leading "STAGE: " label off a lesson title. */
  lessonQuotedTitle(lesson: Lesson): string {
    return lesson.title.replace(/^[^:]+:\s*/, '');
  }
}
