import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { TvwWelcome } from '../tvw-welcome/tvw-welcome';
import { GrowKinderWelcome } from '../grow-kinder-welcome/grow-kinder-welcome';
import { LittleLanternWelcome } from '../little-lantern-welcome/little-lantern-welcome';
import { SpeakUpClubWelcome } from '../speak-up-club-welcome/speak-up-club-welcome';
import { SpeakUpWelcome } from '../speak-up-welcome/speak-up-welcome';
import { DailyGoalWelcome } from '../daily-goal-welcome/daily-goal-welcome';
import { QuickRecapWelcome } from '../quick-recap-welcome/quick-recap-welcome';
import { WarmupPreviewWelcome } from '../warmup-preview-welcome/warmup-preview-welcome';
import { EmpathyJourneyWelcome } from '../empathy-journey-welcome/empathy-journey-welcome';
import { RecapQuizWelcome } from '../recap-quiz-welcome/recap-quiz-welcome';
import { FeelingsReviewWelcome } from '../feelings-review-welcome/feelings-review-welcome';
import { FeelingsCheckWelcome } from '../feelings-check-welcome/feelings-check-welcome';
import { CelebrateWelcome } from '../celebrate-welcome/celebrate-welcome';
import { GoalWelcome } from '../goal-welcome/goal-welcome';
import { PracticeWelcome } from '../practice-welcome/practice-welcome';
import { IntroWelcome } from '../intro-welcome/intro-welcome';
import { ObjectivesWelcome } from '../objectives-welcome/objectives-welcome';
import { RecapWelcome } from '../recap-welcome/recap-welcome';
import { WelcomeCardWelcome } from '../welcome-card-welcome/welcome-card-welcome';
import { WelcomeBackWelcome } from '../welcome-back-welcome/welcome-back-welcome';
import { MasteryHeroWelcome } from '../mastery-hero-welcome/mastery-hero-welcome';
import { JourneyWelcome } from '../journey-welcome/journey-welcome';
import { ClassicWelcome } from '../classic-welcome/classic-welcome';

/**
 * The lesson-welcome screen: one big `@if / @else if` chain that picks the
 * bespoke layout a lesson opted into (via one of its optional `*Welcome`
 * fields) and renders the matching variant component. The chain order encodes
 * the "takes priority over" rules documented on the `Lesson` fields in
 * `module.model.ts` — do not reorder it.
 *
 * Extracted from `ModulePlayer` so each layout carries its own component-scoped
 * stylesheet instead of piling into one 85 kB `module-player.scss`.
 */
@Component({
  selector: 'app-lesson-welcome-view',
  standalone: true,
  imports: [
    TvwWelcome,
    GrowKinderWelcome,
    LittleLanternWelcome,
    SpeakUpClubWelcome,
    SpeakUpWelcome,
    DailyGoalWelcome,
    QuickRecapWelcome,
    WarmupPreviewWelcome,
    EmpathyJourneyWelcome,
    RecapQuizWelcome,
    FeelingsReviewWelcome,
    FeelingsCheckWelcome,
    CelebrateWelcome,
    GoalWelcome,
    PracticeWelcome,
    IntroWelcome,
    ObjectivesWelcome,
    RecapWelcome,
    WelcomeCardWelcome,
    WelcomeBackWelcome,
    MasteryHeroWelcome,
    JourneyWelcome,
    ClassicWelcome,
  ],
  templateUrl: './lesson-welcome-view.html',
  styleUrl: './lesson-welcome-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonWelcomeView {
  @Input({ required: true }) lesson!: Lesson;
  /** True when the student has already completed this week — CTA moves them forward, not restarts. */
  @Input() completed = false;
  /** The lesson the "Continue to Week N" CTA opens, if any. */
  @Input() next: Lesson | null = null;
  @Input() firstName = '';
  /** The module's theme colour, for the "Welcome Back" banner accent. */
  @Input() themeColor: string | null = null;

  /** Start the lesson's step sequence (also fired by the "Review this lesson" link). */
  @Output() begin = new EventEmitter<void>();
  /** Advance to the next week's welcome screen. */
  @Output() proceed = new EventEmitter<void>();
  /** Return to the module map. */
  @Output() backToModules = new EventEmitter<void>();

  /** Strips a leading "STAGE: " label off a lesson title, e.g. `MASTERY: "I Am Proud"` → `"I Am Proud"`. */
  lessonQuotedTitle(lesson: Lesson): string {
    return lesson.title.replace(/^[^:]+:\s*/, '');
  }
}
