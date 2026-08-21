import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModuleService } from '../../core/services/module.service';
import { ProgressService } from '../../core/services/progress.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { Student } from '../../core/models/user.model';
import { Exercise, Lesson, Module } from '../../core/models/module.model';
import { StudentProgress } from '../../core/models/progress.model';
import { OllieMascot } from '../../shared/components/ollie-mascot/ollie-mascot';
import { LessonViewComponent, LessonStatus } from '../lesson-view/lesson-view';
import { ExerciseView, ExerciseAnswer } from '../exercise-view/exercise-view';
import { ShareExerciseView } from '../share-exercise-view/share-exercise-view';
import { ReflectionStepView } from '../reflection-step-view/reflection-step-view';
import { ChallengeStepView } from '../challenge-step-view/challenge-step-view';
import { StoryTabsStepView } from '../story-tabs-step-view/story-tabs-step-view';
import { ConfidenceLinkStepView } from '../confidence-link-step-view/confidence-link-step-view';
import { MatchingGameStepView } from '../matching-game-step-view/matching-game-step-view';
import { WarmupChatStepView } from '../warmup-chat-step-view/warmup-chat-step-view';
import { DayPlannerStepView } from '../day-planner-step-view/day-planner-step-view';
import { WarmupGameStepView } from '../warmup-game-step-view/warmup-game-step-view';
import { StoryCarouselStepView } from '../story-carousel-step-view/story-carousel-step-view';
import { DiscussionMcqStepView } from '../discussion-mcq-step-view/discussion-mcq-step-view';
import { ProudMomentStepView } from '../proud-moment-step-view/proud-moment-step-view';
import { ChallengeChecklistStepView } from '../challenge-checklist-step-view/challenge-checklist-step-view';
import { IdentityPlannerStepView } from '../identity-planner-step-view/identity-planner-step-view';
import { ChallengeBannerStepView } from '../challenge-banner-step-view/challenge-banner-step-view';
import { WarmupPickerStepView } from '../warmup-picker-step-view/warmup-picker-step-view';
import { MirrorTalkStepView } from '../mirror-talk-step-view/mirror-talk-step-view';
import { ChallengeConfidenceStepView } from '../challenge-confidence-step-view/challenge-confidence-step-view';
import { WarmupScenarioStepView } from '../warmup-scenario-step-view/warmup-scenario-step-view';
import { WarmupParadeStepView } from '../warmup-parade-step-view/warmup-parade-step-view';
import { SharingCircleStepView } from '../sharing-circle-step-view/sharing-circle-step-view';
import { DiscussionQuizStepView } from '../discussion-quiz-step-view/discussion-quiz-step-view';
import { GoalMatchupStepView } from '../goal-matchup-step-view/goal-matchup-step-view';
import { SmartGoalsLessonStepView } from '../smart-goals-lesson-step-view/smart-goals-lesson-step-view';
import { SmartGoalBuilderStepView } from '../smart-goal-builder-step-view/smart-goal-builder-step-view';
import { GoalChallengeTrackerStepView } from '../goal-challenge-tracker-step-view/goal-challenge-tracker-step-view';
import { ConfidenceGoalTrackerStepView } from '../confidence-goal-tracker-step-view/confidence-goal-tracker-step-view';
import { ChallengeTrackerStepView } from '../challenge-tracker-step-view/challenge-tracker-step-view';
import { ConfidencePlannerStepView } from '../confidence-planner-step-view/confidence-planner-step-view';
import { VictoryDanceStepView } from '../victory-dance-step-view/victory-dance-step-view';
import { ConfidenceBadgeStepView } from '../confidence-badge-step-view/confidence-badge-step-view';
import { ChallengeMinimalStepView } from '../challenge-minimal-step-view/challenge-minimal-step-view';
import { ConfidencePlanStepView } from '../confidence-plan-step-view/confidence-plan-step-view';
import { MemoryGameIntroStepView } from '../memory-game-intro-step-view/memory-game-intro-step-view';
import { MemoryGameSetupStepView } from '../memory-game-setup-step-view/memory-game-setup-step-view';
import { ActivityStepsStepView } from '../activity-steps-step-view/activity-steps-step-view';
import { WeeklyChallengeStepView } from '../weekly-challenge-step-view/weekly-challenge-step-view';
import { PlanItRaceStepView } from '../plan-it-race-step-view/plan-it-race-step-view';
import { PlanRelayStepView } from '../plan-relay-step-view/plan-relay-step-view';
import { DayChecklistPlannerStepView } from '../day-checklist-planner-step-view/day-checklist-planner-step-view';
import { WeeklyTaskPlannerStepView } from '../weekly-task-planner-step-view/weekly-task-planner-step-view';
import { ChallengeOfTheWeekStepView } from '../challenge-of-the-week-step-view/challenge-of-the-week-step-view';
import { ChallengeConfidenceWeekStepView } from '../challenge-confidence-week-step-view/challenge-confidence-week-step-view';

type PlayerView = 'map' | 'lesson-welcome' | 'exercise' | 'module-complete';

@Component({
  selector: 'app-module-player',
  standalone: true,
  imports: [
    CommonModule,
    OllieMascot,
    LessonViewComponent,
    ExerciseView,
    ShareExerciseView,
    ReflectionStepView,
    ChallengeStepView,
    StoryTabsStepView,
    ConfidenceLinkStepView,
    MatchingGameStepView,
    WarmupChatStepView,
    DayPlannerStepView,
    WarmupGameStepView,
    StoryCarouselStepView,
    DiscussionMcqStepView,
    ProudMomentStepView,
    ChallengeChecklistStepView,
    IdentityPlannerStepView,
    ChallengeBannerStepView,
    WarmupPickerStepView,
    MirrorTalkStepView,
    ChallengeConfidenceStepView,
    WarmupScenarioStepView,
    WarmupParadeStepView,
    SharingCircleStepView,
    DiscussionQuizStepView,
    GoalMatchupStepView,
    SmartGoalsLessonStepView,
    SmartGoalBuilderStepView,
    GoalChallengeTrackerStepView,
    ConfidenceGoalTrackerStepView,
    ChallengeTrackerStepView,
    ConfidencePlannerStepView,
    VictoryDanceStepView,
    ConfidenceBadgeStepView,
    ChallengeMinimalStepView,
    ConfidencePlanStepView,
    MemoryGameIntroStepView,
    MemoryGameSetupStepView,
    ActivityStepsStepView,
    WeeklyChallengeStepView,
    PlanItRaceStepView,
    PlanRelayStepView,
    DayChecklistPlannerStepView,
    WeeklyTaskPlannerStepView,
    ChallengeOfTheWeekStepView,
    ChallengeConfidenceWeekStepView,
  ],
  templateUrl: './module-player.html',
  styleUrl: './module-player.scss',
})
export class ModulePlayer implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private moduleService = inject(ModuleService);
  private progressService = inject(ProgressService);
  private sidekick = inject(SidekickService);

  readonly loading = signal(true);
  readonly module = signal<Module | null>(null);
  readonly progress = signal<StudentProgress | null>(null);
  readonly view = signal<PlayerView>('map');
  readonly activeLessonId = signal<string | null>(null);
  readonly activeExerciseId = signal<string | null>(null);
  readonly completedLessonTitle = signal('');
  /** True while the "lesson complete" congratulations modal is showing, on top of whatever view was active. */
  readonly showCompletionModal = signal(false);
  /** Holds an already-committed advance result for a card-download step until the student clicks Continue. */
  private pendingAdvance: { progress: StudentProgress; lessonCompleted: boolean; moduleCompleted: boolean } | null = null;

  readonly student = computed(() => this.auth.currentUser() as Student);
  readonly sortedLessons = computed<Lesson[]>(() => [...(this.module()?.lessons ?? [])].sort((a, b) => a.order - b.order));

  readonly activeLesson = computed<Lesson | null>(() => this.sortedLessons().find((l) => l.id === this.activeLessonId()) ?? null);

  readonly activeExercise = computed<Exercise | null>(() => {
    const lesson = this.activeLesson();
    return lesson?.exercises.find((e) => e.id === this.activeExerciseId()) ?? null;
  });

  /** The lesson the "Proceed to Week N" button in the completion modal will open, if any. */
  readonly nextLesson = computed<Lesson | null>(() => {
    const progress = this.progress();
    if (!progress?.currentLessonId) return null;
    return this.sortedLessons().find((l) => l.id === progress.currentLessonId) ?? null;
  });

  /** True when the welcome screen is for a week the student has already finished — the CTA should move them forward, not restart it. */
  readonly isCompletedLessonWelcome = computed<boolean>(() => {
    const lesson = this.activeLesson();
    const progress = this.progress();
    if (!lesson || !progress) return false;
    return progress.completedLessonIds.includes(lesson.id) && progress.currentLessonId !== lesson.id;
  });


  constructor() {
    // Safety net: if a step's id ever stops matching anything in the lesson (e.g. content
    // was restructured while a student had it open, or a saved id is stale), don't render a
    // blank page — bounce back to the module map instead.
    effect(() => {
      if (!this.loading() && this.view() === 'exercise' && !this.activeExercise()) {
        this.backToMap();
      }
    });
  }

  ngOnInit(): void {
    const moduleId = this.route.snapshot.paramMap.get('id');
    const student = this.auth.currentUser() as Student;
    if (!moduleId || !student) return;

    this.moduleService.getModuleById(moduleId).subscribe((module) => {
      if (!module) {
        this.router.navigate(['/student']);
        return;
      }
      this.module.set(module);

      this.progressService.startModule(student.id, module).subscribe((progress) => {
        this.progress.set(progress);
        this.loading.set(false);
      });
    });
  }

  /** Strips a leading "STAGE: " label off a lesson title, e.g. `MASTERY: "I Am Proud of Me"` → `"I Am Proud of Me"`. */
  lessonQuotedTitle(lesson: Lesson): string {
    return lesson.title.replace(/^[^:]+:\s*/, '');
  }

  /** A short, friendly name for the current step — used in the breadcrumb trail. */
  stepLabel(exercise: Exercise): string {
    switch (exercise.type) {
      case 'warmup-chat':
      case 'warmup-game':
      case 'warmup-picker':
      case 'warmup-scenario':
      case 'warmup-parade':
      case 'plan-relay':
      case 'goal-matchup':
      case 'mirror-talk':
      case 'victory-dance':
      case 'memory-game-intro':
      case 'memory-game-setup':
        return 'Warm-Up';
      case 'story':
      case 'story-tabs':
      case 'story-carousel':
        return 'Story Time';
      case 'share-prompt':
      case 'day-planner':
      case 'proud-moment':
      case 'identity-planner':
      case 'sharing-circle':
      case 'confidence-badge':
      case 'activity-steps':
      case 'day-checklist-planner':
      case 'weekly-task-planner':
        return 'My Activity';
      case 'reflection':
      case 'discussion-mcq':
      case 'discussion-quiz':
        return 'Discussion Points';
      case 'challenge':
      case 'challenge-checklist':
      case 'challenge-banner':
      case 'challenge-confidence':
      case 'challenge-tracker':
      case 'challenge-minimal':
      case 'weekly-challenge':
      case 'challenge-of-the-week':
      case 'challenge-confidence-week':
      case 'goal-challenge-tracker':
        return 'Challenge of the Week';
      case 'confidence-link':
      case 'confidence-planner':
      case 'confidence-plan':
      case 'confidence-goal-tracker':
        return 'Confidence Link';
      case 'matching-game':
      case 'plan-it-race':
        return 'Game';
      case 'multiple-choice':
        return 'Question';
      case 'smart-goals-lesson':
        return 'Lesson';
      case 'smart-goal-builder':
        return 'My Activity';
    }
  }

  lessonStatus(lesson: Lesson): LessonStatus {
    const progress = this.progress();
    if (!progress) return 'locked';
    if (progress.status === 'completed' || progress.completedLessonIds.includes(lesson.id)) return 'completed';
    if (progress.currentLessonId === lesson.id) return 'current';
    return 'locked';
  }

  /** Clicking a lesson card opens its welcome/briefing screen first, not the steps directly. */
  enterLesson(lesson: Lesson): void {
    if (this.lessonStatus(lesson) === 'locked') return;
    this.activeLessonId.set(lesson.id);
    this.view.set('lesson-welcome');
  }

  /** Starts the lesson's step sequence — warm-up, story, discussion, activity, challenge, questions — in the order the trainer script defines. */
  beginLesson(): void {
    const lesson = this.activeLesson();
    const progress = this.progress();
    if (!lesson || !progress) return;

    const sortedExercises = [...lesson.exercises].sort((a, b) => a.order - b.order);
    // Resume at the first exercise not yet completed, rather than trusting the saved
    // `currentExerciseId` cursor directly — if a lesson's steps were restructured (an
    // exercise inserted/reordered) after progress was saved, that cursor can still point at
    // a step that exists but is no longer the right one to resume at, silently skipping
    // whatever now comes before it.
    const isCurrentLesson = progress.currentLessonId === lesson.id;
    const firstIncomplete = isCurrentLesson
      ? sortedExercises.find((e) => !progress.completedExerciseIds.includes(e.id))
      : undefined;
    this.activeExerciseId.set(firstIncomplete?.id ?? sortedExercises[0]?.id ?? null);
    this.view.set('exercise');
  }

  backToMap(): void {
    this.view.set('map');
    this.activeLessonId.set(null);
    this.activeExerciseId.set(null);
  }

  onAnswered(answer: ExerciseAnswer): void {
    const student = this.student();
    const module = this.module();
    const lessonId = this.activeLessonId();
    const exerciseId = this.activeExerciseId();
    if (!student || !module || !lessonId || !exerciseId) return;

    if (!answer.correct) {
      this.sidekick.say('So close! You can do this — try again!', 'thinking', 2500);
      return;
    }

    this.progressService.submitAnswer(student.id, module, lessonId, exerciseId, answer.optionId).subscribe((result) => {
      this.handleAdvance(result);
    });
  }

  onShared(values: Record<string, string>): void {
    const student = this.student();
    const module = this.module();
    const lessonId = this.activeLessonId();
    const exerciseId = this.activeExerciseId();
    const exercise = this.activeExercise();
    if (!student || !module || !lessonId || !exerciseId) return;

    // A card the student can preview/download shouldn't auto-advance out from under them —
    // hold the already-committed result until they explicitly hit Continue.
    const holdForCard =
      (exercise?.type === 'share-prompt' && exercise.offerCardDownload) ||
      exercise?.type === 'day-planner' ||
      exercise?.type === 'confidence-badge' ||
      exercise?.type === 'confidence-plan' ||
      exercise?.type === 'activity-steps';

    this.progressService
      .submitShare(student.id, `${student.firstName} ${student.lastName}`, module, lessonId, exerciseId, values)
      .subscribe((result) => {
        this.sidekick.say('Thanks for sharing! ⭐ You earned a star.', 'cheer', 2500);
        if (holdForCard) {
          this.pendingAdvance = result;
        } else {
          setTimeout(() => this.handleAdvance(result), 900);
        }
      });
  }

  /** Continues past a card-download step once the student is done previewing/downloading. */
  onCardContinue(): void {
    if (!this.pendingAdvance) return;
    this.handleAdvance(this.pendingAdvance);
    this.pendingAdvance = null;
  }

  /** The Discussion Points tab inside a story-tabs step submits the same way a share-prompt does. */
  onStoryTabsContinue(values: Record<string, string>): void {
    this.onShared(values);
  }

  /** Shared "Continue" handler for steps with nothing to type or grade — reflection, challenge, confidence link. */
  onStepContinue(): void {
    const student = this.student();
    const module = this.module();
    const lessonId = this.activeLessonId();
    const exerciseId = this.activeExerciseId();
    if (!student || !module || !lessonId || !exerciseId) return;

    this.progressService.completeStep(student.id, module, lessonId, exerciseId).subscribe((result) => {
      this.handleAdvance(result);
    });
  }

  private handleAdvance(result: { progress: StudentProgress; lessonCompleted: boolean; moduleCompleted: boolean }): void {
    const student = this.student();
    this.progress.set(result.progress);

    if (result.moduleCompleted) {
      this.sidekick.say(`Incredible, ${student.firstName}! You finished the whole module!`, 'cheer', 5000);
      this.view.set('module-complete');
      return;
    }

    if (result.lessonCompleted) {
      const lesson = this.activeLesson();
      this.completedLessonTitle.set(lesson?.title ?? 'this lesson');
      this.sidekick.say('Lesson complete — you earned a badge!', 'cheer', 4000);
      this.showCompletionModal.set(true);
      return;
    }

    this.activeExerciseId.set(result.progress.currentExerciseId);
  }

  continueToNextLesson(): void {
    this.showCompletionModal.set(false);
    const lesson = this.nextLesson();
    if (!lesson) {
      this.backToMap();
      return;
    }
    this.activeLessonId.set(lesson.id);
    this.view.set('lesson-welcome');
  }

  goToDashboard(): void {
    this.router.navigate(['/student']);
  }
}
