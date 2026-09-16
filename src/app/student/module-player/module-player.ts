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
import { FeelingsMatchStepView } from '../feelings-match-step-view/feelings-match-step-view';
import { PictureFeelingsQuizStepView } from '../picture-feelings-quiz-step-view/picture-feelings-quiz-step-view';
import { WarmupQuizStepView } from '../warmup-quiz-step-view/warmup-quiz-step-view';
import { WarmupVoiceCheckStepView } from '../warmup-voice-check-step-view/warmup-voice-check-step-view';
import { ChallengePickSayStepView } from '../challenge-pick-say-step-view/challenge-pick-say-step-view';
import { BraveOrShyWarmupStepView } from '../brave-or-shy-warmup-step-view/brave-or-shy-warmup-step-view';
import { BraveBodyChallengeStepView } from '../brave-body-challenge-step-view/brave-body-challenge-step-view';
import { FastOrClearWarmupStepView } from '../fast-or-clear-warmup-step-view/fast-or-clear-warmup-step-view';
import { SlowTalkChallengeStepView } from '../slow-talk-challenge-step-view/slow-talk-challenge-step-view';
import { WhatCanIShareStepView } from '../what-can-i-share-step-view/what-can-i-share-step-view';
import { FinalChallengeStepView } from '../final-challenge-step-view/final-challenge-step-view';
import { WarmupWhatShouldIDoStepView } from '../warmup-what-should-i-do-step-view/warmup-what-should-i-do-step-view';
import { WarmupFinishSentenceStepView } from '../warmup-finish-sentence-step-view/warmup-finish-sentence-step-view';
import { ClearSentencePracticeStepView } from '../clear-sentence-practice-step-view/clear-sentence-practice-step-view';
import { FeelingsExplorerStepView } from '../feelings-explorer-step-view/feelings-explorer-step-view';
import { FeelingsTrackerStepView } from '../feelings-tracker-step-view/feelings-tracker-step-view';
import { PoliteOrNotStepView } from '../polite-or-not-step-view/polite-or-not-step-view';
import { IdeaPresentationStepView } from '../idea-presentation-step-view/idea-presentation-step-view';
import { ListeningPromiseTrackerStepView } from '../listening-promise-tracker-step-view/listening-promise-tracker-step-view';
import { DetectiveChallengeStepView } from '../detective-challenge-step-view/detective-challenge-step-view';
import { MissionBriefingStepView } from '../mission-briefing-step-view/mission-briefing-step-view';
import { YesNoChecklistStepView } from '../yes-no-checklist-step-view/yes-no-checklist-step-view';
import { ListeningBodyTrackerStepView } from '../listening-body-tracker-step-view/listening-body-tracker-step-view';
import { FeelingsPictureChoiceStepView } from '../feelings-picture-choice-step-view/feelings-picture-choice-step-view';
import { ChallengeFeelingReportStepView } from '../challenge-feeling-report-step-view/challenge-feeling-report-step-view';
import { KindWatchChallengeStepView } from '../kind-watch-challenge-step-view/kind-watch-challenge-step-view';
import { SortingGameStepView } from '../sorting-game-step-view/sorting-game-step-view';
import { KindWordsChallengeStepView } from '../kind-words-challenge-step-view/kind-words-challenge-step-view';
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
import { EtiquetteWarmupQuizStepView } from '../etiquette-warmup-quiz-step-view/etiquette-warmup-quiz-step-view';
import { PoliteMessageChallengeStepView } from '../polite-message-challenge-step-view/polite-message-challenge-step-view';
import { BehaviourMatchStepView } from '../behaviour-match-step-view/behaviour-match-step-view';
import { KindCommentChallengeStepView } from '../kind-comment-challenge-step-view/kind-comment-challenge-step-view';
import { TrueFalseWarmupStepView } from '../true-false-warmup-step-view/true-false-warmup-step-view';
import { PauseBeforePostingStepView } from '../pause-before-posting-step-view/pause-before-posting-step-view';
import { FillBlankWarmupStepView } from '../fill-blank-warmup-step-view/fill-blank-warmup-step-view';
import { DigitalEtiquetteTrackerStepView } from '../digital-etiquette-tracker-step-view/digital-etiquette-tracker-step-view';
import { ResponsibilityCircuitStepView } from '../responsibility-circuit-step-view/responsibility-circuit-step-view';
import { ScreenTruthCheckStepView } from '../screen-truth-check-step-view/screen-truth-check-step-view';
import { ScreenTimePlanChallengeStepView } from '../screen-time-plan-challenge-step-view/screen-time-plan-challenge-step-view';
import { KindWordsFillBlankStepView } from '../kind-words-fill-blank-step-view/kind-words-fill-blank-step-view';
import { DigitalResponsibilityTrackerStepView } from '../digital-responsibility-tracker-step-view/digital-responsibility-tracker-step-view';
import { ThinkBeforeClickChallengeStepView } from '../think-before-click-challenge-step-view/think-before-click-challenge-step-view';
import { PrivacyMatchStepView } from '../privacy-match-step-view/privacy-match-step-view';
import { PrivacyProtectorChallengeStepView } from '../privacy-protector-challenge-step-view/privacy-protector-challenge-step-view';
import { CreativeChoiceWarmupStepView } from '../creative-choice-warmup-step-view/creative-choice-warmup-step-view';
import { SmartChoicesWarmupStepView } from '../smart-choices-warmup-step-view/smart-choices-warmup-step-view';
import { TradeOffQuizStepView } from '../trade-off-quiz-step-view/trade-off-quiz-step-view';
import { DisciplineWarmupQuizStepView } from '../discipline-warmup-quiz-step-view/discipline-warmup-quiz-step-view';
import { ServiceWarmupQuizStepView } from '../service-warmup-quiz-step-view/service-warmup-quiz-step-view';
import { TeamworkWarmupQuizStepView } from '../teamwork-warmup-quiz-step-view/teamwork-warmup-quiz-step-view';
import { HygieneWarmupQuizStepView } from '../hygiene-warmup-quiz-step-view/hygiene-warmup-quiz-step-view';
import { WellnessWarmupQuizStepView } from '../wellness-warmup-quiz-step-view/wellness-warmup-quiz-step-view';
import { NutritionWarmupQuizStepView } from '../nutrition-warmup-quiz-step-view/nutrition-warmup-quiz-step-view';
import { TwoTruthsAndATwistStepView } from '../two-truths-and-a-twist-step-view/two-truths-and-a-twist-step-view';
import { StrengthSnapshotStepView } from '../strength-snapshot-step-view/strength-snapshot-step-view';
import { OpinionCornersStepView } from '../opinion-corners-step-view/opinion-corners-step-view';
import { StrengthMapStepView } from '../strength-map-step-view/strength-map-step-view';
import { BigQuestionStepView } from '../big-question-step-view/big-question-step-view';
import { RiskOrRewardStepView } from '../risk-or-reward-step-view/risk-or-reward-step-view';
import { ConfidenceLadderStepView } from '../confidence-ladder-step-view/confidence-ladder-step-view';
import { DiscussionPromptSamplesStepView } from '../discussion-prompt-samples-step-view/discussion-prompt-samples-step-view';
import { ReflectionPromptAnswersStepView } from '../reflection-prompt-answers-step-view/reflection-prompt-answers-step-view';
import { LateProjectStoryStepView } from '../late-project-story-step-view/late-project-story-step-view';
import { StoryTalkStepView } from '../story-talk-step-view/story-talk-step-view';
import { IdentitySnapshotChallengeStepView } from '../identity-snapshot-challenge-step-view/identity-snapshot-challenge-step-view';
import { PickYourPowerStepView } from '../pick-your-power-step-view/pick-your-power-step-view';
import { TemperamentQuizStepView } from '../temperament-quiz-step-view/temperament-quiz-step-view';
import { ThisOrThatWarmupStepView } from '../this-or-that-warmup-step-view/this-or-that-warmup-step-view';
import { ChoicesBoardStepView } from '../choices-board-step-view/choices-board-step-view';
import { ChoiceJournalChallengeStepView } from '../choice-journal-challenge-step-view/choice-journal-challenge-step-view';
import { PassTheDreamWarmupStepView } from '../pass-the-dream-warmup-step-view/pass-the-dream-warmup-step-view';
import { PlanOrPanicWarmupStepView } from '../plan-or-panic-warmup-step-view/plan-or-panic-warmup-step-view';
import { ShareYourPlanChallengeStepView } from '../share-your-plan-challenge-step-view/share-your-plan-challenge-step-view';
import { TimeReflectionWorksheetStepView } from '../time-reflection-worksheet-step-view/time-reflection-worksheet-step-view';
import { PlanItBetterChallengeStepView } from '../plan-it-better-challenge-step-view/plan-it-better-challenge-step-view';
import { PlanConfidenceLinkStepView } from '../plan-confidence-link-step-view/plan-confidence-link-step-view';
import { PlanRecapReflectionStepView } from '../plan-recap-reflection-step-view/plan-recap-reflection-step-view';
import { DayPlannerGridStepView } from '../day-planner-grid-step-view/day-planner-grid-step-view';
import { VideoReflectStepView } from '../video-reflect-step-view/video-reflect-step-view';
import { PriorityPlannerChallengeStepView } from '../priority-planner-challenge-step-view/priority-planner-challenge-step-view';
import { PatternSpotterChallengeStepView } from '../pattern-spotter-challenge-step-view/pattern-spotter-challenge-step-view';
import { TimeConfidenceLinkStepView } from '../time-confidence-link-step-view/time-confidence-link-step-view';
import { VoiceConfidenceLinkStepView } from '../voice-confidence-link-step-view/voice-confidence-link-step-view';
import { GrowthConfidenceLinkStepView } from '../growth-confidence-link-step-view/growth-confidence-link-step-view';
import { TrophyConfidenceLinkStepView } from '../trophy-confidence-link-step-view/trophy-confidence-link-step-view';
import { ConfidenceContractStepView } from '../confidence-contract-step-view/confidence-contract-step-view';
import { GoalDetectiveWarmupStepView } from '../goal-detective-warmup-step-view/goal-detective-warmup-step-view';
import { GoalVideoReflectStepView } from '../goal-video-reflect-step-view/goal-video-reflect-step-view';
import { SmartGoalTableStepView } from '../smart-goal-table-step-view/smart-goal-table-step-view';
import { StaySmartChallengeStepView } from '../stay-smart-challenge-step-view/stay-smart-challenge-step-view';
import { PromiseConfidenceLinkStepView } from '../promise-confidence-link-step-view/promise-confidence-link-step-view';
import { PlanningRelayWarmupStepView } from '../planning-relay-warmup-step-view/planning-relay-warmup-step-view';
import { PersonalGrowthMapStepView } from '../personal-growth-map-step-view/personal-growth-map-step-view';
import { ShareReflectChallengeStepView } from '../share-reflect-challenge-step-view/share-reflect-challenge-step-view';
import { ReflectionConfidenceLinkStepView } from '../reflection-confidence-link-step-view/reflection-confidence-link-step-view';
import { SevenDayPlanningProjectStepView } from '../seven-day-planning-project-step-view/seven-day-planning-project-step-view';
import { NutritionFoodMatchStepView } from '../nutrition-food-match-step-view/nutrition-food-match-step-view';
import { NutritionTfWarmupStepView } from '../nutrition-tf-warmup-step-view/nutrition-tf-warmup-step-view';
import { NutritionFillBlankStepView } from '../nutrition-fill-blank-step-view/nutrition-fill-blank-step-view';
import { WellnessHabitMatchStepView } from '../wellness-habit-match-step-view/wellness-habit-match-step-view';
import { WellnessTfWarmupStepView } from '../wellness-tf-warmup-step-view/wellness-tf-warmup-step-view';
import { WellnessFeelingsJournalStepView } from '../wellness-feelings-journal-step-view/wellness-feelings-journal-step-view';
import { WellnessFillBlankStepView } from '../wellness-fill-blank-step-view/wellness-fill-blank-step-view';
import { HygieneDetectiveChallengeStepView } from '../hygiene-detective-challenge-step-view/hygiene-detective-challenge-step-view';
import { HygieneConfidenceLinkStepView } from '../hygiene-confidence-link-step-view/hygiene-confidence-link-step-view';
import { HygieneHabitMatchStepView } from '../hygiene-habit-match-step-view/hygiene-habit-match-step-view';
import { HygieneChecklistChallengeStepView } from '../hygiene-checklist-challenge-step-view/hygiene-checklist-challenge-step-view';
import { HygieneTfWarmupStepView } from '../hygiene-tf-warmup-step-view/hygiene-tf-warmup-step-view';
import { HygieneFillBlankStepView } from '../hygiene-fill-blank-step-view/hygiene-fill-blank-step-view';
import { HygieneFinalChallengeStepView } from '../hygiene-final-challenge-step-view/hygiene-final-challenge-step-view';
import { TeamworkMatchWarmupStepView } from '../teamwork-match-warmup-step-view/teamwork-match-warmup-step-view';
import { TeamworkTfWarmupStepView } from '../teamwork-tf-warmup-step-view/teamwork-tf-warmup-step-view';
import { TeamworkFillBlankStepView } from '../teamwork-fill-blank-step-view/teamwork-fill-blank-step-view';
import { TeamworkReflectionMissionStepView } from '../teamwork-reflection-mission-step-view/teamwork-reflection-mission-step-view';
import { ServiceActTrackerStepView } from '../service-act-tracker-step-view/service-act-tracker-step-view';
import { ServiceConfidenceLinkStepView } from '../service-confidence-link-step-view/service-confidence-link-step-view';
import { ServicePlaceMatchStepView } from '../service-place-match-step-view/service-place-match-step-view';
import { ServiceEnvironmentTrackerStepView } from '../service-environment-tracker-step-view/service-environment-tracker-step-view';
import { ServiceTfWarmupStepView } from '../service-tf-warmup-step-view/service-tf-warmup-step-view';
import { ServiceKindnessPlanStepView } from '../service-kindness-plan-step-view/service-kindness-plan-step-view';
import { ServiceFillBlankStepView } from '../service-fill-blank-step-view/service-fill-blank-step-view';
import { ServiceProjectFinalStepView } from '../service-project-final-step-view/service-project-final-step-view';
import { DisciplineTfWarmupStepView } from '../discipline-tf-warmup-step-view/discipline-tf-warmup-step-view';
import { DisciplineMatchWarmupStepView } from '../discipline-match-warmup-step-view/discipline-match-warmup-step-view';
import { DisciplineSequenceWarmupStepView } from '../discipline-sequence-warmup-step-view/discipline-sequence-warmup-step-view';
import { TradeOffTrackerChallengeStepView } from '../trade-off-tracker-challenge-step-view/trade-off-tracker-challenge-step-view';
import { TradeOffConfidenceLinkStepView } from '../trade-off-confidence-link-step-view/trade-off-confidence-link-step-view';
import { MoneyMatchStepView } from '../money-match-step-view/money-match-step-view';
import { SimpleBudgetChallengeStepView } from '../simple-budget-challenge-step-view/simple-budget-challenge-step-view';
import { BudgetConfidenceLinkStepView } from '../budget-confidence-link-step-view/budget-confidence-link-step-view';
import { MoneyMythBusterStepView } from '../money-myth-buster-step-view/money-myth-buster-step-view';
import { ThinkAheadChallengeStepView } from '../think-ahead-challenge-step-view/think-ahead-challenge-step-view';
import { ConsequenceConfidenceLinkStepView } from '../consequence-confidence-link-step-view/consequence-confidence-link-step-view';
import { StepSequenceStepView } from '../step-sequence-step-view/step-sequence-step-view';
import { FinancialAuditChallengeStepView } from '../financial-audit-challenge-step-view/financial-audit-challenge-step-view';
import { ModuleOutcomeConfidenceLinkStepView } from '../module-outcome-confidence-link-step-view/module-outcome-confidence-link-step-view';
import { FirstStrategyChallengeStepView } from '../first-strategy-challenge-step-view/first-strategy-challenge-step-view';
import { ThinkItThroughWarmupStepView } from '../think-it-through-warmup-step-view/think-it-through-warmup-step-view';
import { PausePlanChallengeStepView } from '../pause-plan-challenge-step-view/pause-plan-challenge-step-view';
import { StrategicThinkerLinkStepView } from '../strategic-thinker-link-step-view/strategic-thinker-link-step-view';
import { StrategyMatchWarmupStepView } from '../strategy-match-warmup-step-view/strategy-match-warmup-step-view';
import { DiscussionMatchStepView } from '../discussion-match-step-view/discussion-match-step-view';
import { DiscussionSequenceStepView } from '../discussion-sequence-step-view/discussion-sequence-step-view';
import { StrategyDetectiveChallengeStepView } from '../strategy-detective-challenge-step-view/strategy-detective-challenge-step-view';
import { TryAnotherPlanLinkStepView } from '../try-another-plan-link-step-view/try-another-plan-link-step-view';
import { StepOrderWarmupStepView } from '../step-order-warmup-step-view/step-order-warmup-step-view';
import { StrategyPlanChallengeStepView } from '../strategy-plan-challenge-step-view/strategy-plan-challenge-step-view';
import { SmallStepsLinkStepView } from '../small-steps-link-step-view/small-steps-link-step-view';
import { CreativeObjectChallengeStepView } from '../creative-object-challenge-step-view/creative-object-challenge-step-view';
import { FactCheckWarmupStepView } from '../fact-check-warmup-step-view/fact-check-warmup-step-view';
import { ImagineCreateChallengeStepView } from '../imagine-create-challenge-step-view/imagine-create-challenge-step-view';
import { SolutionMatchGameStepView } from '../solution-match-game-step-view/solution-match-game-step-view';
import { SolveItDifferentlyChallengeStepView } from '../solve-it-differently-challenge-step-view/solve-it-differently-challenge-step-view';
import { SequenceOrderGameStepView } from '../sequence-order-game-step-view/sequence-order-game-step-view';
import { CreativeProjectChallengeStepView } from '../creative-project-challenge-step-view/creative-project-challenge-step-view';
import { SpotTheDifferenceWarmupStepView } from '../spot-the-difference-warmup-step-view/spot-the-difference-warmup-step-view';
import { WeeklyAttentionChallengeStepView } from '../weekly-attention-challenge-step-view/weekly-attention-challenge-step-view';
import { ProblemScenarioWarmupStepView } from '../problem-scenario-warmup-step-view/problem-scenario-warmup-step-view';
import { ThinkingStepsChallengeStepView } from '../thinking-steps-challenge-step-view/thinking-steps-challenge-step-view';
import { MemoryTestWarmupStepView } from '../memory-test-warmup-step-view/memory-test-warmup-step-view';
import { MemoryGymChallengeStepView } from '../memory-gym-challenge-step-view/memory-gym-challenge-step-view';
import { IfThenWarmupStepView } from '../if-then-warmup-step-view/if-then-warmup-step-view';
import { SmartThinkerPlanChallengeStepView } from '../smart-thinker-plan-challenge-step-view/smart-thinker-plan-challenge-step-view';
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
import { DailyFeelingsCheckinStepView } from '../daily-feelings-checkin-step-view/daily-feelings-checkin-step-view';
import { KindActionChallengeStepView } from '../kind-action-challenge-step-view/kind-action-challenge-step-view';
import { YesNoQuizStepView } from '../yes-no-quiz-step-view/yes-no-quiz-step-view';
import { PhotoUploadActivityStepView } from '../photo-upload-activity-step-view/photo-upload-activity-step-view';
import { BelieveInYourselfChallengeStepView } from '../believe-in-yourself-challenge-step-view/believe-in-yourself-challenge-step-view';
import { WhatWouldYouDoQuizStepView } from '../what-would-you-do-quiz-step-view/what-would-you-do-quiz-step-view';
import { StickerPosterStepView } from '../sticker-poster-step-view/sticker-poster-step-view';
import { KindnessCornerChallengeStepView } from '../kindness-corner-challenge-step-view/kindness-corner-challenge-step-view';
import { PlaceSortGameStepView } from '../place-sort-game-step-view/place-sort-game-step-view';
import { WeeklyChallengeShowcaseStepView } from '../weekly-challenge-showcase-step-view/weekly-challenge-showcase-step-view';
import { SameOrDifferentQuizStepView } from '../same-or-different-quiz-step-view/same-or-different-quiz-step-view';
import { DiversityPosterStepView } from '../diversity-poster-step-view/diversity-poster-step-view';
import { KindnessBannerChallengeStepView } from '../kindness-banner-challenge-step-view/kindness-banner-challenge-step-view';
import { LessonWelcomeView } from '../lesson-welcome-view/lesson-welcome-view';

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
    FeelingsMatchStepView,
    PictureFeelingsQuizStepView,
    WarmupQuizStepView,
    WarmupVoiceCheckStepView,
    ChallengePickSayStepView,
    BraveOrShyWarmupStepView,
    BraveBodyChallengeStepView,
    FastOrClearWarmupStepView,
    SlowTalkChallengeStepView,
    WhatCanIShareStepView,
    FinalChallengeStepView,
    WarmupWhatShouldIDoStepView,
    WarmupFinishSentenceStepView,
    ClearSentencePracticeStepView,
    FeelingsExplorerStepView,
    FeelingsTrackerStepView,
    PoliteOrNotStepView,
    IdeaPresentationStepView,
    ListeningPromiseTrackerStepView,
    DetectiveChallengeStepView,
    MissionBriefingStepView,
    YesNoChecklistStepView,
    ListeningBodyTrackerStepView,
    FeelingsPictureChoiceStepView,
    ChallengeFeelingReportStepView,
    KindWatchChallengeStepView,
    SortingGameStepView,
    KindWordsChallengeStepView,
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
    EtiquetteWarmupQuizStepView,
    PoliteMessageChallengeStepView,
    BehaviourMatchStepView,
    KindCommentChallengeStepView,
    TrueFalseWarmupStepView,
    PauseBeforePostingStepView,
    FillBlankWarmupStepView,
    DigitalEtiquetteTrackerStepView,
    ResponsibilityCircuitStepView,
    ScreenTruthCheckStepView,
    ScreenTimePlanChallengeStepView,
    KindWordsFillBlankStepView,
    DigitalResponsibilityTrackerStepView,
    ThinkBeforeClickChallengeStepView,
    PrivacyMatchStepView,
    PrivacyProtectorChallengeStepView,
    CreativeChoiceWarmupStepView,
    SmartChoicesWarmupStepView,
    TradeOffQuizStepView,
    DisciplineWarmupQuizStepView,
    ServiceWarmupQuizStepView,
    TeamworkWarmupQuizStepView,
    HygieneWarmupQuizStepView,
    WellnessWarmupQuizStepView,
    NutritionWarmupQuizStepView,
    TwoTruthsAndATwistStepView,
    StrengthSnapshotStepView,
    OpinionCornersStepView,
    StrengthMapStepView,
    BigQuestionStepView,
    RiskOrRewardStepView,
    ConfidenceLadderStepView,
    DiscussionPromptSamplesStepView,
    ReflectionPromptAnswersStepView,
    LateProjectStoryStepView,
    StoryTalkStepView,
    IdentitySnapshotChallengeStepView,
    PickYourPowerStepView,
    TemperamentQuizStepView,
    ThisOrThatWarmupStepView,
    ChoicesBoardStepView,
    ChoiceJournalChallengeStepView,
    PassTheDreamWarmupStepView,
    PlanOrPanicWarmupStepView,
    ShareYourPlanChallengeStepView,
    TimeReflectionWorksheetStepView,
    PlanItBetterChallengeStepView,
    PlanConfidenceLinkStepView,
    PlanRecapReflectionStepView,
    DayPlannerGridStepView,
    VideoReflectStepView,
    PriorityPlannerChallengeStepView,
    PatternSpotterChallengeStepView,
    TimeConfidenceLinkStepView,
    VoiceConfidenceLinkStepView,
    GrowthConfidenceLinkStepView,
    TrophyConfidenceLinkStepView,
    ConfidenceContractStepView,
    GoalDetectiveWarmupStepView,
    GoalVideoReflectStepView,
    SmartGoalTableStepView,
    StaySmartChallengeStepView,
    PromiseConfidenceLinkStepView,
    PlanningRelayWarmupStepView,
    PersonalGrowthMapStepView,
    ShareReflectChallengeStepView,
    ReflectionConfidenceLinkStepView,
    SevenDayPlanningProjectStepView,
    NutritionFoodMatchStepView,
    NutritionTfWarmupStepView,
    NutritionFillBlankStepView,
    WellnessHabitMatchStepView,
    WellnessTfWarmupStepView,
    WellnessFeelingsJournalStepView,
    WellnessFillBlankStepView,
    HygieneDetectiveChallengeStepView,
    HygieneConfidenceLinkStepView,
    HygieneHabitMatchStepView,
    HygieneChecklistChallengeStepView,
    HygieneTfWarmupStepView,
    HygieneFillBlankStepView,
    HygieneFinalChallengeStepView,
    TeamworkMatchWarmupStepView,
    TeamworkTfWarmupStepView,
    TeamworkFillBlankStepView,
    TeamworkReflectionMissionStepView,
    ServiceActTrackerStepView,
    ServiceConfidenceLinkStepView,
    ServicePlaceMatchStepView,
    ServiceEnvironmentTrackerStepView,
    ServiceTfWarmupStepView,
    ServiceKindnessPlanStepView,
    ServiceFillBlankStepView,
    ServiceProjectFinalStepView,
    DisciplineTfWarmupStepView,
    DisciplineMatchWarmupStepView,
    DisciplineSequenceWarmupStepView,
    TradeOffTrackerChallengeStepView,
    TradeOffConfidenceLinkStepView,
    MoneyMatchStepView,
    SimpleBudgetChallengeStepView,
    BudgetConfidenceLinkStepView,
    MoneyMythBusterStepView,
    ThinkAheadChallengeStepView,
    ConsequenceConfidenceLinkStepView,
    StepSequenceStepView,
    FinancialAuditChallengeStepView,
    ModuleOutcomeConfidenceLinkStepView,
    FirstStrategyChallengeStepView,
    ThinkItThroughWarmupStepView,
    PausePlanChallengeStepView,
    StrategicThinkerLinkStepView,
    StrategyMatchWarmupStepView,
    DiscussionMatchStepView,
    DiscussionSequenceStepView,
    StrategyDetectiveChallengeStepView,
    TryAnotherPlanLinkStepView,
    StepOrderWarmupStepView,
    StrategyPlanChallengeStepView,
    SmallStepsLinkStepView,
    CreativeObjectChallengeStepView,
    FactCheckWarmupStepView,
    ImagineCreateChallengeStepView,
    SolutionMatchGameStepView,
    SolveItDifferentlyChallengeStepView,
    SequenceOrderGameStepView,
    CreativeProjectChallengeStepView,
    SpotTheDifferenceWarmupStepView,
    WeeklyAttentionChallengeStepView,
    ProblemScenarioWarmupStepView,
    ThinkingStepsChallengeStepView,
    MemoryTestWarmupStepView,
    MemoryGymChallengeStepView,
    IfThenWarmupStepView,
    SmartThinkerPlanChallengeStepView,
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
    DailyFeelingsCheckinStepView,
    KindActionChallengeStepView,
    YesNoQuizStepView,
    PhotoUploadActivityStepView,
    BelieveInYourselfChallengeStepView,
    WhatWouldYouDoQuizStepView,
    StickerPosterStepView,
    KindnessCornerChallengeStepView,
    PlaceSortGameStepView,
    WeeklyChallengeShowcaseStepView,
    SameOrDifferentQuizStepView,
    DiversityPosterStepView,
    KindnessBannerChallengeStepView,
    LessonWelcomeView,
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
      case 'feelings-match':
      case 'picture-feelings-quiz':
      case 'warmup-quiz':
      case 'warmup-voice-check':
      case 'challenge-pick-say':
      case 'brave-or-shy-warmup':
      case 'brave-body-challenge':
      case 'fast-or-clear-warmup':
      case 'slow-talk-challenge':
      case 'what-can-i-share':
      case 'final-challenge':
      case 'warmup-what-should-i-do':
      case 'warmup-finish-sentence':
      case 'feelings-explorer':
      case 'polite-or-not':
      case 'yes-no-quiz':
      case 'sorting-game':
      case 'place-sort-game':
      case 'same-or-different-quiz':
      case 'warmup-chat':
      case 'warmup-game':
      case 'etiquette-warmup-quiz':
      case 'creative-choice-warmup':
      case 'smart-choices-warmup':
      case 'spot-the-difference-warmup':
      case 'problem-scenario-warmup':
      case 'memory-test-warmup':
      case 'if-then-warmup':
      case 'think-it-through-warmup':
      case 'strategy-match-warmup':
      case 'step-order-warmup':
      case 'fact-check-warmup':
      case 'solution-match-game':
      case 'sequence-order-game':
      case 'responsibility-circuit':
      case 'screen-truth-check':
      case 'kind-words-fill-blank':
      case 'privacy-match':
      case 'behaviour-match':
      case 'true-false-warmup':
      case 'fill-blank-warmup':
      case 'warmup-picker':
      case 'warmup-scenario':
      case 'warmup-parade':
      case 'what-would-you-do-quiz':
      case 'plan-relay':
      case 'goal-matchup':
      case 'mirror-talk':
      case 'victory-dance':
      case 'memory-game-intro':
      case 'memory-game-setup':
      case 'mission-briefing':
      case 'yes-no-checklist':
      case 'feelings-picture-choice':
      case 'trade-off-quiz':
      case 'discipline-warmup-quiz':
      case 'service-warmup-quiz':
      case 'teamwork-warmup-quiz':
      case 'hygiene-warmup-quiz':
      case 'wellness-warmup-quiz':
      case 'nutrition-warmup-quiz':
      case 'nutrition-food-match':
      case 'nutrition-tf-warmup':
      case 'nutrition-fill-blank':
      case 'wellness-habit-match':
      case 'wellness-tf-warmup':
      case 'wellness-fill-blank':
      case 'teamwork-match-warmup':
      case 'teamwork-tf-warmup':
      case 'teamwork-fill-blank':
      case 'service-place-match':
      case 'service-tf-warmup':
      case 'service-fill-blank':
      case 'discipline-tf-warmup':
      case 'discipline-match-warmup':
      case 'discipline-sequence-warmup':
      case 'money-match':
      case 'money-myth-buster':
      case 'step-sequence':
      case 'two-truths-and-a-twist':
      case 'strength-snapshot':
      case 'risk-or-reward':
      case 'pick-your-power':
      case 'this-or-that-warmup':
      case 'pass-the-dream-warmup':
      case 'plan-or-panic-warmup':
      case 'goal-detective-warmup':
      case 'planning-relay-warmup':
        return 'Warm-Up';
      case 'plan-recap-reflection':
        return 'Recap';
      case 'story':
      case 'story-tabs':
      case 'story-carousel':
      case 'late-project-story':
        return 'Story Time';
      case 'video-reflect':
      case 'goal-video-reflect':
        return 'Watch & Reflect';
      case 'share-prompt':
      case 'day-planner':
      case 'proud-moment':
      case 'identity-planner':
      case 'sharing-circle':
      case 'confidence-badge':
      case 'activity-steps':
      case 'day-checklist-planner':
      case 'weekly-task-planner':
      case 'photo-upload-activity':
      case 'sticker-poster':
      case 'diversity-poster':
      case 'temperament-quiz':
      case 'choices-board':
      case 'opinion-corners':
      case 'strength-map':
      case 'confidence-ladder':
      case 'time-reflection-worksheet':
      case 'day-planner-grid':
      case 'priority-planner-challenge':
      case 'smart-goal-table':
      case 'personal-growth-map':
        return 'My Activity';
      case 'reflection':
      case 'discussion-mcq':
      case 'discussion-quiz':
      case 'discussion-match':
      case 'discussion-sequence':
      case 'discussion-prompt-samples':
      case 'reflection-prompt-answers':
      case 'story-talk':
        return 'Discussion Points';
      case 'challenge':
      case 'challenge-checklist':
      case 'challenge-banner':
      case 'challenge-confidence':
      case 'challenge-tracker':
      case 'challenge-minimal':
      case 'weekly-challenge':
      case 'challenge-of-the-week':
      case 'identity-snapshot-challenge':
      case 'choice-journal-challenge':
      case 'share-your-plan-challenge':
      case 'challenge-confidence-week':
      case 'detective-challenge':
      case 'goal-challenge-tracker':
      case 'daily-feelings-checkin':
      case 'kind-watch-challenge':
      case 'kind-words-challenge':
      case 'kind-action-challenge':
      case 'believe-in-yourself-challenge':
      case 'kindness-corner-challenge':
      case 'weekly-challenge-showcase':
      case 'kindness-banner-challenge':
      case 'listening-body-tracker':
      case 'challenge-feeling-report':
      case 'listening-promise-tracker':
      case 'clear-sentence-practice':
      case 'feelings-tracker':
      case 'idea-presentation':
      case 'polite-message-challenge':
      case 'kind-comment-challenge':
      case 'pause-before-posting':
      case 'think-before-click-challenge':
      case 'privacy-protector-challenge':
      case 'screen-time-plan-challenge':
      case 'creative-object-challenge':
      case 'imagine-create-challenge':
      case 'solve-it-differently-challenge':
      case 'first-strategy-challenge':
      case 'pause-plan-challenge':
      case 'strategy-detective-challenge':
      case 'weekly-attention-challenge':
      case 'thinking-steps-challenge':
      case 'memory-gym-challenge':
      case 'trade-off-tracker-challenge':
      case 'simple-budget-challenge':
      case 'think-ahead-challenge':
      case 'service-act-tracker':
      case 'service-environment-tracker':
      case 'service-kindness-plan':
      case 'hygiene-detective-challenge':
      case 'hygiene-checklist-challenge':
      case 'wellness-feelings-journal':
      case 'plan-it-better-challenge':
      case 'pattern-spotter-challenge':
      case 'stay-smart-challenge':
      case 'share-reflect-challenge':
        return 'Challenge of the Week';
      case 'digital-etiquette-tracker':
      case 'digital-responsibility-tracker':
      case 'creative-project-challenge':
      case 'strategy-plan-challenge':
      case 'smart-thinker-plan-challenge':
      case 'financial-audit-challenge':
      case 'service-project-final':
      case 'teamwork-reflection-mission':
      case 'hygiene-final-challenge':
      case 'seven-day-planning-project':
      case 'confidence-contract':
        return 'Final Challenge';
      case 'confidence-link':
      case 'strategic-thinker-link':
      case 'try-another-plan-link':
      case 'small-steps-link':
      case 'confidence-planner':
      case 'confidence-plan':
      case 'confidence-goal-tracker':
      case 'trade-off-confidence-link':
      case 'service-confidence-link':
      case 'budget-confidence-link':
      case 'consequence-confidence-link':
      case 'module-outcome-confidence-link':
      case 'hygiene-confidence-link':
      case 'plan-confidence-link':
      case 'time-confidence-link':
      case 'voice-confidence-link':
      case 'growth-confidence-link':
      case 'trophy-confidence-link':
      case 'promise-confidence-link':
      case 'reflection-confidence-link':
        return 'Confidence Link';
      case 'matching-game':
      case 'plan-it-race':
      case 'hygiene-habit-match':
      case 'hygiene-tf-warmup':
      case 'hygiene-fill-blank':
        return 'Game';
      case 'multiple-choice':
        return 'Question';
      case 'smart-goals-lesson':
      case 'big-question':
        return 'Lesson';
      case 'smart-goal-builder':
        return 'My Activity';
      default:
        return 'Step';
    }
  }

  lessonStatus(lesson: Lesson): LessonStatus {
    // A "coming soon" lesson always stays locked, whatever the student's progress.
    if (lesson.comingSoon) return 'locked';
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
      exercise?.type === 'activity-steps' ||
      exercise?.type === 'identity-snapshot-challenge' ||
      exercise?.type === 'choice-journal-challenge' ||
      exercise?.type === 'share-your-plan-challenge' ||
      exercise?.type === 'this-or-that-warmup' ||
      exercise?.type === 'strength-snapshot' ||
      exercise?.type === 'opinion-corners' ||
      exercise?.type === 'strength-map' ||
      exercise?.type === 'confidence-ladder' ||
      exercise?.type === 'risk-or-reward' ||
      exercise?.type === 'pass-the-dream-warmup' ||
      exercise?.type === 'time-reflection-worksheet' ||
      exercise?.type === 'plan-it-better-challenge' ||
      exercise?.type === 'plan-recap-reflection' ||
      exercise?.type === 'day-planner-grid' ||
      exercise?.type === 'video-reflect' ||
      exercise?.type === 'priority-planner-challenge' ||
      exercise?.type === 'pattern-spotter-challenge' ||
      exercise?.type === 'goal-video-reflect' ||
      exercise?.type === 'smart-goal-table' ||
      exercise?.type === 'stay-smart-challenge' ||
      exercise?.type === 'personal-growth-map' ||
      exercise?.type === 'share-reflect-challenge' ||
      exercise?.type === 'seven-day-planning-project' ||
      exercise?.type === 'confidence-contract';

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
