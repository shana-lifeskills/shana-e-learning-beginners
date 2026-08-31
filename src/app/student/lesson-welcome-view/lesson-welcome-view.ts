import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { TvwWelcome } from '../tvw-welcome/tvw-welcome';
import { GrowKinderWelcome } from '../grow-kinder-welcome/grow-kinder-welcome';
import { PoliteOnlineWelcome } from '../polite-online-welcome/polite-online-welcome';
import { RespectCircleWelcome } from '../respect-circle-welcome/respect-circle-welcome';
import { ThinkBeforePostWelcome } from '../think-before-post-welcome/think-before-post-welcome';
import { DigitalMannersWelcome } from '../digital-manners-welcome/digital-manners-welcome';
import { TechResponsiblyWelcome } from '../tech-responsibly-welcome/tech-responsibly-welcome';
import { ImaginationSparkWelcome } from '../imagination-spark-welcome/imagination-spark-welcome';
import { MindCinemaWelcome } from '../mind-cinema-welcome/mind-cinema-welcome';
import { PuzzlePathsWelcome } from '../puzzle-paths-welcome/puzzle-paths-welcome';
import { CreativeStaircaseWelcome } from '../creative-staircase-welcome/creative-staircase-welcome';
import { StrategyBlueprintWelcome } from '../strategy-blueprint-welcome/strategy-blueprint-welcome';
import { AttentionLensWelcome } from '../attention-lens-welcome/attention-lens-welcome';
import { SolutionPathWelcome } from '../solution-path-welcome/solution-path-welcome';
import { MemoryWorkshopWelcome } from '../memory-workshop-welcome/memory-workshop-welcome';
import { SmartChoiceForecastWelcome } from '../smart-choice-forecast-welcome/smart-choice-forecast-welcome';
import { TradeOffWelcome } from '../trade-off-welcome/trade-off-welcome';
import { BudgetPlanWelcome } from '../budget-plan-welcome/budget-plan-welcome';
import { ConsequenceChainWelcome } from '../consequence-chain-welcome/consequence-chain-welcome';
import { SmartDecisionWelcome } from '../smart-decision-welcome/smart-decision-welcome';
import { PauseButtonWelcome } from '../pause-button-welcome/pause-button-welcome';
import { StrategyKeyringWelcome } from '../strategy-keyring-welcome/strategy-keyring-welcome';
import { GoalPathWelcome } from '../goal-path-welcome/goal-path-welcome';
import { PrivacyVaultWelcome } from '../privacy-vault-welcome/privacy-vault-welcome';
import { ScreenBalanceWelcome } from '../screen-balance-welcome/screen-balance-welcome';
import { RespectRippleWelcome } from '../respect-ripple-welcome/respect-ripple-welcome';
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
    PoliteOnlineWelcome,
    RespectCircleWelcome,
    ThinkBeforePostWelcome,
    DigitalMannersWelcome,
    TechResponsiblyWelcome,
    ImaginationSparkWelcome,
    MindCinemaWelcome,
    PuzzlePathsWelcome,
    CreativeStaircaseWelcome,
    StrategyBlueprintWelcome,
    AttentionLensWelcome,
    SolutionPathWelcome,
    MemoryWorkshopWelcome,
    SmartChoiceForecastWelcome,
    TradeOffWelcome,
    BudgetPlanWelcome,
    ConsequenceChainWelcome,
    SmartDecisionWelcome,
    PauseButtonWelcome,
    StrategyKeyringWelcome,
    GoalPathWelcome,
    PrivacyVaultWelcome,
    ScreenBalanceWelcome,
    RespectRippleWelcome,
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
