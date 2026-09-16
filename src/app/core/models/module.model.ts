import { AgeGroup } from './user.model';

export interface ExerciseOption {
  id: string;
  text: string;
  icon?: string;
}

/**
 * Discriminated union of everything a lesson can step a student through, in
 * order — a warm-up share, the mini story/video, a live-discussion moment, a
 * mini activity, a challenge card, or a graded question. New step types can
 * be added later without touching existing ones.
 */
export type ExerciseType =
  | 'multiple-choice'
  | 'warmup-quiz'
  | 'warmup-voice-check'
  | 'brave-or-shy-warmup'
  | 'brave-body-challenge'
  | 'fast-or-clear-warmup'
  | 'slow-talk-challenge'
  | 'what-can-i-share'
  | 'final-challenge'
  | 'challenge-pick-say'
  | 'warmup-what-should-i-do'
  | 'warmup-finish-sentence'
  | 'clear-sentence-practice'
  | 'feelings-explorer'
  | 'feelings-tracker'
  | 'polite-or-not'
  | 'idea-presentation'
  | 'listening-promise-tracker'
  | 'detective-challenge'
  | 'share-prompt'
  | 'reflection'
  | 'challenge'
  | 'story'
  | 'story-tabs'
  | 'confidence-link'
  | 'matching-game'
  | 'feelings-match'
  | 'picture-feelings-quiz'
  | 'kind-watch-challenge'
  | 'sorting-game'
  | 'kind-words-challenge'
  | 'warmup-chat'
  | 'day-planner'
  | 'warmup-game'
  | 'story-carousel'
  | 'discussion-mcq'
  | 'proud-moment'
  | 'challenge-checklist'
  | 'identity-planner'
  | 'challenge-banner'
  | 'warmup-picker'
  | 'mirror-talk'
  | 'challenge-confidence'
  | 'warmup-scenario'
  | 'warmup-parade'
  | 'sharing-circle'
  | 'discussion-quiz'
  | 'goal-matchup'
  | 'challenge-tracker'
  | 'confidence-planner'
  | 'victory-dance'
  | 'confidence-badge'
  | 'challenge-minimal'
  | 'confidence-plan'
  | 'memory-game-intro'
  | 'memory-game-setup'
  | 'activity-steps'
  | 'weekly-challenge'
  | 'plan-it-race'
  | 'plan-relay'
  | 'day-checklist-planner'
  | 'weekly-task-planner'
  | 'challenge-of-the-week'
  | 'challenge-confidence-week'
  | 'daily-feelings-checkin'
  | 'smart-goals-lesson'
  | 'smart-goal-builder'
  | 'goal-challenge-tracker'
  | 'confidence-goal-tracker'
  | 'kind-action-challenge'
  | 'yes-no-quiz'
  | 'photo-upload-activity'
  | 'believe-in-yourself-challenge'
  | 'what-would-you-do-quiz'
  | 'sticker-poster'
  | 'kindness-corner-challenge'
  | 'place-sort-game'
  | 'weekly-challenge-showcase'
  | 'same-or-different-quiz'
  | 'diversity-poster'
  | 'kindness-banner-challenge'
  | 'mission-briefing'
  | 'yes-no-checklist'
  | 'listening-body-tracker'
  | 'feelings-picture-choice'
  | 'challenge-feeling-report'
  | 'etiquette-warmup-quiz'
  | 'polite-message-challenge'
  | 'behaviour-match'
  | 'kind-comment-challenge'
  | 'true-false-warmup'
  | 'pause-before-posting'
  | 'fill-blank-warmup'
  | 'digital-etiquette-tracker'
  | 'responsibility-circuit'
  | 'screen-truth-check'
  | 'screen-time-plan-challenge'
  | 'kind-words-fill-blank'
  | 'digital-responsibility-tracker'
  | 'think-before-click-challenge'
  | 'privacy-match'
  | 'privacy-protector-challenge'
  | 'creative-choice-warmup'
  | 'smart-choices-warmup'
  | 'first-strategy-challenge'
  | 'think-it-through-warmup'
  | 'pause-plan-challenge'
  | 'strategic-thinker-link'
  | 'strategy-match-warmup'
  | 'discussion-match'
  | 'discussion-sequence'
  | 'strategy-detective-challenge'
  | 'try-another-plan-link'
  | 'step-order-warmup'
  | 'strategy-plan-challenge'
  | 'small-steps-link'
  | 'creative-object-challenge'
  | 'fact-check-warmup'
  | 'imagine-create-challenge'
  | 'solution-match-game'
  | 'solve-it-differently-challenge'
  | 'sequence-order-game'
  | 'creative-project-challenge'
  | 'spot-the-difference-warmup'
  | 'weekly-attention-challenge'
  | 'problem-scenario-warmup'
  | 'thinking-steps-challenge'
  | 'memory-test-warmup'
  | 'memory-gym-challenge'
  | 'if-then-warmup'
  | 'smart-thinker-plan-challenge'
  | 'trade-off-quiz'
  | 'trade-off-tracker-challenge'
  | 'trade-off-confidence-link'
  | 'money-match'
  | 'simple-budget-challenge'
  | 'budget-confidence-link'
  | 'money-myth-buster'
  | 'think-ahead-challenge'
  | 'consequence-confidence-link'
  | 'step-sequence'
  | 'financial-audit-challenge'
  | 'module-outcome-confidence-link'
  | 'discipline-warmup-quiz'
  | 'discipline-tf-warmup'
  | 'discipline-match-warmup'
  | 'discipline-sequence-warmup'
  | 'service-warmup-quiz'
  | 'service-act-tracker'
  | 'service-confidence-link'
  | 'service-place-match'
  | 'service-environment-tracker'
  | 'service-tf-warmup'
  | 'service-kindness-plan'
  | 'service-fill-blank'
  | 'service-project-final'
  | 'teamwork-warmup-quiz'
  | 'teamwork-match-warmup'
  | 'teamwork-tf-warmup'
  | 'teamwork-fill-blank'
  | 'teamwork-reflection-mission'
  | 'hygiene-warmup-quiz'
  | 'hygiene-detective-challenge'
  | 'hygiene-confidence-link'
  | 'hygiene-habit-match'
  | 'hygiene-checklist-challenge'
  | 'hygiene-tf-warmup'
  | 'hygiene-fill-blank'
  | 'hygiene-final-challenge'
  | 'wellness-warmup-quiz'
  | 'wellness-habit-match'
  | 'wellness-tf-warmup'
  | 'wellness-feelings-journal'
  | 'wellness-fill-blank'
  | 'nutrition-warmup-quiz'
  | 'nutrition-food-match'
  | 'nutrition-tf-warmup'
  | 'nutrition-fill-blank'
  | 'two-truths-and-a-twist'
  | 'strength-snapshot'
  | 'opinion-corners'
  | 'strength-map'
  | 'big-question'
  | 'voice-confidence-link'
  | 'risk-or-reward'
  | 'confidence-ladder'
  | 'growth-confidence-link'
  | 'trophy-confidence-link'
  | 'confidence-contract'
  | 'discussion-prompt-samples'
  | 'reflection-prompt-answers'
  | 'identity-snapshot-challenge'
  | 'pick-your-power'
  | 'temperament-quiz'
  | 'this-or-that-warmup'
  | 'choices-board'
  | 'choice-journal-challenge'
  | 'pass-the-dream-warmup'
  | 'plan-or-panic-warmup'
  | 'late-project-story'
  | 'story-talk'
  | 'time-reflection-worksheet'
  | 'plan-it-better-challenge'
  | 'plan-confidence-link'
  | 'plan-recap-reflection'
  | 'day-planner-grid'
  | 'video-reflect'
  | 'priority-planner-challenge'
  | 'pattern-spotter-challenge'
  | 'time-confidence-link'
  | 'goal-detective-warmup'
  | 'goal-video-reflect'
  | 'smart-goal-table'
  | 'stay-smart-challenge'
  | 'promise-confidence-link'
  | 'planning-relay-warmup'
  | 'personal-growth-map'
  | 'share-reflect-challenge'
  | 'reflection-confidence-link'
  | 'seven-day-planning-project'
  | 'share-your-plan-challenge';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  order: number;
  prompt: string;
  mediaUrl?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  options: ExerciseOption[];
  correctOptionId: string;
}

export interface ShareField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * A typed, self-expression activity (e.g. "Name & Shine") — there's no right
 * answer, so submitting it always counts as complete and awards a star.
 */
export interface SharePromptExercise extends BaseExercise {
  type: 'share-prompt';
  fields: ShareField[];
  submitLabel: string;
  groupLabel: string;
  howItWorks: string[];
  teacherFollowUp: string;
  /** When set, the student can preview their submitted fields on a decorative card and download it as an image. */
  offerCardDownload?: boolean;
  cardTitle?: string;
}

/**
 * A live "talk it out" moment (e.g. "Discussion Points") — questions meant to
 * be discussed out loud with a trainer, not typed. Just displayed with a
 * continue button; still awards a star for engagement.
 */
export interface ReflectionStep extends BaseExercise {
  type: 'reflection';
  heading: string;
  subheading?: string;
  questions: string[];
  trainerTip?: string;
  continueLabel: string;
}

/** One of the small cards inside a ChallengeStep, e.g. "Your name — Make it big and bright." */
export interface ChallengeItem {
  icon: string;
  title: string;
  description: string;
}

/**
 * An at-home/offline task description (e.g. "My Identity Poster"). Purely
 * informational for now — no in-app submission until photo upload exists.
 */
export interface ChallengeStep extends BaseExercise {
  type: 'challenge';
  eyebrow: string;
  title: string;
  description: string;
  items: ChallengeItem[];
  note?: string;
  tagline?: string;
  continueLabel: string;
}

/** The mini story/video moment — always shown, even before a real clip exists. */
export interface StoryStep extends BaseExercise {
  type: 'story';
  badge?: string;
  title?: string;
  year?: string;
  description?: string;
  discussionStarters?: string[];
  instruction?: string;
  videoUrl?: string;
  continueLabel: string;
}

/** One answerable question inside the "Discussion Starters" tab — graded, like a mini multiple-choice quiz. */
export interface DiscussionStarterQuestion {
  id: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
}

/**
 * One question inside the "Discussion Points" tab, shown one at a time.
 * Free-typed by default (`quote` + `placeholder`); set `options` to turn it
 * into a single-choice question instead — no right/wrong grading, it's still
 * a personal-reflection answer, just picked instead of typed.
 */
export interface ReflectionQuestion {
  id: string;
  quote: string;
  category: string;
  placeholder: string;
  options?: ExerciseOption[];
}

/**
 * The mini story/video moment, expanded into three tabs so the video,
 * the graded discussion-starter quiz, and the open reflection prompts don't
 * all have to live on one long scrolling page: Mini Video → Discussion
 * Starters → Discussion Points.
 */
/**
 * The third tab's "hands-on activity" mode — draw a picture and/or write a
 * caption — used instead of typed reflectionQuestions when a step's third
 * tab is a creative activity rather than open reflection prompts.
 */
/** One slip inside a StoryTabsActivity's `slots`, e.g. a single "Bravery Ticket". */
export interface StoryTabsActivitySlot {
  id: string;
  label: string;
  placeholder: string;
}

export interface StoryTabsActivity {
  heading: string;
  instruction: string;
  textLabel: string;
  textPlaceholder: string;
  submitLabel: string;
  /** When set, renders one short text field per slot (e.g. three "Bravery Tickets") instead of the single textLabel/textPlaceholder field. */
  slots?: StoryTabsActivitySlot[];
}

export interface StoryTabsStep extends BaseExercise {
  type: 'story-tabs';
  badge?: string;
  title?: string;
  /** Small credit line under the title, e.g. "by TED-Ed". */
  attribution?: string;
  year?: string;
  description?: string;
  /** Small italic credit line under the description, e.g. "Lesson by TED-Ed, animation by Kozmonot Animation Studio." */
  creditLine?: string;
  instruction?: string;
  videoUrl?: string;
  /** A YouTube watch/share/embed URL — when set, renders a click-to-play embed plus a "watch on YouTube" link, instead of the plain `videoUrl` player. */
  videoYoutubeUrl?: string;
  /** Shown next to a 🎥 icon under the video embed, e.g. "4-5 minutes". */
  videoDurationLabel?: string;
  discussionStarterQuestions: DiscussionStarterQuestion[];
  /** Third tab as typed reflection prompts — mutually exclusive with `activity`. */
  reflectionIntro?: string;
  reflectionImage?: string;
  reflectionQuestions?: ReflectionQuestion[];
  /** Third tab as a draw/write activity — mutually exclusive with the reflection fields. */
  activity?: StoryTabsActivity;
  trainerTipLabel: string;
  trainerTipQuote: string;
  trainerTipBody: string;
  continueLabel: string;
}

/** One run of text inside a ConfidenceLinkStep's `titleSegments`, e.g. the coral-accented words in "small, brave steps". */
export interface TitleSegment {
  text: string;
  accent?: boolean;
}

/**
 * The closing affirmation moment for a week — "Confidence Link". Five
 * render modes, picked by which fields are set: (1) the garden layout — a
 * plain-text eyebrow pill, a title built from `titleSegments` (so individual
 * words can be accent-colored), a single wide photo, and one CTA button —
 * when `titleSegments` is set; (2) the plain-text pill eyebrow + mascot image
 * + Confidence/Planning tip cards + closing banner layout, when
 * `confidenceQuote` is set instead — the standalone "Believe in
 * Yourself"-style closing screen; (3) the photo-hero + "say it out loud"
 * banner layout, when `heroImage` is set instead; (4) the photo + affirmation-
 * tags layout, when `photoImage` is set instead; (5) the default
 * trainer-quote/takeaway two-card layout otherwise.
 */
export interface ConfidenceLinkStep extends BaseExercise {
  type: 'confidence-link';
  badge?: string;
  /** Emoji shown before the badge label — defaults to ⭐ when unset. */
  badgeIcon?: string;
  /** Plain-text pill shown instead of the badge+icon pill, e.g. "For Growing Minds" — used by the garden and cards layouts. */
  eyebrow?: string;
  /** Single-line, unaccented heading — used by the cards layout instead of headingLine1/headingLine2. */
  title?: string;
  /** A title built from individually-colorable word runs — used by the garden layout instead of `title`. */
  titleSegments?: TitleSegment[];
  headingLine1?: string;
  headingLine2?: string;
  subtitle?: string;
  trainerQuote?: string;
  keyTakeawayLabel?: string;
  keyTakeawayQuote?: string;
  sayItOutLoudLabel?: string;
  footerTagline?: string;
  /** When set, renders the photo-hero layout (heading + photo + "say it out loud" banner) instead of the trainer/takeaway card layout. */
  heroImage?: string;
  heroImageAlt?: string;
  /** Centered mascot image for the cards layout, e.g. a lion character. */
  mascotImage?: string;
  mascotImageAlt?: string;
  /** When set (with `planningQuote`), renders the cards layout: a "Confidence" card and a "Planning" card, each with a quote and a small practice tip. */
  confidenceQuote?: string;
  confidenceTip?: string;
  planningQuote?: string;
  planningTip?: string;
  /** Closing gradient banner shown under the cards, e.g. "You are brave, kind, and capable!". */
  closingHeading?: string;
  closingText?: string;
  /** When set (with `titleLine1`/`titleLine2`), renders the photo + affirmation-tags layout: a rounded photo on the left, and a card on the right with a three-line title (middle line accented), a subtitle, and a row of small affirmation pills. */
  photoImage?: string;
  photoImageAlt?: string;
  titleLine1?: string;
  /** Middle title line, rendered in the accent color. */
  titleLine2?: string;
  titleLine3?: string;
  /** Small affirmation pills shown under the subtitle in the photo-tags layout, e.g. "⭐ I am ready". */
  tags?: { icon: string; label: string; variant: 'green' | 'purple' | 'peach' }[];
  /** When set (with `braveWords`), renders the plan-tabs layout: a hero quote with "See my day"/"My brave words" toggle buttons that swap in a day-plan checklist view or an affirmations view. */
  quoteLead?: string;
  /** Accent-colored middle part of the quote. */
  quoteAccent?: string;
  quoteTail?: string;
  seeMyDayLabel?: string;
  braveWordsLabel?: string;
  dayHeading?: string;
  daySteps?: ConfidenceDayStep[];
  braveWordsHeading?: string;
  braveWords?: string[];
  braveWordsFooter?: string;
  /** The week this closes out — used for "Complete Week N" / "Proceed to Week N+1" copy. */
  week: number;
  completeLabel: string;
}

/** One numbered card inside a ConfidenceLinkStep's plan-tabs "see my day" view. */
export interface ConfidenceDayStep {
  number: number;
  tagLabel: string;
  tagVariant: 'yellow' | 'green' | 'coral' | 'blue';
  title: string;
  description: string;
}

/** One picture-to-name pair inside a MatchingGameStep. */
export interface MatchingPair {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
}

/**
 * A Kahoot-style matching mini-game — tap a picture, then tap the name it
 * belongs to. Self-contained: scores itself and offers "play again" without
 * needing a right/wrong grading pass from ProgressService.
 */
export interface MatchingGameStep extends BaseExercise {
  type: 'matching-game';
  title: string;
  instruction: string;
  pairs: MatchingPair[];
  playAgainLabel: string;
  continueLabel: string;
}

/** One face-to-feeling-word pair inside a FeelingsMatchStep. */
export interface FeelingsMatchPair {
  id: string;
  faceEmoji: string;
  label: string;
}

/**
 * A drag-and-drop warm-up game — drag each feeling word onto the face it
 * matches (a tap-to-select-then-tap-to-place fallback is offered alongside
 * for touch devices). Self-contained and un-graded by ProgressService; the
 * "Continue" button only appears once every face has been matched
 * correctly, so a student can't skip past the game unfinished.
 */
export interface FeelingsMatchStep extends BaseExercise {
  type: 'feelings-match';
  badge: string;
  title: string;
  instruction: string;
  progressLabel: string;
  pairs: FeelingsMatchPair[];
  wordBankLabel: string;
  feedbackText: string;
  /** Shown near the word bank, e.g. reminding a parent/caregiver to help. */
  parentNote: string;
  startOverLabel: string;
  continueLabel: string;
}

/** One lettered option inside a PictureFeelingsQuizQuestion. */
export interface PictureFeelingsQuizOption {
  id: string;
  text: string;
}

/** One picture-prompted question inside a PictureFeelingsQuizStep. */
export interface PictureFeelingsQuizQuestion {
  id: string;
  prompt: string;
  image: string;
  imageAlt: string;
  options: PictureFeelingsQuizOption[];
  correctOptionId: string;
  /** When set, any of these option ids also counts as correct, alongside `correctOptionId`. */
  acceptableOptionIds?: string[];
  feedbackText: string;
}

/**
 * A picture-prompted warm-up quiz — one question at a time, each showing an
 * illustration and lettered (A/B/C…) options. Picking wrong shows feedback
 * and lets the student try again instead of advancing, so a question only
 * counts once answered correctly — the same "must get every answer right to
 * proceed" rule as DiscussionQuizStep, just with its own picture-card look.
 */
export interface PictureFeelingsQuizStep extends BaseExercise {
  type: 'picture-feelings-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: PictureFeelingsQuizQuestion[];
  /** Shown near the bottom of each question card, e.g. reminding a parent/caregiver to help. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered option inside a WarmupQuizQuestion. */
export interface WarmupQuizOption {
  id: string;
  text: string;
}

/** One question inside a WarmupQuizStep. */
export interface WarmupQuizQuestion {
  id: string;
  prompt: string;
  options: WarmupQuizOption[];
  correctOptionId: string;
  feedbackText: string;
}

/**
 * A text-only warm-up quiz with a single hero image in its header (unlike
 * PictureFeelingsQuizStep, which shows a new picture per question) — one
 * question at a time with lettered (A/B/C/D) options in a grid. Picking
 * wrong shows feedback and lets the student try again instead of advancing,
 * so a question only counts once answered correctly.
 */
/** One tappable-info card inside a MissionBriefingStep. */
export interface MissionBriefingCard {
  icon: string;
  /** Background color for the icon square, e.g. "#6bcb77". */
  iconBg: string;
  title: string;
  description: string;
}

/**
 * A pre-warm-up "mission briefing" splash — a centered heading, a row of
 * mission cards previewing what the student is about to practice, an
 * outlined "Ready to Start" button, and a short time estimate underneath.
 */
export interface MissionBriefingStep extends BaseExercise {
  type: 'mission-briefing';
  heading: string;
  cards: MissionBriefingCard[];
  startLabel: string;
  durationLabel: string;
}

/** One statement inside a YesNoChecklistStep, e.g. "Looking at the speaker". */
export interface YesNoChecklistQuestion {
  id: string;
  icon: string;
  prompt: string;
  correctAnswer: 'yes' | 'no';
}

/**
 * A "Show or Not Show?" warm-up — a single hero image, then every statement
 * shown at once as its own card with independent Yes/No buttons (unlike
 * YesNoQuizStep, which steps through one statement at a time). Picking wrong
 * on a card resets it after a beat so the student can try again; once every
 * card is answered correctly, a shared feedback line and Continue button
 * appear.
 */
export interface YesNoChecklistStep extends BaseExercise {
  type: 'yes-no-checklist';
  badge: string;
  heading: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  questions: YesNoChecklistQuestion[];
  yesLabel: string;
  noLabel: string;
  feedbackText: string;
  parentNote: string;
  continueLabel: string;
}

/** One repeatable checklist row inside a ListeningBodyTrackerStep, e.g. "I looked at the speaker". */
export interface ListeningBodyChecklistItem {
  id: string;
  label: string;
}

/**
 * A "Challenge of the Week" self-tracker — a mascot-narrated hero, two
 * identical "Conversation N" cards each with a Yes!/Not yet checklist plus
 * free-text easiest/hardest/why reflection fields, and a closing Confidence
 * Link card whose Continue button stays disabled until every checklist item
 * across both conversations has been answered.
 */
export interface ListeningBodyTrackerStep extends BaseExercise {
  type: 'listening-body-tracker';
  badge: string;
  heading: string;
  instructions: string;
  mascotIcon: string;
  mascotName: string;
  mascotMessage: string;
  yesLabel: string;
  notYetLabel: string;
  conversationTitlePrefix: string;
  conversationInstruction: string;
  checklistItems: ListeningBodyChecklistItem[];
  easiestLabel: string;
  hardestLabel: string;
  whyLabel: string;
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceDescription: string;
  lockedContinueLabel: string;
  continueLabel: string;
  footerText: string;
  footerMascotMessage: string;
  parentNote: string;
}

/** One of the six emotion choices offered for every question in a FeelingsPictureChoiceStep, e.g. "Happy". */
export interface FeelingsPictureChoiceOption {
  id: string;
  emoji: string;
  label: string;
  /** Border/fill color for this option's card, e.g. "#4d8bf5" for Happy. */
  color: string;
}

/** One picture prompt inside a FeelingsPictureChoiceStep. */
export interface FeelingsPictureChoiceQuestion {
  id: string;
  image: string;
  imageAlt: string;
  /** Id from the step's shared `options` list. */
  correctOptionId: string;
  /** Shown once the correct option is picked, e.g. "Yes! This child looks happy." */
  feedbackText: string;
}

/**
 * A "How Do They Feel?" picture-choice warm-up — one picture at a time, the
 * same six emotion cards shown every round. Picking wrong shakes the card and
 * resets so the student must try again; picking right reveals a feedback
 * line and a Next/Finish button, so a question only advances once answered
 * correctly. Finishing every question shows a small celebration screen with
 * a Play Again option alongside the real Continue button.
 */
export interface FeelingsPictureChoiceStep extends BaseExercise {
  type: 'feelings-picture-choice';
  badge: string;
  heading: string;
  subtitle: string;
  instructionLabel: string;
  instructionText: string;
  /** The same six emotion cards shown for every question. */
  options: FeelingsPictureChoiceOption[];
  questions: FeelingsPictureChoiceQuestion[];
  /** Generic tip shown (with `feedbackBannerLabel`) while a question is unanswered, e.g. "Listening helps us notice feelings." */
  feedbackBannerLabel: string;
  feedbackBannerText: string;
  /** Small hint shown under the feedback banner while a question is unanswered. */
  idleHintText: string;
  nextLabel: string;
  finishLabel: string;
  completionHeading: string;
  completionText: string;
  playAgainLabel: string;
  continueLabel: string;
  /** Callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/**
 * A "Challenge of the Week" that combines an at-home mission, a few sample
 * sentences the student can say, a short typed "Feeling Report" (what feeling
 * they noticed, what they said, how the person responded), and a closing
 * Confidence Link quote — all on one screen. Completing the challenge is
 * gated on every report field being filled in, matching IdentityPlannerStep's
 * "can't proceed until typed" pattern.
 */
export interface ChallengeFeelingReportStep extends BaseExercise {
  type: 'challenge-feeling-report';
  badge: string;
  title: string;
  /** Decorative emoji shown after the title, e.g. "😎". */
  titleEmoji?: string;
  subtitleBefore: string;
  subtitleHighlight: string;
  subtitleAfter: string;
  /** Decorative emoji/icon shown next to the mission heading, e.g. "🎧". */
  missionIcon: string;
  missionHeading: string;
  /** Mission description as text runs so individual words (e.g. "ears", "eyes", "heart") can be bolded. */
  missionText: TextRun[];
  sampleHeading: string;
  sampleSentences: string[];
  reportIcon: string;
  reportHeading: string;
  fields: ShareField[];
  confidenceLabel: string;
  confidenceQuote: string;
  completeLabel: string;
  footerText: string;
  /** Callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

export interface WarmupQuizStep extends BaseExercise {
  type: 'warmup-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  questions: WarmupQuizQuestion[];
  /** Encouraging tip shown under the question card, e.g. "Keep practicing your listening ears! 👂✨". */
  footerNote: string;
  /** Callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered option inside a HygieneWarmupQuizQuestion. */
export interface HygieneWarmupQuizOption {
  id: string;
  text: string;
}

/** One question inside a HygieneWarmupQuizStep. */
export interface HygieneWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: HygieneWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * "Hygiene Warm-Up" multiple-choice game (Hygiene Module, Week 1). Its own
 * look, distinct from the other modules' warm-up quizzes: a row of soap
 * bubbles across the top that shimmer full one at a time as questions are
 * answered, lettered options shaped like bars of soap, a wrong pick that
 * wobbles and stays put, and a "squeaky clean" panel once every question is
 * right. The Continue button is withheld until the bubble row is full, so the
 * learner must answer every question correctly.
 */
export interface HygieneWarmupQuizStep extends BaseExercise {
  type: 'hygiene-warmup-quiz';
  heading: string;
  subtitle: string;
  questions: HygieneWarmupQuizQuestion[];
  /** Title of the panel shown after every question is answered correctly. */
  allDoneTitle: string;
  /** Body line of that panel. */
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
}

/** One lettered option inside a WellnessWarmupQuizQuestion. */
export interface WellnessWarmupQuizOption {
  id: string;
  text: string;
}

/** One question inside a WellnessWarmupQuizStep. */
export interface WellnessWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: WellnessWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * "Wellness Warm-Up" multiple-choice game (Wellness Module, Week 1). Its own
 * look, distinct from the other modules' warm-up quizzes: a friendly sun in the
 * centre that gains one golden ray for every question answered correctly, on a
 * sky-blue page, with lettered options shaped like smooth river pebbles. A
 * wrong pick shivers and stays put; once the sun has all its rays a "bright and
 * strong" panel appears. The Continue button is withheld until every question
 * is right.
 */
export interface WellnessWarmupQuizStep extends BaseExercise {
  type: 'wellness-warmup-quiz';
  heading: string;
  subtitle: string;
  questions: WellnessWarmupQuizQuestion[];
  /** Title of the panel shown after every question is answered correctly. */
  allDoneTitle: string;
  /** Body line of that panel. */
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
}

/** One lettered option inside a NutritionWarmupQuizQuestion. */
export interface NutritionWarmupQuizOption {
  id: string;
  text: string;
}

/** One question inside a NutritionWarmupQuizStep. */
export interface NutritionWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: NutritionWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * "Nutrition Warm-Up" multiple-choice game (Nutrition Module, Week 1). Its own
 * look, distinct from the other modules' warm-up quizzes: an open lunchbox on a
 * warm tomato-and-cream page that gains one packed food item for every question
 * answered correctly, with lettered options shaped like rounded food-label
 * cards. A wrong pick wobbles and stays put; once the lunchbox is full a
 * "packed and ready" panel appears. The Continue button is withheld until every
 * question is right.
 */
export interface NutritionWarmupQuizStep extends BaseExercise {
  type: 'nutrition-warmup-quiz';
  heading: string;
  subtitle: string;
  questions: NutritionWarmupQuizQuestion[];
  /** Title of the panel shown after every question is answered correctly. */
  allDoneTitle: string;
  /** Body line of that panel. */
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
}

/** One food/benefit pair inside a NutritionFoodMatchStep. */
export interface NutritionFoodMatchPair {
  id: string;
  food: string;
  /** Optional emoji shown on the food card. */
  icon?: string;
  benefit: string;
}

/**
 * "Nutrition Warm-Up" matching game (Nutrition Module, Week 2). Its own look,
 * distinct from Week 1's lunchbox quiz: a warm two-column food tray where fixed
 * food cards on the left are the targets and shuffled benefit tags sit in a
 * bank below — tap a benefit tag, then tap the food it belongs to. A wrong pick
 * wobbles and clears; a correct pick snaps the tag onto the food card with a
 * tick. The Continue button is withheld until every food is matched.
 */
export interface NutritionFoodMatchStep extends BaseExercise {
  type: 'nutrition-food-match';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · Matching". */
  kicker: string;
  heading: string;
  subtitle: string;
  foodColumnLabel: string;
  benefitColumnLabel: string;
  pairs: NutritionFoodMatchPair[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
}

/** One statement inside a NutritionTfWarmupStep. */
export interface NutritionTfStatement {
  id: string;
  text: string;
  /** The correct verdict — true for "True", false for "False". */
  answer: boolean;
  /** Short line shown once the learner sorts this statement correctly. */
  praise: string;
}

/**
 * "Warm-Up – True or False" game (Nutrition Module, Week 3). Its own look,
 * distinct from Weeks 1–2: a warm card sits between a green "True" lane and a
 * coral "False" lane, with a row of dots tracking progress. A correct verdict
 * slides the card off toward that lane and brings up the next one; a wrong
 * verdict wobbles and stays put. The Continue button is withheld until every
 * statement is sorted.
 */
export interface NutritionTfWarmupStep extends BaseExercise {
  type: 'nutrition-tf-warmup';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · True or False". */
  kicker: string;
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: NutritionTfStatement[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the celebration panel — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One scenario inside a PlanOrPanicWarmupStep. */
export interface PlanOrPanicScenario {
  id: string;
  text: string;
  /** true when the scenario shows good planning ("Planned"); false when it shows poor planning ("Panic"). */
  planned: boolean;
  /** Short line shown once the learner sorts this scenario correctly. */
  praise: string;
}

/**
 * "Warm-Up – Plan or Panic?" game (Planning Module — Advanced, Week 1). Its
 * own look: one scenario card at a time between a calm "Planned" bin and a
 * frazzled "Panic" bin, each bin filling with a little stack as cards land in
 * it. A correct choice drops the card into that bin and brings up the next; a
 * wrong choice shakes the card and leaves it in play. Continue unlocks once
 * every scenario is sorted.
 */
export interface PlanOrPanicWarmupStep extends BaseExercise {
  type: 'plan-or-panic-warmup';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · Plan or Panic?". */
  kicker: string;
  heading: string;
  subtitle: string;
  plannedLabel: string;
  panicLabel: string;
  scenarios: PlanOrPanicScenario[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the celebration panel — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One sentence with a missing word inside a NutritionFillBlankStep. */
export interface NutritionFillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * "Fill in the Blank" game (Nutrition Module, Week 4). Its own look, distinct
 * from Weeks 1–3: warm sentence strips each with an empty slot, and a word bank
 * of rounded food-label tokens below. The learner taps a word then the blank it
 * belongs in; the right word snaps in and its token leaves the bank, a wrong
 * word shakes the strip and stays available. Continue unlocks once every blank
 * is filled.
 */
export interface NutritionFillBlankStep extends BaseExercise {
  type: 'nutrition-fill-blank';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · Fill in the Blank". */
  kicker: string;
  heading: string;
  subtitle: string;
  wordBankLabel: string;
  sentences: NutritionFillBlankSentence[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the all-filled screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One habit/benefit pair inside a WellnessHabitMatchStep. */
export interface WellnessHabitMatchPair {
  id: string;
  habit: string;
  benefit: string;
}

/**
 * "Wellness Warm-Up" matching game (Wellness Module, Week 2). Its own look: a
 * fresh green two-column board where fixed healthy-habit rows on the left are
 * the targets and shuffled benefit chips sit in a bank below — tap a benefit,
 * then tap the habit it belongs to. A wrong pick shivers and clears; a correct
 * pick locks the benefit into the row with a tick. The Continue button is
 * withheld until every habit is matched.
 */
export interface WellnessHabitMatchStep extends BaseExercise {
  type: 'wellness-habit-match';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · Matching" or "Let's Explore · Matching". */
  kicker: string;
  heading: string;
  subtitle: string;
  habitColumnLabel: string;
  benefitColumnLabel: string;
  pairs: WellnessHabitMatchPair[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the celebration panel — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One statement inside a WellnessTfWarmupStep. */
export interface WellnessTfStatement {
  id: string;
  text: string;
  /** The correct verdict — true for "True", false for "False". */
  answer: boolean;
  /** Short line shown once the learner sorts this statement correctly. */
  praise: string;
}

/**
 * "Warm-Up – True or False" game (Wellness Module, Week 3). Its own look: a
 * rosy page with a feelings-themed statement card between a thumbs-up "True"
 * side and a thumbs-down "False" side. A correct verdict floats the card onto
 * that side; a wrong verdict wobbles and stays put. The Continue button is
 * withheld until every statement is sorted.
 */
export interface WellnessTfWarmupStep extends BaseExercise {
  type: 'wellness-tf-warmup';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · True or False" or "Let's Explore · True or False". */
  kicker: string;
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: WellnessTfStatement[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the celebration panel — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One write-prompt line inside a WellnessFeelingsJournalStep day entry. */
export interface WellnessJournalField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * "Challenge of the Week" shaped as a five-day feelings journal (Wellness
 * Module, Week 3). Each day is an expanding card with a few short write
 * prompts — "Today I felt", "Why", "What helped me feel better" — and a Log Day
 * button; logged days bloom into a row of hearts. Self-reported, so continuing
 * is never blocked on how many days are logged. Its own look, distinct from the
 * checklist trackers used in Weeks 1–2.
 */
export interface WellnessFeelingsJournalStep extends BaseExercise {
  type: 'wellness-feelings-journal';
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  dayCount: number;
  fields: WellnessJournalField[];
  dayLoggedLabel: string;
  progressLabel: string;
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  continueLabel: string;
}

/** One sentence with a missing word inside a WellnessFillBlankStep. */
export interface WellnessFillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * "Fill in the Blank" game (Wellness Module, Week 4). Its own look: a warm
 * routine board of sentence strips each with a blank slot, and a word bank of
 * rounded tokens below. The learner taps a word then the blank it belongs in;
 * the right word snaps in and its token leaves the bank, a wrong word shakes
 * the strip and stays available. Continue unlocks once every blank is filled.
 * Used for both the Week 4 warm-up and the "Let's Explore" discussion.
 */
export interface WellnessFillBlankStep extends BaseExercise {
  type: 'wellness-fill-blank';
  /** Small eyebrow label above the heading, e.g. "Warm-Up · Fill in the Blank". */
  kicker: string;
  heading: string;
  subtitle: string;
  wordBankLabel: string;
  sentences: WellnessFillBlankSentence[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  /** Optional recap card shown on the all-filled screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One habit to spot inside a HygieneDetectiveChallengeStep. */
export interface HygieneDetectiveClue {
  id: string;
  label: string;
}

/**
 * "Hygiene Detective" challenge of the week (Hygiene Module, Week 1). Its own
 * look — a detective case file. The learner spends five days spotting hygiene
 * habits around them and ticks each clue off as they see it; a small day strip
 * marks the five-day run. The Continue button unlocks only once every clue has
 * been found ("case closed").
 */
export interface HygieneDetectiveChallengeStep extends BaseExercise {
  type: 'hygiene-detective-challenge';
  badge: string;
  title: string;
  missionText: string;
  /** Number of days the take-home challenge runs, e.g. 5 — rendered as a day strip. */
  dayCount: number;
  clues: HygieneDetectiveClue[];
  caseClosedTitle: string;
  caseClosedText: string;
  continueLabel: string;
}

/**
 * The "Confidence Link" closing page for Hygiene Module, Week 1. Its own look —
 * a shining bar-of-soap medal carrying the week's affirmation; the learner taps
 * "I said it out loud!" to light the medal, which unlocks the "Complete Week 1"
 * button.
 */
export interface HygieneConfidenceLinkStep extends BaseExercise {
  type: 'hygiene-confidence-link';
  badge: string;
  weekLabel: string;
  statement: string;
  sayItLabel: string;
  saidItLabel: string;
  reinforceLine: string;
  completeLabel: string;
}

/** One sentence with a missing word inside a HygieneFillBlankStep. */
export interface HygieneFillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * "Warm-Up – Fill in the Blank" game (Hygiene Module, Week 4). Its own look: a
 * word bank of leaf-tile words and a stack of sentences with a blank slot. The
 * learner taps a word then the blank it belongs in; the right word plants
 * itself and the tile leaves the bank, a wrong word shakes the sentence and
 * stays available. Continue unlocks once every blank is filled.
 */
export interface HygieneFillBlankStep extends BaseExercise {
  type: 'hygiene-fill-blank';
  heading: string;
  subtitle: string;
  wordBankLabel: string;
  sentences: HygieneFillBlankSentence[];
  allDoneTitle: string;
  allDoneText: string;
  /** Optional recap card shown on the all-filled screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
  continueLabel: string;
}

/** One statement inside a HygieneTfWarmupStep. */
export interface HygieneTfStatement {
  id: string;
  text: string;
  /** The correct verdict for this statement. */
  answer: boolean;
  /** Short affirmation shown once the learner answers it correctly. */
  praise: string;
}

/**
 * "Warm-Up – True or False" game (Hygiene Module, Week 3). Its own look: one
 * statement card at a time with big True / False buttons; a correct answer
 * drops the statement into a "True" or "False" tray and advances, a wrong
 * answer wobbles and stays put. Continue unlocks once every statement is
 * sorted.
 */
export interface HygieneTfWarmupStep extends BaseExercise {
  type: 'hygiene-tf-warmup';
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: HygieneTfStatement[];
  allDoneTitle: string;
  allDoneText: string;
  /** Optional recap card shown on the all-sorted screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
  continueLabel: string;
}

/** One daily task inside a HygieneChecklistChallengeStep. */
export interface HygieneChecklistTask {
  id: string;
  label: string;
}

/** One free-text reflection field inside a HygieneFinalChallengeStep. */
export interface HygieneFinalField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * "My Hygiene Habit Tracker" — the final challenge of the Hygiene Module
 * (Week 4). Its own look: the same five-day habit grid as
 * HygieneChecklistChallengeStep, followed by a few short "reflect on your
 * habits" text fields the trainer can read. The submit button unlocks once the
 * whole grid is filled and every field has an answer; submitting saves the
 * written answers.
 */
export interface HygieneFinalChallengeStep extends BaseExercise {
  type: 'hygiene-final-challenge';
  badge: string;
  title: string;
  missionText: string;
  /** Number of days the grid runs, e.g. 5. */
  dayCount: number;
  tasks: HygieneChecklistTask[];
  fieldsHeading: string;
  fields: HygieneFinalField[];
  allDoneTitle: string;
  allDoneText: string;
  submitLabel: string;
}

/**
 * "My Hygiene Checklist" challenge of the week (Hygiene Module, Week 2). Its own
 * look — a weekly habit grid: the learner's daily hygiene tasks down the side,
 * a column per day, and a tappable cell for each. A day earns a star once all
 * its tasks are ticked; the Continue button unlocks once the whole grid is
 * filled ("perfect week").
 */
export interface HygieneChecklistChallengeStep extends BaseExercise {
  type: 'hygiene-checklist-challenge';
  badge: string;
  title: string;
  missionText: string;
  /** Number of days the grid runs, e.g. 5. */
  dayCount: number;
  tasks: HygieneChecklistTask[];
  allDoneTitle: string;
  allDoneText: string;
  continueLabel: string;
}

/** One habit-to-purpose pair inside a HygieneHabitMatchStep. */
export interface HygieneHabitMatchPair {
  id: string;
  /** The hygiene habit, e.g. "Brushing teeth". */
  habit: string;
  /** The purpose it serves, e.g. "Healthy smile". */
  purpose: string;
  /** Emoji shown beside the habit, e.g. "🪥". */
  icon?: string;
}

/**
 * "Warm-Up – Matching" game (Hygiene Module, Week 2). Its own look: a habits
 * column and a shuffled purposes column. The learner taps a habit then the
 * purpose it serves; a correct pair links up in a colour and locks, a wrong
 * pair flashes and clears. The Continue button unlocks once every pair is
 * matched.
 */
export interface HygieneHabitMatchStep extends BaseExercise {
  type: 'hygiene-habit-match';
  heading: string;
  subtitle: string;
  habitHeading: string;
  purposeHeading: string;
  pairs: HygieneHabitMatchPair[];
  allDoneTitle: string;
  allDoneText: string;
  /** Optional recap card shown on the all-matched screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
  continueLabel: string;
}

/** One lettered option inside a TradeOffQuizQuestion. */
export interface TradeOffQuizOption {
  id: string;
  text: string;
}

/** One question in the "Trade-off Quiz Machine" warm-up. */
export interface TradeOffQuizQuestion {
  id: string;
  prompt: string;
  options: TradeOffQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * The "Trade-off Quiz Machine" warm-up (Choices Module, Week 1). A playful
 * arcade/vending-machine card: a row of coin slots at the top fills with gold
 * coins as each question is answered, and one lettered multiple-choice question
 * shows at a time. A wrong pick shakes and the question stays put; a right pick
 * drops a coin into the track and moves on. The "Continue" button only appears
 * once every coin is collected, so the learner must answer all questions
 * correctly before leaving the step. A parent-assist note sits below the card.
 */
export interface TradeOffQuizStep extends BaseExercise {
  type: 'trade-off-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: TradeOffQuizQuestion[];
  /** Title of the celebration panel shown after every question is answered. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered option inside a DisciplineWarmupQuizQuestion. */
export interface DisciplineWarmupQuizOption {
  id: string;
  text: string;
}

/** One question in the "Discipline Warm-Up" multiple-choice game. */
export interface DisciplineWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: DisciplineWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * The "Discipline Warm-Up" multiple-choice game (Discipline Module, Week 1 —
 * "Understanding Discipline"). A row of shields across the top lights up one at
 * a time as each question is answered, with a single lettered question showing
 * at a time. A wrong pick shakes and the question stays put; a right pick lights
 * the next shield and moves on. The "Continue" button appears only once every
 * shield is lit, so the learner must answer all questions correctly before
 * leaving the step. A parent-assist note sits below the card.
 */
export interface DisciplineWarmupQuizStep extends BaseExercise {
  type: 'discipline-warmup-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: DisciplineWarmupQuizQuestion[];
  /** Title of the celebration panel shown after every question is answered. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered option inside a ServiceWarmupQuizQuestion. */
export interface ServiceWarmupQuizOption {
  id: string;
  text: string;
}

/** One question in the "Service Warm-Up" multiple-choice game. */
export interface ServiceWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: ServiceWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * The "Service Warm-Up" multiple-choice game (Service Module, Week 1 — "What is
 * Service?"). A "good-deeds jar" fills with a heart token each time a question
 * is answered correctly, with a single lettered question showing at a time. A
 * wrong pick shakes and the question stays put; a right pick drops the next
 * heart into the jar and moves on. The "Continue" button appears only once the
 * jar is full, so the learner must answer every question correctly before
 * leaving the step. A parent-assist note sits below the card.
 */
export interface ServiceWarmupQuizStep extends BaseExercise {
  type: 'service-warmup-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: ServiceWarmupQuizQuestion[];
  /** Title of the celebration panel shown after every question is answered. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One open reflection line inside a TeamworkReflectionMissionStep. */
export interface TeamworkReflectionField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "Teamwork Reflection Mission" final challenge (Teamwork Module, Week 4 —
 * module finale). A multi-day self-observation grid: each day the learner ticks
 * the teamwork habits they kept in any group situation, then once every day is
 * logged completes a short structured reflection. Complete unlocks only when
 * every day is logged and every reflection line is filled; the reflection is
 * then submitted.
 */
export interface TeamworkReflectionMissionStep extends BaseExercise {
  type: 'teamwork-reflection-mission';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** The daily habit checkboxes — all must be ticked to log a day. */
  habitItems: string[];
  dayLoggedLabel: string;
  progressLabel: string;
  reflectionHeading: string;
  reflectionIntro: string;
  reflectionFields: TeamworkReflectionField[];
  /** Callout reminding a parent/guardian to help across the days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/** One sentence with a single blank inside a TeamworkFillBlankStep. */
export interface TeamworkFillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * The "Teamwork Warm-Up" fill-in-the-blank game (Teamwork Module, Week 4 —
 * "Respect and Cooperation"). One sentence shows at a time with a single blank;
 * all the answer words sit shuffled in a word bank below. Tapping the right
 * word snaps it into the blank and advances; a wrong word shakes the blank and
 * clears. A progress meter fills as each blank is completed. The "Continue"
 * button is withheld until every sentence is done, so the learner must fill all
 * the blanks. A parent-assist note sits below the card.
 */
export interface TeamworkFillBlankStep extends BaseExercise {
  type: 'teamwork-fill-blank';
  badge: string;
  heading: string;
  subtitle: string;
  wordBankLabel: string;
  sentences: TeamworkFillBlankSentence[];
  /** Title of the celebration panel shown once every blank is filled. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One statement inside a TeamworkTfWarmupStep. */
export interface TeamworkTfStatement {
  id: string;
  text: string;
  /** The correct verdict — true means the statement is true. */
  answer: boolean;
  /** Short line shown when the learner picks the right verdict. */
  feedbackText: string;
}

/**
 * The "Teamwork Warm-Up" true/false game (Teamwork Module, Week 3 —
 * "Communication in Teams"). A connected-dot conversation meter fills as each
 * statement is judged, one statement shows at a time with big 👍 True / 👎
 * False buttons, a wrong pick shakes and stays put, a right pick fills the next
 * dot and advances. The "Continue" button is withheld until the meter is full,
 * so the learner must judge every statement correctly. A parent-assist note
 * sits below the card.
 */
export interface TeamworkTfWarmupStep extends BaseExercise {
  type: 'teamwork-tf-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: TeamworkTfStatement[];
  /** Title of the celebration panel shown after every statement is judged. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One role/action pair inside a TeamworkMatchWarmupStep. */
export interface TeamworkMatchPair {
  id: string;
  role: string;
  action: string;
}

/**
 * The "Teamwork Warm-Up" matching game (Teamwork Module, Week 2 — "Roles in a
 * Team"). Fixed role rows on the left are drop targets; shuffled action cards
 * are dragged (or tap-selected then tap-placed) onto the role they belong to.
 * A wrong drop shakes and bounces back; a correct drop locks into the row. The
 * "Continue" button is withheld until every role is matched. A parent-assist
 * note sits below the card.
 */
export interface TeamworkMatchWarmupStep extends BaseExercise {
  type: 'teamwork-match-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  roleColumnLabel: string;
  actionColumnLabel: string;
  pairs: TeamworkMatchPair[];
  /** Title of the celebration panel shown once every row is matched. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered option inside a TeamworkWarmupQuizQuestion. */
export interface TeamworkWarmupQuizOption {
  id: string;
  text: string;
}

/** One question in the "Teamwork Warm-Up" multiple-choice game. */
export interface TeamworkWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: TeamworkWarmupQuizOption[];
  correctOptionId: string;
  /** Short line shown when the learner picks the right answer. */
  feedbackText: string;
}

/**
 * The "Teamwork Warm-Up" multiple-choice game (Teamwork Module, Week 1 — "What
 * is Teamwork?"). A "team stack" of five hands builds up from the bottom, one
 * hand added each time a question is answered correctly, with a single lettered
 * question showing at a time. A wrong pick shakes and the question stays put; a
 * right pick adds the next hand and moves on. The "Continue" button appears
 * only once the stack is complete, so the learner must answer every question
 * correctly before leaving the step. A parent-assist note sits below the card.
 */
export interface TeamworkWarmupQuizStep extends BaseExercise {
  type: 'teamwork-warmup-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: TeamworkWarmupQuizQuestion[];
  /** Title of the celebration panel shown after every question is answered. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/**
 * "One Act of Service" challenge of the week (Service Module, Week 1). A
 * five-day kindness log accordion: each day the learner writes what helpful
 * thing they did, who they helped, and how the person reacted, then locks the
 * day in. A row of hearts fills as days are logged; the "Complete Week 1"
 * button unlocks only once every day is recorded, and the entries are then
 * submitted so the trainer can read them.
 */
export interface ServiceActTrackerStep extends BaseExercise {
  type: 'service-act-tracker';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** Heading over the list of example acts of service. */
  examplesLabel: string;
  /** A few example acts, e.g. "Help at home". */
  examples: string[];
  didLabel: string;
  didPlaceholder: string;
  whoLabel: string;
  whoPlaceholder: string;
  reactionLabel: string;
  reactionPlaceholder: string;
  saveDayLabel: string;
  progressLabel: string;
  /** Callout reminding a parent/guardian to help across the five days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * The "Confidence Link" closing page for Service Module, Week 1 — also the
 * end of Week 1. A glowing helping-hand badge carries the week's affirmation;
 * the learner says it out loud and taps to light the badge, which unlocks the
 * "Complete Week 1" button.
 */
export interface ServiceConfidenceLinkStep extends BaseExercise {
  type: 'service-confidence-link';
  badge: string;
  weekLabel: string;
  /** Emoji shown in the centre of the glowing badge — defaults to 🤝 when unset. */
  markEmoji?: string;
  statement: string;
  sayItLabel: string;
  saidItLabel: string;
  reinforceLine: string;
  completeLabel: string;
}

/**
 * "Service Tracker – My Environment" challenge of the week (Service Module,
 * Week 2). A five-day log: each day the learner records at least two acts of
 * service — for each act, what they did, where (home or school), and the
 * result. A day locks in once it has the minimum number of complete acts. At
 * the end a summary panel shows the total act count and asks the learner to
 * name their most helpful action; the "Complete Week 2" button unlocks only
 * when every day is logged and the most-helpful field is filled, and the log
 * is submitted so the trainer can read it.
 */
export interface ServiceEnvironmentTrackerStep extends BaseExercise {
  type: 'service-environment-tracker';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** Minimum complete acts required to lock a day in, e.g. 2. */
  minActsPerDay: number;
  whatLabel: string;
  whatPlaceholder: string;
  whereLabel: string;
  homeLabel: string;
  schoolLabel: string;
  resultLabel: string;
  resultPlaceholder: string;
  addActLabel: string;
  saveDayLabel: string;
  progressLabel: string;
  summaryHeading: string;
  /** Line naming the total, with "{n}" replaced by the act count, e.g. "You completed {n} acts of service!". */
  countTemplate: string;
  mostHelpfulLabel: string;
  mostHelpfulPlaceholder: string;
  /** Callout reminding a parent/guardian to help across the five days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * "Kindness in Action Plan" challenge of the week (Service Module, Week 3).
 * The learner plans three specific acts of kindness for the week — for each,
 * what the act is, when they will do it, and who it will help — then, after
 * doing each one, ticks it complete and notes what changed. A card locks in
 * once all its fields are filled and it is ticked complete; the "Complete Week
 * 3" button unlocks only once all three acts are logged, and the plan is
 * submitted so the trainer can read it.
 */
export interface ServiceKindnessPlanStep extends BaseExercise {
  type: 'service-kindness-plan';
  badge: string;
  title: string;
  intro: string;
  actCount: number;
  actLabel: string;
  actPlaceholder: string;
  whenLabel: string;
  whenPlaceholder: string;
  whoLabel: string;
  whoPlaceholder: string;
  doneCheckLabel: string;
  changedLabel: string;
  changedPlaceholder: string;
  saveActLabel: string;
  progressLabel: string;
  /** Callout reminding a parent/guardian to help across the week. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * "My Service Project" final challenge (Service Module, Week 4 — module
 * finale). The learner picks one small project for the week, plans it (what /
 * when / who it helps), then after doing it confirms they finished and notes
 * what changed and who benefited. The "Complete the Module" button unlocks
 * only when every field is filled and the finished box is ticked; the project
 * write-up is submitted so the trainer can read it.
 */
export interface ServiceProjectFinalStep extends BaseExercise {
  type: 'service-project-final';
  badge: string;
  title: string;
  intro: string;
  examplesLabel: string;
  examples: string[];
  planHeading: string;
  whatLabel: string;
  whatPlaceholder: string;
  whenLabel: string;
  whenPlaceholder: string;
  whoLabel: string;
  whoPlaceholder: string;
  reflectHeading: string;
  finishedCheckLabel: string;
  changedLabel: string;
  changedPlaceholder: string;
  benefitedLabel: string;
  benefitedPlaceholder: string;
  /** Callout reminding a parent/guardian to help across the week. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/** One sentence with a single blank in a ServiceFillBlankStep. */
export interface ServiceFillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word (or short phrase) that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * The "Service Warm-Up" fill-in-the-blank game (Service Module, Week 4 —
 * "Making a Difference"), built as a sunny word-bank poster. All the answer
 * words sit shuffled in a word bank; each sentence below has one empty slot.
 * The learner taps a word, then taps a blank — a right word snaps in and the
 * slot turns green, a wrong word shakes the slot and clears the pick. Used
 * words leave the bank. The "Continue" button stays disabled until every blank
 * is filled, so nothing is skippable. A parent-assist note sits at the foot.
 */
export interface ServiceFillBlankStep extends BaseExercise {
  type: 'service-fill-blank';
  badge: string;
  title: string;
  intro: string;
  wordBankLabel: string;
  sentences: ServiceFillBlankSentence[];
  allDoneTitle: string;
  allDoneText: string;
  parentNote: string;
  continueLabel: string;
}

/** One statement in the "Service Warm-Up" true/false game. */
export interface ServiceTfStatement {
  id: string;
  text: string;
  /** The correct verdict — true means the statement is true. */
  answer: boolean;
  /** Short line shown when the learner picks the right verdict. */
  feedbackText: string;
}

/**
 * The "Service Warm-Up" true/false game (Service Module, Week 3 — "Kindness
 * and Responsibility"). A row of stars across the top lights one at a time as
 * each statement is judged, with a single statement showing at a time and two
 * big True / False buttons. A wrong pick shakes and the statement stays put; a
 * right pick lights the next star and moves on. The "Continue" button appears
 * only once every star is lit, so the learner must judge all statements
 * correctly before leaving the step. A parent-assist note sits below the card.
 */
export interface ServiceTfWarmupStep extends BaseExercise {
  type: 'service-tf-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: ServiceTfStatement[];
  /** Title of the celebration panel shown after every statement is judged. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One helpful-act card in the "Where Does It Belong?" sorting warm-up. */
export interface ServicePlaceMatchItem {
  id: string;
  text: string;
  /** The zone this card belongs in. */
  place: 'home' | 'school';
}

/**
 * The "Where Does It Belong?" sorting warm-up (Service Module, Week 2 —
 * "Serving at Home and School"). Helpful-act cards start shuffled in a bank;
 * the learner drags each one into the "At Home" or "At School" basket (a
 * tap-to-select then tap-a-basket fallback works too for touch). A wrong drop
 * shakes and bounces the card back to the bank; a correct drop drops it into
 * the basket. The "Continue" button appears only once every card is sorted
 * correctly. A parent-assist note sits below.
 */
export interface ServicePlaceMatchStep extends BaseExercise {
  type: 'service-place-match';
  badge: string;
  heading: string;
  subtitle: string;
  bankLabel: string;
  homeLabel: string;
  homeIcon: string;
  schoolLabel: string;
  schoolIcon: string;
  items: ServicePlaceMatchItem[];
  startOverLabel: string;
  /** Title of the celebration panel shown once every card is sorted. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One "put the steps in order" question in the "Discipline Warm-Up" sequencing game. */
export interface DisciplineSequenceQuestion {
  id: string;
  prompt: string;
  /** The steps listed in the ONE correct order — the view shuffles them into the tray. */
  steps: string[];
  /** Short line shown once the learner orders the steps correctly. */
  feedbackText: string;
}

/**
 * The "Discipline Warm-Up" sequencing game (Discipline Module, Week 4 —
 * "Consistency & Responsibility"). One question at a time: a short scenario and
 * a row of numbered slots, with the steps shuffled into a tray below. The
 * learner taps steps into the slots (tap a filled slot to send it back); once
 * every slot is filled the order is checked. A correct order locks green and
 * advances; a wrong order shakes and clears so they can try again. Every
 * question must be ordered correctly before the Continue button appears. A
 * parent-assist note sits below.
 */
export interface DisciplineSequenceWarmupStep extends BaseExercise {
  type: 'discipline-sequence-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  questions: DisciplineSequenceQuestion[];
  /** Title of the celebration panel shown once every question is ordered correctly. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One action-to-result pair in the "Discipline Warm-Up" matching game. */
export interface DisciplineMatchPair {
  id: string;
  action: string;
  result: string;
}

/**
 * The "Discipline Warm-Up" matching game (Discipline Module, Week 3 —
 * "Following Routines"). The fixed "Action" rows sit on the left as drop
 * targets; the "Result" cards start shuffled in a bank on the right and the
 * learner drags each one onto the routine it produces (a tap-to-select then
 * tap-a-row fallback works too for touch). A wrong drop bounces back with a
 * shake; a correct drop locks into the row. The "Continue" button appears only
 * once every row is matched. A parent-assist note sits below.
 */
export interface DisciplineMatchWarmupStep extends BaseExercise {
  type: 'discipline-match-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  actionColumnLabel: string;
  resultColumnLabel: string;
  pairs: DisciplineMatchPair[];
  /** Title of the celebration panel shown once every row is matched. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One statement in the "Discipline Warm-Up" true/false game. */
export interface DisciplineTfStatement {
  id: string;
  text: string;
  /** The correct verdict — true means the statement is true. */
  answer: boolean;
  /** Short line shown when the learner picks the right verdict. */
  feedbackText: string;
}

/**
 * The "Discipline Warm-Up" true/false game (Discipline Module, Week 2 —
 * "Self-Control"). A row of calm "breath" dots across the top fills one at a
 * time as each statement is judged, with a single statement showing at a time
 * and two big True / False buttons. A wrong pick shakes and the statement stays
 * put; a right pick fills the next dot and moves on. The "Continue" button
 * appears only once every dot is filled, so the learner must judge all
 * statements correctly before leaving the step. A parent-assist note sits below.
 */
export interface DisciplineTfWarmupStep extends BaseExercise {
  type: 'discipline-tf-warmup';
  badge: string;
  heading: string;
  subtitle: string;
  trueLabel: string;
  falseLabel: string;
  statements: DisciplineTfStatement[];
  /** Title of the celebration panel shown after every statement is judged. */
  allDoneTitle: string;
  /** Body line of that celebration panel. */
  allDoneText: string;
  /** Callout reminding a parent/guardian to help the learner with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/**
 * "My Trade-Off Tracker" challenge of the week (Choices Module, Week 1). A
 * five-day journal: each day the learner ticks that they spotted a choice they
 * made, then writes what they chose and what they gave up. A day locks in once
 * both lines are filled; the "Complete" button unlocks only after all five days
 * are logged, and the entries are submitted so the trainer can read them.
 */
export interface TradeOffTrackerChallengeStep extends BaseExercise {
  type: 'trade-off-tracker-challenge';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** Checkbox label confirming the learner noticed a choice that day. */
  spotLabel: string;
  chooseLabel: string;
  choosePlaceholder: string;
  giveLabel: string;
  givePlaceholder: string;
  saveDayLabel: string;
  progressLabel: string;
  /** Callout reminding a parent/guardian to help across the five days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * "My Simple Budget" challenge of the week (Choices Module, Week 2). The learner
 * fills a three-part money plan — how much to spend, save, and use later — then
 * marks whether they followed it (YES / NO). The "Complete" button unlocks only
 * once all three plan lines are filled and the follow-up is answered; the plan
 * is submitted so the trainer can read it.
 */
export interface SimpleBudgetChallengeStep extends BaseExercise {
  type: 'simple-budget-challenge';
  badge: string;
  title: string;
  intro: string;
  planHeading: string;
  spendLabel: string;
  spendPlaceholder: string;
  saveLabel: string;
  savePlaceholder: string;
  useLaterLabel: string;
  useLaterPlaceholder: string;
  trackHeading: string;
  trackQuestion: string;
  yesLabel: string;
  noLabel: string;
  /** Callout reminding a parent/guardian to help across the week. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * The "Confidence Link" closing page for Choices Module, Week 2. The affirmation
 * is printed on a bank-card-style pledge card; the learner says it out loud and
 * taps to thump an "APPROVED" stamp onto the card, which unlocks the "Complete
 * Week 2" button.
 */
export interface BudgetConfidenceLinkStep extends BaseExercise {
  type: 'budget-confidence-link';
  badge: string;
  weekLabel: string;
  statement: string;
  sayItLabel: string;
  stampLabel: string;
  stampedLabel: string;
  reinforceLine: string;
  completeLabel: string;
}

/** One fill-in line in the "My Financial Decision Audit" structured reflection. */
export interface FinancialAuditReflectionField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * "My Financial Decision Audit" final challenge (Choices Module, Week 4). A
 * five-day grid: each day the learner ticks the money habits they kept
 * (thoughtful choices, trade-offs, followed the plan, avoided waste); a day
 * counts once all four are ticked. Below the grid is a one-time structured
 * reflection with three fill-in lines. The "Complete the Module" button unlocks
 * only when all five days are logged and every reflection line is filled; the
 * reflection is submitted so the trainer can read it.
 */
export interface FinancialAuditChallengeStep extends BaseExercise {
  type: 'financial-audit-challenge';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** The daily habit checkboxes — all must be ticked to log a day. */
  auditItems: string[];
  dayLoggedLabel: string;
  progressLabel: string;
  reflectionHeading: string;
  reflectionIntro: string;
  reflectionFields: FinancialAuditReflectionField[];
  /** Callout reminding a parent/guardian to help across the five days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * The "Confidence Link" closing page for Choices Module, Week 4 — also the
 * module finale. The affirmation sits on a certificate-style card above a
 * checklist of the skills the learner built across the whole module; they say
 * the affirmation out loud and tap to seal the certificate, unlocking the
 * "Complete the Module" button.
 */
export interface ModuleOutcomeConfidenceLinkStep extends BaseExercise {
  type: 'module-outcome-confidence-link';
  badge: string;
  weekLabel: string;
  statement: string;
  sayItLabel: string;
  saidItLabel: string;
  outcomeHeading: string;
  outcomes: string[];
  reinforceLine: string;
  completeLabel: string;
}

/** One "put the steps in order" question in the "Step Sorter" warm-up. `steps` is given in the correct order. */
export interface StepSequenceQuestion {
  id: string;
  title: string;
  steps: string[];
}

/**
 * The "Step Sorter" warm-up (Choices Module, Week 4). A conveyor-belt sequencing
 * game: for each question three step chips start shuffled in a tray and the
 * learner taps them into numbered slots 1-2-3. Tapping a filled slot returns its
 * chip. When all three slots are filled they press "Check the order"; a wrong
 * order shakes and stays put for another try, a correct order locks green and
 * the next question loads. The "Continue" button only appears once every
 * question is ordered correctly. A parent-assist note sits below.
 */
export interface StepSequenceStep extends BaseExercise {
  type: 'step-sequence';
  badge: string;
  heading: string;
  subtitle: string;
  checkLabel: string;
  questions: StepSequenceQuestion[];
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  continueLabel: string;
}

/**
 * "Think Ahead Challenge" challenge of the week (Choices Module, Week 3). A
 * five-day path: each day the learner confirms they paused before spending to
 * ask "what will happen after this?", then records one decision they made and
 * how it turned out. A day locks in once both lines are filled; the "Complete"
 * button unlocks only after all five days are recorded, and the entries are
 * submitted so the trainer can read them.
 */
export interface ThinkAheadChallengeStep extends BaseExercise {
  type: 'think-ahead-challenge';
  badge: string;
  title: string;
  intro: string;
  dayCount: number;
  /** Checkbox label confirming the learner asked the think-ahead question that day. */
  askLabel: string;
  decisionLabel: string;
  decisionPlaceholder: string;
  resultLabel: string;
  resultPlaceholder: string;
  saveDayLabel: string;
  progressLabel: string;
  /** Callout reminding a parent/guardian to help across the five days. */
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  completeLabel: string;
}

/**
 * The "Confidence Link" closing page for Choices Module, Week 3. The affirmation
 * sits under a glowing crystal ball; the learner says it out loud and taps to
 * light the ball, which unlocks the "Complete Week 3" button.
 */
export interface ConsequenceConfidenceLinkStep extends BaseExercise {
  type: 'consequence-confidence-link';
  badge: string;
  weekLabel: string;
  statement: string;
  sayItLabel: string;
  saidItLabel: string;
  reinforceLine: string;
  completeLabel: string;
}

/** One claim the learner stamps FACT or MYTH in the "Money Myth Buster" warm-up. */
export interface MoneyMythStatement {
  id: string;
  text: string;
  /** true when the claim is true (FACT); false when it is a MYTH. */
  isFact: boolean;
  /** Short line shown when the learner stamps it correctly. */
  feedbackText: string;
}

/**
 * The "Money Myth Buster" warm-up (Choices Module, Week 3). An investigation
 * sheet: one claim about money choices shows at a time and the learner slams
 * down a FACT or MYTH stamp. A correct stamp thumps on and the case advances; a
 * wrong stamp shakes and the claim stays open. The "Continue" button only
 * appears once every claim is settled, so the learner must finish all of them
 * before moving on. A parent-assist note sits below the sheet.
 */
export interface MoneyMythBusterStep extends BaseExercise {
  type: 'money-myth-buster';
  badge: string;
  heading: string;
  subtitle: string;
  factLabel: string;
  mythLabel: string;
  statements: MoneyMythStatement[];
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  continueLabel: string;
}

/** One term/meaning pair in the "Money Match" warm-up. */
export interface MoneyMatchPair {
  id: string;
  term: string;
  meaning: string;
}

/**
 * The "Money Match" warm-up (Choices Module, Week 2). A budget-board game: money
 * terms sit as coin cards on the left, their meanings are shuffled into wallet
 * slots on the right. The learner taps a term then a meaning; a correct pair
 * locks together with a shared colour, a wrong pair shakes and clears. The
 * "Continue" button only appears once every pair is matched, so the learner must
 * finish the whole board before moving on. A parent-assist note sits below.
 */
export interface MoneyMatchStep extends BaseExercise {
  type: 'money-match';
  badge: string;
  heading: string;
  subtitle: string;
  termHeading: string;
  meaningHeading: string;
  pairs: MoneyMatchPair[];
  parentNote: string;
  allDoneTitle: string;
  allDoneText: string;
  continueLabel: string;
}

/**
 * The "Confidence Link" closing page for Choices Module, Week 1. A single
 * affirmation on a glowing medal, a "say it out loud" prompt the learner taps
 * once they have said it, a reinforcing line, and a "Complete Week 1" button
 * that only enables after the affirmation has been said.
 */
export interface TradeOffConfidenceLinkStep extends BaseExercise {
  type: 'trade-off-confidence-link';
  badge: string;
  weekLabel: string;
  statement: string;
  sayItLabel: string;
  saidItLabel: string;
  reinforceLine: string;
  completeLabel: string;
}

/** One numbered mission pill in the Final Challenge card. */
export interface FinalChallengeMissionStep {
  label: string;
  tone: 'blue' | 'red' | 'green';
}

/**
 * The end-of-module "Final Challenge" card — a "Level Complete!" pill, a red
 * banner title, two child illustrations, a "Your Mission" card with three
 * numbered step pills, a confidence-link card with a "Try another" button
 * that cycles the quotes, and an "I Shared My Idea!" finish button.
 */
export interface FinalChallengeStep extends BaseExercise {
  type: 'final-challenge';
  levelCompleteLabel: string;
  bannerTitle: string;
  scriptSubtitle: string;
  image: string;
  imageAlt: string;
  missionHeading: string;
  missionText: string;
  missionSteps: FinalChallengeMissionStep[];
  confidenceLabel: string;
  confidenceQuotes: string[];
  tryAnotherLabel: string;
  completeLabel: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
}

/** One idea a child can pick to talk about in the "What Can I Share?" warm-up. */
export interface ShareIdeaOption {
  id: string;
  /** Big emoji shown on the card, e.g. "🍔". */
  emoji: string;
  /** Small emoji beside the title, e.g. "🍴". */
  icon: string;
  title: string;
  description: string;
  tone: 'yellow' | 'blue' | 'green';
  /** Label above the reflection box once this idea is chosen, e.g. "Tell us about your food!". */
  fieldLabel: string;
  fieldPlaceholder: string;
}

/**
 * The "What Can I Share?" warm-up — a colourful sky-and-grass scene, three
 * idea cards to choose from, a nickname field and a reflection box, a
 * "Share with friends!" button, and a "What our friends shared" feed that
 * fills in with the child's own share. An idea, a name and a reflection are
 * all required before the lesson can be finished.
 */
export interface WhatCanIShareStep extends BaseExercise {
  type: 'what-can-i-share';
  pillLabel: string;
  title: string;
  subtitle: string;
  chooseHeading: string;
  nameLabel: string;
  namePlaceholder: string;
  shareLabel: string;
  maxChars: number;
  feedbackText: string;
  friendsHeading: string;
  emptyText: string;
  footerText: string;
  ideas: ShareIdeaOption[];
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One tip card at the bottom of the Slow Talk challenge. */
export interface SlowTalkTip {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "Slow Talk Challenge" weekly tracker — a toad mascot, a "Challenge of
 * the Week" pill, a yellow confidence-link card, a tappable Mon–Sun week
 * strip with a progress bar and a "Start over" reset, and three tip cards.
 * At least one day must be marked before the lesson can be finished.
 */
export interface SlowTalkChallengeStep extends BaseExercise {
  type: 'slow-talk-challenge';
  pillLabel: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  confidenceLabel: string;
  confidenceQuote: string;
  weekHeading: string;
  startOverLabel: string;
  tips: SlowTalkTip[];
  footerText: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered answer in the Fast or Clear? warm-up. */
export interface FastOrClearOption {
  id: string;
  text: string;
}

/**
 * The "Fast or Clear?" warm-up game — a colourful sky-and-hill scene with
 * animal friends along the bottom, an owl-narrated intro card, a single
 * "listen and choose" question that must be answered correctly to pass, and
 * a 3-star "You did it!" completion card.
 */
export interface FastOrClearWarmupStep extends BaseExercise {
  type: 'fast-or-clear-warmup';
  pillLabel: string;
  title: string;
  introImage: string;
  introImageAlt: string;
  introHeading: string;
  introText: string;
  playLabel: string;
  instructionLabel: string;
  instructionText: string;
  questionPrompt: string;
  options: FastOrClearOption[];
  correctOptionId: string;
  correctToast: string;
  seeWhyLabel: string;
  feedbackText: string;
  completeTitle: string;
  completeImage: string;
  completeImageAlt: string;
  playAgainLabel: string;
  continueLabel: string;
  /** Decorative characters sitting on the grass, e.g. bunny / owl / toad. */
  sceneImages: { src: string; alt: string }[];
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
}

/** One coloured text run in the "Here's What To Do" line. */
export interface BraveBodySegment {
  text: string;
  tone?: 'green' | 'orange';
}

/** One of the three daily practice steps in the Brave Body challenge. */
export interface BraveBodyStep {
  id: string;
  /** Short label under the tracker dot, e.g. 'Stand Tall'. */
  shortLabel: string;
  /** Panel heading, e.g. 'Take One Deep Breath'. */
  heading: string;
  instruction: string;
  /** Button that marks the step done, e.g. "I'm Standing Tall!". */
  buttonLabel: string;
  tone: 'green' | 'blue' | 'yellow';
  icon: string;
  /** Only the "say it out loud" step: the sentence to say and the listen-button label. */
  sentence?: string;
  hearLabel?: string;
}

/**
 * A "Challenge of the Week" daily practice tracker — a green star header, a
 * "Here's What To Do" card, a 7-day week strip with a streak count, and a
 * "Today's Practice" card that walks the child through three tap-to-confirm
 * steps before a "Tap Done!" button. Once today is marked done a completion
 * card with a confidence line shows, and the badge row lights the first
 * badge. Today must be marked done before the lesson can be finished.
 */
export interface BraveBodyChallengeStep extends BaseExercise {
  type: 'brave-body-challenge';
  headerTitle: string;
  headerSubtitle: string;
  whatToDoHeading: string;
  whatToDoSegments: BraveBodySegment[];
  weekHeading: string;
  practiceHeading: string;
  practiceImage: string;
  practiceImageAlt: string;
  steps: BraveBodyStep[];
  allDoneHeading: string;
  allDoneText: string;
  tapDoneLabel: string;
  doneHeading: string;
  doneText: string;
  confidenceLabel: string;
  confidenceQuote: string;
  comeBackText: string;
  badgesHeading: string;
  badges: { icon: string; label: string }[];
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One lettered answer inside a Brave-or-Shy warm-up question. */
export interface BraveOrShyOption {
  id: string;
  text: string;
}

/** A "look at the posture, is it brave or shy?" picture question. */
export interface BraveOrShyPictureQuestion {
  id: string;
  prompt: string;
  /** Picture of the posture, e.g. "brave.png" / "shy.png"; a placeholder panel shows when empty or the file fails to load. */
  image: string;
  imageCaption: string;
  options: BraveOrShyOption[];
  correctOptionId: string;
  feedbackText: string;
}

/** One of the two spoken sample clips compared in the Voice & Breath step. */
export interface BraveOrShyVoiceClip {
  label: string;
  description: string;
}

/** The "which voice sounds more confident?" question. */
export interface BraveOrShyVoiceQuestion {
  id: string;
  prompt: string;
  clipA: BraveOrShyVoiceClip;
  clipB: BraveOrShyVoiceClip;
  options: BraveOrShyOption[];
  correctOptionId: string;
  feedbackText: string;
  wrongFeedbackText: string;
}

/** One instruction line in the "Try It Yourself" step. */
export interface BraveOrShyTryStep {
  text: string;
  /** Optional phrase shown bold/coloured at the end of the line, e.g. the sentence to say out loud. */
  highlight?: string;
}

/** The closing yes / not-sure reflection question. */
export interface BraveOrShyReflectQuestion {
  id: string;
  prompt: string;
  yesLabel: string;
  noLabel: string;
  feedbackText: string;
}

/** One coloured icon chip used in the intro and completion screens. */
export interface BraveOrShyChip {
  icon: string;
  label: string;
  tone: 'green' | 'blue' | 'yellow' | 'pink';
}

/**
 * The "Brave or Shy? Body & Voice Check" warm-up game — a star-mascot header
 * with a 5-segment stepper (Warm-Up → Look & Choose → Voice & Breath → Try
 * It! → Reflect), a Back/Next footer, and a "You Did It!" completion card.
 * The learner must answer every question and tap Done on the action prompt
 * before the game can be finished.
 */
export interface BraveOrShyWarmupStep extends BaseExercise {
  type: 'brave-or-shy-warmup';
  headerTitle: string;
  headerSubtitle: string;
  stepLabels: string[];
  introBubble: string;
  introHeading: string;
  introLead: string;
  introSub: string;
  introChips: BraveOrShyChip[];
  introStartLabel: string;
  lookHeading: string;
  lookInstruction: string;
  pictureQuestions: BraveOrShyPictureQuestion[];
  voiceHeading: string;
  voiceInstruction: string;
  voiceQuestion: BraveOrShyVoiceQuestion;
  tryHeading: string;
  tryInstruction: string;
  trySteps: BraveOrShyTryStep[];
  tryMascotMessage: string;
  tryDoneLabel: string;
  tryFeedbackTitle: string;
  tryFeedbackText: string;
  reflectHeading: string;
  reflectInstruction: string;
  reflectQuestion: BraveOrShyReflectQuestion;
  completeTitle: string;
  completeLead: string;
  completeSub: string;
  completeChips: BraveOrShyChip[];
  playAgainLabel: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One pickable sentence inside a ChallengePickSayStep. */
export interface ChallengePickSayOption {
  id: string;
  text: string;
}

/**
 * A "Challenge of the Week" practice step — a "Practice Mode" pill over a
 * mascot, a two-line title, a light card where the child picks one sentence
 * to practise saying out loud, and a "Done" button that only unlocks once a
 * sentence is chosen. Tapping Done shows an encouraging auto-feedback line
 * and a Continue button; a confidence-line speech bubble sits at the bottom
 * throughout.
 */
export interface ChallengePickSayStep extends BaseExercise {
  type: 'challenge-pick-say';
  /** Small pill above the mascot, e.g. "Practice Mode". */
  pillLabel: string;
  mascotImage: string;
  mascotImageAlt: string;
  /** First line of the title, e.g. "Challenge of the Week:". */
  titleMain: string;
  /** Second line of the title, e.g. "My Clear Voice Practice". */
  titleAccent: string;
  subtitle: string;
  /** Uppercase label above the option list, e.g. "PICK YOUR FAVORITE SENTENCE". */
  pickHeading: string;
  options: ChallengePickSayOption[];
  doneLabel: string;
  /** Encouraging line shown after the child taps Done. */
  autoFeedback: string;
  confidenceLabel: string;
  confidenceQuote: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One emoji-tile answer inside a WarmupVoiceCheckQuestion, e.g. "🤫 Whispering". */
export interface WarmupVoiceCheckOption {
  id: string;
  icon: string;
  text: string;
}

/** One "listen then choose" question inside a WarmupVoiceCheckStep. */
export interface WarmupVoiceCheckQuestion {
  id: string;
  prompt: string;
  /** Sentence spoken aloud (via the browser's speech synthesis) when the child taps the Listen button. */
  listenText: string;
  options: WarmupVoiceCheckOption[];
  correctOptionId: string;
  feedbackText: string;
}

/**
 * A "Voice Check" warm-up — a centered star title, an intro card with a mascot
 * image and a friendly instruction, then one or more questions. Each question
 * has a big round "Listen" speaker button and a row of emoji answer tiles
 * (lettered A/B/C). Picking the correct tile shows the feedback line and
 * advances; a wrong tile asks the child to try again. Same "must get every
 * answer right to proceed" rule as WarmupQuizStep.
 */
export interface WarmupVoiceCheckStep extends BaseExercise {
  type: 'warmup-voice-check';
  /** Centered heading beside the star badge, e.g. "Warm-Up: Voice Check". */
  title: string;
  introImage: string;
  introImageAlt: string;
  introHeading: string;
  introText: string;
  /** Label under the round speaker button, e.g. "Listen". */
  listenLabel: string;
  /** Encouraging tip shown centered under the question card. */
  footerNote: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
  questions: WarmupVoiceCheckQuestion[];
}

/** One tappable answer inside a WarmupWhatShouldIDoQuestion, e.g. "👂 Listen". */
export interface WarmupWhatShouldIDoOption {
  id: string;
  icon: string;
  label: string;
}

/** One "someone is doing X, what should you do?" scenario inside a WarmupWhatShouldIDoStep. */
export interface WarmupWhatShouldIDoQuestion {
  id: string;
  /** Small uppercase label above the scenario text, e.g. "WHAT SHOULD I DO?". */
  eyebrow: string;
  /** Plain, dark first line of the scenario, e.g. "Someone is talking." */
  scenarioText: string;
  /** Accent-colored second line asking for the student's choice, e.g. "What should you do?" */
  promptText: string;
  options: WarmupWhatShouldIDoOption[];
  correctOptionId: string;
  feedbackText: string;
}

/**
 * A "What Should I Do?" warm-up scenario quiz — a mascot avatar beside a
 * scenario card, three icon-tile answer options (lettered A/B/C), and a
 * "Try Again" retry button. Picking the correct option shows a checkmark, a
 * "YES!" flag, and the feedback text before advancing; picking wrong requires
 * tapping Try Again to retry the same question — the same "must get every
 * answer right to proceed" rule as `WarmupQuizStep`.
 */
export interface WarmupWhatShouldIDoStep extends BaseExercise {
  type: 'warmup-what-should-i-do';
  badgeIcon: string;
  badgeLabel: string;
  mascotImage: string;
  mascotImageAlt: string;
  questions: WarmupWhatShouldIDoQuestion[];
  /** Callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One "finish the sentence" prompt inside a WarmupFinishSentenceStep. */
export interface WarmupFinishSentenceItem {
  id: string;
  /** Emoji shown in the coloured tile beside the sentence, e.g. "📖". */
  icon: string;
  /** Colour theme for the card, cycling through the palette in the design. */
  tone: 'blue' | 'yellow' | 'pink' | 'green';
  /** Text before the blank, e.g. "I like". Ignored when `frame` is set. */
  prefix: string;
  /** Text after the blank, usually just punctuation, e.g. ".". Ignored when `frame` is set. */
  suffix: string;
  /**
   * Full sentence frame with its own blanks written in, e.g.
   * "I think we should ______ because ______." When set, the card shows this
   * verbatim and the child types one answer that completes the whole frame,
   * instead of the single prefix/blank/suffix line.
   */
  frame?: string;
  /** Revealed when the child taps the hint — the sample answer, e.g. "I like reading." */
  sampleAnswer: string;
}

/**
 * A "Finish the Sentence" warm-up game — a cheerful header, a progress pill
 * ("N of M done!"), and a stack of coloured sentence cards. Each card has a
 * sentence with a blank, a free-text input, a "Check" button that locks the
 * answer in once something is typed, and a tappable hint that reveals the
 * sample answer. The child must check every sentence before the Continue
 * button appears — the same "complete every task to proceed" rule as the
 * other warm-ups.
 */
export interface WarmupFinishSentenceStep extends BaseExercise {
  type: 'warmup-finish-sentence';
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  checkLabel: string;
  hintLabel: string;
  progressNoun: string;
  items: WarmupFinishSentenceItem[];
  feedbackText: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One selectable topic in an IdeaPresentationStep. */
export interface IdeaPresentationTopic {
  id: string;
  icon: string;
  label: string;
}

/** One labelled text field in an IdeaPresentationStep (build or reflect). */
export interface IdeaPresentationField {
  id: string;
  label: string;
  placeholder: string;
}

/** One line in the IdeaPresentationStep's final recap. */
export interface IdeaPresentationRecapItem {
  icon: string;
  text: string;
}

/**
 * A "My Idea Presentation" final challenge — the module's closing task. The
 * child picks a topic, structures a short idea with sentence starters,
 * confirms they presented it to one person, and writes two reflections. A
 * "Final Recap" summarises what expression means. Every part must be
 * completed to finish — and finishing this step completes the module (and
 * earns its trophy).
 */
export interface IdeaPresentationStep extends BaseExercise {
  type: 'idea-presentation';
  badgeLabel: string;
  title: string;
  intro: string;
  topicHeading: string;
  topics: IdeaPresentationTopic[];
  buildHeading: string;
  buildFields: IdeaPresentationField[];
  presentHeading: string;
  presentLabel: string;
  reflectHeading: string;
  reflectFields: IdeaPresentationField[];
  recapHeading: string;
  recapIntro: string;
  recapItems: IdeaPresentationRecapItem[];
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  lockedNote: string;
  completeLabel: string;
}

/** One "was that kind?" moment inside a PoliteOrNotStep. */
export interface PoliteOrNotMoment {
  id: string;
  /** The line a character says, e.g. "Give me that!". */
  quote: string;
  /** Whether the polite answer is the correct one for this quote. */
  isPolite: boolean;
}

/** One coloured word run inside a PoliteOrNot end-screen title. */
export interface PoliteOrNotSegment {
  text: string;
  accent?: boolean;
}

/** One numbered tip in the PoliteOrNot end screen. */
export interface PoliteOrNotTip {
  title: string;
  text: string;
}

/**
 * A "Polite or Not?" warm-up game — a three-screen kindness adventure. A
 * cosy hero intro, then five "moments" where a character says something and
 * the child decides whether it sounds polite or not (a wrong guess asks them
 * to try again; the answer can be revealed for help), and finally a keepsake
 * end screen with three tips and a "pocket note". Every moment must be
 * answered correctly before the child can proceed — same "finish every task
 * to proceed" rule as the other warm-ups.
 */
export interface PoliteOrNotStep extends BaseExercise {
  type: 'polite-or-not';
  brandName: string;
  brandTagline: string;
  withLabel: string;
  chapterEyebrowA: string;
  chapterEyebrowB: string;
  titleStart: string;
  titleAccent: string;
  introText: string;
  startLabel: string;
  momentsCountLabel: string;
  sunLabelTop: string;
  sunLabelBottom: string;
  stickyNoteOne: string;
  stickyNoteTwo: string;
  playTitle: string;
  choicesNoun: string;
  momentWord: string;
  readyLabel: string;
  mascotName: string;
  mascotImage: string;
  mascotImageAlt: string;
  mascotCaption: string;
  promptQuestion: string;
  promptSub: string;
  politeLabel: string;
  notPoliteLabel: string;
  revealLabel: string;
  nextLabel: string;
  correctFeedback: string;
  tryAgainFeedback: string;
  moments: PoliteOrNotMoment[];
  endEyebrow: string;
  endTitleSegments: PoliteOrNotSegment[];
  endText: string;
  tips: PoliteOrNotTip[];
  pocketNoteLabel: string;
  pocketNoteQuote: string;
  pocketNoteSub: string;
  footerBrand: string;
  footerTagline: string;
  restartLabel: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/**
 * A "Feelings Tracker" challenge-of-the-week — a hero card, a coral "example"
 * speech bubble, and five numbered day cards. Each day the child fills three
 * dashed fields: the feeling, why they felt it, and a "say it out loud"
 * sentence frame. A dashed "Confidence Link" card closes it. Every field on
 * every day must be filled before the child can proceed — same "finish every
 * part to proceed" rule as the other challenges.
 */
export interface FeelingsTrackerStep extends BaseExercise {
  type: 'feelings-tracker';
  challengePill: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  exampleLabel: string;
  exampleText: string;
  daysHeading: string;
  dayCount: number;
  feelingLabel: string;
  feelingPlaceholder: string;
  whyLabel: string;
  whyPlaceholder: string;
  sayLabel: string;
  sayPlaceholder: string;
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceText: string;
  /** May be blank until the mascot art is supplied. */
  confidenceImage: string;
  confidenceImageAlt: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One answer option inside a FeelingsExplorerMoment. The letter (A/B/C) is derived from position. */
export interface FeelingsExplorerOption {
  id: string;
  text: string;
}

/** One "everyday moment" the child names a feeling for inside a FeelingsExplorerStep. */
export interface FeelingsExplorerMoment {
  id: string;
  /** The little scenario, e.g. "When you lose a game, you may feel:". */
  prompt: string;
  options: FeelingsExplorerOption[];
  correctOptionId: string;
  /** When more than one option is a best fit (e.g. "Nervous or Calm"), any of these also counts. */
  acceptableOptionIds?: string[];
}

/**
 * A "Feelings Explorer" warm-up game — a cosy practice nook. A hero
 * introduces Pip and the trail, then the child works through five everyday
 * "moments", picking the feeling that fits best. A wrong pick asks them to
 * notice again; a right pick shows kind feedback and a "Next moment" button.
 * A side trail tracks progress. Every moment must be answered with a best-fit
 * feeling before the trail completes — the same "finish every task to
 * proceed" rule as the other warm-ups.
 */
export interface FeelingsExplorerStep extends BaseExercise {
  type: 'feelings-explorer';
  brandName: string;
  brandTagline: string;
  madeForLabel: string;
  trailEyebrow: string;
  titleStart: string;
  titleAccent: string;
  introText: string;
  beginLabel: string;
  backLabel: string;
  paceNote: string;
  image: string;
  imageAlt: string;
  bubbleName: string;
  bubbleText: string;
  yourTurnEyebrow: string;
  yourTurnTitle: string;
  yourTurnHelp: string;
  trailLabel: string;
  trailNote: string;
  startHeading: string;
  startText: string;
  startLabel: string;
  momentLabel: string;
  pickOneLabel: string;
  moments: FeelingsExplorerMoment[];
  correctFeedback: string;
  tryAgainFeedback: string;
  nextLabel: string;
  completeHeading: string;
  completeText: string;
  completeStatNoun: string;
  exploreAgainLabel: string;
  shareLabel: string;
  shareHint: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One of the three "invitation" prompts (doors) a child picks from on a ClearSentencePractice day. */
export interface ClearSentenceDoor {
  id: string;
  tone: 'yellow' | 'blue' | 'pink';
  icon: string;
  /** Small uppercase kicker, e.g. "SOMETHING YOU LIKE". */
  kicker: string;
  /** The invitation question itself. */
  text: string;
}

/** One day page inside a ClearSentencePracticeStep — a label plus its three invitation doors. */
export interface ClearSentenceDay {
  id: string;
  /** Short name shown on the day card, e.g. "Notice". */
  label: string;
  /** Small label beside "DAY 0N /" on the detail card, e.g. "Look closer". */
  detailEyebrow: string;
  /** Right-aligned aside on the detail card, e.g. "Take your time". */
  detailAside: string;
  /** Big heading on the detail card, e.g. "Three doors into one clear thought." */
  detailHeading: string;
  doors: ClearSentenceDoor[];
}

/** One end-of-week reflection prompt inside a ClearSentencePracticeStep. */
export interface ClearSentenceReflection {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * A "Clear Sentence Practice Companion" challenge-of-the-week — a cosy
 * five-day journal. It opens on a hero intro, then a day chooser where the
 * child picks one of five days, reads three invitation "doors", and writes a
 * clear sentence into the "Expression Log". Every day must be marked complete
 * before the end-of-week page unlocks, where the child answers two reflection
 * prompts. A closing confidence line ties it together. Same "finish every
 * part to proceed" rule as the other challenges.
 */
export interface ClearSentencePracticeStep extends BaseExercise {
  type: 'clear-sentence-practice';
  brandName: string;
  brandTagline: string;
  daysDoneNoun: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  introText: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  chooserEyebrow: string;
  chooserTitleStart: string;
  chooserTitleAccent: string;
  chooserSubtitle: string;
  days: ClearSentenceDay[];
  logHeading: string;
  logIntro: string;
  logPlaceholder: string;
  savedLabel: string;
  markDayLabel: string;
  dayCompleteLabel: string;
  toEndOfWeekLabel: string;
  endEyebrow: string;
  endIntro: string;
  endTitleStart: string;
  endTitleAccent: string;
  endReflections: ClearSentenceReflection[];
  keepClosePrefix: string;
  keepCloseText: string;
  /** Callout encouraging a parent/guardian to help the child with this exercise. */
  parentNote: string;
  /** The "Confidence Link" line the week builds toward. */
  confidenceQuote: string;
  finishLabel: string;
}

/** One selectable option inside a ListeningPromiseTrackerStep question (habit, daily log, check-in, or reflection). */
export interface ListeningPromiseOption {
  id: string;
  icon: string;
  label: string;
}

/** One reflection question inside a ListeningPromiseTrackerStep's daily log, mid-week check-in, or end-of-week reflection — a label plus a row of tappable options. */
export interface ListeningPromiseQuestion {
  id: string;
  label: string;
  options: ListeningPromiseOption[];
}

/** One weekday tab inside a ListeningPromiseTrackerStep's daily log. */
export interface ListeningPromiseDay {
  id: string;
  label: string;
  dayNumber: number;
}

/** One tickable box inside a ListeningPromiseTrackerStep's success criteria list. */
export interface ListeningPromiseCriterion {
  id: string;
  icon: string;
  label: string;
}

/**
 * A "final challenge" weekly promise tracker — a hero with a multi-pill
 * progress summary, then five numbered sections on one scrolling worksheet:
 * pick-a-habit (plus a free-text promise), a 5-day log (day tabs, each day
 * answering the same set of reflection questions), a mid-week check-in, an
 * end-of-week reflection (both with a sample-answer callout), and a
 * success-criteria checklist that gates the "Complete Challenge" button.
 * Completing it shows a celebration screen with a confidence-link quote;
 * since this is the module's last step, finishing it awards the module's
 * trophy — the same automatic module-completion rule as every other step.
 */
export interface ListeningPromiseTrackerStep extends BaseExercise {
  type: 'listening-promise-tracker';
  badgeIcon: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;

  habitHeading: string;
  habitSubtitle: string;
  habitOptions: ListeningPromiseOption[];
  promiseLabel: string;
  promisePlaceholder: string;

  dailyLogHeading: string;
  dailyLogSubtitle: string;
  days: ListeningPromiseDay[];
  whoQuestion: ListeningPromiseQuestion;
  topicQuestion: ListeningPromiseQuestion;
  keptPromiseQuestion: ListeningPromiseQuestion;
  wentWellQuestion: ListeningPromiseQuestion;
  difficultQuestion: ListeningPromiseQuestion;
  emojiReflectionQuestion: ListeningPromiseQuestion;

  midWeekHeading: string;
  midWeekQuestions: ListeningPromiseQuestion[];
  midWeekSampleAnswer: string;

  endWeekHeading: string;
  endWeekQuestions: ListeningPromiseQuestion[];
  endWeekSampleAnswer: string;

  successHeading: string;
  successSubtitle: string;
  successCriteria: ListeningPromiseCriterion[];
  lockedCompleteLabel: string;
  completeLabel: string;

  /** Callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;

  confidenceImage: string;
  confidenceImageAlt: string;
  completionHeading: string;
  confidenceQuote: string;
  restartLabel: string;
}

/**
 * A "Challenge of the Week" closer — a photo card with a title/description
 * and a decorative row of hearts, followed by a side-by-side Feedback quote
 * and Confidence Link quote, and a single "Complete Lesson" button. Combines
 * what would otherwise be a separate challenge step and confidence-link step
 * into one closing screen.
 */
export interface KindWatchChallengeStep extends BaseExercise {
  type: 'kind-watch-challenge';
  badge: string;
  image: string;
  imageAlt: string;
  titleIcon: string;
  title: string;
  description: string;
  feedbackLabel: string;
  feedbackIcon: string;
  feedbackText: string;
  confidenceLabel: string;
  confidenceIcon: string;
  confidenceText: string;
  completeLabel: string;
}

/** One draggable action inside a SortingGameStep, e.g. "Sharing toys". */
export interface SortingGameItem {
  id: string;
  label: string;
  /** Which bin (by `SortingGameBin.id`) this item actually belongs in. */
  correctBinId: string;
}

/** One drop target inside a SortingGameStep, e.g. the green "Kind" bin. */
export interface SortingGameBin {
  id: string;
  icon: string;
  label: string;
  variant: 'positive' | 'negative';
}

/**
 * A two-bin drag-and-drop sorting warm-up (a tap-to-select-then-tap-to-place
 * fallback is offered alongside for touch devices) — drag each action card
 * into the bin it belongs in. Dropping an item in the wrong bin bounces it
 * back to the word bank instead of accepting it, so only correctly-sorted
 * items count. Self-contained and un-graded by ProgressService; the
 * "Continue" button only appears once every item has been sorted correctly.
 */
export interface SortingGameStep extends BaseExercise {
  type: 'sorting-game';
  title: string;
  badgeIcon: string;
  badge: string;
  focusIcon: string;
  focusHeading: string;
  focusPoints: string[];
  instruction: string;
  items: SortingGameItem[];
  bins: SortingGameBin[];
  feedbackText: string;
  /** Shown near the bottom, e.g. reminding a parent/caregiver to help. */
  parentNote: string;
  continueLabel: string;
}

/** One draggable, emoji-illustrated card inside a PlaceSortGameStep, e.g. "Shoes in hallway". */
export interface PlaceSortItem {
  id: string;
  icon: string;
  label: string;
  /** Which zone (by `PlaceSortZone.id`) this item actually belongs in. */
  correctZoneId: string;
}

/** One drop target inside a PlaceSortGameStep, e.g. the green "Right Place" zone. */
export interface PlaceSortZone {
  id: string;
  icon: string;
  label: string;
  variant: 'positive' | 'negative';
}

/**
 * A two-zone drag-and-drop classification warm-up, e.g. "Right Place or
 * Wrong Place?" — drag each illustrated item card into the zone it belongs
 * in. Dropping an item in the wrong zone bounces it back instead of
 * accepting it. "Play Again" resets every item back to the top so the
 * student can replay the round; "Continue" only appears once every item has
 * been sorted correctly.
 */
export interface PlaceSortGameStep extends BaseExercise {
  type: 'place-sort-game';
  title: string;
  subtitle: string;
  items: PlaceSortItem[];
  zones: PlaceSortZone[];
  playAgainLabel: string;
  continueLabel: string;
}

/**
 * A "Challenge of the Week" closer — a plain-text page badge, a full-width
 * photo card, then a card with a small pill badge, an icon title, and a
 * description bubble, followed by a side-by-side tinted Feedback card and
 * Confidence Link card, a "Complete Lesson" button, and a footer tagline.
 */
export interface KindWordsChallengeStep extends BaseExercise {
  type: 'kind-words-challenge';
  pageBadge: string;
  image: string;
  imageAlt: string;
  cardBadge: string;
  titleIcon: string;
  title: string;
  descriptionIcon: string;
  description: string;
  feedbackLabel: string;
  feedbackIcon: string;
  feedbackText: string;
  confidenceLabel: string;
  confidenceIcon: string;
  confidenceText: string;
  completeLabel: string;
  footerNote: string;
}

/** One tappable question card inside a WarmupChatStep. */
export interface WarmupQuestion {
  id: string;
  icon: string;
  label: string;
  placeholder: string;
  /** Sentence template for the answers recap, with `{answer}` swapped for what the student typed — e.g. "I wore {answer} today." */
  recapTemplate: string;
}

/**
 * A friendly "chat with a mascot" warm-up — tap a question card, type an
 * answer, then move to the next one, in whatever order the student likes.
 * There's no right answer, so finishing every question just awards a star.
 */
export interface WarmupChatStep extends BaseExercise {
  type: 'warmup-chat';
  badge: string;
  heading: string;
  subtitle: string;
  mascotName: string;
  mascotImage: string;
  speechBubble: string;
  questions: WarmupQuestion[];
  continueLabel: string;
}

/**
 * A purely instructional "do this out loud/in the room" warm-up — a title,
 * a description of a quick physical/verbal game, and a photo. Nothing to
 * type or grade; tapping continue is all it takes to finish.
 */
export interface WarmupGameStep extends BaseExercise {
  type: 'warmup-game';
  badgeIcon: string;
  badge: string;
  title: string;
  titleIcon: string;
  description: string;
  image: string;
  imageAlt: string;
  continueLabel: string;
}

/** One time-of-day panel inside a DayPlannerStep, e.g. "Morning". */
export interface DayPlannerSection {
  id: string;
  icon: string;
  label: string;
  placeholder: string;
}

/**
 * A three-part "storyboard" planning activity (morning/afternoon/evening) —
 * a more playful alternative to the plain share-prompt card for planning-style
 * mini activities.
 */
export interface DayPlannerStep extends BaseExercise {
  type: 'day-planner';
  heading: string;
  intro?: string;
  sections: DayPlannerSection[];
  submitLabel: string;
}

/** One picture + caption inside a StoryCarouselStep. */
export interface StoryCarouselSlide {
  image: string;
  title: string;
  text: string;
}

/**
 * A picture-book style carousel telling a short story one beat at a time —
 * prev/next arrows, dot pagination, an auto-play toggle, and a "Next Lesson"
 * button that's always available (no need to view every slide first).
 */
export interface StoryCarouselStep extends BaseExercise {
  type: 'story-carousel';
  heading: string;
  subtitle: string;
  slides: StoryCarouselSlide[];
  continueLabel: string;
  /** Optional take-home line shown in a highlighted banner under the carousel, e.g. "Good thinking begins with careful attention.". */
  takeHome?: string;
}

/** One question inside a DiscussionMcqStep — always multiple-choice, no typing. */
export interface DiscussionMcqQuestion {
  id: string;
  prompt: string;
  options: ExerciseOption[];
}

/**
 * A "discussion points" step where every question is answered by picking an
 * option (no typing) — one question at a time, then a review screen listing
 * every answer the student picked before they continue.
 */
export interface DiscussionMcqStep extends BaseExercise {
  type: 'discussion-mcq';
  heading: string;
  subtitle?: string;
  questions: DiscussionMcqQuestion[];
  reviewHeading: string;
  continueLabel: string;
}

/** One question inside a DiscussionQuizStep — has a right answer, unlike DiscussionMcqStep. */
export interface DiscussionQuizQuestion {
  id: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** When set, any of these option ids also counts as correct — for a question with more than one right answer (e.g. "name one feeling you had today"), instead of just `correctOptionId`. */
  acceptableOptionIds?: string[];
  /** Shown briefly once the student picks a correct option, before the question advances. */
  feedbackText?: string;
}

/**
 * A graded "discussion points" step — same one-question-at-a-time flow and
 * review screen as DiscussionMcqStep, but each question has a correct
 * answer: picking wrong shows feedback and lets the student try again
 * instead of advancing, so a question only counts once answered correctly.
 */
export interface DiscussionQuizStep extends BaseExercise {
  type: 'discussion-quiz';
  heading: string;
  subtitle?: string;
  questions: DiscussionQuizQuestion[];
  reviewHeading: string;
  continueLabel: string;
  /** Optional recap card shown on the review screen — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One question inside an EtiquetteWarmupQuizStep. */
export interface EtiquetteWarmupQuizQuestion {
  id: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** Short affirmation shown once the learner picks the right option. */
  praise: string;
}

/**
 * A "warm-up" multiple-choice quiz built as a single vertical worksheet
 * (Etiquette module) — every question is a numbered card in one scroll, but
 * only the current card is interactive: earlier cards collapse to a green
 * "answered" summary, later cards stay locked and dimmed. A wrong pick shakes
 * and shows a nudge to try again; the card only unlocks the next once its
 * correct option is chosen. The Continue button stays disabled until all
 * questions are answered correctly, so the learner cannot skip ahead. A
 * parent-assist note sits at the foot of the step.
 */
export interface EtiquetteWarmupQuizStep extends BaseExercise {
  type: 'etiquette-warmup-quiz';
  title: string;
  intro: string;
  questions: EtiquetteWarmupQuizQuestion[];
  parentNote: string;
  completeLabel: string;
}

/** One thing the learner can choose to imagine in an ImagineCreateChallengeStep, e.g. 🦄 "A new animal". */
export interface ImagineCreatePick {
  id: string;
  icon: string;
  label: string;
}

/** One typed blueprint field inside an ImagineCreateChallengeStep. */
export interface ImagineCreateField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "Imagine and Create" weekly challenge (Creativity module, Week 2 closer) —
 * a blueprint-styled card where the learner first picks what to imagine (a new
 * animal, place or invention), then fills three "blueprint" fields (what it is,
 * what makes it special, how it helps others). Submitting with a pick made and
 * all three fields filled awards a star, followed by a "You learned…" recap.
 */
export interface ImagineCreateChallengeStep extends BaseExercise {
  type: 'imagine-create-challenge';
  badge: string;
  title: string;
  intro: string;
  pickHeading: string;
  picks: ImagineCreatePick[];
  drawNote: string;
  fields: ImagineCreateField[];
  submitLabel: string;
  recapHeading: string;
  recapPoints: string[];
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One statement the learner stamps TRUE or FALSE inside a FactCheckWarmupStep. */
export interface FactCheckStatement {
  id: string;
  text: string;
  /** Whether the statement is true — the learner's stamp must match this. */
  isTrue: boolean;
  /** Short "why" line revealed once the learner stamps it correctly. */
  because: string;
}

/**
 * The "Fact Check Lab" true/false warm-up (Creativity module, Week 2) — one
 * statement at a time on a lab-slip card with a big TRUE and a big FALSE stamp
 * button. A correct stamp flips the card to reveal a "why" line and advances; a
 * wrong stamp buzzes and invites another try, so every statement must be judged
 * correctly before the Continue button unlocks. A parent-assist note sits at the
 * foot of the step.
 */
export interface FactCheckWarmupStep extends BaseExercise {
  type: 'fact-check-warmup';
  title: string;
  intro: string;
  trueLabel: string;
  falseLabel: string;
  statements: FactCheckStatement[];
  parentNote: string;
  completeLabel: string;
}

/** One typed "describe your creation" field inside a CreativeObjectChallengeStep. */
export interface CreativeObjectChallengeField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "My Creative Object" weekly challenge (Creativity module, Week 1 closer) —
 * a badge + title challenge card listing the at-home build steps, then three
 * typed "describe it" fields (what it was before, what it became, how it felt),
 * a submit button that awards a star once all three are filled, and a "You
 * learned…" recap ribbon of takeaway points for the week.
 */
export interface CreativeObjectChallengeStep extends BaseExercise {
  type: 'creative-object-challenge';
  badge: string;
  title: string;
  intro: string;
  /** The at-home steps to follow, e.g. "Find one object at home". */
  steps: string[];
  fields: CreativeObjectChallengeField[];
  submitLabel: string;
  recapHeading: string;
  recapPoints: string[];
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One "choose the creative option" question inside a CreativeChoiceWarmupStep. */
export interface CreativeChoiceQuestion {
  id: string;
  /** The situation the learner is in, e.g. "You are given a plain box.". */
  scenario: string;
  /** The question asked about that situation, e.g. "What is the most creative thing to do?". */
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** Spark line shown once the learner picks the creative option. */
  spark: string;
}

/**
 * The "Choose the Creative Option" warm-up (Creativity module, Week 1) — one
 * question at a time on a bright card, each with a short scenario and three
 * option tiles. Picking the creative option fills an "imagination meter" and
 * pops a spark line before advancing; a plain pick gently dims and invites
 * another try. The Continue button only unlocks once every question's creative
 * option has been found.
 */
export interface CreativeChoiceWarmupStep extends BaseExercise {
  type: 'creative-choice-warmup';
  title: string;
  intro: string;
  /** Label under the imagination meter, e.g. "Imagination meter". */
  meterLabel: string;
  questions: CreativeChoiceQuestion[];
  completeLabel: string;
}

/** One "which choice is the smart plan?" question inside a SmartChoicesWarmupStep. */
export interface SmartChoicesQuestion {
  id: string;
  /** The goal the learner is trying to reach, e.g. "You want to build the tallest block tower.". */
  goal: string;
  /** A single emoji shown on the goal tile. */
  icon: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** Short "why that is the smart move" line revealed once the learner picks correctly. */
  smartWhy: string;
}

/**
 * The "Smart Choices" warm-up (Strategizing module, Week 1) — a decision-console
 * card where each question shows a goal tile and three chunky A/B/C "move"
 * buttons. The right move locks in, lights the next stone on a "plan track"
 * across the top and flips the card to a "Smart move!" panel with a why-line; a
 * wrong move shakes and invites another try. Every question must be answered
 * correctly before the Continue button unlocks. A parent-assist note sits at the
 * foot of the step.
 */
export interface SmartChoicesWarmupStep extends BaseExercise {
  type: 'smart-choices-warmup';
  title: string;
  intro: string;
  /** Label beside the plan-track progress dots, e.g. "Plan locked in". */
  trackLabel: string;
  questions: SmartChoicesQuestion[];
  parentNote: string;
  completeLabel: string;
}

/** One goal the learner can pick to plan in a StrategyPlanChallengeStep, e.g. 📖 "Improve reading". */
export interface StrategyPlanGoal {
  id: string;
  icon: string;
  label: string;
}

/** One numbered step slot in a StrategyPlanChallengeStep's strategy. */
export interface StrategyPlanStepField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "My Strategy Plan" final challenge (Strategizing module, Week 4 closer) —
 * the learner pins one goal, reads a worked example, writes their own
 * step-by-step strategy on a numbered plan, then answers a reflection question.
 * Submitting with a goal pinned and every field filled flips the plan to a
 * stamped "Strategy Plan" card and awards a star; a Finish button then closes
 * the week and the module.
 */
export interface StrategyPlanChallengeStep extends BaseExercise {
  type: 'strategy-plan-challenge';
  badge: string;
  title: string;
  intro: string;
  pickHeading: string;
  goals: StrategyPlanGoal[];
  exampleLabel: string;
  exampleGoal: string;
  exampleSteps: string[];
  planHeading: string;
  stepFields: StrategyPlanStepField[];
  reflectionLabel: string;
  reflectionPlaceholder: string;
  submitLabel: string;
  savedText: string;
  finishLabel: string;
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/**
 * The "Small Steps" confidence-link closer (Strategizing module, Week 4 / whole
 * module) — a card that closes the module on the idea that big achievements are
 * built from small steps: a heading and subtitle, a rising row of small step
 * markers leading to a trophy, a "strategizing helps you…" line, a "say it out
 * loud" band, and a "Complete the Module" button. Emits `completed` when the
 * button is pressed.
 */
export interface SmallStepsLinkStep extends BaseExercise {
  type: 'small-steps-link';
  badge: string;
  heading: string;
  subtitle: string;
  knowLabel: string;
  knowText: string;
  sayItLabel: string;
  sayItText: string;
  /** The week this closes out — used for copy. */
  week: number;
  completeLabel: string;
}

/** One "put the steps in order" task inside a StepOrderWarmupStep. */
export interface StepOrderTask {
  id: string;
  /** The goal this sequence of steps works towards, e.g. "Reading Goal". */
  title: string;
  /** The steps listed in their correct order — the view shuffles them into the tray. */
  steps: string[];
}

/**
 * The "Put the Steps in Order" warm-up (Strategizing module, Week 4) — one goal
 * at a time shown as a short "goal ladder" of empty rungs above a tray of
 * shuffled step cards. The learner taps cards up onto the rungs (tap a filled
 * rung to send it back); once every rung is filled the order is checked. A
 * correct order locks the ladder green and advances; a wrong order shakes and
 * clears so they can try again. Every goal must be ordered correctly before the
 * Continue button unlocks. A parent-assist note sits at the foot of the step.
 */
export interface StepOrderWarmupStep extends BaseExercise {
  type: 'step-order-warmup';
  title: string;
  intro: string;
  tasks: StepOrderTask[];
  parentNote: string;
  completeLabel: string;
}

/** One line on the case-file form in a StrategyDetectiveChallengeStep, e.g. "Problem". */
export interface DetectiveCaseField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "Strategy Detective" weekly challenge (Strategizing module, Week 3) — a
 * detective case file the learner fills in each time they solve a problem this
 * week: what the problem was, which strategy they used, and the result.
 * Submitting with every line filled flips the file to a "solved" stamp and a
 * "You learned…" recap; a Finish button then closes the week and awards a star.
 */
export interface StrategyDetectiveChallengeStep extends BaseExercise {
  type: 'strategy-detective-challenge';
  badge: string;
  title: string;
  intro: string;
  briefLabel: string;
  fields: DetectiveCaseField[];
  submitLabel: string;
  savedText: string;
  recapHeading: string;
  recapPoints: string[];
  finishLabel: string;
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/**
 * The "Try Another Plan" confidence-link closer (Strategizing module, Week 3) —
 * a card that closes the week on the idea that a failed plan is not a dead end:
 * a heading and subtitle, a "Plan A ✗ → Plan B ✓" strip, a "strategic thinkers
 * know…" line, a "say it out loud" band, and a "Complete Week N" button. Emits
 * `completed` when the button is pressed.
 */
export interface TryAnotherPlanLinkStep extends BaseExercise {
  type: 'try-another-plan-link';
  badge: string;
  heading: string;
  subtitle: string;
  knowLabel: string;
  knowText: string;
  sayItLabel: string;
  sayItText: string;
  /** The week this closes out — used for "Complete Week N" copy. */
  week: number;
  completeLabel: string;
}

/**
 * A graded "discussion points" step in sequencing form — one set of steps that
 * must be put into the right order. The learner taps steps from a shuffled tray
 * onto numbered slots (tap a filled slot to send it back); once every slot is
 * filled the order is checked. A correct order locks green and unlocks Continue;
 * a wrong order shakes and clears so they can try again, the same "must get it
 * right to proceed" rule as DiscussionQuizStep.
 */
export interface DiscussionSequenceStep extends BaseExercise {
  type: 'discussion-sequence';
  heading: string;
  subtitle?: string;
  /** The task line, e.g. "Put Esi's strategy in the correct order.". */
  instruction: string;
  /** The steps in their correct order — the view shuffles them into the tray. */
  steps: string[];
  continueLabel: string;
}

/** One action/result pair to link in a DiscussionMatchStep. */
export interface DiscussionMatchPair {
  id: string;
  action: string;
  result: string;
}

/**
 * A graded "discussion points" step in matching form — an "Action" column and a
 * shuffled "Result" column. The learner taps an action, then the result it
 * leads to: a correct pair locks in green, a wrong pair shakes and clears so
 * they can try again. Every pair must be matched correctly before the Continue
 * button unlocks, the same "must get it right to proceed" rule as
 * DiscussionQuizStep.
 */
export interface DiscussionMatchStep extends BaseExercise {
  type: 'discussion-match';
  heading: string;
  subtitle?: string;
  actionHeading: string;
  resultHeading: string;
  pairs: DiscussionMatchPair[];
  continueLabel: string;
  /** Optional recap card shown once every pair is matched — a heading over a short bullet list. */
  recapHeading?: string;
  recapPoints?: string[];
}

/** One problem/strategy pair to link in a StrategyMatchWarmupStep. */
export interface StrategyMatchPair {
  id: string;
  problem: string;
  strategy: string;
}

/**
 * The "Match the Problem with the Strategy" warm-up (Strategizing module, Week
 * 3) — a lock-and-key board with problem "locks" down the left and shuffled
 * strategy "keys" down the right. The learner taps a lock, then the key that
 * fits it: a correct pair turns green and the lock opens, a wrong key shakes
 * and clears so they can try again. Every lock must be opened before the
 * Continue button unlocks. A parent-assist note sits at the foot of the step.
 */
export interface StrategyMatchWarmupStep extends BaseExercise {
  type: 'strategy-match-warmup';
  title: string;
  intro: string;
  problemHeading: string;
  strategyHeading: string;
  pairs: StrategyMatchPair[];
  parentNote: string;
  completeLabel: string;
}

/** One beat of the daily Notice → Pause → Solve rhythm in a PausePlanChallengeStep. */
export interface PausePlanBeat {
  icon: string;
  label: string;
}

/**
 * The "Pause and Plan" weekly challenge (Strategizing module, Week 2) — a daily
 * practice: each day the learner notices one small problem, pauses, and thinks
 * of a solution. The card shows the three-beat rhythm as a loop, then a journal
 * panel where the learner writes what happened and how they solved it.
 * Submitting with the journal filled flips to a "This week you learned…" recap;
 * a Finish button then closes the week and awards a star.
 */
export interface PausePlanChallengeStep extends BaseExercise {
  type: 'pause-plan-challenge';
  badge: string;
  title: string;
  intro: string;
  cadenceLabel: string;
  beats: PausePlanBeat[];
  journalLabel: string;
  journalPlaceholder: string;
  submitLabel: string;
  savedText: string;
  recapHeading: string;
  recapPoints: string[];
  finishLabel: string;
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One question a strategic thinker asks themselves, shown on a StrategicThinkerLinkStep. */
export interface StrategicThinkerQuestion {
  icon: string;
  text: string;
}

/**
 * The "Strategic Thinker" confidence-link closer (Strategizing module, Week 2) —
 * a self-check card that closes the week: a short heading and subtitle, then a
 * numbered list of the questions a strategic thinker asks themselves (each
 * tappable to tick off), a "say it out loud" band, and a "Complete Week N"
 * button. Emits `completed` when the button is pressed.
 */
export interface StrategicThinkerLinkStep extends BaseExercise {
  type: 'strategic-thinker-link';
  badge: string;
  heading: string;
  subtitle: string;
  questionsLabel: string;
  questions: StrategicThinkerQuestion[];
  sayItLabel: string;
  sayItText: string;
  /** The week this closes out — used for "Complete Week N" copy. */
  week: number;
  completeLabel: string;
}

/** One statement the learner judges True or False inside a ThinkItThroughWarmupStep. */
export interface ThinkItThroughStatement {
  id: string;
  text: string;
  /** Whether the statement is true — the learner's pick must match this. */
  isTrue: boolean;
  /** Short "why" line revealed once the learner judges it correctly. */
  because: string;
}

/**
 * The "Think It Through" true/false warm-up (Strategizing module, Week 2) — one
 * statement at a time beside a stoplight: the learner taps the green "True"
 * lamp or the red "False" lamp. A correct pick lights that lamp and reveals a
 * "why" line before advancing; a wrong pick flashes the amber lamp and invites
 * another try, so every statement must be judged correctly before the Continue
 * button unlocks. A parent-assist note sits at the foot of the step.
 */
export interface ThinkItThroughWarmupStep extends BaseExercise {
  type: 'think-it-through-warmup';
  title: string;
  intro: string;
  trueLabel: string;
  falseLabel: string;
  statements: ThinkItThroughStatement[];
  parentNote: string;
  completeLabel: string;
}

/** One task the learner can pick to plan in a FirstStrategyChallengeStep, e.g. 🎒 "Packing your bag". */
export interface FirstStrategyTask {
  id: string;
  icon: string;
  label: string;
}

/** One numbered step slot in a FirstStrategyChallengeStep's 3-step plan. */
export interface FirstStrategyStepField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "My First Strategy" weekly challenge (Strategizing module, Week 1) — the
 * learner pins one everyday task, reads a worked 3-step example, then writes
 * their own three-step plan on a numbered plan pad. Submitting with a task
 * pinned and all three steps written flips the pad to a stamped "strategy card"
 * and a "This week you learned…" recap; a Finish button then closes the week
 * and awards a star.
 */
export interface FirstStrategyChallengeStep extends BaseExercise {
  type: 'first-strategy-challenge';
  badge: string;
  title: string;
  intro: string;
  pickHeading: string;
  tasks: FirstStrategyTask[];
  planHeading: string;
  exampleLabel: string;
  exampleSteps: string[];
  stepFields: FirstStrategyStepField[];
  submitLabel: string;
  savedText: string;
  recapHeading: string;
  recapPoints: string[];
  finishLabel: string;
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One node on the "responsibility circuit" warm-up board. */
export interface ResponsibilityCircuitQuestion {
  id: string;
  /** Short label under the circuit node, e.g. "Node 1". */
  nodeLabel: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** Spark line shown once the learner powers the node with the right option. */
  spark: string;
}

/**
 * A "warm-up" multiple-choice quiz (Habits module) themed as a circuit board on
 * blueprint paper: the questions are nodes on a horizontal power rail, and each
 * correct answer "powers" its node and lights the wire to the next one. Only the
 * first unpowered node is interactive; earlier nodes show a lit summary, later
 * ones stay dim. A wrong pick sparks and shakes so the learner tries again — the
 * node only powers on its correct option. The finish button stays disabled until
 * every node is powered, so the learner cannot skip ahead, and a parent-assist
 * note sits at the foot of the step.
 */
export interface ResponsibilityCircuitStep extends BaseExercise {
  type: 'responsibility-circuit';
  title: string;
  intro: string;
  railLabel: string;
  questions: ResponsibilityCircuitQuestion[];
  completeHeading: string;
  completeText: string;
  parentNote: string;
  completeLabel: string;
}

/** One personal-info card on the "privacy match" board. */
export interface PrivacyMatchItem {
  id: string;
  icon: string;
  label: string;
  /** Id from the step's `actions` pool that is the right match for this item. */
  correctOptionId: string;
  /** Other action ids that also count as correct for this item, if any. */
  acceptableOptionIds?: string[];
  /** Short reason shown when the item is correctly matched, e.g. "A password is a key others could use." */
  why: string;
}

/**
 * A "Match the Safe Action" warm-up (Habits module) — a linked two-column
 * board. Each row is a personal-info item (password, full name, home address…)
 * that the learner links to one action chip from a shared pool. Picking the
 * right action for that item locks the row shut with a glowing connector line
 * and a one-line reason; picking a wrong action buzzes the row and clears it so
 * the learner tries again. The Continue button stays disabled until every row
 * is matched correctly, so the learner cannot skip ahead, and a parent-assist
 * note sits at the foot of the step.
 */
export interface PrivacyMatchStep extends BaseExercise {
  type: 'privacy-match';
  title: string;
  intro: string;
  boardLabel: string;
  /** The shared chip pool shown for every row. */
  actions: ExerciseOption[];
  items: PrivacyMatchItem[];
  /** Shown briefly after a wrong pick, prompting a retry. */
  unsafeFeedback: string;
  completeHeading: string;
  completeText: string;
  parentNote: string;
  completeLabel: string;
}

/**
 * A "Privacy Protector" challenge-of-the-week (Habits module, Week 2) — styled
 * as a secret-agent dossier on manila paper with a red "CONFIDENTIAL" stamp.
 * It has three filed sections: a numbered "Never Share" list of five lines the
 * learner fills in, a "Power Phrase" card ("I cannot share that") with a
 * tap-to-confirm "I practised saying it out loud" button, and a five-day
 * "Watch Log" where each day the learner marks whether they were asked to
 * share information (Yes/No) and types what they said or did. When every line
 * is filled, the phrase is practised, and all five days are logged, a
 * "Confidence Link" panel unlocks with the week's affirmation and the finish
 * button — disabled until then — completes the step. Distinct look from the
 * Week 1 shield-log challenge.
 */
export interface PrivacyProtectorChallengeStep extends BaseExercise {
  type: 'privacy-protector-challenge';
  badge: string;
  title: string;
  intro: string;
  listHeading: string;
  listInstruction: string;
  listItemPlaceholder: string;
  listCount: number;
  phraseHeading: string;
  phrase: string;
  phraseInstruction: string;
  practiceLabel: string;
  practisedLabel: string;
  logHeading: string;
  logInstruction: string;
  dayCount: number;
  dayLabel: string;
  askedQuestion: string;
  yesLabel: string;
  noLabel: string;
  responseLabel: string;
  responsePlaceholder: string;
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceText: string;
  lockedCompleteLabel: string;
  completeLabel: string;
  parentNote: string;
  footerText: string;
}

/**
 * A "Think Before You Click" challenge-of-the-week tracker (Habits module) — a
 * vertical stack of five "checkpoint" cards, each with a shield that seals shut
 * once its day is logged. Each day the learner ticks a short "pause and ask"
 * safety check (every box required), then types one safe decision they made and
 * one thing they avoided (both required) before that day's shield can be sealed.
 * When all five shields are sealed a "Confidence Link" panel unlocks with the
 * week's affirmation, and the finish button — disabled until then — completes the
 * step (and, as the module's last step, the module). Distinct look from the
 * other trackers: emerald "security log" cards with a sealing-shield motif.
 */
export interface ThinkBeforeClickChallengeStep extends BaseExercise {
  type: 'think-before-click-challenge';
  badge: string;
  title: string;
  intro: string;
  /** Number of checkpoint days, e.g. 5. */
  dayCount: number;
  /** Short prefix on each card, e.g. "Day" → "Day 1". */
  dayLabel: string;
  pauseHeading: string;
  /** The "pause and ask" questions the learner ticks each day, e.g. "Is this safe?". */
  checks: string[];
  safeDecisionLabel: string;
  safeDecisionPlaceholder: string;
  avoidedLabel: string;
  avoidedPlaceholder: string;
  sealLabel: string;
  sealedLabel: string;
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceText: string;
  lockedCompleteLabel: string;
  completeLabel: string;
  parentNote: string;
  footerText: string;
}

/** One habit tracked across the Digital Responsibility Tracker's 5-day grid, e.g. "I was kind online". */
export interface DigitalResponsibilityHabit {
  id: string;
  icon: string;
  label: string;
}

/** One sentence-completion line in the tracker's final structured reflection. */
export interface DigitalResponsibilityReflectionField {
  id: string;
  /** The sentence stem the learner completes, e.g. "I made safe choices:". */
  label: string;
  placeholder: string;
}

/**
 * The module's "Final Challenge" — a Digital Responsibility Tracker (Habits
 * module, Week 4) that draws the four weeks together. A report-card dashboard
 * on the module's teal: a grid of four habit rows (safe use, privacy, screen
 * time, kindness) across five day columns, each cell a YES / NO tick, with a
 * per-habit streak strip. Once every cell is logged (either answer counts) a
 * structured final reflection unfolds — three sentence-completion fields, all
 * required, no free-form box — followed by a "Confidence Link" panel with the
 * closing affirmation to tick. The finish button, disabled until the grid,
 * reflection and pledge are all done, completes the step and the module.
 * Distinct look from the weekly trackers: a four-pillar grid dashboard, not a
 * day-card stack.
 */
export interface DigitalResponsibilityTrackerStep extends BaseExercise {
  type: 'digital-responsibility-tracker';
  badge: string;
  title: string;
  intro: string;
  habitsHeading: string;
  habits: DigitalResponsibilityHabit[];
  dayCount: number;
  dayLabel: string;
  yesLabel: string;
  noLabel: string;
  trackNote: string;
  reflectionHeading: string;
  reflectionInstruction: string;
  reflectionFields: DigitalResponsibilityReflectionField[];
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceText: string;
  pledgeLabel: string;
  lockedCompleteLabel: string;
  completeLabel: string;
  parentNote: string;
  footerText: string;
}

/** One editable line in the learner's screen-time plan, e.g. "Daily screen limit". */
export interface ScreenTimePlanField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * A "Screen Time Plan" challenge-of-the-week tracker (Habits module, Week 3).
 * Two phases on a phone-dashboard surface. First the learner fills in a short
 * plan card styled like a device settings screen — three rows (daily limit,
 * "no screens before", "break after"), all required. Filling the plan unlocks
 * a 5-day streak strip below it: each day is a chip with a "Did I follow my
 * plan?" YES / NO answer, and every day must be logged (either answer counts —
 * the point is honest tracking). Once all five days are logged a "Confidence
 * Link" panel appears with the week's affirmation to tick. The finish button —
 * disabled until the plan is set, all days logged and the pledge ticked —
 * completes the step and, as the module's last step, the module. Distinct look
 * from the Week-1 shields and Week-2 dossier: an indigo device dashboard with a
 * settings-style plan card and a calendar streak strip.
 */
export interface ScreenTimePlanChallengeStep extends BaseExercise {
  type: 'screen-time-plan-challenge';
  badge: string;
  title: string;
  intro: string;
  planHeading: string;
  planInstruction: string;
  planFields: ScreenTimePlanField[];
  trackHeading: string;
  trackInstruction: string;
  dayCount: number;
  dayLabel: string;
  followQuestion: string;
  yesLabel: string;
  noLabel: string;
  confidenceHeading: string;
  confidenceQuote: string;
  confidenceText: string;
  pledgeLabel: string;
  lockedCompleteLabel: string;
  completeLabel: string;
  parentNote: string;
  footerText: string;
}

/**
 * A "Challenge of the Week" tracker (Etiquette module) built as a five-day
 * timeline. Each day is a card with the same two-point "before you send" check
 * (both must be ticked) and a box to rewrite one message more politely (must
 * be filled) before that day can be marked done. When all five days are done,
 * a "Confidence Link" panel unfurls with an affirmation the learner ticks to
 * finish the week. Distinct look from the other trackers — vertical rail,
 * per-day rewrite journal, closing pledge.
 */
export interface PoliteMessageChallengeStep extends BaseExercise {
  type: 'polite-message-challenge';
  title: string;
  intro: string;
  /** The recurring "check before you send" points, e.g. ["Is it kind?", "Is it respectful?"]. */
  checkItems: string[];
  rewritePrompt: string;
  rewritePlaceholder: string;
  /** Number of day cards, e.g. 5. */
  dayCount: number;
  confidenceLabel: string;
  confidenceStatement: string;
  pledgeLabel: string;
  completeLabel: string;
}

/** One free-text field logged for each day of a KindCommentChallengeStep. */
export interface KindCommentTrackField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * A "Challenge of the Week" tracker (Etiquette module, Week 2) shaped as a
 * five-entry kindness journal. Each day is an expanding journal card (only one
 * open at a time): the learner ticks the day's kind actions and writes a short
 * log for each track field, then saves the entry. Completed days bloom into a
 * streak of icons. When all five entries are logged, a "Confidence Link" panel
 * unfurls with an affirmation to tick before finishing. Distinct look from the
 * Week 1 challenge rail — warm journal cards, a growth streak, closing pledge.
 */
export interface KindCommentChallengeStep extends BaseExercise {
  type: 'kind-comment-challenge';
  title: string;
  intro: string;
  /** The daily kind-action checkboxes, both required to complete a day. */
  dailyActions: string[];
  /** The short log prompts filled in for each day. */
  trackFields: KindCommentTrackField[];
  dayCount: number;
  confidenceLabel: string;
  confidenceStatement: string;
  pledgeLabel: string;
  completeLabel: string;
}

/** One behaviour/meaning pair in a BehaviourMatchStep. */
export interface BehaviourMatchPair {
  id: string;
  /** The behaviour word, e.g. "Respect". */
  behaviour: string;
  /** An emoji avatar that pictures the behaviour, e.g. "🤝". */
  avatar: string;
  /** The meaning the learner must match to it, e.g. "Treating others well". */
  meaning: string;
}

/**
 * A "match the meaning to the behaviour" warm-up (Etiquette module) — behaviour
 * cards (each with an emoji avatar) on the left, the meanings shuffled into a
 * pool on the right. The learner taps a behaviour then its meaning; a correct
 * pair locks with a shared colour, a wrong pair flashes and clears. The
 * Continue button stays disabled until every pair is matched, so nothing is
 * skippable. A parent-assist note sits at the foot of the step.
 */
export interface BehaviourMatchStep extends BaseExercise {
  type: 'behaviour-match';
  title: string;
  intro: string;
  behaviourHeading: string;
  meaningHeading: string;
  pairs: BehaviourMatchPair[];
  parentNote: string;
  completeLabel: string;
}

/** One statement the learner stamps True or False in a TrueFalseWarmupStep. */
export interface TrueFalseWarmupStatement {
  id: string;
  text: string;
  /** The correct verdict for this statement. */
  answer: boolean;
  /** Short affirmation shown once the learner stamps it correctly. */
  praise: string;
}

/**
 * A "fact check" True/False warm-up (Etiquette module, Week 3) built as a
 * single-card verdict deck. One statement shows at a time on a scanner-style
 * card with a big TRUE and a big FALSE stamp button. A correct stamp thuds
 * down, the card flips to a green confirmed state with its praise line, and
 * drops onto a growing "sorted" board split into True and False columns; a
 * wrong stamp shakes the card and shows a nudge to look again. The Continue
 * button stays disabled until every statement is stamped correctly, so nothing
 * is skippable. A parent-assist note sits at the foot of the step.
 */
export interface TrueFalseWarmupStep extends BaseExercise {
  type: 'true-false-warmup';
  title: string;
  intro: string;
  statements: TrueFalseWarmupStatement[];
  trueLabel: string;
  falseLabel: string;
  parentNote: string;
  completeLabel: string;
}

/** One reading the learner rules TRUE or FALSE on the screen-health scanner. */
export interface ScreenTruthCheckStatement {
  id: string;
  text: string;
  /** The correct verdict for this reading. */
  answer: boolean;
  /** One-line takeaway revealed once the learner rules on it correctly. */
  insight: string;
}

/**
 * A "screen-health scan" True/False warm-up (Habits module, Week 3). Every
 * reading is listed at once as a row on a phone-diagnostics panel, each with a
 * TRUE / FALSE segmented switch on the right and a circular "scan progress"
 * ring at the top. A correct ruling locks the row green, reveals its insight
 * line and advances the ring; a wrong ruling buzzes the row red with a
 * "re-scan" hint and does not lock. The Continue button stays disabled until
 * every row is ruled correctly, so nothing is skippable. A parent-assist note
 * sits at the foot. Deliberately unlike the Week-1 circuit rail and the
 * Etiquette fact-check card deck — a static diagnostics list, not a one-card
 * deck.
 */
export interface ScreenTruthCheckStep extends BaseExercise {
  type: 'screen-truth-check';
  title: string;
  intro: string;
  statements: ScreenTruthCheckStatement[];
  trueLabel: string;
  falseLabel: string;
  scanCompleteHeading: string;
  scanCompleteText: string;
  parentNote: string;
  completeLabel: string;
}

/**
 * A "Challenge of the Week" tracker (Etiquette module, Week 3) shaped as a
 * five-light signal strip. Each day is a stop light that starts red: the
 * learner flips both "before posting" checks (styled as switches) to clear it
 * to amber, then writes one good decision they made that day to turn it green
 * and log the day. Only one day console is open at a time; cleared days stay
 * green in the strip. When all five lights are green, a "Confidence Link" panel
 * unfurls with an affirmation to tick before finishing. Distinct look from the
 * Week 1 rail and Week 2 journal — a signal strip, a pause console, switch
 * toggles.
 */
export interface PauseBeforePostingStep extends BaseExercise {
  type: 'pause-before-posting';
  title: string;
  intro: string;
  /** Heading over the recurring checks, e.g. "Before posting, ask:". */
  checkPrompt: string;
  /** The recurring checks, both required — e.g. ["Is it respectful?", "Did I get permission?"]. */
  checkItems: string[];
  decisionPrompt: string;
  decisionPlaceholder: string;
  dayCount: number;
  confidenceLabel: string;
  confidenceStatement: string;
  pledgeLabel: string;
  completeLabel: string;
}

/** One draft message with a missing word in a KindWordsFillBlankStep. */
export interface KindWordsBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** Words that correctly fill the blank — more than one when the sentence accepts alternatives. */
  answers: string[];
  /** Wrong words shown alongside the answers as tappable chips. */
  distractors: string[];
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * A "kind words" fill-in-the-blank warm-up (Habits module, Week 4) shaped as a
 * phone message thread. Each sentence is a half-typed chat bubble with a
 * glowing gap; under it sits a shuffled row of word chips (that sentence's
 * answers plus a couple of distractors). Tapping the right word drops it into
 * the gap, the bubble "sends" with a kind-hearted glow and its praise line
 * shows; a wrong chip buzzes and clears. A heart meter fills as bubbles are
 * sent. The Continue button stays disabled until every message is completed, so
 * nothing is skippable. A parent-assist note sits at the foot. Deliberately
 * unlike the Etiquette chalkboard word-bank — a chat composer with per-sentence
 * chips, and sentences that can accept more than one right word.
 */
export interface KindWordsFillBlankStep extends BaseExercise {
  type: 'kind-words-fill-blank';
  title: string;
  intro: string;
  sentences: KindWordsBlankSentence[];
  parentNote: string;
  completeHeading: string;
  completeText: string;
  completeLabel: string;
}

/** One sentence with a single blank in a FillBlankWarmupStep. */
export interface FillBlankSentence {
  id: string;
  /** Sentence text before the blank. */
  before: string;
  /** Sentence text after the blank. */
  after: string;
  /** The word that belongs in the blank. */
  answer: string;
  /** Short affirmation shown once the blank is filled correctly. */
  praise: string;
}

/**
 * A "fill in the blank" warm-up (Etiquette module, Week 4) built as a
 * chalkboard word-bank game. All the answer words sit shuffled in a word bank;
 * each sentence below has one empty slot. The learner taps a word, then taps a
 * blank — a right word snaps in and the slot turns green, a wrong word shakes
 * the slot and clears the pick. Used words leave the bank. The Continue button
 * stays disabled until every blank is filled, so nothing is skippable. A
 * parent-assist note sits at the foot of the step.
 */
export interface FillBlankWarmupStep extends BaseExercise {
  type: 'fill-blank-warmup';
  title: string;
  intro: string;
  wordBankLabel: string;
  sentences: FillBlankSentence[];
  parentNote: string;
  completeLabel: string;
}

/** One structured sentence-completion field in a DigitalEtiquetteTrackerStep's final reflection. */
export interface DigitalEtiquetteReflectionField {
  id: string;
  /** The sentence stem, e.g. "I showed respect by:". */
  label: string;
  placeholder: string;
}

/**
 * The Etiquette module's Final Challenge (Week 4) — a "report card" grid
 * tracker. The 5 days run across as columns and the tracked habits down as
 * rows; every cell is a Yes/No segmented control the learner sets each day.
 * Below the grid, a structured final reflection asks the learner to complete a
 * few fixed sentence stems (no open writing), then a "Confidence Link"
 * affirmation to tick. Once the grid is fully filled and the reflection
 * complete, a "Final Module Outcome" panel unfurls listing what the learner
 * can now do, and the finish button ends the module. Distinct look from the
 * three weekly challenges — a matrix card, a reflection worksheet, an outcome
 * certificate.
 */
export interface DigitalEtiquetteTrackerStep extends BaseExercise {
  type: 'digital-etiquette-tracker';
  title: string;
  intro: string;
  /** The tracked habits, one grid row each. */
  habits: string[];
  dayCount: number;
  yesLabel: string;
  noLabel: string;
  reflectionHeading: string;
  reflectionFields: DigitalEtiquetteReflectionField[];
  confidenceLabel: string;
  confidenceStatement: string;
  pledgeLabel: string;
  outcomeHeading: string;
  outcomeIntro: string;
  /** What the learner can do at the end of the module. */
  outcomes: string[];
  completeLabel: string;
}

/** One "A vs B" goal choice inside a GoalMatchupStep. */
export interface GoalMatchupOption {
  id: string;
  text: string;
}

/** One round inside a GoalMatchupStep — two goal-phrasing options, one clearly SMARTer. */
export interface GoalMatchupQuestion {
  id: string;
  options: GoalMatchupOption[];
  correctOptionId: string;
  /** Shown after the student picks, e.g. "it's specific and time-bound." */
  explanation: string;
}

/**
 * A "Goal Match-Up!" warm-up game — one round at a time, the student picks
 * which of two lettered goal phrasings (A/B) sounds SMARTer, sees which was
 * right and why, and earns a point for each correct pick before moving on.
 */
export interface GoalMatchupStep extends BaseExercise {
  type: 'goal-matchup';
  badgeIcon: string;
  title: string;
  subtitleStart: string;
  /** Highlighted word/phrase in the subtitle, e.g. "SMARTer". */
  subtitleAccent: string;
  subtitleEnd: string;
  questionHeading: string;
  questions: GoalMatchupQuestion[];
  continueLabel: string;
  /** Heading shown on the results screen after the last question, before continuing. */
  reviewHeading: string;
}

/** One "share a story" prompt card inside a ProudMomentStep. */
export interface ProudMomentPrompt {
  id: string;
  icon: string;
  label: string;
  placeholder: string;
}

/**
 * A mini activity that lets the student share a proud moment either by
 * picking a prompt and typing an answer, or by drawing a picture on a
 * built-in canvas — either is enough to submit.
 */
export interface ProudMomentStep extends BaseExercise {
  type: 'proud-moment';
  mascotImage: string;
  mascotAlt: string;
  heading: string;
  subtitle: string;
  prompts: ProudMomentPrompt[];
  drawSectionTitle: string;
  submitLabel: string;
  tip: string;
}

/** One self-checkable item inside a ChallengeChecklistStep. */
export interface ChallengeChecklistItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/**
 * A "Challenge of the Week" laid out as a tappable checklist with a progress
 * bar — ticking items off is just for the student's own satisfaction (real
 * completion happens outside the app), so the continue button is never
 * gated on it.
 */
export interface ChallengeChecklistStep extends BaseExercise {
  type: 'challenge-checklist';
  badge: string;
  heading: string;
  subtitle: string;
  items: ChallengeChecklistItem[];
  continueLabel: string;
  tip: string;
}

/** One field inside an IdentityPlannerStep, e.g. "I want to…". */
export interface IdentityPlannerField {
  id: string;
  icon: string;
  label: string;
  placeholder: string;
}

/**
 * A short, single-card planning form (goal / action / helper) that doubles
 * as a keepsake — the student can export it as a picture as well as continue.
 */
export interface IdentityPlannerStep extends BaseExercise {
  type: 'identity-planner';
  heading: string;
  subtitle: string;
  fields: IdentityPlannerField[];
  footerNote: string;
  exportLabel: string;
  continueLabel: string;
}

/**
 * A minimal "Challenge of the Week" banner — a gradient title card with a
 * description (one phrase can be highlighted) and a single continue button.
 * No checklist, no items grid — just a closing reminder.
 */
export interface ChallengeBannerStep extends BaseExercise {
  type: 'challenge-banner';
  heading: string;
  title: string;
  descriptionBefore: string;
  descriptionHighlight?: string;
  descriptionAfter?: string;
  continueLabel: string;
  tip: string;
}

/** One tappable card inside a WarmupPickerStep. */
export interface WarmupPickerOption {
  id: string;
  icon: string;
  label: string;
}

/**
 * A "tap all the answers you love" warm-up — a grid of icon+label cards the
 * student can multi-select, no typing at all. There's no right answer, so
 * submitting just needs at least one pick.
 */
export interface WarmupPickerStep extends BaseExercise {
  type: 'warmup-picker';
  badge: string;
  mascotImage: string;
  mascotAlt: string;
  heading: string;
  subtitle: string;
  options: WarmupPickerOption[];
  submitLabel: string;
}

/**
 * A single-field "type it, then preview it" warm-up (e.g. "Mirror Talk") —
 * type a sentence, tap Add, see it reflected back nicely, then continue.
 */
export interface MirrorTalkStep extends BaseExercise {
  type: 'mirror-talk';
  badge: string;
  heading: string;
  subtitle: string;
  fieldPrefix: string;
  fieldPlaceholder: string;
  examples: string[];
  addLabel: string;
  reminderText: string;
  tip: string;
  continueLabel: string;
}

/**
 * A "Challenge of the Week" page — a hero card describing the at-home
 * challenge. Can optionally also carry a Confidence (+ optional Planning)
 * link quote and a closing note, for lessons that don't have a separate
 * `confidence-link` step; when `confidenceQuote` is unset, no quote card is
 * shown at all. When `planningQuote` is set alongside it, the Confidence
 * Link renders as a two-card grid instead of a single full-width card; when
 * `closingHeading` is also set, a closing banner is shown beneath it.
 */
export interface ChallengeConfidenceStep extends BaseExercise {
  type: 'challenge-confidence';
  /** Also doubles as the big two-tone heading in the flat layout (used when `image` is unset). */
  badge: string;
  title: string;
  description: string;
  note?: string;
  /** When unset, renders the flat layout — a big heading instead of a pill, and a plain text card instead of the image hero. */
  image?: string;
  imageAlt?: string;
  /** Label on the confidence-quote card — defaults to "Confidence" when unset. */
  confidenceLabel?: string;
  confidenceQuote?: string;
  planningQuote?: string;
  closingHeading?: string;
  closingText?: string;
  continueLabel: string;
}

/** One tappable scenario card inside a WarmupScenarioStep, e.g. "Would you try a new fruit?". */
export interface WarmupScenarioOption {
  id: string;
  emoji: string;
  label: string;
}

/** One "would you try it?" scenario inside a WarmupScenarioStep. */
export interface WarmupScenario {
  id: string;
  emoji: string;
  prompt: string;
  options: WarmupScenarioOption[];
}

/**
 * A timed warm-up game that steps through a handful of "would you try it?"
 * scenarios, one at a time, with prev/next navigation and a running timer —
 * there's no right answer, so picking any option on every scenario is enough
 * to finish.
 */
export interface WarmupScenarioStep extends BaseExercise {
  type: 'warmup-scenario';
  badgeIcon: string;
  title: string;
  subtitle: string;
  scenarios: WarmupScenario[];
  continueLabel: string;
}

/** One suggested "speak up" moment chip inside a ConfidencePlannerStep. */
export interface SpeakUpIdea {
  id: string;
  icon: string;
  label: string;
}

/** One "how it works" step card inside a ConfidencePlannerStep. */
export interface SpeakUpHowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

/**
 * "Speak Up Stars" — a daily planner closing the week: the student adds one
 * or more "speak up" moments to today's plan (from a suggested list or their
 * own), then ticks each one off after sharing it out loud. Ticking a moment
 * speaks an encouraging voice line aloud. The lesson can only be completed
 * once at least one moment has been added to today's plan and every moment
 * on it has been ticked off.
 */
export interface ConfidencePlannerStep extends BaseExercise {
  type: 'confidence-planner';
  appName: string;
  appTagline: string;
  mascotImage: string;
  mascotAlt: string;
  mascotGreeting: string;
  titleBefore: string;
  titleAccent: string;
  starHint: string;
  planButtonLabel: string;
  image: string;
  imageAlt: string;
  addSectionHeading: string;
  addSectionSubtitle: string;
  ideaOptions: SpeakUpIdea[];
  customHeading: string;
  customEmojis: string[];
  customPlaceholder: string;
  addLabel: string;
  todaysPlanHeading: string;
  celebrationTemplate: string;
  howItWorksHeading: string;
  howItWorks: SpeakUpHowItWorksStep[];
  footerTagline: string;
  footerNote: string;
  voiceMessage: string;
  continueLabel: string;
}

/**
 * A weekly at-home challenge with a day-by-day tick-off tracker (e.g. "Say
 * Something Kind or Share an Idea") — a daily-challenge card, a parent/
 * guardian guidance card, and a Monday–Sunday checklist that fills in a
 * progress bar as days are ticked. Ticking is purely self-reported, so
 * continuing is never blocked on how many days are checked.
 */
export interface ChallengeTrackerStep extends BaseExercise {
  type: 'challenge-tracker';
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  dailyChallengeHeading: string;
  dailyChallengeIntro: string;
  dailyChallengeItems: string[];
  parentHeading: string;
  parentIntro: string;
  parentItems: string[];
  trackerHeading: string;
  trackerIntro: string;
  days: string[];
  /** When set, each day row also gets a short free-text box under it with this label (e.g. "One healthy breakfast food I ate"). Purely self-reported — never gates continuing. */
  dailyNoteLabel?: string;
  /** Placeholder for the per-day note box; only used when `dailyNoteLabel` is set. */
  dailyNotePlaceholder?: string;
  progressHeading: string;
  /** When set, a "Complete:" block of free-text reflection boxes shows below the tracker; Continue is then also gated on every one being answered. Used by a module's final challenge. */
  reflectionHeading?: string;
  reflectionPrompts?: { id: string; label: string; placeholder: string }[];
  continueLabel: string;
}

/** One tappable category card inside a SharingCircleStep, e.g. "My Idea". */
export interface SharingCircleOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  placeholder: string;
}

/**
 * A "pick one thing to share out loud" activity (e.g. "Sharing Circle") —
 * the student picks a single category card, types what they want to share,
 * then taps the submit button to mark that they shared it with the class.
 */
export interface SharingCircleStep extends BaseExercise {
  type: 'sharing-circle';
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  quote: string;
  options: SharingCircleOption[];
  textLabel: string;
  submitLabel: string;
  readyLabel: string;
}

/** One icon-led step inside a WarmupParadeStep's parent activity note, e.g. "Snap a photo". */
export interface ParentActivityItem {
  icon: string;
  title: string;
  description: string;
}

/**
 * An image-led warm-up intro (e.g. "Power Pose Parade") paired with an
 * at-home parent/guardian activity note underneath it — the hero has no
 * interactive choices, so tapping continue is enough to finish it.
 */
export interface WarmupParadeStep extends BaseExercise {
  type: 'warmup-parade';
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  continueLabel: string;
  parentNoteHeading: string;
  parentNoteDescription: string;
  parentNoteItems: ParentActivityItem[];
}

/**
 * A share-and-move warm-up (e.g. "Victory Dance") — the student reads how it
 * works, sees an at-home note for parents, then types one thing they're
 * proud of and submits it to earn their star.
 */
export interface VictoryDanceStep extends BaseExercise {
  type: 'victory-dance';
  pillLabel: string;
  title: string;
  titleEmoji: string;
  image: string;
  imageAlt: string;
  howItWorksHeading: string;
  howItWorksSteps: string[];
  tagline: string;
  parentNoteHeading: string;
  parentNoteDescription: string;
  parentNoteCameraLine: string;
  shareHeading: string;
  placeholder: string;
  maxLength: number;
  submitLabel: string;
}

/**
 * A "type it, watch it become a certificate" activity (e.g. "Confidence
 * Badge") — the student types what makes them confident and sees it mirrored
 * live onto a certificate preview as they type, can download that
 * certificate as a picture, and submits their reflection to earn a star.
 * Continuing is only unlocked after they've submitted.
 */
export interface ConfidenceBadgeStep extends BaseExercise {
  type: 'confidence-badge';
  eyebrow: string;
  title: string;
  subtitle: string;
  promptHeading: string;
  placeholder: string;
  maxLength: number;
  hint: string;
  previewLabel: string;
  certificateTitle: string;
  certificateIntro: string;
  downloadLabel: string;
  submitLabel: string;
  continueLabel: string;
}

/**
 * A single centered card — pill label, bold title, a thin divider, a short
 * subtitle, and a continue button. The plainest challenge layout; used when
 * a week's challenge doesn't need the gradient banner/description card.
 */
export interface ChallengeMinimalStep extends BaseExercise {
  type: 'challenge-minimal';
  pillLabel: string;
  title: string;
  subtitle: string;
  continueLabel: string;
}

/**
 * The closing "Confidence & Planning Link" step — the student fills in a
 * short typed plan (e.g. two things they'll keep practicing and who can
 * help them), then can preview it as a decorative card and download it as a
 * picture before continuing. Continuing is only unlocked after they submit.
 */
export interface ConfidencePlanStep extends BaseExercise {
  type: 'confidence-plan';
  icon: string;
  title: string;
  subtitle: string;
  fields: ShareField[];
  submitLabel: string;
  previewHeading: string;
  cardTitle: string;
  downloadLabel: string;
  continueLabel: string;
}

/** A run of text that is either plain or bold — lets a paragraph highlight a word or phrase (e.g. "**30 seconds**") without full markdown parsing. */
export interface TextRun {
  text: string;
  bold?: boolean;
}

/** One numbered, color-coded step inside a MemoryGameSetupStep's "How to Set It Up" list. */
export interface SetupStep {
  icon: string;
  variant: 'blue' | 'peach' | 'green' | 'purple';
  title: string;
  description: string;
}

/** One way learners can respond inside a MemoryGameSetupStep, e.g. "Type in chat". */
export interface ResponseOption {
  icon: string;
  variant: 'blue' | 'yellow' | 'green';
  label: string;
}

/**
 * Screen 1 of the "What's Missing?" memory warm-up game — a badge, a
 * two-tone title, a subtitle, a card previewing an example item tray, and
 * two side-by-side info cards ("How It Works" / "Online Version").
 */
export interface MemoryGameIntroStep extends BaseExercise {
  type: 'memory-game-intro';
  badge: string;
  titleStart: string;
  titleAccent: string;
  /** Optional trailing glyph rendered in a third, warmer color, e.g. the second "?" in "What's Missing??". */
  titleAccentTail?: string;
  subtitle: string;
  trayHeading: string;
  trayItems: string[];
  trayCaption: string;
  howItWorksTitle: string;
  howItWorksText: TextRun[];
  howItWorksCallout: TextRun[];
  onlineVersionTitle: string;
  onlineVersionText: TextRun[];
  continueLabel: string;
}

/**
 * Screen 2 of the "What's Missing?" memory warm-up game — a title/subtitle,
 * four numbered color-coded setup steps, a "Ways Learners Can Respond" card,
 * and a CTA that advances to whatever comes next (another exercise, or the
 * next lesson if this is the last step).
 */
export interface MemoryGameSetupStep extends BaseExercise {
  type: 'memory-game-setup';
  title: string;
  subtitle: string;
  steps: SetupStep[];
  responseHeading: string;
  responseOptions: ResponseOption[];
  continueLabel: string;
}

/** One numbered, colored step inside an ActivityStepsStep, e.g. "Wake up ☀️". */
export interface ActivityStepItem {
  icon: string;
  bg: 'blue' | 'lavender';
  placeholder: string;
}

/**
 * A simple "draw/write it out in N steps" activity (e.g. "My Morning
 * Plan") — a numbered, colored panel per step with an icon and a single
 * text field, a live "X / N Steps Completed" counter, and a submit button
 * that only unlocks once every step has something typed in it.
 */
export interface ActivityStepsStep extends BaseExercise {
  type: 'activity-steps';
  pillLabel: string;
  title: string;
  subtitle: string;
  steps: ActivityStepItem[];
  progressLabel: string;
  submitLabel: string;
  previewHeading: string;
  cardTitle: string;
  downloadLabel: string;
  continueLabel: string;
}

/**
 * The "Challenge of the Week" tracker — a pill/title/subtitle hero, a light
 * card where the student ticks off a day at a time, a plain week-end
 * reflection prompt, and a closing "confidence mantra" card.
 */
export interface WeeklyChallengeStep extends BaseExercise {
  type: 'weekly-challenge';
  pillLabel: string;
  title: string;
  subtitle: string;
  challengeHeading: string;
  challengeIntro: string;
  days: string[];
  /** Small callout encouraging a parent/guardian to help the student follow through on the challenge, e.g. "👪 Parents: please guide your ward through this challenge each day." */
  parentNote: string;
  reflectionLabel: string;
  reflectionQuote: string;
  mantraIcon: string;
  mantraLabel: string;
  mantraQuote: string;
  continueLabel: string;
}

/** One draggable/tappable destination card in a PlanItRaceStep, e.g. "School". */
export interface PlanItRacePlace {
  id: string;
  label: string;
  /** Emoji glyph representing the place, e.g. "🏫". */
  icon: string;
}

/**
 * A "warm-up game" ordering activity (e.g. "Plan It Race") — the learner
 * drags or taps picture cards into numbered plan slots to arrange them in
 * whatever order makes sense to them (there's no single "correct" order —
 * every child's routine is different), and can download their finished plan
 * as a PNG once every slot is filled. Reaching the next lesson just requires
 * every slot to be filled, not any particular arrangement.
 */
export interface PlanItRaceStep extends BaseExercise {
  type: 'plan-it-race';
  pillLabel: string;
  title: string;
  subtitle: string;
  places: PlanItRacePlace[];
  slotsHeading: string;
  poolHeading: string;
  resetLabel: string;
  continueLabel: string;
  successMessage: string;
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise, e.g. "👪 Parents: please help your child think through their afternoon plan." */
  parentNote: string;
}

/** One draggable/tappable step card in a PlanRelayStep, e.g. "Set a goal". */
export interface PlanRelayOption {
  id: string;
  label: string;
}

/**
 * A "Plan Relay" warm-up game — the learner drags or taps text steps from a
 * pool into numbered order slots, then presses Check Answer to validate the
 * arrangement against one correct sequence. Unlike PlanItRaceStep, there IS a
 * single right order here (the general planning process), so an incorrect
 * arrangement must be retried before the learner can download their plan or
 * move on.
 */
export interface PlanRelayStep extends BaseExercise {
  type: 'plan-relay';
  pillLabel: string;
  title: string;
  subtitle: string;
  stepsHeading: string;
  orderHeading: string;
  options: PlanRelayOption[];
  /** Ids from `options`, listed in the one correct order. */
  correctOrder: string[];
  checkLabel: string;
  tryAgainLabel: string;
  successMessage: string;
  retryMessage: string;
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One tappable, checkable task inside a DayChecklistSection. */
export interface DayChecklistTask {
  id: string;
  label: string;
}

/** One time-of-day panel inside a DayChecklistPlannerStep, e.g. "Morning". */
export interface DayChecklistSection {
  id: string;
  icon: string;
  label: string;
  theme: 'orange' | 'blue' | 'purple';
  /** Starter tasks pre-filled for this section — the learner can also add their own. */
  tasks: DayChecklistTask[];
}

/**
 * An "activity" planning exercise (e.g. "Saturday Planner") — three
 * time-of-day panels (morning/afternoon/evening) each holding a checklist of
 * starter tasks the learner can tick off, plus an "add your own task" input
 * per panel. The learner can download their plan as a PNG at any time, but
 * reaching the next lesson requires every task (starter and added) to be
 * checked off.
 */
export interface DayChecklistPlannerStep extends BaseExercise {
  type: 'day-checklist-planner';
  /** Small date pill above the title, e.g. "📅 Thursday, December 4". When omitted, today's date is shown. */
  dateLabel?: string;
  title: string;
  subtitle: string;
  sections: DayChecklistSection[];
  addPlaceholder: string;
  addButtonLabel: string;
  footerNote: string;
  continueLabel: string;
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/** One day card in a WeeklyTaskPlannerStep, e.g. "Monday" — the learner fills in its tasks themselves, so there are no starter tasks. */
export interface WeeklyPlannerDay {
  id: string;
  /** 1-7, shown as "DAY {dayNumber}". */
  dayNumber: number;
  label: string;
}

/**
 * A "one-week planner + Celebration Box" activity — the learner types their
 * own tasks into 7 day cards (Monday-Sunday) and taps a task to mark it done.
 * A "Celebration Box" panel tracks progress across every day and stays locked
 * (no celebration textarea) until every added task is checked; only then can
 * the learner write their celebration note, download the finished card as a
 * PNG, and proceed to the next lesson.
 */
export interface WeeklyTaskPlannerStep extends BaseExercise {
  type: 'weekly-task-planner';
  instruction: string;
  days: WeeklyPlannerDay[];
  addPlaceholder: string;
  celebrationHeading: string;
  celebrationSubtitle: string;
  progressLabel: string;
  lockedPlaceholder: string;
  celebrationPlaceholder: string;
  proceedLabel: string;
  footerNote: string;
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/**
 * A "Challenge of the Week" summary page — small "THIS WEEK" eyebrow, a bold
 * heading, a gradient-topped card with a "Weekly Challenge" pill, the
 * challenge description, and a couple of short pill tags naming its steps,
 * followed by a separate Confidence Link quote box and a closing button.
 */
export interface ChallengeOfTheWeekStep extends BaseExercise {
  type: 'challenge-of-the-week';
  eyebrow: string;
  heading: string;
  pillLabel: string;
  description: string;
  tags: string[];
  confidenceLabel: string;
  confidenceQuote: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One icon-circle row inside a ChallengeConfidenceWeekStep, e.g. "Use the One-Week Planner". */
export interface ChallengeConfidenceWeekItem {
  icon: string;
  iconVariant: 'blue' | 'peach' | 'green' | 'purple';
  title: string;
  description: string;
}

/**
 * A "Challenge of the Week" summary combining a "This Week" pill + title, a
 * card listing icon/title/description challenge rows, and a second
 * "Confidence Link" card with a quoted affirmation and a "remember this
 * daily" toggle, ending in a full-width continue button. Distinct from the
 * plainer `ChallengeOfTheWeekStep`/`WeeklyChallengeStep` types, which don't
 * support icon rows or the remember-daily toggle.
 */
export interface ChallengeConfidenceWeekStep extends BaseExercise {
  type: 'challenge-confidence-week';
  eyebrowIcon: string;
  eyebrow: string;
  heading: string;
  items: ChallengeConfidenceWeekItem[];
  confidenceIcon: string;
  confidenceLabel: string;
  confidenceQuote: string;
  rememberToggleLabel: string;
  continueLabel: string;
}

/** One colored instruction card inside a DetectiveChallengeStep's step-by-step list. */
export interface DetectiveChallengeCard {
  icon: string;
  title: string;
  description: string;
}

/** One reflection question inside a DetectiveChallengeStep. */
export interface DetectiveChallengeQuestion {
  id: string;
  text: string;
}

/** One checkable success-criteria item inside a DetectiveChallengeStep. */
export interface DetectiveChallengeCriterion {
  id: string;
  text: string;
}

/**
 * A "Detective Mission"-style weekly challenge — a hero banner (mission pill,
 * struck-through/accent title, illustration, Start/Goals buttons), a "you
 * must" instructions card with a 2x2 grid of colored step cards, a Reflection
 * Questions grid, a Success Criteria card the student must check off in full
 * before continuing, and a closing Confidence Link banner with quote and tags.
 * Unlike `ChallengeOfTheWeekStep`/`ChallengeConfidenceWeekStep`, the continue
 * button here is gated: it stays disabled until every success-criteria item
 * is checked.
 */
export interface DetectiveChallengeStep extends BaseExercise {
  type: 'detective-challenge';
  eyebrow: string;
  missionPill: string;
  titleStart: string;
  titleAccent: string;
  titleStrike: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  startLabel: string;
  goalsLabel: string;
  stepsHeading: string;
  stepsSubtitle: string;
  steps: DetectiveChallengeCard[];
  reflectionHeading: string;
  reflectionQuestions: DetectiveChallengeQuestion[];
  successHeading: string;
  successCriteria: DetectiveChallengeCriterion[];
  successFooter: string;
  confidenceLabel: string;
  confidenceQuote: string;
  confidenceDescription: string;
  encouragement: string;
  tags: string[];
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One selectable mood option inside a DailyFeelingsCheckinStep, e.g. "😊 Happy". */
export interface DailyFeelingsCheckinMood {
  id: string;
  emoji: string;
  label: string;
}

/** One time-of-day slot inside a DailyFeelingsCheckinStep, e.g. "Morning". */
export interface DailyFeelingsCheckinSlot {
  id: string;
  label: string;
  question: string;
}

/**
 * A "Challenge of the Week" mood tracker — a day selector (defaults to
 * today) with a Morning/Afternoon/Evening card underneath, each letting the
 * student tap the mood they felt. Logging every slot for the selected day is
 * enough to unlock Continue, but the student's picks for every day persist
 * (via ProgressService, keyed by this step's id) so they can come back later
 * in the week and fill in another day without losing what they've already
 * logged.
 */
export interface DailyFeelingsCheckinStep extends BaseExercise {
  type: 'daily-feelings-checkin';
  badge: string;
  titlePlain: string;
  titleAccent: string;
  subtitle: string;
  timeSlots: DailyFeelingsCheckinSlot[];
  moods: DailyFeelingsCheckinMood[];
  feedbackLabel: string;
  feedbackText: string;
  confidenceLabel: string;
  confidenceText: string;
  continueLabel: string;
}

/** One colored reference card inside a SmartGoalsLessonStep, e.g. the "S — Specific" card. */
export interface SmartGoalsCard {
  letter: string;
  icon: string;
  color: 'coral' | 'green' | 'gold' | 'purple' | 'sky';
  title: string;
  description: string;
  example: string;
}

/**
 * A reference-chart lesson step — a centered header (eyebrow + title +
 * subtitle) above a grid of colored cards, one per letter of an acronym,
 * each with a letter badge, a small icon, a short explanation, and a
 * white "Example:" quote box.
 */
export interface SmartGoalsLessonStep extends BaseExercise {
  type: 'smart-goals-lesson';
  eyebrow: string;
  heading: string;
  subtitle: string;
  cards: SmartGoalsCard[];
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** The dropdown choices offered by a SmartGoalBuilderStep's sentence-builder row. */
export interface SmartGoalBuilderOptions {
  activities: string[];
  minutes: number[];
  times: string[];
  weeks: number[];
}

/**
 * A "build your own SMART goal" activity — a fill-in-the-blank sentence
 * builder ("I will ___ for ___ minutes ___ every day for ___ week(s).")
 * with dropdowns for each blank, a free-text override for the activity, a
 * live preview of the assembled goal, and a list of example goals. The
 * learner must confirm their goal before continuing, and can download it
 * as a PNG at any point.
 */
export interface SmartGoalBuilderStep extends BaseExercise {
  type: 'smart-goal-builder';
  title: string;
  cardHeading: string;
  options: SmartGoalBuilderOptions;
  customActivityLabel: string;
  customActivityPlaceholder: string;
  previewLabel: string;
  confirmLabel: string;
  examplesIcon: string;
  examplesHeading: string;
  examples: string[];
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** The reassurance message shown at one particular day-completion count inside a GoalChallengeTrackerStep. */
export interface GoalChallengeQuote {
  quote: string;
  caption: string;
}

/**
 * A "3-day mini goal challenge" tracker — the learner types (or accepts a
 * default) goal, starts the challenge, then taps a star for each of 3 days
 * to mark it complete. A progress bar and a reassurance quote (which changes
 * with how many days are done) sit below the tracker. The learner can
 * download their goal as a PNG at any point, but reaching the next lesson
 * requires all 3 days to be marked complete.
 */
export interface GoalChallengeTrackerStep extends BaseExercise {
  type: 'goal-challenge-tracker';
  icon: string;
  title: string;
  subtitle: string;
  goalPromptHeading: string;
  goalPromptSubtitle: string;
  defaultGoal: string;
  startLabel: string;
  goalLabel: string;
  tapLabel: string;
  dayLabels: string[];
  progressLabel: string;
  confidenceIcon: string;
  confidenceLabel: string;
  /** Reassurance quote/caption for each day-completion count, index 0 = no days done, up to index = dayLabels.length (all days done). */
  quotesByDaysComplete: GoalChallengeQuote[];
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/** One decorative mode badge (e.g. "Think it") shown under a ConfidenceGoalTrackerStep's goal card. */
export interface ConfidenceGoalModeBadge {
  icon: string;
  label: string;
  color: 'pink' | 'blue' | 'green';
}

/**
 * A "Confidence & Planning Link" closer — a two-column hero (headline +
 * subtitle on the right, an illustration on the left) above a "My goal
 * today" card where the learner adds their own small goals to a star list
 * and taps each one to mark it complete. The learner can download their
 * list as a PNG once marked complete, and reaching the next lesson (or
 * completing the week) requires every goal on the list to be checked off.
 */
export interface ConfidenceGoalTrackerStep extends BaseExercise {
  type: 'confidence-goal-tracker';
  eyebrowIcon: string;
  eyebrowLabel: string;
  heading: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  cardHeading: string;
  cardSubtitle: string;
  inputPlaceholder: string;
  addButtonLabel: string;
  defaultGoals: string[];
  modeBadges: ConfidenceGoalModeBadge[];
  cardTitle: string;
  downloadLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
  continueLabel: string;
}

/**
 * A "Final Challenge" closer (e.g. "Empathy in Action") — a title/subtitle
 * hero, a photo card paired side-by-side with a typed "what will you do
 * today?" card (free text plus tappable suggestion chips), and a full-width
 * Confidence Link quote card underneath. Submitting the typed action awards
 * the star and completes the lesson/module in one step, like
 * `KindWatchChallengeStep`.
 */
export interface KindActionChallengeStep extends BaseExercise {
  type: 'kind-action-challenge';
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  promptHeading: string;
  placeholder: string;
  suggestions: string[];
  submitLabel: string;
  confidenceLabel: string;
  confidenceQuote: string;
  footerTagline: string;
}

/** One prompt inside a YesNoQuizStep, e.g. "Eating healthy food helps my body." */
export interface YesNoQuizQuestion {
  id: string;
  prompt: string;
  correctAnswer: 'yes' | 'no';
  feedbackText: string;
}

/**
 * A "Yes or No?" warm-up quiz (e.g. "Respect Myself!") — one statement at a
 * time, the student taps YES or NO to say whether it shows the target
 * behavior. Picking wrong lets them try again; picking right shows the
 * affirming feedback text and advances, the same "must get every answer
 * right to proceed" rule as `PictureFeelingsQuizStep`/`DiscussionQuizStep`.
 */
export interface YesNoQuizStep extends BaseExercise {
  type: 'yes-no-quiz';
  badge: string;
  heading: string;
  subtitle: string;
  questions: YesNoQuizQuestion[];
  yesLabel: string;
  noLabel: string;
  continueLabel: string;
}

/** One "get inspired" example card inside a PhotoUploadActivityStep, e.g. "Sleeping Well". */
export interface PhotoUploadIdea {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

/**
 * A "draw or upload a picture of yourself" activity (e.g. "Show Your Happy
 * Self!") — a row of "get inspired" example cards, then an upload dropzone
 * where the student picks an image file, previews it, and submits it (stored
 * as a data URL, the same way `ProudMomentStep`'s canvas drawing is). Reaching
 * the next lesson requires a picture to be chosen first.
 *
 * When `steps` is set instead of `inspireHeading`/`ideas`, the view renders a
 * simpler layout — a numbered row of short instructions (e.g. "1 Pick your
 * space") above the dropzone, with "Choose Photo"/upload-and-submit as two
 * inline buttons — instead of the "get inspired" example gallery.
 */
export interface PhotoUploadActivityStep extends BaseExercise {
  type: 'photo-upload-activity';
  badge?: string;
  titleStart: string;
  /** Accent-colored middle part of the title, e.g. "Happy Self". */
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  inspireHeading?: string;
  ideas?: PhotoUploadIdea[];
  /** Short numbered instructions (e.g. "Pick your space") shown above the dropzone instead of the "get inspired" gallery. */
  steps?: string[];
  yourTurnHeading?: string;
  uploadInstruction?: string;
  uploadHeading?: string;
  uploadDescription?: string;
  chooseLabel: string;
  changeLabel: string;
  submitLabel: string;
  /** Shown under the dropzone, e.g. reminding a parent/caregiver to help with this activity. */
  parentNote?: string;
}

/**
 * A "Challenge of the Week" + "Confidence Line" closer (e.g. "Believe in
 * Yourself") — a greeting hero above two side-by-side cards: a tap-to-check
 * 7-day challenge tracker, and a confidence-quote card with "Share"/"New
 * Quote" actions. Reaching the next lesson only requires at least one day to
 * be checked off, not the full week — the tracker stays open for ongoing
 * self-reporting like `ChallengeTrackerStep`.
 */
export interface BelieveInYourselfChallengeStep extends BaseExercise {
  type: 'believe-in-yourself-challenge';
  greetingBadge: string;
  title: string;
  subtitle: string;
  weekPillLabel: string;
  challengeIcon: string;
  challengeImage: string;
  challengeImageAlt: string;
  challengeHeading: string;
  challengeDescription: string;
  /** Bold, accent-colored trailing phrase of the description, e.g. "Practice makes perfect". */
  challengeHighlight: string;
  totalDays: number;
  confidenceIcon: string;
  confidenceImage: string;
  confidenceImageAlt: string;
  confidenceHeading: string;
  /** One or more quotes the "New Quote" button cycles through. */
  confidenceQuotes: string[];
  shareLabel: string;
  newQuoteLabel: string;
  parentNote: string;
  completeLabel: string;
}

/** One scenario inside a WhatWouldYouDoQuizStep — a two-option "which is respectful?" prompt. */
export interface WhatWouldYouDoQuestion {
  id: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
  /** Shown briefly once the student picks the respectful option, before the question advances. */
  feedbackText: string;
}

/**
 * A "What Would You Do?" scenario quiz — a week pill, title, and icon
 * subtitle above a "Question X of Y" counter with a star-per-question
 * progress row and bar, then a card with the scenario and two full-width
 * answer buttons. Picking wrong shows feedback and lets the student try
 * again instead of advancing, the same "must get every answer right to
 * proceed" rule as `DiscussionQuizStep`/`YesNoQuizStep`.
 */
export interface WhatWouldYouDoQuizStep extends BaseExercise {
  type: 'what-would-you-do-quiz';
  weekPillIcon: string;
  weekPill: string;
  title: string;
  subtitleIcon: string;
  subtitleText: string;
  questions: WhatWouldYouDoQuestion[];
  hintText: string;
  continueLabel: string;
}

/** One choosable symbol inside a StickerPosterStep, e.g. "👂 Listening — I listen carefully". */
export interface StickerOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

/**
 * A "build a mini poster" activity — the student names their poster, taps
 * sticker cards to add/remove symbols, and watches them appear live on a
 * poster preview below. "Save Poster" downloads the poster as a PNG and
 * completes the step; at least one sticker must be picked first. There's no
 * right/wrong combination, so any picked stickers are enough to finish.
 */
export interface StickerPosterStep extends BaseExercise {
  type: 'sticker-poster';
  title: string;
  subtitle: string;
  namePlaceholder: string;
  chooseHeading: string;
  stickers: StickerOption[];
  posterSectionHeading: string;
  posterTitle: string;
  posterEmptyText: string;
  posterFooterIcons: string;
  footerTagline: string;
  startOverLabel: string;
  saveLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/**
 * A "Challenge of the Week" + "Confidence Line" closer (e.g. "Kindness
 * Corner") — a centered title/subtitle, then a single card split into two
 * columns: the challenge (a short intro and a row of word pills) on the
 * left, a photo on the right; a gradient "Confidence Line" quote banner sits
 * beneath it, followed by a single "Complete Lesson" button.
 */
export interface KindnessCornerChallengeStep extends BaseExercise {
  type: 'kindness-corner-challenge';
  titleIcon: string;
  title: string;
  subtitle: string;
  challengeIcon: string;
  challengeLabel: string;
  challengeIntro: string;
  words: string[];
  image: string;
  imageAlt: string;
  confidenceIcon: string;
  confidenceLabel: string;
  confidenceQuote: string;
  completeLabel: string;
}

/** One colored word/phrase run inside a WeeklyChallengeShowcaseStep's challenge description, e.g. the "bag" in "your shoes, bag, books, or bed". */
export interface WeeklyChallengeShowcaseTextSegment {
  text: string;
  color?: 'blue' | 'green' | 'purple';
}

/**
 * A "Weekly Challenge" closer — a two-tone page heading and subtitle, a
 * white "Challenge of the Week" card (star-icon heading + a description
 * with individually colored word runs), a standalone photo, an amber
 * "Confidence Line" quote card, and a "Complete Lesson" button under a
 * closing tagline.
 */
export interface WeeklyChallengeShowcaseStep extends BaseExercise {
  type: 'weekly-challenge-showcase';
  titleStart: string;
  /** Accent-colored second part of the page heading, e.g. "Challenge". */
  titleAccent: string;
  subtitle: string;
  challengeIcon: string;
  challengeHeading: string;
  descriptionSegments: WeeklyChallengeShowcaseTextSegment[];
  image: string;
  imageAlt: string;
  confidenceIcon: string;
  confidenceLabel: string;
  confidenceQuote: string;
  /** Shown under the confidence card, e.g. reminding a parent/caregiver to help with this activity. */
  parentNote: string;
  completeLabel: string;
  footerTagline: string;
}

/** One picture-pair question inside a SameOrDifferentQuizStep. */
export interface SameOrDifferentQuizQuestion {
  id: string;
  image: string;
  imageAlt: string;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: string;
}

/**
 * A "Week N intro + warm-up" combined page (e.g. "Respect for Differences")
 * — a title/subtitle hero, a banner introducing the warm-up game (icon,
 * heading, description, question-count pill), then the graded picture-pair
 * quiz itself: a "Question X of Y" / running-score row, a progress bar, a
 * photo of two children side by side, a prompt, and a 2x2 grid of lettered-
 * free answer buttons. Picking wrong lets the student try again; picking
 * right advances and adds a point to the score, the same "must get every
 * answer right to proceed" rule as `PictureFeelingsQuizStep`.
 */
export interface SameOrDifferentQuizStep extends BaseExercise {
  type: 'same-or-different-quiz';
  weekPill: string;
  title: string;
  /** Accent-colored trailing word(s) of the title, e.g. "Differences". */
  titleAccent: string;
  subtitle: string;
  bannerAvatar: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerCountIcon: string;
  bannerCountLabel: string;
  questions: SameOrDifferentQuizQuestion[];
  scoreLabel: string;
  doneHeadline: string;
  continueLabel: string;
}

/** One tappable doodle "friend" figure inside a DiversityPosterStep, e.g. "🧒🏽 Kojo — loves football". */
export interface DiversityPosterFigure {
  id: string;
  emoji: string;
  label: string;
}

/**
 * A "build a collage" activity (e.g. "We Are Different, We Are Friends
 * Poster") — the student names their poster, taps doodle "friend" figures
 * (different skin tones, hairstyles, and hobbies) to add them to a collage,
 * and can also upload their own photos to add alongside the doodles. Every
 * added figure/photo appears live on a poster preview below, individually
 * removable. "Save Poster" renders the collage (doodles + uploaded photos,
 * both as circular avatars) to a PNG and completes the step; at least one
 * figure or photo must be added first.
 */
export interface DiversityPosterStep extends BaseExercise {
  type: 'diversity-poster';
  badge: string;
  title: string;
  subtitle: string;
  namePlaceholder: string;
  figuresHeading: string;
  figures: DiversityPosterFigure[];
  uploadHeading: string;
  uploadButtonLabel: string;
  posterSectionHeading: string;
  posterEmptyText: string;
  footerTagline: string;
  startOverLabel: string;
  saveLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/** One colored word/phrase run inside a KindnessBannerChallengeStep's challenge or confidence text, e.g. the "kind" in "Say something kind...". */
export interface KindnessBannerTextSegment {
  text: string;
  color?: 'blue' | 'orange';
}

/**
 * A "Challenge of the Week" closer — a textured cloud-pattern banner (an
 * icon medallion overlapping a title + subtitle) above a white card with a
 * pill-badged challenge sentence (individually colored word runs) and a
 * decorative icon row, then a tinted "Confidence Line" quote panel, and a
 * single gradient "Complete Lesson" button. The module completes (learner
 * earns a trophy) once this step is finished.
 */
export interface KindnessBannerChallengeStep extends BaseExercise {
  type: 'kindness-banner-challenge';
  bannerIcon: string;
  title: string;
  subtitle: string;
  challengeBadgeIcon: string;
  challengeLabel: string;
  challengeSegments: KindnessBannerTextSegment[];
  challengeFooterIcons: string;
  confidenceIcon: string;
  confidenceLabel: string;
  confidenceSegments: KindnessBannerTextSegment[];
  completeLabel: string;
  /** Small callout encouraging a parent/guardian to help the student with this exercise. */
  parentNote: string;
}

/**
 * "Two Truths and a Twist" — Identity Module (Advanced), Week 1 warm-up. A
 * "Warm-Up" pill and title over a "Write your statements" card with three
 * text areas (two truths, one twist highlighted in blue) and quick-fill
 * buttons; a "Next" button (locked until all three are filled in) swaps in
 * a "Reveal the twist" card whose big button unlocks the twist, plus a "Why
 * this works" tips box — swapped in place, not a route change, so the page
 * reads as two short steps instead of one long scroll.
 */
export interface TwoTruthsAndATwistStep extends BaseExercise {
  type: 'two-truths-and-a-twist';
  badge: string;
  title: string;
  subtitle: string;
  step1Heading: string;
  step1Intro: string;
  truth1Label: string;
  truth1Placeholder: string;
  truth2Label: string;
  truth2Placeholder: string;
  twistLabel: string;
  twistPlaceholder: string;
  exampleTruth1: string;
  exampleTruth2: string;
  exampleTwist: string;
  pickTwistLabel: string;
  showExampleLabel: string;
  resetLabel: string;
  step2Heading: string;
  step2Intro: string;
  revealLabel: string;
  revealedText: string;
  continueLabel: string;
  whyHeading: string;
  whyPoints: { icon: string; text: string }[];
}

/** One question in a DiscussionPromptSamplesStep, with the sample answers revealed after the student submits their own. */
export interface DiscussionPromptSample {
  id: string;
  question: string;
  placeholder: string;
  sampleAnswers: string[];
}

/**
 * "Discussion Prompts and Sample Answers" — a free-response reflection
 * activity with no right answer. For each question, the student types and
 * submits their own answer, then the sample answers reveal one at a time
 * (via a "Next" button) instead of all at once. After the last question's
 * samples are all shown, a closing "Key Lesson" card takes over the screen.
 */
export interface DiscussionPromptSamplesStep extends BaseExercise {
  type: 'discussion-prompt-samples';
  badge: string;
  title: string;
  subtitle?: string;
  prompts: DiscussionPromptSample[];
  submitLabel: string;
  yourAnswerLabel: string;
  sampleAnswersLabel: string;
  nextSampleLabel: string;
  nextQuestionLabel: string;
  seeKeyLessonLabel: string;
  keyLessonLabel: string;
  keyLessonText: string;
  continueLabel: string;
}

/** One attributed peer answer shown after the student submits their own, e.g. "…" – Ayeyi, 12. */
export interface PeerAnswer {
  text: string;
  author: string;
  age: number;
}

/** One question in a ReflectionPromptAnswersStep, with peer answers revealed after the student submits their own. */
export interface ReflectionPromptWithAnswers {
  id: string;
  question: string;
  placeholder: string;
  peerAnswers: PeerAnswer[];
}

/**
 * "Reflection Questions" — a free-response activity, close cousin of
 * DiscussionPromptSamplesStep but with attributed peer answers ("– Name,
 * age") instead of unattributed sample answers. For each question, the
 * student types and submits their own answer, then peer answers reveal one
 * at a time via a "Next" button. After the last question's answers are all
 * shown, the "Continue" button finishes the step directly — unless
 * `closingHeading` is set, in which case a closing card (any of a
 * key-takeaway line, a research link, a book recommendation) is shown first.
 */
export interface ReflectionPromptAnswersStep extends BaseExercise {
  type: 'reflection-prompt-answers';
  badge: string;
  title: string;
  subtitle?: string;
  prompts: ReflectionPromptWithAnswers[];
  submitLabel: string;
  yourAnswerLabel: string;
  peerAnswersLabel: string;
  nextAnswerLabel: string;
  nextQuestionLabel: string;
  continueLabel: string;
  /** When set, a closing card (any of: a key-takeaway line, a research link, a book recommendation) is shown after the last question's answers are revealed, before the final Continue. */
  closingHeading?: string;
  takeawayLabel?: string;
  takeawayText?: string;
  researchLabel?: string;
  researchText?: string;
  researchLinkLabel?: string;
  researchUrl?: string;
  readingLabel?: string;
  readingText?: string;
}

/** One panel of a LateProjectStoryStep — an illustrated beat of the story. */
export interface LateProjectStoryPanel {
  /** Large emoji "illustration" for the panel. */
  emoji: string;
  caption: string;
  /** Drives the panel's mood tint — 'stressed' early, 'calm' once things turn around. */
  mood: 'stressed' | 'calm';
}

/**
 * "Picture story" step (Planning Module — Advanced, Week 1 — "The Late
 * Project"): a storyboard the learner steps through one panel at a time, with
 * a mood tint that shifts from anxious to calm as the story turns. Its own
 * comic-strip look. Continue is always available.
 */
export interface LateProjectStoryStep extends BaseExercise {
  type: 'late-project-story';
  kicker: string;
  heading: string;
  subtitle: string;
  panels: LateProjectStoryPanel[];
  takeaway: string;
  continueLabel: string;
}

/** One question in a StoryTalkStep. */
export interface StoryTalkQuestion {
  id: string;
  question: string;
  /** A nudge shown under the question, e.g. "Think about what made her panic before the deadline." */
  hint: string;
  placeholder: string;
  /** Button that opens the reveal, e.g. "Check Answer" / "See What Others Said". */
  revealLabel: string;
  /** Heading on the revealed panel, e.g. "Suggested answer" / "What others said" / "Model answer". */
  revealHeading: string;
  /** Prose reveal (used when `revealList` is absent). */
  revealText?: string;
  /** List reveal — used for "what others said" style answers. */
  revealList?: string[];
  /** The "Lesson Tip:" line shown under the reveal. */
  lessonTip: string;
}

/**
 * "Let's Talk About the Story" — a free-response Q&A that follows a story
 * step. For each question the learner types an answer (required before
 * continuing), then reveals a suggested/model answer or a list of what other
 * learners said, each followed by a short lesson tip. No answer is graded;
 * the gate is simply that every question must be answered in the learner's
 * own words first. Its own design.
 */
export interface StoryTalkStep extends BaseExercise {
  type: 'story-talk';
  badge: string;
  title: string;
  subtitle?: string;
  questions: StoryTalkQuestion[];
  yourAnswerLabel: string;
  submitLabel: string;
  nextQuestionLabel: string;
  continueLabel: string;
}

/**
 * "Identity Snapshot" — Challenge of the Week (Identity Module, Advanced).
 * Three side-by-side slots, each a photo/drawing dropzone paired with a
 * "why did you choose this?" reason field. Submitting is locked until all
 * three slots have both a picture and a reason. On submit, the page swaps
 * (in place, no route change) to a scrapbook-style reveal — the three
 * photos and their reasons laid out as a keepsake card — above a closing
 * message and the final continue button.
 */
export interface IdentitySnapshotChallengeStep extends BaseExercise {
  type: 'identity-snapshot-challenge';
  badge: string;
  title: string;
  subtitle: string;
  instructionHeading: string;
  instructions: string[];
  slotHeading: string;
  photoLabel: string;
  reasonLabel: string;
  reasonPlaceholder: string;
  chooseLabel: string;
  changeLabel: string;
  submitLabel: string;
  scrapbookHeading: string;
  scrapbookSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
  /** Shown under the dropzones, e.g. reminding a parent/caregiver to help with this activity. */
  parentNote?: string;
}

/** One trait card in a PickYourPowerStep's grid, e.g. "Kind" with its own description for the reveal panel. */
export interface PickYourPowerOption {
  icon: string;
  label: string;
  description: string;
}

/**
 * "Pick Your Power" — a trait-picker warm-up (Identity Module, Advanced,
 * Week 2). A two-column layout: a left panel with a sticky-note "Warm-Up"
 * tag, an underlined two-line title, and a reveal card that starts as a
 * prompt and swaps to show the chosen trait's name and description once
 * picked; a right panel with a grid of pastel trait cards (no wrong
 * answer — any pick is valid) that turn solid on selection. A "Continue"
 * button unlocks once a trait is chosen.
 */
export interface PickYourPowerStep extends BaseExercise {
  type: 'pick-your-power';
  badge: string;
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  promptHint: string;
  gridHeading: string;
  pickOneLabel: string;
  noWrongAnswerLabel: string;
  powers: PickYourPowerOption[];
  resultEyebrow: string;
  chooseAgainLabel: string;
  footerNote: string;
  continueLabel: string;
}

/** One A–D option inside a TemperamentQuizQuestion. */
export interface TemperamentQuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
}

/** One question in a TemperamentQuizStep — always exactly four options, one per letter. */
export interface TemperamentQuizQuestion {
  id: string;
  prompt: string;
  options: TemperamentQuizOption[];
}

/** The character/temperament result for one letter, shown when it's the student's most-picked answer. */
export interface TemperamentQuizResult {
  letter: 'A' | 'B' | 'C' | 'D';
  icon: string;
  name: string;
  tagline: string;
  description: string;
}

/**
 * "Temperament Quiz: Which One Sounds Like You?" — a personality-style
 * quiz, not a graded one: one question at a time, four lettered options,
 * no right answer. After the last question, the letter picked most often
 * decides which of the four results (tied to the mini-story's characters)
 * is revealed, with a "Retake Quiz" option.
 */
export interface TemperamentQuizStep extends BaseExercise {
  type: 'temperament-quiz';
  badge: string;
  title: string;
  subtitle: string;
  instruction: string;
  questions: TemperamentQuizQuestion[];
  results: TemperamentQuizResult[];
  resultHeading: string;
  retakeLabel: string;
  continueLabel: string;
}

/** One binary "this or that" question — a prompt and two icon+label options. */
export interface ThisOrThatQuestion {
  id: string;
  prompt: string;
  optionA: { icon: string; label: string };
  optionB: { icon: string; label: string };
}

/** One peer "strength" card shown in the recap feed of a ThisOrThatWarmupStep. */
export interface StrengthRecapCard {
  icon: string;
  strength: string;
  author: string;
  age: number;
  quote: string;
  timeAgo: string;
}

/**
 * "This or That, you pick" — a two-phase warm-up (Identity Module,
 * Advanced, Week 3). Phase one: a set of quick binary "this or that"
 * choices (no wrong answers) that must all be answered before continuing.
 * Phase two: a "Recap · Strength Tracker" feed of peer strength shares
 * plus a box for the student to post one strength of their own, which
 * completes the step.
 */
export interface ThisOrThatWarmupStep extends BaseExercise {
  type: 'this-or-that-warmup';
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  sectionOneLabel: string;
  pickHint: string;
  questions: ThisOrThatQuestion[];
  noWrongAnswerNote: string;
  toRecapLabel: string;
  sectionTwoLabel: string;
  recapIntro: string;
  sharedCountLabel: string;
  recapCards: StrengthRecapCard[];
  sharePromptLabel: string;
  sharePlaceholder: string;
  postLabel: string;
  footerNote: string;
  continueLabel: string;
}

/**
 * "Strength Snapshot" — a warm-up share (Self-Confidence Module, Advanced,
 * Week 1). The student names one personal strength and how they discovered
 * it; submitting always completes and reveals the pair on a small keepsake
 * card before continuing.
 */
export interface StrengthSnapshotStep extends BaseExercise {
  type: 'strength-snapshot';
  badge: string;
  title: string;
  subtitle: string;
  strengthLabel: string;
  strengthPlaceholder: string;
  discoveryLabel: string;
  discoveryPlaceholder: string;
  submitLabel: string;
  revealHeading: string;
  revealNote: string;
  continueLabel: string;
}

/** One statement in an OpinionCornersStep. */
export interface OpinionCornersStatement {
  id: string;
  text: string;
}

/**
 * "Opinion Corners" — a self-paced stand-in for the facilitator-led
 * Agree/Neutral/Disagree corners activity (Self-Confidence Module, Advanced,
 * Week 1). One statement at a time; the student picks the corner that
 * matches their opinion (no right answer) and moves on. After the last
 * statement, a debrief prompt asks them to reflect on how it felt to voice
 * their opinion, in their own words.
 */
export interface OpinionCornersStep extends BaseExercise {
  type: 'opinion-corners';
  badge: string;
  title: string;
  subtitle: string;
  agreeLabel: string;
  neutralLabel: string;
  disagreeLabel: string;
  noWrongAnswerNote: string;
  statements: OpinionCornersStatement[];
  toDebriefLabel: string;
  debriefHeading: string;
  debriefIntro: string;
  debriefQuestion: string;
  debriefPlaceholder: string;
  submitLabel: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "My Strength Map" — a writing activity (Self-Confidence Module, Advanced,
 * Week 1). Three fixed stops on a path, each pairing a personal strength
 * with one concrete action to grow it. Submitting is locked until every
 * field is filled. On submit, the page swaps (in place) to a map-style
 * reveal — the three stops laid out along a connected trail — above a
 * closing message and the final continue button.
 */
export interface StrengthMapStep extends BaseExercise {
  type: 'strength-map';
  badge: string;
  title: string;
  subtitle: string;
  instructionHeading: string;
  instructions: string[];
  stopLabel: string;
  strengthLabel: string;
  strengthPlaceholder: string;
  actionLabel: string;
  actionPlaceholder: string;
  submitLabel: string;
  mapHeading: string;
  mapSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One strategy card in a BigQuestionStep — a short tip plus a worked example. */
export interface BigQuestionStrategy {
  id: string;
  icon: string;
  title: string;
  tip: string;
  example: string;
}

/**
 * "The Big Question!" — a read-only reference step (Self-Confidence Module,
 * Advanced, Week 2). A big open question at the top, then a stack of
 * strategy cards answering it — each with an icon, a short tip, and a
 * worked example — no input, just read and continue.
 */
export interface BigQuestionStep extends BaseExercise {
  type: 'big-question';
  badge: string;
  question: string;
  subtitle: string;
  strategiesHeading: string;
  strategies: BigQuestionStrategy[];
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Self-Confidence Module — Advanced,
 * Week 2). A single line for the learner to hold onto — no input, just read
 * and continue. A megaphone/speech-bubble design, distinct from Week 1's
 * `plan-confidence-link`.
 */
export interface VoiceConfidenceLinkStep extends BaseExercise {
  type: 'voice-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/** One fun challenge in a RiskOrRewardStep. */
export interface RiskOrRewardChallenge {
  id: string;
  text: string;
}

/**
 * "Risk or Reward" — a self-paced interactive poll warm-up (Self-Confidence
 * Module, Advanced, Week 3). An intro slide explains the three buttons
 * (Yes / Maybe / No — no wrong answers), then one fun challenge at a time,
 * each with instant, tone-matched feedback on tap before the student
 * advances. After the last challenge, a two-part reflection box asks which
 * challenge they might actually try and one small action they'll take. A
 * closing slide wraps it up.
 */
export interface RiskOrRewardStep extends BaseExercise {
  type: 'risk-or-reward';
  badge: string;
  introTitle: string;
  introText: string;
  yesLabel: string;
  maybeLabel: string;
  noLabel: string;
  noWrongAnswerNote: string;
  startLabel: string;
  challenges: RiskOrRewardChallenge[];
  yesFeedback: string;
  maybeFeedback: string;
  noFeedback: string;
  nextLabel: string;
  reflectionHeading: string;
  reflectionIntro: string;
  reflectionChallengeLabel: string;
  reflectionChallengePlaceholder: string;
  reflectionActionLabel: string;
  reflectionActionPlaceholder: string;
  submitLabel: string;
  wrapUpHeading: string;
  wrapUpText: string;
  continueLabel: string;
}

/**
 * "Confidence Ladder" — a writing activity (Self-Confidence Module,
 * Advanced, Week 3). The student names one personal challenge, then three
 * small steps to begin it. Submitting is locked until every field is
 * filled. On submit, the page swaps (in place) to a ladder-style reveal —
 * the challenge as the goal at the top, the three steps as rungs leading up
 * to it — above a closing message and the final continue button.
 */
export interface ConfidenceLadderStep extends BaseExercise {
  type: 'confidence-ladder';
  badge: string;
  title: string;
  subtitle: string;
  instructionHeading: string;
  instructions: string[];
  challengeLabel: string;
  challengePlaceholder: string;
  stepLabel: string;
  step1Placeholder: string;
  step2Placeholder: string;
  step3Placeholder: string;
  submitLabel: string;
  ladderHeading: string;
  ladderSubtitle: string;
  goalLabel: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Self-Confidence Module — Advanced,
 * Week 3). A single line for the learner to hold onto — no input, just read
 * and continue. A sprouting-plant design, distinct from Week 1's
 * `plan-confidence-link` and Week 2's `voice-confidence-link`.
 */
export interface GrowthConfidenceLinkStep extends BaseExercise {
  type: 'growth-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/**
 * "Confidence Link" affirmation step (Self-Confidence Module — Advanced,
 * Week 4 — the module's closing week). A single line for the learner to
 * hold onto — no input, just read and continue. A trophy design, distinct
 * from Weeks 1-3's confidence-link variants.
 */
export interface TrophyConfidenceLinkStep extends BaseExercise {
  type: 'trophy-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/** One presentation format option in a ConfidenceContractStep. */
export interface ConfidenceContractFormat {
  id: string;
  icon: string;
  label: string;
  description: string;
}

/**
 * "Confidence Contract" — the End-of-Module Project's creative reflection
 * (Self-Confidence Module, Advanced). The student picks one presentation
 * format (vision board, video diary, or written pledge), writes their
 * personal action plan, and can optionally attach a photo or video of
 * whichever format they made. Submitting reveals a "Sharing & Celebration"
 * closing card before the final continue.
 */
export interface ConfidenceContractStep extends BaseExercise {
  type: 'confidence-contract';
  badge: string;
  title: string;
  intro: string;
  formatsHeading: string;
  formats: ConfidenceContractFormat[];
  planLabel: string;
  planPlaceholder: string;
  uploadHeading: string;
  uploadHint: string;
  uploadChooseLabel: string;
  uploadChangeLabel: string;
  uploadRemoveLabel: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  shareHeading: string;
  shareText: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One choice in a ChoicesBoardScenario — a short label, the choice text, whether it's the responsible one, and the feedback shown on click. */
export interface ChoicesBoardChoice {
  label: string;
  text: string;
  correct: boolean;
  feedback: string;
}

/** One real-life scenario in a ChoicesBoardStep, with exactly two choices. */
export interface ChoicesBoardScenario {
  id: string;
  situation: string;
  choices: ChoicesBoardChoice[];
}

/**
 * "Choices Board" — an interactive decision activity (Identity Module,
 * Advanced, Week 3). One real-life scenario at a time, two choices each.
 * Tapping a choice reveals instant feedback (a responsible "correct" one or
 * a softer "alternative"); the student must land on the responsible choice
 * to move to the next scenario. After the last scenario, a short closing
 * card takes over the screen.
 */
export interface ChoicesBoardStep extends BaseExercise {
  type: 'choices-board';
  badge: string;
  title: string;
  subtitle: string;
  scenarios: ChoicesBoardScenario[];
  correctLabel: string;
  alternativeLabel: string;
  nextLabel: string;
  retryHint: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Choice Journal" — Challenge of the Week (Identity Module, Advanced, Week
 * 3). Three day entries, each pairing "the choice I made" with "what it
 * says about me". Submitting is locked until every field is filled. On
 * submit, the page swaps (in place) to a journal-style reveal — the three
 * days laid out as journal pages — above a closing message and the final
 * continue button.
 */
export interface ChoiceJournalChallengeStep extends BaseExercise {
  type: 'choice-journal-challenge';
  badge: string;
  title: string;
  subtitle: string;
  instructionHeading: string;
  instructions: string[];
  dayLabel: string;
  choiceLabel: string;
  choicePlaceholder: string;
  meaningLabel: string;
  meaningPlaceholder: string;
  submitLabel: string;
  journalHeading: string;
  journalSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One friend in the "Pass the Dream" toss chain — a name, avatar emoji, and the dream they'd share. */
export interface PassTheDreamFriend {
  name: string;
  avatar: string;
  dream: string;
}

/** One peer "proud choice" card in the recap feed of a PassTheDreamWarmupStep. */
export interface ChoiceRecapCard {
  name: string;
  avatar: string;
  emoji: string;
  choice: string;
  feeling: string;
}

/**
 * "Pass the Dream" — a two-panel warm-up (Identity Module, Advanced, Week
 * 4). Left panel: the student names one thing they'd love to try or
 * achieve (pick a chip or type their own), then "tosses the ball" round
 * the room, each friend sharing their dream in turn. Right panel: a
 * "Choice Journal Sharing" recap feed of peer proud-moment cards plus a
 * box to add one of the student's own. The step completes once the ball
 * has been round the room and the student has shared a proud moment.
 */
export interface PassTheDreamWarmupStep extends BaseExercise {
  type: 'pass-the-dream-warmup';
  roomName: string;
  roomTagline: string;
  roomMeta: string;
  warmupBadge: string;
  warmupTitle: string;
  warmupIntro: string;
  tossingToLabel: string;
  friends: PassTheDreamFriend[];
  dreamChips: { icon: string; label: string }[];
  dreamInputPlaceholder: string;
  tossLabel: string;
  tossedAllMessage: string;
  recapBadge: string;
  recapTitle: string;
  recapIntro: string;
  recapCards: ChoiceRecapCard[];
  sharePlaceholder: string;
  shareLabel: string;
  footerNote: string;
  continueLabel: string;
}

/**
 * "Share Your Plan" — Challenge of the Week (Identity Module, Advanced,
 * Week 4). The student names one goal from their identity plan and how
 * they'll start on it — by typing, by recording a short voice note, or
 * both. Submitting is locked until there's a written plan or a recording.
 * On submit, the page swaps (in place) to a plan-card reveal with a
 * playback control for any voice note, above a closing message.
 */
export interface ShareYourPlanChallengeStep extends BaseExercise {
  type: 'share-your-plan-challenge';
  badge: string;
  title: string;
  subtitle: string;
  instructionHeading: string;
  instructions: string[];
  goalLabel: string;
  goalPlaceholder: string;
  startLabel: string;
  startPlaceholder: string;
  voiceLabel: string;
  recordLabel: string;
  stopLabel: string;
  reRecordLabel: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Personal Reflection Worksheet" activity (Planning Module — Advanced, Week
 * 1). The learner lists three weekly activities, ranks how well they plan
 * each (Always / Sometimes / Never), picks one to plan better, and writes a
 * short reason. Submitting is locked until every field is filled; after that
 * a summary "worksheet" card is shown. Its own clipboard-worksheet design.
 */
export interface TimeReflectionWorksheetStep extends BaseExercise {
  type: 'time-reflection-worksheet';
  badge: string;
  title: string;
  intro: string;
  instructions: string[];
  rowCount: number;
  activityLabel: string;
  activityPlaceholder: string;
  rankQuestion: string;
  /** Exactly three rank options, most-planned first, e.g. ["Always", "Sometimes", "Never"]. */
  rankOptions: string[];
  focusLabel: string;
  focusHint: string;
  reasonLabel: string;
  reasonPlaceholder: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Challenge of the Week: Plan It Better!" (Planning Module — Advanced, Week
 * 1). The learner picks a planning strategy (a suggested chip or their own),
 * names the activity they'll apply it to, ticks the days they follow it across
 * a 7-day tracker, then completes an end-of-week reflection: a days-used count
 * (from the tracker), a 1–5 "felt more organized" star rating, and a short
 * "what I learned" note. Submitting is locked until the strategy, activity,
 * rating and note are all set; after that a proud summary card is shown. Its
 * own celebratory design.
 */
export interface PlanItBetterChallengeStep extends BaseExercise {
  type: 'plan-it-better-challenge';
  badge: string;
  title: string;
  intro: string;
  strategyLabel: string;
  strategyHint: string;
  /** Suggested strategies shown as pickable chips; the learner can also write their own. */
  strategyOptions: string[];
  customStrategyLabel: string;
  customStrategyPlaceholder: string;
  activityLabel: string;
  activityPlaceholder: string;
  trackerHeading: string;
  trackerHint: string;
  /** Exactly seven short day labels, e.g. ["Mon","Tue",…,"Sun"]. */
  dayLabels: string[];
  reflectionHeading: string;
  daysUsedLabel: string;
  organizedLabel: string;
  learnedLabel: string;
  learnedPlaceholder: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One statement inside a GoalDetectiveWarmupStep. */
export interface GoalDetectiveStatement {
  id: string;
  text: string;
  /** The correct bin — 'wish' for vague/general statements, 'goal' for clear/doable ones. */
  kind: 'wish' | 'goal';
}

/**
 * "Warm-Up Game: Goal Detective!" (Planning Module — Advanced, Week 3). Real
 * drag-and-drop: the learner drags each statement card onto the "Wish" or
 * "Goal" folder. A correct drop settles the card into that folder; a wrong
 * drop shakes and bounces it back to the tray, so no wrong answer passes.
 * Continue unlocks once every statement is sorted. Its own detective-board
 * design.
 */
export interface GoalDetectiveWarmupStep extends BaseExercise {
  type: 'goal-detective-warmup';
  kicker: string;
  heading: string;
  subtitle: string;
  instructions: string[];
  wishLabel: string;
  goalLabel: string;
  statements: GoalDetectiveStatement[];
  allDoneTitle: string;
  allDoneText: string;
  footerNote: string;
  continueLabel: string;
  recapHeading?: string;
  recapPoints?: string[];
}

/** A short-text discussion question after the video in a GoalVideoReflectStep. */
export interface GoalVideoTextQuestion {
  id: string;
  question: string;
  placeholder: string;
  example?: string;
}

/** The single-select "which part of SMART is most useful" question in a GoalVideoReflectStep. */
export interface GoalVideoChoiceQuestion {
  id: string;
  question: string;
  options: string[];
}

/**
 * "How to Write a SMART Goal" video step (Planning Module — Advanced, Week
 * 3). Phased: set a personal goal before watching, watch the video, then
 * answer two short-text discussion prompts and pick the most useful SMART
 * letter. Every field must be filled before submitting; then an auto summary
 * is shown. Its own "goal journal" design.
 */
export interface GoalVideoReflectStep extends BaseExercise {
  type: 'goal-video-reflect';
  badge: string;
  title: string;
  beforeLabel: string;
  beforeIntro: string;
  beforeExample: string;
  goalLabel: string;
  goalPlaceholder: string;
  beforeContinueLabel: string;
  videoYoutubeUrl: string;
  videoTitle: string;
  videoCredit: string;
  videoDurationLabel?: string;
  videoCaption: string;
  watchedLabel: string;
  videoContinueLabel: string;
  questionsHeading: string;
  textQuestions: GoalVideoTextQuestion[];
  choiceQuestion: GoalVideoChoiceQuestion;
  submitLabel: string;
  summaryHeading: string;
  summaryText: string[];
  continueLabel: string;
}

/** One row of the SMART breakdown table in a SmartGoalTableStep. */
export interface SmartGoalTableRow {
  /** 'S' | 'M' | 'A' | 'R' | 'T'. */
  letter: string;
  /** e.g. "Specific". */
  label: string;
  question: string;
  placeholder: string;
}

/**
 * "Write your SMART goal" activity (Planning Module — Advanced, Week 3). The
 * learner writes one SMART goal to start this week, then an optional
 * extension breaks it down row by row against each SMART letter. Submitting
 * only requires the goal statement — the breakdown table is a deepening
 * extension. Its own worksheet-table design.
 */
export interface SmartGoalTableStep extends BaseExercise {
  type: 'smart-goal-table';
  badge: string;
  title: string;
  goalLabel: string;
  goalPlaceholder: string;
  goalExample: string;
  goalContinueLabel: string;
  extensionBadge: string;
  extensionHeading: string;
  extensionIntro: string;
  rows: SmartGoalTableRow[];
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One reflection prompt in a StaySmartChallengeStep. */
export interface StaySmartReflectPrompt {
  id: string;
  question: string;
  placeholder: string;
}

/**
 * "Challenge of the Week: Stay SMART!" (Planning Module — Advanced, Week 3).
 * A phased challenge: track a 7-day tracker of the learner's SMART goal
 * action, name an accountability partner, reflect on consistency, and
 * optionally upload a photo of their tracker or a short video. Submitting
 * requires the partner and every reflection prompt; the upload is optional.
 * Its own design.
 */
export interface StaySmartChallengeStep extends BaseExercise {
  type: 'stay-smart-challenge';
  badge: string;
  title: string;
  intro: string;
  trackerHeading: string;
  trackerHint: string;
  /** Exactly seven day labels, e.g. ["Mon", …, "Sun"]. */
  dayLabels: string[];
  trackerContinueLabel: string;
  partnerHeading: string;
  partnerHint: string;
  partnerLabel: string;
  partnerPlaceholder: string;
  partnerContinueLabel: string;
  reflectHeading: string;
  reflectPrompts: StaySmartReflectPrompt[];
  uploadHeading: string;
  uploadHint: string;
  uploadChooseLabel: string;
  uploadChangeLabel: string;
  uploadRemoveLabel: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Planning Module — Advanced, Week 3). A
 * single line for the learner to hold onto — no input, just read and
 * continue. A "kept promise" ribbon-seal design, distinct from the Week 1 and
 * Week 2 confidence links.
 */
export interface PromiseConfidenceLinkStep extends BaseExercise {
  type: 'promise-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/** One draggable checkpoint card in a PlanningRelayWarmupStep, e.g. { icon: '🧠', label: 'Think' }. */
export interface PlanningRelayOption {
  id: string;
  icon: string;
  label: string;
}

/**
 * "Warm-Up Game: Planning Relay" (Planning Module — Advanced, Week 4). Real
 * drag-and-drop: the learner drags the 5 planning-cycle checkpoints into
 * order along a relay track, then presses Check to validate against the one
 * correct sequence (the general planning process has a single right order).
 * A wrong arrangement must be retried before continuing. Once correct, a
 * follow-up text prompt appears. Its own relay-track design.
 */
export interface PlanningRelayWarmupStep extends BaseExercise {
  type: 'planning-relay-warmup';
  kicker: string;
  heading: string;
  subtitle: string;
  poolHeading: string;
  trackHeading: string;
  options: PlanningRelayOption[];
  /** Ids from `options`, listed in the one correct order. */
  correctOrder: string[];
  checkLabel: string;
  successMessage: string;
  retryMessage: string;
  followUpQuestion: string;
  followUpPlaceholder: string;
  continueLabel: string;
}

/** One section of a PersonalGrowthMapStep, e.g. { id: 'achieved', icon: '🌱', label: 'What I Achieved' }. */
export interface GrowthMapSection {
  id: string;
  icon: string;
  label: string;
  placeholder: string;
}

/**
 * "My Personal Growth Map" activity (Planning Module — Advanced, Week 4). A
 * 3-section template — What I Achieved, What I Learnt, My Next Goal — each
 * filled by typing or by attaching a file (e.g. an exported Canva/Slides
 * page). Submitting requires each section to have text or a file; then an
 * auto encouragement message is shown. Its own growth-trail design.
 */
export interface PersonalGrowthMapStep extends BaseExercise {
  type: 'personal-growth-map';
  badge: string;
  title: string;
  intro: string;
  sections: GrowthMapSection[];
  uploadInsteadLabel: string;
  uploadChooseLabel: string;
  uploadChangeLabel: string;
  uploadRemoveLabel: string;
  submitLabel: string;
  encouragementHeading: string;
  encouragementText: string;
  continueLabel: string;
}

/**
 * "Challenge of the Week: Share & Reflect" (Planning Module — Advanced, Week
 * 4). The learner shares their Personal Growth Map with someone and asks what
 * they did well, then records that feedback — typed or spoken — and
 * optionally records a short voice note about what they learned from it.
 * Submitting requires the feedback (text or recording); the voice note is
 * optional. Its own design.
 */
export interface ShareReflectChallengeStep extends BaseExercise {
  type: 'share-reflect-challenge';
  badge: string;
  title: string;
  intro: string;
  instructions: string[];
  feedbackLabel: string;
  feedbackPlaceholder: string;
  recordInsteadLabel: string;
  typeInsteadLabel: string;
  recordLabel: string;
  stopLabel: string;
  reRecordLabel: string;
  noteLabel: string;
  noteHint: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Planning Module — Advanced, Week 4). A
 * single line for the learner to hold onto — no input, just read and
 * continue. A "still reflection pool" ripple design, distinct from Weeks 1–3.
 */
export interface ReflectionConfidenceLinkStep extends BaseExercise {
  type: 'reflection-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/**
 * "The 7-Day Planning Challenge" end-of-module project (Planning Module —
 * Advanced). The learner plans and journals one real week of activities,
 * writes a short reflection, and may optionally attach a "My Week of Wins"
 * collage or video. Submitting requires only the reflection; the bonus
 * upload is optional. Its own capstone-certificate design.
 */
export interface SevenDayPlanningProjectStep extends BaseExercise {
  type: 'seven-day-planning-project';
  badge: string;
  title: string;
  intro: string;
  instructions: string[];
  reflectionLabel: string;
  reflectionPlaceholder: string;
  bonusHeading: string;
  bonusHint: string;
  uploadChooseLabel: string;
  uploadChangeLabel: string;
  uploadRemoveLabel: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Challenge of the Week: Pattern Spotter" (Planning Module — Advanced, Week
 * 2). The learner follows their planner for three days, ticking each day, then
 * notes one adjustment they made and one pattern they discovered about their
 * time use. Submitting is locked until the pattern note is written; then an
 * insight card is shown. Its own compact design.
 */
export interface PatternSpotterChallengeStep extends BaseExercise {
  type: 'pattern-spotter-challenge';
  badge: string;
  title: string;
  intro: string;
  instructions: string[];
  /** Exactly three day labels, e.g. ["Day 1", "Day 2", "Day 3"]. */
  dayLabels: string[];
  dayPrompt: string;
  adjustLabel: string;
  adjustPlaceholder: string;
  patternLabel: string;
  patternPlaceholder: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Planning Module — Advanced, Week 2). A
 * single line for the learner to hold onto — no input, just read and continue.
 * A clock-face design, distinct from Week 1's `plan-confidence-link`.
 */
export interface TimeConfidenceLinkStep extends BaseExercise {
  type: 'time-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

/** One quadrant of the Eisenhower matrix in a PriorityPlannerChallengeStep. */
export interface EisenhowerQuadrant {
  /** 'A' | 'B' | 'C' | 'D'. */
  key: string;
  /** e.g. "Urgent & Important". */
  name: string;
  /** The one-word action, e.g. "Do now" / "Plan to do" / "Delegate or delay" / "Eliminate". */
  action: string;
  description: string;
  example: string;
  /** Placeholder for the learner's own entries in the planner phase. */
  placeholder: string;
}

/** One reflection prompt (with a follow-up nudge) in a PriorityPlannerChallengeStep. */
export interface PriorityReflectPrompt {
  id: string;
  question: string;
  /** The "→" follow-up shown under the question. */
  followUp: string;
  placeholder: string;
}

/**
 * "The Weekly Priority Planner Challenge" (Planning Module — Advanced, Week
 * 2). One connected activity in phases: learn the Eisenhower matrix, watch a
 * short video, fill a box per quadrant with tasks from the learner's own week,
 * then answer reflection prompts. Every quadrant and every prompt must be
 * filled before submitting; then a filled-in matrix and the reflections are
 * shown with a learner tip. Its own design.
 */
export interface PriorityPlannerChallengeStep extends BaseExercise {
  type: 'priority-planner-challenge';
  badge: string;
  title: string;
  objective: string;
  learnHeading: string;
  learnIntro: string;
  quadrants: EisenhowerQuadrant[];
  learnContinueLabel: string;
  videoYoutubeUrl: string;
  videoTitle: string;
  videoCredit: string;
  videoDurationLabel?: string;
  watchedLabel: string;
  videoContinueLabel: string;
  planHeading: string;
  planIntro: string;
  planContinueLabel: string;
  reflectHeading: string;
  prompts: PriorityReflectPrompt[];
  tipLabel: string;
  tip: string;
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One question after the video in a VideoReflectStep — a short text box or a multi-select checkbox list. */
export interface VideoReflectQuestion {
  id: string;
  kind: 'text' | 'multi';
  question: string;
  /** text only — a nudge shown under the question. */
  hint?: string;
  /** text only — placeholder for the box. */
  placeholder?: string;
  /** multi only — the checkbox options; any number may be selected. */
  options?: string[];
  /** multi only — when true, adds an "Other" checkbox with its own text field. */
  allowOther?: boolean;
}

/**
 * "Watch and Reflect" video step (Planning Module — Advanced, Week 2). A
 * YouTube video (click-to-play embed plus a watch-on-YouTube link), a
 * "watched it" check, then a set of reflect-and-respond questions — short text
 * boxes and multi-select checkbox lists, none graded. Every question must be
 * answered before submitting; then an auto self-check summary is shown. Its
 * own design.
 */
export interface VideoReflectStep extends BaseExercise {
  type: 'video-reflect';
  badge: string;
  title: string;
  videoYoutubeUrl: string;
  videoTitle: string;
  videoCredit: string;
  videoDurationLabel: string;
  watchedLabel: string;
  questionsHeading: string;
  questions: VideoReflectQuestion[];
  submitLabel: string;
  summaryHeading: string;
  summaryText: string[];
  continueLabel: string;
}

/** One task block the learner fits into the 24-hour day grid of a DayPlannerGridStep. */
export interface DayPlannerBlock {
  id: string;
  label: string;
  icon: string;
  /** The suggested number of hours — the block's starting size; the learner can shorten or stretch it. */
  suggestedHours: number;
}

/**
 * "Build Your Day" 24-hour planner (Planning Module — Advanced, Week 2). A
 * real cursor drag-and-drop activity: the learner drags labelled task blocks
 * from a tray onto a 24-hour day bar, reorders them by dragging, drags them
 * back to the tray to remove them, and resizes each with an hours stepper. The
 * plan must add up to exactly 24 hours to continue; any arrangement is
 * accepted (there is no single correct day). On submit, an auto-generated
 * review reflects the learner's own choices back — what was left out, what was
 * shortened, and which task took the most time. Its own timeline design.
 */
export interface DayPlannerGridStep extends BaseExercise {
  type: 'day-planner-grid';
  badge: string;
  title: string;
  instructions: string[];
  /** Total hours in the day — 24. */
  totalHours: number;
  blocks: DayPlannerBlock[];
  trayLabel: string;
  gridLabel: string;
  totalLabel: string;
  overHint: string;
  resizeHint: string;
  submitLabel: string;
  reviewHeading: string;
  reviewSubtitle: string;
  includedAllText: string;
  leftOutLabel: string;
  shortenedLabel: string;
  nothingShortenedText: string;
  biggestLabel: string;
  completeHeading: string;
  completeText: string;
  continueLabel: string;
}

/** One question in a PlanRecapReflectionStep — either a short-text box or a 1–5 rating scale. */
export interface PlanRecapQuestion {
  id: string;
  kind: 'text' | 'scale';
  question: string;
  /** text only — placeholder for the box. */
  placeholder?: string;
  /** text only — a greyed example shown under the box. */
  example?: string;
  /** scale only — exactly five labels for ratings 1 through 5. */
  scaleLabels?: string[];
}

/**
 * "Week 2 Recap: Reflect and Refine" (Planning Module — Advanced, Week 2). A
 * look-back on the Week 1 "Plan It Better!" challenge: a short review journal
 * of text prompts and 1–5 rating scales. Every question must be answered
 * before submitting; then a summary card with a learner tip is shown. Its own
 * review-journal design.
 */
export interface PlanRecapReflectionStep extends BaseExercise {
  type: 'plan-recap-reflection';
  badge: string;
  title: string;
  intro: string;
  lead: string;
  questions: PlanRecapQuestion[];
  submitLabel: string;
  revealHeading: string;
  revealSubtitle: string;
  tipLabel: string;
  tip: string;
  continueLabel: string;
}

/**
 * "Confidence Link" affirmation step (Planning Module — Advanced, Week 1). A
 * single calm card carrying one line for the learner to hold onto — no input,
 * just read and continue.
 */
export interface PlanConfidenceLinkStep extends BaseExercise {
  type: 'plan-confidence-link';
  eyebrow: string;
  title: string;
  quote: string;
  caption: string;
  completeLabel: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | SharePromptExercise
  | ReflectionStep
  | ChallengeStep
  | StoryStep
  | StoryTabsStep
  | ConfidenceLinkStep
  | MatchingGameStep
  | FeelingsMatchStep
  | PictureFeelingsQuizStep
  | KindWatchChallengeStep
  | SortingGameStep
  | KindWordsChallengeStep
  | WarmupChatStep
  | DayPlannerStep
  | WarmupGameStep
  | StoryCarouselStep
  | DiscussionMcqStep
  | ProudMomentStep
  | ChallengeChecklistStep
  | IdentityPlannerStep
  | ChallengeBannerStep
  | WarmupPickerStep
  | MirrorTalkStep
  | ChallengeConfidenceStep
  | WarmupScenarioStep
  | WarmupParadeStep
  | SharingCircleStep
  | DiscussionQuizStep
  | GoalMatchupStep
  | ChallengeTrackerStep
  | ConfidencePlannerStep
  | VictoryDanceStep
  | ConfidenceBadgeStep
  | ChallengeMinimalStep
  | ConfidencePlanStep
  | MemoryGameIntroStep
  | MemoryGameSetupStep
  | ActivityStepsStep
  | WeeklyChallengeStep
  | PlanItRaceStep
  | PlanRelayStep
  | DayChecklistPlannerStep
  | WeeklyTaskPlannerStep
  | ChallengeOfTheWeekStep
  | ChallengeConfidenceWeekStep
  | DailyFeelingsCheckinStep
  | SmartGoalsLessonStep
  | SmartGoalBuilderStep
  | GoalChallengeTrackerStep
  | ConfidenceGoalTrackerStep
  | KindActionChallengeStep
  | YesNoQuizStep
  | PhotoUploadActivityStep
  | BelieveInYourselfChallengeStep
  | WhatWouldYouDoQuizStep
  | StickerPosterStep
  | KindnessCornerChallengeStep
  | PlaceSortGameStep
  | WeeklyChallengeShowcaseStep
  | SameOrDifferentQuizStep
  | DiversityPosterStep
  | KindnessBannerChallengeStep
  | WarmupQuizStep
  | WarmupVoiceCheckStep
  | BraveOrShyWarmupStep
  | BraveBodyChallengeStep
  | FastOrClearWarmupStep
  | SlowTalkChallengeStep
  | WhatCanIShareStep
  | FinalChallengeStep
  | ChallengePickSayStep
  | WarmupWhatShouldIDoStep
  | WarmupFinishSentenceStep
  | ClearSentencePracticeStep
  | FeelingsExplorerStep
  | FeelingsTrackerStep
  | PoliteOrNotStep
  | IdeaPresentationStep
  | ListeningPromiseTrackerStep
  | DetectiveChallengeStep
  | MissionBriefingStep
  | YesNoChecklistStep
  | ListeningBodyTrackerStep
  | FeelingsPictureChoiceStep
  | ChallengeFeelingReportStep
  | EtiquetteWarmupQuizStep
  | PoliteMessageChallengeStep
  | BehaviourMatchStep
  | KindCommentChallengeStep
  | TrueFalseWarmupStep
  | PauseBeforePostingStep
  | FillBlankWarmupStep
  | DigitalEtiquetteTrackerStep
  | ResponsibilityCircuitStep
  | ScreenTruthCheckStep
  | ScreenTimePlanChallengeStep
  | KindWordsFillBlankStep
  | DigitalResponsibilityTrackerStep
  | ThinkBeforeClickChallengeStep
  | PrivacyMatchStep
  | PrivacyProtectorChallengeStep
  | CreativeChoiceWarmupStep
  | SmartChoicesWarmupStep
  | FirstStrategyChallengeStep
  | ThinkItThroughWarmupStep
  | PausePlanChallengeStep
  | StrategicThinkerLinkStep
  | StrategyMatchWarmupStep
  | DiscussionMatchStep
  | DiscussionSequenceStep
  | StrategyDetectiveChallengeStep
  | TryAnotherPlanLinkStep
  | StepOrderWarmupStep
  | StrategyPlanChallengeStep
  | SmallStepsLinkStep
  | CreativeObjectChallengeStep
  | FactCheckWarmupStep
  | ImagineCreateChallengeStep
  | SolutionMatchGameStep
  | SolveItDifferentlyChallengeStep
  | SequenceOrderGameStep
  | CreativeProjectChallengeStep
  | SpotTheDifferenceWarmupStep
  | WeeklyAttentionChallengeStep
  | ProblemScenarioWarmupStep
  | ThinkingStepsChallengeStep
  | MemoryTestWarmupStep
  | MemoryGymChallengeStep
  | IfThenWarmupStep
  | SmartThinkerPlanChallengeStep
  | TradeOffQuizStep
  | TradeOffTrackerChallengeStep
  | TradeOffConfidenceLinkStep
  | MoneyMatchStep
  | SimpleBudgetChallengeStep
  | BudgetConfidenceLinkStep
  | MoneyMythBusterStep
  | ThinkAheadChallengeStep
  | DisciplineWarmupQuizStep
  | DisciplineTfWarmupStep
  | DisciplineMatchWarmupStep
  | DisciplineSequenceWarmupStep
  | ConsequenceConfidenceLinkStep
  | StepSequenceStep
  | FinancialAuditChallengeStep
  | ModuleOutcomeConfidenceLinkStep
  | ServiceWarmupQuizStep
  | ServiceActTrackerStep
  | ServiceConfidenceLinkStep
  | ServicePlaceMatchStep
  | ServiceEnvironmentTrackerStep
  | ServiceTfWarmupStep
  | ServiceKindnessPlanStep
  | ServiceFillBlankStep
  | ServiceProjectFinalStep
  | TeamworkWarmupQuizStep
  | TeamworkMatchWarmupStep
  | TeamworkTfWarmupStep
  | TeamworkFillBlankStep
  | TeamworkReflectionMissionStep
  | HygieneWarmupQuizStep
  | HygieneDetectiveChallengeStep
  | HygieneConfidenceLinkStep
  | HygieneHabitMatchStep
  | HygieneChecklistChallengeStep
  | HygieneTfWarmupStep
  | HygieneFillBlankStep
  | HygieneFinalChallengeStep
  | WellnessWarmupQuizStep
  | WellnessHabitMatchStep
  | WellnessTfWarmupStep
  | WellnessFeelingsJournalStep
  | WellnessFillBlankStep
  | NutritionWarmupQuizStep
  | NutritionFoodMatchStep
  | NutritionTfWarmupStep
  | NutritionFillBlankStep
  | TwoTruthsAndATwistStep
  | StrengthSnapshotStep
  | OpinionCornersStep
  | StrengthMapStep
  | BigQuestionStep
  | VoiceConfidenceLinkStep
  | RiskOrRewardStep
  | ConfidenceLadderStep
  | GrowthConfidenceLinkStep
  | TrophyConfidenceLinkStep
  | ConfidenceContractStep
  | DiscussionPromptSamplesStep
  | ReflectionPromptAnswersStep
  | IdentitySnapshotChallengeStep
  | PickYourPowerStep
  | TemperamentQuizStep
  | ThisOrThatWarmupStep
  | ChoicesBoardStep
  | ChoiceJournalChallengeStep
  | PassTheDreamWarmupStep
  | PlanOrPanicWarmupStep
  | LateProjectStoryStep
  | StoryTalkStep
  | TimeReflectionWorksheetStep
  | PlanItBetterChallengeStep
  | PlanConfidenceLinkStep
  | PlanRecapReflectionStep
  | DayPlannerGridStep
  | VideoReflectStep
  | PriorityPlannerChallengeStep
  | PatternSpotterChallengeStep
  | TimeConfidenceLinkStep
  | GoalDetectiveWarmupStep
  | GoalVideoReflectStep
  | SmartGoalTableStep
  | StaySmartChallengeStep
  | PromiseConfidenceLinkStep
  | PlanningRelayWarmupStep
  | PersonalGrowthMapStep
  | ShareReflectChallengeStep
  | ReflectionConfidenceLinkStep
  | SevenDayPlanningProjectStep
  | ShareYourPlanChallengeStep;

/** Content for the newer, richer lesson-welcome layout. When a lesson has this, its welcome screen uses this design instead of the plain card. */
/** One preview card inside a LessonWelcomeCard's "This Week's Mission" section. */
export interface MissionCard {
  icon: string;
  title: string;
  description: string;
}

export interface LessonWelcomeCard {
  /** Small pill above the headline, e.g. "⭐ Week 2 Practice". */
  badge: string;
  headline: string;
  /** Paragraph under the headline. */
  intro: string;
  /** Label for the main CTA button, e.g. "💙 Start Discovering!" */
  startLabel: string;
  image: string;
  imageAlt: string;
  /** Copy shown in the "Trainer's Message" banner beneath the card. Omit when using missionCards instead. */
  trainerMessage?: string;
  /** When set, renders a "This Week's Mission" preview section instead of the Trainer's Message panel. */
  missionHeading?: string;
  missionSubtitle?: string;
  missionCards?: MissionCard[];
}

/** One previewed recap question inside a LessonRecapWelcome — answered for real in the lesson's first exercise. */
export interface RecapQuestionPreview {
  number: number;
  question: string;
}

/**
 * A "Week N intro + recap of last week" welcome layout — a centered title
 * hero, a "Learning Objective" info card, and a "Recap of Week N-1" card
 * previewing the questions the student will actually answer (as multiple
 * choice) once they tap Start Your Journey and land on the lesson's first
 * exercise.
 */
export interface LessonRecapWelcome {
  weekPill: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  learningObjectiveHeading: string;
  learningObjectiveText: string;
  recapHeading: string;
  /** Small meta line under the recap heading, e.g. "5 minutes • Reflection Time". */
  recapMeta: string;
  recapIntro: string;
  recapQuestions: RecapQuestionPreview[];
  startLabel: string;
}

/**
 * A centered "Week N intro" welcome layout — a light pill (e.g. "Week 3"), a
 * bold title, a colored stage subtitle (e.g. "Practice"), an illustration,
 * and a plain checklist "Objectives" card. Simpler than `recapWelcome` —
 * no recap-of-last-week section, just this week's goals.
 */
export interface LessonObjectivesWelcome {
  weekPill: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  objectives: string[];
  startLabel: string;
  /**
   * Optional "Our Objectives" section, rendered as a heading + description
   * followed by a grid of icon cards instead of the plain checklist. When
   * `objectiveCards` is present it replaces the checklist `ow-card` entirely.
   */
  sectionHeading?: string;
  sectionDescription?: string;
  objectiveCards?: { icon: string; variant: 'blue' | 'peach'; title: string; description: string }[];
}

/**
 * A two-column "Week N intro" welcome layout — a pill, a two-tone title
 * (plain + accent-colored word), a subtitle, a stage pill (e.g. "💡 Awareness
 * Phase"), a single "This Week's Objective" card, and a CTA button on the
 * left; a mascot illustration with a speech-bubble greeting on the right.
 */
export interface LessonIntroWelcome {
  /** 'split' (default) is the two-column layout; 'centered' stacks a star-flanked week label, a top image, a plain title, and full-width Objective/Recap cards above a dark Start button. */
  layout?: 'split' | 'centered';
  weekPill: string;
  /** Plain part of the title, e.g. "Planning". */
  titleStart: string;
  /** Accent-colored part of the title, e.g. "Power". */
  titleAccent: string;
  subtitle: string;
  stageIcon?: string;
  stageLabel?: string;
  objectiveIcon: string;
  objectiveHeading: string;
  objectiveText: string;
  /** Optional row of 3 icon+label+sublabel chips shown under the Objective card, e.g. Ears/Eyes/Mind. */
  chips?: { icon: string; label: string; sublabel: string }[];
  /** Optional dashed "Recap" card shown under the chip row, above the Start button. */
  recapIcon?: string;
  recapHeading?: string;
  recapText?: string;
  startLabel: string;
  /** Start button color; defaults to blue when omitted. */
  startBtnColor?: 'blue' | 'coral';
  /** Week pill color; defaults to blue when omitted. */
  weekPillColor?: 'blue' | 'rose' | 'sand';
  /** Title accent word color; defaults to blue when omitted. 'coral' also warms the main title and adds a hand-drawn underline. */
  titleAccentColor?: 'blue' | 'coral';
  /** Objective/goal card icon badge color; defaults to blue when omitted. */
  objectiveIconColor?: 'blue' | 'coral';
  image: string;
  imageAlt: string;
  /** Small speech-bubble greeting overlapping the image, e.g. "👋 Hi there!". */
  speechBubble?: string;
  /** Small pill caption under the image, e.g. "Meet Ms. Maple!". */
  imageCaption?: string;
}

/**
 * A "Week N practice" welcome layout — a top pill badge (e.g. "📖 Planning
 * Practice"), a two-column hero (character image with a small emoji badge on
 * the left; week label, title, and "(Practice)" subtitle on the right),
 * followed by a full-width "Objective" card and a full-width "Recap" card
 * with a "Start Discussion" CTA that begins the lesson's first exercise.
 */
export interface LessonPracticeWelcome {
  badgeIcon: string;
  badgeLabel: string;
  weekPill: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /** Small emoji badge overlapping the top-right corner of the image, e.g. "👋". */
  imageBadge?: string;
  objectiveIcon: string;
  objectiveHeading: string;
  objectiveText: string;
  recapIcon: string;
  recapHeading: string;
  recapText: string;
  recapButtonLabel: string;
  footerNote?: string;
}

/**
 * A centered "Week N goal" welcome layout — a pill, a bold title, a captioned
 * illustration, and a single card split into two rows (an objective icon +
 * heading + text, then a divider, then a small all-caps focus label + text),
 * followed by a centered Start Your Journey button.
 */
export interface LessonGoalWelcome {
  weekPill: string;
  title: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  objectiveIcon: string;
  objectiveHeading: string;
  objectiveText: string;
  focusIcon: string;
  focusLabel: string;
  focusText: string;
  startLabel: string;
}

/**
 * A "Week N celebrate" welcome layout — a badge-numbered mascot image, a
 * two-tone title (plain + accent-colored phrase) and subtitle, a dashed-border
 * "Success Scrapbook" panel of student story cards (image, badge tag, title,
 * quote, and avatar credit), and a dark "next mission" bar with a CTA button.
 */
export interface LessonCelebrateWelcome {
  /** Number shown in the small pill badge overlapping the mascot image, e.g. "4". */
  badgeNumber: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  scrapbookHeading: string;
  scrapbookCards: {
    image: string;
    imageAlt: string;
    badgeLabel: string;
    badgeVariant: 'blue' | 'pink' | 'green';
    title: string;
    quote: string;
    studentName: string;
    studentAge: number;
    avatarVariant: 'pink' | 'blue' | 'yellow';
  }[];
  nextMissionLabel: string;
  nextMissionTitle: string;
  startLabel: string;
}

/** One selectable mood option inside a LessonFeelingsCheckWelcome's recap quiz, e.g. "😊 Happy". */
export interface LessonFeelingsCheckOption {
  id: string;
  emoji: string;
  label: string;
}

/**
 * A "Week N feelings check" welcome layout — a dark pill (e.g. "Week 1"), a
 * centered title, an "Objective" card, and below it a "Recap" mini-quiz where
 * tapping a mood emoji instantly reveals a mascot feedback card with an
 * affirming quote. Purely a warm-up moment — no right/wrong grading.
 */
export interface LessonFeelingsCheckWelcome {
  weekPill: string;
  title: string;
  objectiveLabel: string;
  objectiveText: string;
  recapHeading: string;
  recapQuestion: string;
  options: LessonFeelingsCheckOption[];
  /** Option selected by default, before the student taps anything. */
  defaultSelectedOptionId: string;
  feedbackText: string;
  /** Emoji shown in the mascot avatar overlapping the feedback card, e.g. "🌞" — ignored when `mascotImage` is set. */
  mascotEmoji: string;
  /** When set, renders this image in the mascot avatar instead of `mascotEmoji`. */
  mascotImage?: string;
  mascotImageAlt?: string;
  footerBrand: string;
  startLabel: string;
}

/** One selectable mood option inside a LessonFeelingsReviewWelcome's recap quiz, e.g. "Happy 😊". */
export interface LessonFeelingsReviewOption {
  id: string;
  emoji: string;
  label: string;
}

/**
 * A "Week N feelings review" welcome layout — a light-blue hero with a small
 * "Week N" pill, a two-line title (plain + accent-colored second line), an
 * "Objective" card, and a hero image, followed by a "Recap" card with a
 * question, pill-style mood options, and an affirming feedback banner. Like
 * `feelingsCheckWelcome`, this is a purely decorative recap — no right/wrong
 * grading.
 */
export interface LessonFeelingsReviewWelcome {
  weekPill: string;
  titleLine1: string;
  /** Second title line, rendered in the accent color. */
  titleLine2: string;
  objectiveIcon: string;
  objectiveLabel: string;
  objectiveText: string;
  image: string;
  imageAlt: string;
  recapIcon: string;
  recapEyebrow: string;
  recapHeading: string;
  recapQuestionIcon: string;
  recapQuestion: string;
  options: LessonFeelingsReviewOption[];
  /** Option selected by default, before the student taps anything — omit to start with nothing selected, requiring the student to pick one before the feedback/Start button appear. */
  defaultSelectedOptionId?: string;
  feedbackText: string;
  startLabel: string;
}

/** One selectable answer inside a LessonRecapQuizWelcome's recap quiz, e.g. "🤝 Sharing". */
export interface LessonRecapQuizOption {
  id: string;
  emoji: string;
  label: string;
}

/**
 * A "Week N recap quiz" welcome layout — a light-blue page with a small
 * icon+"Week N" pill, a two-tone centered title, a wide hero photo, a
 * gradient "Objective" banner, and (in the same row on wide screens) a
 * graded "Recap Quiz" card: picking the correct option shows the feedback
 * quote and unlocks Start; picking wrong shows a "Try Again" prompt and
 * resets so the student can pick again.
 */
export interface LessonRecapQuizWelcome {
  weekPillIcon: string;
  weekPill: string;
  /** First title word(s), rendered in the accent color. */
  titleAccent: string;
  /** Remaining title words, in the plain dark color. */
  titlePlain: string;
  image: string;
  imageAlt: string;
  objectiveIcon: string;
  objectiveLabel: string;
  objectiveText: string;
  recapBadge: string;
  recapQuestion: string;
  options: LessonRecapQuizOption[];
  correctOptionId: string;
  feedbackText: string;
  tryAgainLabel: string;
  footerNote: string;
  startLabel: string;
}

/** One selectable answer card inside a LessonEmpathyJourneyWelcome's recap, e.g. an image of two kids sharing labeled "Sharing". */
export interface LessonEmpathyJourneyOption {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
}

/**
 * A "Week N empathy journey" welcome layout — a light-blue centered page with
 * a "journey" pill, a small "WEEK N" label, a two-tone underlined title, a
 * tinted hero-image card, a white Objective card, then a graded recap: a
 * Question card and a Sample Answer card with picture-and-label option cards
 * the student taps to choose. Feedback and Start only appear once the
 * student has picked an option — no default selection.
 */
export interface LessonEmpathyJourneyWelcome {
  journeyBadge: string;
  weekLabel: string;
  titlePlain: string;
  /** Second title portion, underlined and rendered in the accent color. */
  titleAccent: string;
  image: string;
  imageAlt: string;
  objectiveIcon: string;
  objectiveLabel: string;
  objectiveText: string;
  questionBadge: string;
  question: string;
  sampleAnswerBadge: string;
  options: LessonEmpathyJourneyOption[];
  feedbackBadge: string;
  feedbackText: string;
  startLabel: string;
}

/**
 * A "Week N intro + warm-up preview" welcome layout — a pill/title/subtitle
 * hero above a single photo card that previews the warm-up game the student
 * is about to play (activity pill, heading, description) and a "Start Quiz"
 * button that begins the lesson's first exercise. Simpler than
 * `recapQuizWelcome`/`empathyJourneyWelcome` — the preview isn't interactive,
 * it's just a teaser for the real graded warm-up that follows.
 */
export interface LessonWarmupPreviewWelcome {
  weekPillIcon: string;
  weekPill: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  activityPillIcon: string;
  activityPill: string;
  activityHeading: string;
  activityDescription: string;
  startLabel: string;
}

/** One preview card inside a QuickRecapWelcome, e.g. "Feelings Matter" with a heart icon. */
export interface QuickRecapPreviewCard {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
}

/**
 * A "welcome back" hero (eyebrow badge + two-column image/copy + Start button
 * + dashed Objective pill) followed, on the same screen, by a "Quick Recap"
 * card listing short reminder items, a couple of preview cards teasing this
 * week's new ideas, and a closing gradient banner inviting the student into
 * the week.
 */
export interface LessonQuickRecapWelcome {
  weekPill: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  startLabel: string;
  objectiveIcon: string;
  objectiveLabel: string;
  objectiveText: string;
  image: string;
  imageAlt: string;
  recapIcon: string;
  recapHeading: string;
  recapIntro: string;
  recapItems: { icon: string; label: string }[];
  previewCards: QuickRecapPreviewCard[];
  bannerIcon: string;
  bannerHeading: string;
  bannerText: string;
}

/**
 * A centered "Week N daily practice" welcome layout — a small pill badge
 * (icon + label), a two-tone title (plain + accent-colored phrase), a
 * subtitle, and a side-by-side pair of Objective/Recap cards, followed by a
 * single CTA button. No image — simpler than `practiceWelcome`/`goalWelcome`.
 */
export interface LessonDailyGoalWelcome {
  badgeIcon: string;
  badgeLabel: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  objectiveIcon: string;
  objectiveHeading: string;
  objectiveText: string;
  recapIcon: string;
  recapHeading: string;
  recapText: string;
  startLabel: string;
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  /** Which "week" of the module this lesson represents — drives badge awarding. */
  week: number;
  /** Short stage label shown on the lesson welcome screen, e.g. "Awareness". */
  stage?: string;
  /** When true, the lesson card shows on the module map but stays locked ("Coming soon") regardless of the student's progress — used for weeks whose content isn't ready yet. */
  comingSoon?: boolean;
  /** Quoted one-liner under the lesson title, e.g. "I am me because…". */
  tagline?: string;
  mainFocus?: string;
  discoverPoints?: string[];
  /** Second sentence of the personalized "Welcome to Your Learning Journey!" greeting — the plain welcome screen's `Hello, {firstName}! I'm so excited to see you here today. {journeyIntro}` */
  journeyIntro?: string;
  /** When set, the lesson-welcome screen renders this richer layout instead of the plain card/discover-list one. */
  welcomeCard?: LessonWelcomeCard;
  /** When set, renders the "intro + recap of last week" welcome layout instead of any other welcome layout — takes priority over `welcomeCard`. */
  recapWelcome?: LessonRecapWelcome;
  /** When set, renders the plain "Week N intro" objectives-card welcome layout instead of any other welcome layout — takes priority over all other welcome fields. */
  objectivesWelcome?: LessonObjectivesWelcome;
  /** When set, renders the two-column "intro + mascot" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `objectivesWelcome`. */
  introWelcome?: LessonIntroWelcome;
  /** When set, renders the "practice" welcome layout (hero + Objective card + Recap/Start Discussion card) instead of any other welcome layout — takes priority over all other welcome fields, including `introWelcome`. */
  practiceWelcome?: LessonPracticeWelcome;
  /** When set, renders the centered "goal" welcome layout (captioned image + Objective/Focus card) instead of any other welcome layout — takes priority over all other welcome fields, including `practiceWelcome`. */
  goalWelcome?: LessonGoalWelcome;
  /** When set, renders the "celebrate" welcome layout (badge-numbered mascot + Success Scrapbook + next-mission bar) instead of any other welcome layout — takes priority over all other welcome fields, including `goalWelcome`. */
  celebrateWelcome?: LessonCelebrateWelcome;
  /** When set, renders the "Welcome Back" celebratory-banner welcome layout instead of the plain card. Shown under the personalized "Welcome Back, {firstName}!" headline. */
  welcomeBackIntro?: string;
  /** When set, renders the "mastery hero" welcome layout instead of the plain card — a badge pill, quoted-title headline, this subtitle, the Main Focus box, and a circular photo. */
  heroSubtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** When set, renders the "feelings check" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `celebrateWelcome`. */
  feelingsCheckWelcome?: LessonFeelingsCheckWelcome;
  /** When set, renders the "feelings review" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `feelingsCheckWelcome`. */
  feelingsReviewWelcome?: LessonFeelingsReviewWelcome;
  /** When set, renders the "recap quiz" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `feelingsReviewWelcome`. */
  recapQuizWelcome?: LessonRecapQuizWelcome;
  /** When set, renders the "empathy journey" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `recapQuizWelcome`. */
  empathyJourneyWelcome?: LessonEmpathyJourneyWelcome;
  /** When set, renders the "warm-up preview" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `empathyJourneyWelcome`. */
  warmupPreviewWelcome?: LessonWarmupPreviewWelcome;
  /** When set, renders the "welcome back hero + Quick Recap + preview cards + banner" welcome layout instead of any other welcome layout — takes priority over all other welcome fields, including `warmupPreviewWelcome`. */
  quickRecapWelcome?: LessonQuickRecapWelcome;
  /** When set, renders the "daily goal" welcome layout (badge + two-tone title + side-by-side Objective/Recap cards) instead of any other welcome layout — takes priority over all other welcome fields, including `quickRecapWelcome`. */
  dailyGoalWelcome?: LessonDailyGoalWelcome;
  /** When set, renders the "speak up" welcome layout (week pill + side-by-side title/illustration card and "What We'll Learn" card, then a full-width recap-from-last-time card, a start button, and a Hoot line) — takes priority over all other welcome fields. */
  speakUpWelcome?: LessonSpeakUpWelcome;
  /** When set, renders the "Speak Up Club" welcome layout (branded top bar, two-column hero, Today's Goal bar, Let's Recap card, "What We'll Do Today" step cards, and a coral CTA banner) — takes priority over all other welcome fields. */
  speakUpClubWelcome?: LessonSpeakUpClubWelcome;
  /** When set, renders the "Tiny Voices" welcome layout (branded top bar with a week badge, a two-column hero — week-lesson pill, two-tone title, subtitle, an "Our Goal" card and a "Let's Begin" gradient button, plus an illustration card with a speech bubble — and a footer row of reassurance checks) — takes priority over all other welcome fields. */
  tinyVoicesWelcome?: LessonTinyVoicesWelcome;
  /** When set, renders the "Little Lantern" welcome layout (branded top bar with a "Week N of M" marker, a two-column hero — dotted eyebrow, two-tone title, subtitle, a "Start this lesson" button and a "safe space" lock line, plus an illustration with a speech bubble — and a full-width "Our objective" card) — takes priority over all other welcome fields. */
  littleLanternWelcome?: LessonLittleLanternWelcome;
  /** When set, renders the "grow kinder" welcome layout (centered week pill, two-tone title, illustration with a speech bubble, a "What We'll Learn" objective card with coloured word runs, a row of three focus cards, a start button, and a heart-flanked tagline) — takes priority over all other welcome fields. */
  growKinderWelcome?: LessonGrowKinderWelcome;
  /** When set, renders the "polite online" welcome layout (gradient page, two-tone title, decorative chat card, objective card, manners chips) — takes priority over all other welcome fields. */
  politeOnlineWelcome?: LessonPoliteOnlineWelcome;
  /** When set, renders the "respect circle" welcome layout (gradient page, orbit diagram, objective card, practice chips) — takes priority over all other welcome fields. */
  respectCircleWelcome?: LessonRespectCircleWelcome;
  /** When set, renders the "think before you post" welcome layout (gradient page, a draft-post card funnelling down through the T.H.I.N.K. gate stack to a "ready to post" chip, objective card, "time to pause when…" signal chips) — takes priority over all other welcome fields. */
  thinkBeforePostWelcome?: LessonThinkBeforePostWelcome;
  /** When set, renders the "digital manners" welcome layout (gradient page, a phone home-screen of everyday-app tiles each captioned with the manner it calls for, objective card, everyday-habit chips) — takes priority over all other welcome fields. */
  digitalMannersWelcome?: LessonDigitalMannersWelcome;
  /** When set, renders the "responsible tech control panel" welcome layout (deep-navy page, a dark glowing device panel with a balance gauge and ON toggles, objective card, principle cards) — takes priority over all other welcome fields. */
  techResponsiblyWelcome?: LessonTechResponsiblyWelcome;
  /** When set, renders the "personal info vault" welcome layout (cream page, a combination-dial vault with padlocked "valuables" cards, objective card, "keep it private" habit chips) — takes priority over all other welcome fields. */
  privacyVaultWelcome?: LessonPrivacyVaultWelcome;
  /** When set, renders the "screen-time balance clock" welcome layout (dawn-to-dusk gradient page, an SVG day-clock donut whose coloured wedges show how screen time fits around school, play, family and sleep, a "self-control charge" battery meter, objective card, self-control strategy cards) — takes priority over all other welcome fields. */
  screenBalanceWelcome?: LessonScreenBalanceWelcome;
  /** When set, renders the "ripple of respect" welcome layout (warm rose-to-amber gradient page, an SVG ripple diagram where one kind message spreads out through a ring of friend nodes that light up in turn, objective card, "respect online looks like…" practice cards) — takes priority over all other welcome fields. */
  respectRippleWelcome?: LessonRespectRippleWelcome;
  /** When set, renders the "imagination spark" welcome layout (warm cream-to-peach gradient page, a glowing central lightbulb throwing rays out to a ring of floating idea bubbles, objective card, "creativity looks like…" cards) — takes priority over all other welcome fields. */
  imaginationSparkWelcome?: LessonImaginationSparkWelcome;
  /** When set, renders the "cinema in your mind" welcome layout (deep indigo spotlit page, a projector screen framed by film-strip perforations with imagined-scene frames gliding across it, objective card, "when you imagine, you can…" cards) — takes priority over all other welcome fields. */
  mindCinemaWelcome?: LessonMindCinemaWelcome;
  /** When set, renders the "many paths to one solution" welcome layout (mint-to-sky map page, an SVG route map joining a "problem" node to a "solved" flag by several differently-curved trails with labelled approach chips, objective card, "a creative problem-solver…" cards) — takes priority over all other welcome fields. */
  puzzlePathsWelcome?: LessonPuzzlePathsWelcome;
  /** When set, renders the "idea to creation, step by step" welcome layout (warm paint-studio gradient page, a rising staircase from a "ground" idea block through numbered action treads to a "summit" flag, objective card, "creativity comes out when you…" cards) — takes priority over all other welcome fields. */
  creativeStaircaseWelcome?: LessonCreativeStaircaseWelcome;
  /** When set, renders the "strategy blueprint" welcome layout (deep-blue blueprint-paper page with a drafting grid, an SVG plan drawn in white ink — a "problem" pin joined to a "goal" flag by a dashed planned route that bends around a marked obstacle, with numbered move markers along it, objective card, "a good strategy…" cards) — takes priority over all other welcome fields. */
  strategyBlueprintWelcome?: LessonStrategyBlueprintWelcome;
  /** When set, renders the "pause button" welcome layout (calm teal-to-plum twilight page, a large glowing PAUSE button with a slow sweeping ring, a "something happens → pause & think → better choice" strip, objective card, "in the pause you can…" cards) — takes priority over all other welcome fields. */
  pauseButtonWelcome?: LessonPauseButtonWelcome;
  /** When set, renders the "strategy keyring" welcome layout (warm brass-and-green workshop page, a central ring with differently-shaped keys fanned around it that each name a strategy, objective card, "problem → strategy" match cards) — takes priority over all other welcome fields. */
  strategyKeyringWelcome?: LessonStrategyKeyringWelcome;
  /** When set, renders the "goal path" welcome layout (bright sunrise page, a winding path of numbered stepping stones climbing from a "you now" marker to a goal flag, objective card, "a goal-getter's strategy…" cards) — takes priority over all other welcome fields. */
  goalPathWelcome?: LessonGoalPathWelcome;
  /** When set, renders the "attention lens" welcome layout (deep-violet page, a large magnifying lens spotlighting a cluster of sharp labelled details while distraction icons drift dim and blurred around the edges, objective card, "sharp focus looks like…" cards) — takes priority over all other welcome fields. */
  attentionLensWelcome?: LessonAttentionLensWelcome;
  /** When set, renders the "solution path" welcome layout (pale-aqua page, an SVG path joining a scribbled "problem" tangle to a glowing "solved" target through three numbered problem-solving stations, objective card, "a good problem-solver…" cards) — takes priority over all other welcome fields. */
  solutionPathWelcome?: LessonSolutionPathWelcome;
  /** When set, renders the "memory workshop" welcome layout (warm cream-to-rose page, a board with a "grouping" panel where loose items drop into labelled bins and a "repetition" panel where a short string echoes around a loop, objective card, "a strong memory…" cards) — takes priority over all other welcome fields. */
  memoryWorkshopWelcome?: LessonMemoryWorkshopWelcome;
  /** When set, renders the "smart choice forecast" welcome layout (warm sunshine-yellow page, a "you decide" node forking into two branches that each stack a choice, its consequence and an outcome badge, objective card, "a smart chooser…" cards) — takes priority over all other welcome fields. */
  smartChoiceForecastWelcome?: LessonSmartChoiceForecastWelcome;
  /** When set, renders the "trade-off see-saw" welcome layout (Choices Module, Week 1 — a warm cartoon see-saw balanced on a smiling coin, with a "what you pick" seat down and a "what you give up" seat tipped up, everyday trade-off pairs, an objective card and "a smart chooser…" cards) — takes priority over all other welcome fields. */
  tradeOffWelcome?: LessonTradeOffWelcome;
  /** When set, renders the "budget jars" welcome layout (Choices Module, Week 2 — a planner-blue page with a shelf of clear cartoon jars, each labelled with a job for the money and a coin dropping in, an objective card and "a good money planner…" cards) — takes priority over all other welcome fields. */
  budgetPlanWelcome?: LessonBudgetPlanWelcome;
  /** When set, renders the "consequence chain" welcome layout (Choices Module, Week 3 — a warm sunset page with a coin about to topple a run of domino tiles that spell out how one money choice leads to what happens now and later, an objective card and "a thoughtful spender…" cards) — takes priority over all other welcome fields. */
  consequenceChainWelcome?: LessonConsequenceChainWelcome;
  /** When set, renders the "smart money checklist" welcome layout (Choices Module, Week 4 — a cream clipboard of decision questions that tick off in turn and end in a "SMART CHOICE" stamp, an objective card and "a smart decision-maker…" cards) — takes priority over all other welcome fields. */
  smartDecisionWelcome?: LessonSmartDecisionWelcome;
  /** When set, renders the "discipline compass" welcome layout (Discipline Module, Week 1 — a sky-blue page with a hand-drawn compass whose needle swings to a "right choice" mark, a two-tone title and a single Objective card) — takes priority over all other welcome fields. */
  disciplineCompassWelcome?: LessonDisciplineCompassWelcome;
  /** When set, renders the "self-control dial" welcome layout (Discipline Module, Week 2 — a page with a hand-drawn gauge whose needle eases from a red "react" zone to a green "steady" zone, a two-tone title and a single Objective card) — takes priority over all other welcome fields. */
  selfControlDialWelcome?: LessonSelfControlDialWelcome;
  /** When set, renders the "routine loop" welcome layout (Discipline Module, Week 3 — a page with a hand-drawn circular day-loop whose four stops light up around the ring, a two-tone title and a single Objective card) — takes priority over all other welcome fields. */
  routineLoopWelcome?: LessonRoutineLoopWelcome;
  /** When set, renders the "consistency streak" welcome layout (Discipline Module, Week 4 — a page with a hand-drawn seven-day streak strip that fills into an unbroken run over a climbing growth bar, a two-tone title and a single Objective card) — takes priority over all other welcome fields. */
  consistencyStreakWelcome?: LessonConsistencyStreakWelcome;
  /** When set, renders the "helping hands" welcome layout (Service Module, Week 1 — "What is Service?": a warm amber page, a two-tone title, a hand-drawn scene of one hand passing a glowing heart to another, and a single Objective card) — takes priority over all other welcome fields. */
  serviceHandsWelcome?: LessonServiceHandsWelcome;
  /** When set, renders the "serve where you are" welcome layout (Service Module, Week 2 — "Serving at Home and School": a warm page, a two-tone title, a hand-drawn scene of a home and a school joined by a path of hearts, and a single Objective card) — takes priority over all other welcome fields. */
  serviceSpotsWelcome?: LessonServiceSpotsWelcome;
  /** When set, renders the "kindness + responsibility" welcome layout (Service Module, Week 3 — "Kindness and Responsibility": a warm page, a two-tone title, a hand-drawn "heart + checkmark badge = service star" equation, and a single Objective card) — takes priority over all other welcome fields. */
  serviceKindnessWelcome?: LessonServiceKindnessWelcome;
  /** When set, renders the "making a difference" welcome layout (Service Module, Week 4 — "Making a Difference": a warm page, a two-tone title, a hand-drawn ripple where one glowing heart at the centre sends rings out to a circle of dots that light up in turn, and a single Objective card) — takes priority over all other welcome fields. */
  serviceRippleWelcome?: LessonServiceRippleWelcome;
  /** When set, renders the "puzzle team" welcome layout (Teamwork Module, Week 1 — "What is Teamwork?": a mint-to-teal page, a two-tone title, four labelled puzzle pieces that slide in from the corners and lock into one complete square, a caption, and a single Objective card) — takes priority over all other welcome fields. */
  teamworkPuzzleWelcome?: LessonTeamworkPuzzleWelcome;
  /** When set, renders the "role lineup" welcome layout (Teamwork Module, Week 2 — "Roles in a Team": a mint-to-teal page, a two-tone title, a hand-drawn line-up of four team members that pop in one by one, each wearing a differently-coloured role badge and captioned with a role name, a caption, and a single Objective card) — takes priority over all other welcome fields. */
  teamworkRolesWelcome?: LessonTeamworkRolesWelcome;
  /** When set, renders the "talk and listen" welcome layout (Teamwork Module, Week 3 — "Communication in Teams": a mint-to-teal page, a two-tone title, a hand-drawn scene of two team members passing a speech bubble back and forth while listening ears pulse, a caption, and a single Objective card) — takes priority over all other welcome fields. */
  teamworkTalkWelcome?: LessonTeamworkTalkWelcome;
  /** When set, renders the "meshing gears" welcome layout (Teamwork Module, Week 4 — "Respect and Cooperation": a mint-to-teal page, a two-tone title, a hand-drawn pair of interlocking gears that turn together, a caption, and a single Objective card) — takes priority over all other welcome fields. */
  teamworkGearsWelcome?: LessonTeamworkGearsWelcome;
  /** When set, renders the "bubble bath" welcome layout (Hygiene Module — a fresh cyan tiled card, a two-tone title on a bathroom-tile strip, a smiling water-drop mascot with bubbles rising past it, a friendly caption, and the objective on a punched paper luggage-tag instead of the usual bordered card) — takes priority over all other welcome fields. */
  hygieneIntroWelcome?: LessonHygieneIntroWelcome;
  /** When set, renders the "mirror" welcome layout (Hygiene Module, Week 2 — a soft mint page, a two-tone title, an oval hand-mirror with a slow shine sweep framing a small sun rising over a horizon, a friendly caption, and the objective inside a rounded hand-mirror card) — takes priority over all other welcome fields. */
  hygienePersonalWelcome?: LessonHygienePersonalWelcome;
  /** When set, renders the "handwashing" welcome layout (Hygiene Module, Week 3 — a sky-blue page, a two-tone title, an SVG tap running water over two cupped soapy hands while little germ blobs rinse away, a friendly caption, and the objective inside a soft foam-bubble card) — takes priority over all other welcome fields. */
  hygieneHandwashWelcome?: LessonHygieneHandwashWelcome;
  /** When set, renders the "growing habit" welcome layout (Hygiene Module, Week 4 — a warm honey-and-cream page, a two-tone title, an SVG potted plant on a windowsill whose four leaves unfurl one by one under a slow-rising sun, a friendly caption, and the objective inside a leaf-shaped card) — takes priority over all other welcome fields. */
  hygieneHabitsWelcome?: LessonHygieneHabitsWelcome;
  /** When set, renders the "whole self sprout" welcome layout (Wellness Module, Week 1 — a sunny peach-and-green page, a two-tone title, an SVG seedling growing from a pot with three glowing orbs (body, mind, feelings) circling it, a caption, a trio of labelled pillar chips, and the objective inside a seed-packet card) — takes priority over all other welcome fields. */
  wellnessIntroWelcome?: LessonWellnessIntroWelcome;
  /** When set, renders the "moving body" welcome layout (Wellness Module, Week 2 — a fresh teal-and-coral page, a two-tone title, an SVG kid mid-stretch inside a pulsing energy ring, a caption, a row of labelled body-care habit chips, and the objective inside a rounded card) — takes priority over all other welcome fields. */
  wellnessBodyWelcome?: LessonWellnessBodyWelcome;
  /** When set, renders the "mood heart" welcome layout (Wellness Module, Week 3 — a soft lavender-and-yellow page, a two-tone title, an SVG heart that gently shifts colour with small mood faces drifting around it, a caption, a row of labelled feeling chips, and the objective inside a rounded card) — takes priority over all other welcome fields. */
  wellnessFeelingsWelcome?: LessonWellnessFeelingsWelcome;
  /** When set, renders the "daily routine clock" welcome layout (Wellness Module, Week 4 — an amber-to-deep-blue day-to-night page, a two-tone title, an SVG clock face with a sweeping hand and small routine icons at the hour marks, a caption, a row of labelled routine-step chips, and the objective inside a rounded card) — takes priority over all other welcome fields. */
  wellnessRoutineWelcome?: LessonWellnessRoutineWelcome;
  /** When set, renders the "fuel plate" welcome layout (Nutrition Module, Week 1 — "Why Do We Need Food?": a warm tomato-and-amber page, a two-tone title, an SVG dinner plate whose three food wedges light up in turn while an energy bolt rises and a small battery charges to full, a caption, a row of labelled benefit chips, and the objective inside a menu-card) — takes priority over all other welcome fields. */
  nutritionWhyFoodWelcome?: LessonNutritionWhyFoodWelcome;
  /** When set, renders the "food-group pyramid" welcome layout (Nutrition Module, Week 2 — "Different Foods Help Our Bodies": a leaf-green-and-cream page, a two-tone title, an SVG stack of food-group tiers that build up from the base one after another, a caption, a row of labelled food-group chips, and the objective inside a card) — takes priority over all other welcome fields. */
  nutritionFoodGroupsWelcome?: LessonNutritionFoodGroupsWelcome;
  /** When set, renders the "balance scale" welcome layout (Nutrition Module, Week 3 — "Healthy Choices vs Unhealthy Choices": a split mint / peach page, a two-tone title, an SVG balance scale that rocks and settles with the healthy pan lower, a caption, two labelled chip columns for "everyday" and "sometimes" foods, and the objective inside a card) — takes priority over all other welcome fields. */
  nutritionHealthyChoicesWelcome?: LessonNutritionHealthyChoicesWelcome;
  /** When set, renders the "habit house" welcome layout (Nutrition Module, Week 4 — "Building Healthy Eating Habits": a warm amber-and-cream page, a two-tone title, an SVG house that builds itself brick by brick then adds its roof, a caption, a row of labelled daily-habit chips, and the objective inside a card) — takes priority over all other welcome fields. */
  nutritionHabitsWelcome?: LessonNutritionHabitsWelcome;
  /** When set, renders the "identity mosaic" welcome layout (Identity Module — Advanced, Week 1 — "What Makes Me, Me?": a full-width theme banner, an ages badge, a two-tone title over an illustration, and a bordered card with week/stage pills, a quoted title, an Objective box, and a row of identity-piece tag pills) — takes priority over all other welcome fields. */
  identityMosaicWelcome?: LessonIdentityMosaicWelcome;
  /** When set, renders the plain "spare intro" welcome layout (Identity Module — Advanced: a single spare card — a week/stage pill, title, one short subtitle line, and a compact objective list, with no banner, hero image, or tag row) — takes priority over all other welcome fields. */
  identityStrengthsWelcome?: LessonIdentityStrengthsWelcome;
  /** When set, renders the "planning route" welcome layout (Planning Module — Advanced, Week 1 — "Why Planning Matters": a spare teal card with week/stage pills, a short title, one subtitle line, and the objectives drawn as a numbered route of dashed-linked nodes) — takes priority over all other welcome fields. */
  planningWhyWelcome?: LessonPlanningWhyWelcome;
  /** When set, renders the "priority matrix" welcome layout (Planning Module — Advanced, Week 2 — "Strategic Planning": a spare navy/amber card with week/stage pills, a short title, one subtitle line, an important-vs-urgent 2×2 matrix graphic, and a compact objective list) — takes priority over all other welcome fields. */
  planningPrioritiesWelcome?: LessonPlanningPrioritiesWelcome;
  /** When set, renders the "SMART goals" welcome layout (Planning Module — Advanced, Week 3 — "Smart Goals and Follow-Through": a spare coral/gold card with week/stage pills, a short title, one subtitle line, a row of S-M-A-R-T letter tiles, and a compact objective list) — takes priority over all other welcome fields. */
  planningGoalsWelcome?: LessonPlanningGoalsWelcome;
  /** When set, renders the "growth path" welcome layout (Planning Module — Advanced, Week 4 — "Reflection and Growth: From Plans to Habits": a spare sage-green card with week/stage pills, a short title, one subtitle line, a seed-to-sprout-to-plant growth row, and a compact objective list) — takes priority over all other welcome fields. */
  planningGrowthWelcome?: LessonPlanningGrowthWelcome;
  /** When set, renders the "capstone trophy" welcome layout (Planning Module — Advanced, End-of-Module Project: a gold-gradient card with a trophy badge, a short title, one subtitle line, and a compact task list) — takes priority over all other welcome fields. */
  planningCapstoneWelcome?: LessonPlanningCapstoneWelcome;
  /** When set, renders the "spark" welcome layout (Self-Confidence Module — Advanced, Week 1 — "Believing in Myself": a spare coral card with week/stage pills, a short title, one subtitle line, the week's objective, and a short reflection prompt recapping the Planning module with a sample answer) — takes priority over all other welcome fields. */
  confidenceSparkWelcome?: LessonConfidenceSparkWelcome;
  /** When set, renders the "capstone trophy" welcome layout (Self-Confidence Module — Advanced, End-of-Module Project: a coral-gradient card with a trophy badge, a short title, one subtitle line, and a compact task list) — takes priority over all other welcome fields. */
  confidenceCapstoneWelcome?: LessonConfidenceCapstoneWelcome;
  /** Ordered steps the student walks through — warm-up, story, discussion, activity, challenge, questions. */
  exercises: Exercise[];
}

/**
 * The "speak up" welcome layout — a centered WEEK N pill sitting over a card
 * whose left column is a two-line title, a teacher illustration, and a
 * welcome-back paragraph; its right column ("What We'll Learn") is an
 * objective line above a numbered list. Below, a full-width "Recap From Last
 * Time" card with Hoot the owl and a quote, then a big start button, a
 * caption, and a Hoot one-liner.
 */
export interface LessonSpeakUpWelcome {
  weekPill: string;
  title: string;
  image: string;
  imageAlt: string;
  subtitle: string;
  learnHeading: string;
  learnIntro: string;
  learnPoints: string[];
  recapLabel: string;
  recapQuote: string;
  recapText: string;
  startLabel: string;
  startCaption: string;
  hootMessage: string;
}

/** One coloured run in the Speak Up Club intro paragraph. */
export interface SpeakUpClubSegment {
  text: string;
  bold?: boolean;
}

/** One "from last time" recap tile in the Speak Up Club welcome. */
export interface SpeakUpClubRecapCard {
  icon: string;
  label: string;
  text: string;
  tone: 'coral' | 'blue' | 'green';
}

/** One numbered "what we'll do today" step card in the Speak Up Club welcome. */
export interface SpeakUpClubStepCard {
  icon: string;
  title: string;
  text: string;
  tone: 'yellow' | 'pink' | 'green';
}

/**
 * The "Speak Up Club" welcome layout — a branded top bar with a "Week N of M"
 * pill, a two-column hero (week pill, two-tone underlined title, an intro
 * paragraph, Begin/Listen buttons, an age/duration meta line, and a mascot
 * illustration with a speech bubble), a full-width "Today's Goal" gradient
 * bar, a "Let's Recap" card of three tiles, a "What We'll Do Today" row of
 * three numbered step cards, and a coral call-to-action banner.
 */
export interface LessonSpeakUpClubWelcome {
  brandName: string;
  brandTagline: string;
  weekOfLabel: string;
  weekPill: string;
  titleStart: string;
  titleAccent: string;
  introSegments: SpeakUpClubSegment[];
  beginLabel: string;
  listenLabel: string;
  ageLabel: string;
  durationLabel: string;
  image: string;
  imageAlt: string;
  speechBubble: string;
  goalHeading: string;
  goalText: string;
  recapHeading: string;
  recapEyebrow: string;
  recapCards: SpeakUpClubRecapCard[];
  stepsHeading: string;
  stepsSub: string;
  steps: SpeakUpClubStepCard[];
  ctaHeading: string;
  ctaText: string;
  ctaButtonLabel: string;
  footerText: string;
}

/** One coloured word run inside a GrowKinder objective line. */
export interface GrowKinderSegment {
  text: string;
  color?: 'orange' | 'pink';
}

/** One focus card in the "grow kinder" welcome layout. */
export interface GrowKinderCard {
  icon: string;
  tone: 'yellow' | 'pink' | 'green';
  title: string;
  text: string;
}

/**
 * The "grow kinder" welcome layout — a centered "Week N" pill, a two-tone
 * title, a decorated illustration with a two-line speech bubble, a white
 * "What We'll Learn" card whose objective sentence has individually coloured
 * word runs, a row of three focus cards, a start button, and a
 * heart-flanked tagline.
 */
export interface LessonGrowKinderWelcome {
  weekPill: string;
  titleStart: string;
  titleAccent: string;
  image: string;
  imageAlt: string;
  speechBubbleStrong: string;
  speechBubbleText: string;
  learnHeading: string;
  objectiveSegments: GrowKinderSegment[];
  cards: GrowKinderCard[];
  startLabel: string;
  footerTagline: string;
}

/** One message bubble in the decorative chat preview of the "polite online" welcome. */
export interface PoliteOnlineMessage {
  /** `them` renders left-aligned/neutral, `me` renders right-aligned/accent. */
  from: 'them' | 'me';
  text: string;
  /** Optional emoji reaction pinned to the bubble, e.g. "💜". */
  reaction?: string;
}

/** One "good manners" chip below the objective card in the "polite online" welcome. */
export interface PoliteOnlineChip {
  icon: string;
  text: string;
}

/**
 * The "polite online" welcome layout (Etiquette module, Week 1) — a soft
 * violet-to-sky gradient page with a week label pill, a two-tone title, a
 * short intro line, then a decorative phone-style chat card showing a kind
 * back-and-forth (bubbles with optional emoji reactions), an "Our Objective"
 * card, a wrapping row of "good manners" chips, a start button, and a small
 * footer note. Purely presentational — the chat is not interactive.
 */
export interface LessonPoliteOnlineWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  chatTitle: string;
  messages: PoliteOnlineMessage[];
  objectiveLabel: string;
  objectiveText: string;
  chipsHeading: string;
  chips: PoliteOnlineChip[];
  startLabel: string;
  footerNote: string;
}

/** One node orbiting the centre of the "respect circle" welcome diagram. */
export interface RespectCircleNode {
  icon: string;
  label: string;
}

/** One respectful-practice chip in the "respect circle" welcome. */
export interface RespectCirclePractice {
  icon: string;
  text: string;
}

/**
 * The "respect circle" welcome layout (Etiquette module, Week 2) — a
 * teal-to-gold gradient page with a week label pill, a two-tone title, a short
 * intro, then a circular "orbit" diagram (a centre disc labelled e.g. "YOU"
 * with people/space nodes evenly spaced around a ring), an "Our Objective"
 * card, a row of respectful-practice chips, a start button, and a footer note.
 * Purely presentational.
 */
export interface LessonRespectCircleWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  centerLabel: string;
  orbitNodes: RespectCircleNode[];
  objectiveLabel: string;
  objectiveText: string;
  practicesHeading: string;
  practices: RespectCirclePractice[];
  startLabel: string;
  footerNote: string;
}

/** One gate in the T.H.I.N.K. filter stack of the "think before you post" welcome. */
export interface ThinkGate {
  /** The gate's initial, e.g. "T". */
  letter: string;
  /** The word it stands for, e.g. "True". */
  word: string;
  /** The question the learner asks at this gate, e.g. "Is it true?". */
  question: string;
}

/** One "time to pause" signal chip in the "think before you post" welcome. */
export interface ThinkPauseSignal {
  icon: string;
  text: string;
}

/**
 * The "think before you post" welcome layout (Etiquette module, Week 3) — an
 * amber-to-indigo gradient page with a week label pill, a two-tone title, a
 * short intro, then a vertical funnel: a "draft post" card at the top drops
 * through a stack of T.H.I.N.K. gates (each a lettered badge with a word and a
 * check question) down to a "ready to post" chip. Below sit an "Our Objective"
 * card and a wrapping row of "time to pause when…" signal chips, then a start
 * button and a footer note. Purely presentational — the funnel is not
 * interactive.
 */
export interface LessonThinkBeforePostWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  draftLabel: string;
  draftText: string;
  gatesHeading: string;
  gates: ThinkGate[];
  publishLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  signalsHeading: string;
  signals: ThinkPauseSignal[];
  startLabel: string;
  footerNote: string;
}

/** One app tile on the phone home-screen of the "digital manners" welcome. */
export interface DigitalMannersApp {
  icon: string;
  name: string;
  /** The manner this everyday app calls for, e.g. "Greet before you ask". */
  manner: string;
}

/** One everyday-habit chip in the "digital manners" welcome. */
export interface DigitalMannersHabit {
  icon: string;
  text: string;
}

/**
 * The "digital manners" welcome layout (Etiquette module, Week 4) — a
 * rose-to-sky gradient page with a week label pill, a two-tone title, a short
 * intro, then a decorative phone home-screen: a grid of everyday-app tiles
 * (Messages, Group Chat, Video Call, Photos, Games, Email…) each captioned with
 * the good manner it calls for. Below sit an "Our Objective" card and a
 * wrapping row of everyday-habit chips, then a start button and a footer note.
 * Purely presentational — the phone is not interactive.
 */
export interface LessonDigitalMannersWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  phoneLabel: string;
  apps: DigitalMannersApp[];
  objectiveLabel: string;
  objectiveText: string;
  habitsHeading: string;
  habits: DigitalMannersHabit[];
  startLabel: string;
  footerNote: string;
}

/** One glowing status toggle on the "responsible tech" control panel, e.g. "Safe mode · ON". */
export interface TechResponsiblyToggle {
  icon: string;
  label: string;
  /** Short state word shown in the glowing pill, e.g. "ON". */
  state: string;
}

/** One principle card under the "responsible tech" control panel. */
export interface TechResponsiblyPillar {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "responsible tech control panel" welcome layout (Habits module, Week 1) —
 * a deep-navy page with a week pill and two-tone title, then a dark, softly
 * glowing "device control panel": a status bar with signal dots, a semicircular
 * SVG balance gauge with an animated needle, and a stack of toggle rows that
 * each sit in the "ON" position. Below the panel are an "Our Objective" card
 * and a row of principle cards, then a start button and a footer note. Purely
 * presentational — nothing on the panel is interactive.
 */
export interface LessonTechResponsiblyWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  panelLabel: string;
  gaugeLabel: string;
  gaugeValueLabel: string;
  toggles: TechResponsiblyToggle[];
  objectiveLabel: string;
  objectiveText: string;
  pillarsHeading: string;
  pillars: TechResponsiblyPillar[];
  startLabel: string;
  footerNote: string;
}

/** One friend node in the ripple diagram on the "digital respect & kindness" welcome. */
export interface RespectRippleNode {
  icon: string;
  /** The kind act that reaches this friend, e.g. "A friendly reply". */
  label: string;
}

/** One "respect online looks like…" practice card on the "digital respect & kindness" welcome. */
export interface RespectRipplePractice {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "ripple of respect" welcome layout (Habits module, Week 4) — a warm
 * rose-to-amber gradient page with a week pill and two-tone title, then a
 * decorative SVG ripple diagram: a glowing central "one kind message" heart
 * with expanding rings, encircled by friend nodes that light up one after
 * another as the kindness spreads. Below sit an "Our Objective" card and a row
 * of "respect online looks like…" practice cards, then a start button and a
 * footer note. Purely presentational — nothing in the diagram is interactive.
 */
export interface LessonRespectRippleWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  rippleLabel: string;
  centerIcon: string;
  rippleCaption: string;
  nodes: RespectRippleNode[];
  objectiveLabel: string;
  objectiveText: string;
  practicesHeading: string;
  practices: RespectRipplePractice[];
  startLabel: string;
  footerNote: string;
}

/** One idea spark orbiting the central lightbulb on the "imagination spark" welcome, e.g. 💡 "New ideas". */
export interface ImaginationSparkNode {
  icon: string;
  label: string;
}

/** One "creativity looks like…" card on the "imagination spark" welcome. */
export interface ImaginationSparkWay {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "imagination spark" welcome layout (Creativity module, Week 1) — a warm
 * cream-to-peach gradient page with a week pill and two-tone title, then a
 * decorative SVG burst: a glowing central lightbulb throwing rays out to a ring
 * of floating idea bubbles. Below sit an "Our Objective" card and a row of
 * "creativity looks like…" cards, then a start button and a footer note. Purely
 * presentational — nothing in the burst is interactive.
 */
export interface LessonImaginationSparkWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  sparkLabel: string;
  centerIcon: string;
  centerCaption: string;
  nodes: ImaginationSparkNode[];
  objectiveLabel: string;
  objectiveText: string;
  waysHeading: string;
  ways: ImaginationSparkWay[];
  startLabel: string;
  footerNote: string;
}

/** One numbered move marker plotted along the planned route on the "strategy blueprint" welcome, e.g. 🔍 "Look at the problem". */
export interface StrategyBlueprintMove {
  icon: string;
  label: string;
}

/** One "a good strategy…" card on the "strategy blueprint" welcome. */
export interface StrategyBlueprintTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "strategy blueprint" welcome layout (Strategizing module, Week 1) — a
 * deep-blue blueprint-paper page with a faint drafting grid, a week pill and
 * two-tone title, then a decorative SVG plan drawn in white "ink": a labelled
 * "problem" pin on the lower left joined to a "goal" flag on the upper right by
 * a dashed planned route that bows around a marked obstacle, with numbered move
 * markers spaced along the route. Below sit an "Our Objective" card and a row
 * of "a good strategy…" cards, then a start button and a footer note. Purely
 * presentational — nothing on the blueprint is interactive.
 */
export interface LessonStrategyBlueprintWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  blueprintLabel: string;
  problemIcon: string;
  problemLabel: string;
  goalIcon: string;
  goalLabel: string;
  obstacleIcon: string;
  obstacleLabel: string;
  moves: StrategyBlueprintMove[];
  calloutText: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: StrategyBlueprintTrait[];
  startLabel: string;
  footerNote: string;
}

/** One branch of the fork on the "smart choice forecast" welcome — a choice, what follows from it, and how it turns out. */
export interface SmartChoiceBranch {
  /** 'good' tints the branch green, 'caution' tints it amber. */
  tone: 'good' | 'caution';
  optionIcon: string;
  optionLabel: string;
  consequenceIcon: string;
  consequenceLabel: string;
  outcomeIcon: string;
  outcomeLabel: string;
}

/** One "a smart chooser…" card on the "smart choice forecast" welcome. */
export interface SmartChoiceTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "smart choice forecast" welcome layout (Thinking module, Week 4) — a warm
 * sunshine-yellow page with a week pill and two-tone title, then a board with a
 * central "you decide" node forking into two branches. Each branch stacks a
 * choice card, a "then this happens" consequence card and an outcome badge, so
 * the learner sees how thinking ahead changes where a decision leads. Below sit
 * an "Our Objective" card and a row of "a smart chooser…" cards, then a start
 * button and a footer note. Purely presentational — nothing on the board is
 * interactive.
 */
export interface LessonSmartChoiceForecastWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  boardLabel: string;
  decisionIcon: string;
  decisionLabel: string;
  branches: SmartChoiceBranch[];
  calloutText: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: SmartChoiceTrait[];
  startLabel: string;
  footerNote: string;
}

/** One everyday "if you pick this, you give up that" pair on the "trade-off see-saw" welcome. */
export interface TradeOffExample {
  pickIcon: string;
  pickLabel: string;
  giveIcon: string;
  giveLabel: string;
}

/** One "a smart chooser…" card on the "trade-off see-saw" welcome. */
export interface TradeOffTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "trade-off see-saw" welcome layout (Choices Module, Week 1 — "Understanding
 * Trade-offs"). A warm, friendly page for young learners: a week pill and
 * two-tone title, then a cartoon see-saw balanced on a smiling coin — one seat
 * holds "what you pick", the other tips up as "what you give up" — to show that
 * spending on one thing always means letting go of another. Below sit a row of
 * everyday trade-off pairs, an "Our Objective" card, a row of "a smart chooser…"
 * cards, a start button and a footer note. Purely presentational — the see-saw
 * is not interactive.
 */
export interface LessonTradeOffWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  coinLabel: string;
  pickSeatLabel: string;
  pickSeatIcon: string;
  giveSeatLabel: string;
  giveSeatIcon: string;
  seesawCaption: string;
  examplesHeading: string;
  examples: TradeOffExample[];
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: TradeOffTrait[];
  startLabel: string;
  footerNote: string;
}

/** One labelled money jar on the "budget jars" welcome, e.g. 💰 "Save" / "money you keep for later". */
export interface BudgetJar {
  icon: string;
  name: string;
  note: string;
}

/** One "a good money planner…" card on the "budget jars" welcome. */
export interface BudgetPlanTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "budget jars" welcome layout (Choices Module, Week 2 — "Budgeting &
 * Planning"). A friendly planner-blue page for young learners: a week pill and
 * two-tone title, then a shelf of clear cartoon jars — each labelled with a job
 * for the money (Save / Spend / Goal) and a coin dropping into it — to show that
 * a budget means deciding where money goes before you spend it. Below sit a
 * caption, an "Our Objective" card, a row of "a good money planner…" cards, a
 * start button and a footer note. Purely presentational — the jars are not
 * interactive.
 */
export interface LessonBudgetPlanWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  shelfLabel: string;
  jars: BudgetJar[];
  jarsCaption: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: BudgetPlanTrait[];
  startLabel: string;
  footerNote: string;
}

/** One domino tile in the toppling run on the "consequence chain" welcome, e.g. 🪙 "You spend on sweets". */
export interface ConsequenceDomino {
  icon: string;
  label: string;
}

/** One "a thoughtful spender…" card on the "consequence chain" welcome. */
export interface ConsequenceTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "consequence chain" welcome layout (Choices Module, Week 3 — "Consequences
 * of Money Choices"). A warm sunset page for young learners: a week pill and
 * two-tone title, then a cartoon domino run — a coin leaning into the first tile,
 * with each following tile labelled as the next thing that happens (the choice,
 * how it feels now, what it means later) — to show that one money choice sets off
 * a chain of results. Below sit a caption, an "Our Objective" card, a row of
 * "a thoughtful spender…" cards, a start button and a footer note. Purely
 * presentational — the dominoes are not interactive.
 */
export interface LessonConsequenceChainWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  chainLabel: string;
  dominoes: ConsequenceDomino[];
  chainCaption: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: ConsequenceTrait[];
  startLabel: string;
  footerNote: string;
}

/** One question that ticks off on the "smart money checklist" welcome, e.g. 🎯 "What do I want?". */
export interface SmartDecisionStep {
  icon: string;
  question: string;
}

/** One "a smart decision-maker…" card on the "smart money checklist" welcome. */
export interface SmartDecisionTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "smart money checklist" welcome layout (Choices Module, Week 4 — "Smart
 * Financial Decision-Making"). A clean page for young learners: a week pill and
 * two-tone title, then a cream clipboard headed "The Smart Money Checklist" whose
 * decision questions tick off one after another and finish with a green
 * "SMART CHOICE" stamp — showing that a good money decision is a set of
 * questions you work through, not a guess. Below sit a caption, an "Our
 * Objective" card, a row of "a smart decision-maker…" cards, a start button and
 * a footer note. Purely presentational — the checklist is not interactive.
 */
export interface LessonSmartDecisionWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  checklistLabel: string;
  steps: SmartDecisionStep[];
  resultLabel: string;
  checklistCaption: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: SmartDecisionTrait[];
  startLabel: string;
  footerNote: string;
}

/**
 * The "discipline compass" welcome layout (Discipline Module, Week 1 —
 * "Understanding Discipline"). A deliberately spare page for beginners: a week
 * pill, a two-tone title, a hand-drawn compass whose needle animates round to a
 * "right choice" mark, and a single Objective card. No intro paragraph, story
 * preview or trait cards — the week's teaching content is delivered by the
 * lesson steps. Purely presentational.
 */
export interface LessonDisciplineCompassWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  compassMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "self-control dial" welcome layout (Discipline Module, Week 2 —
 * "Self-Control"). Another deliberately spare beginner page: a week pill, a
 * two-tone title, a hand-drawn half-circle gauge whose needle eases from a red
 * "react" zone round to a green "steady" zone, and a single Objective card. No
 * intro paragraph or trait cards — the week's teaching is delivered by the
 * lesson steps. Purely presentational.
 */
export interface LessonSelfControlDialWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  reactLabel: string;
  steadyLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "routine loop" welcome layout (Discipline Module, Week 3 — "Following
 * Routines"). Another deliberately spare beginner page: a week pill, a two-tone
 * title, a hand-drawn circular day-loop whose four stops (morning, school,
 * home, night) light up in turn around the ring, and a single Objective card.
 * No intro paragraph or trait cards — the week's teaching is delivered by the
 * lesson steps. Purely presentational.
 */
export interface LessonRoutineLoopWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "consistency streak" welcome layout (Discipline Module, Week 4 —
 * "Consistency & Responsibility"). Another deliberately spare beginner page: a
 * week pill, a two-tone title, a hand-drawn seven-day streak strip whose stamps
 * fill in one after another into an unbroken run while a small growth bar
 * climbs beneath it, and a single Objective card. No intro paragraph or trait
 * cards — the week's teaching is delivered by the lesson steps. Purely
 * presentational.
 */
export interface LessonConsistencyStreakWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "helping hands" welcome layout (Service Module, Week 1 — "What is
 * Service?"). A deliberately spare beginner page: a week pill, a two-tone
 * title, a hand-drawn scene of one open hand passing a glowing heart across to
 * another waiting hand while small sparkles rise, and a single Objective card.
 * No intro paragraph or trait cards — the week's teaching is delivered by the
 * lesson steps. Purely presentational.
 */
export interface LessonServiceHandsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Short caption under the hands scene, e.g. "A little help goes a long way". */
  handsMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "puzzle team" welcome layout (Teamwork Module, Week 1 — "What is
 * Teamwork?"). A deliberately spare beginner page: a week pill, a two-tone
 * title, a hand-drawn scene of four labelled puzzle pieces that slide in from
 * the corners and interlock into one complete square, a short caption, and a
 * single Objective card. No intro paragraph or trait cards — the week's
 * teaching is delivered by the lesson steps. Purely presentational.
 */
export interface LessonTeamworkPuzzleWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** The four short words shown on the puzzle pieces, e.g. "Listen". Exactly four. */
  pieceLabels: string[];
  /** Caption under the assembled puzzle, e.g. "Every piece matters". */
  puzzleMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "meshing gears" welcome layout (Teamwork Module, Week 4 — "Respect and
 * Cooperation"). A deliberately spare beginner page: a week pill, a two-tone
 * title, a hand-drawn pair of interlocking gears that turn together in
 * opposite directions, a short caption, and a single Objective card. No intro
 * paragraph or trait cards — the week's teaching is delivered by the lesson
 * steps. Purely presentational.
 */
export interface LessonTeamworkGearsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Caption under the gears, e.g. "We work better together". */
  gearsMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "bubble bath" welcome layout — Hygiene Module. A deliberately spare
 * beginner intro screen with its own look, distinct from the other modules'
 * gradient-hero-plus-objective-card layouts: a fresh cyan card edged like a
 * tiled bathroom wall, a two-tone title sitting on a strip of tiles, a smiling
 * water-drop mascot with soap bubbles drifting up past it, a short friendly
 * caption, and the objective printed on a punched paper luggage-tag rather than
 * a bordered card. Purely presentational — the week's teaching is left to the
 * lesson steps.
 */
export interface LessonHygieneIntroWelcome {
  weekLabel: string;
  /** Plain first part of the title, e.g. "What is ". */
  titleStart: string;
  /** Accent-coloured second part of the title, e.g. "Hygiene?". */
  titleAccent: string;
  /** Friendly one-liner under the mascot scene, e.g. "Clean body, happy day!". */
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "mirror" welcome layout — Hygiene Module, Week 2 ("Personal Hygiene").
 * Its own look, distinct from Week 1's bubble-bath card: a soft mint page, a
 * two-tone title, an oval hand-mirror with a slow diagonal shine sweep that
 * frames a small sun rising over a horizon line (a fresh new day of routines),
 * a friendly caption, and the objective set inside a rounded hand-mirror card.
 * Purely presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonHygienePersonalWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "handwashing" welcome layout — Hygiene Module, Week 3 ("Handwashing &
 * Stopping Germs"). Its own look, distinct from Week 1's bubble-bath card and
 * Week 2's mirror: a sky-blue page, a two-tone title, an SVG tap running water
 * over two cupped soapy hands while little germ blobs rinse away down the
 * stream, a friendly caption, and the objective set inside a soft foam-bubble
 * card. Purely presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonHygieneHandwashWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "growing habit" welcome layout — Hygiene Module, Week 4 ("Building
 * Lifelong Hygiene Habits"). Its own look, distinct from Weeks 1–3: a warm
 * honey-and-cream page, a two-tone title, an SVG potted plant on a windowsill
 * whose four leaves unfurl one by one (four weeks of practice) under a
 * slow-rising sun, a friendly caption, and the objective set inside a
 * leaf-shaped card. Purely presentational — the week's teaching is left to the
 * lesson steps.
 */
export interface LessonHygieneHabitsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "whole self sprout" welcome layout — Wellness Module, Week 1 ("What is
 * Wellness?"). Its own look: a sunny peach-to-green page, a two-tone title, an
 * SVG seedling rising from a little pot with three soft glowing orbs circling
 * it — one each for body, mind, and feelings — a friendly caption, a row of
 * three labelled pillar chips, and the objective set inside a seed-packet card.
 * Purely presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonWellnessIntroWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** The three things wellness cares for — shown as chips under the mascot. */
  pillars: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "moving body" welcome layout — Wellness Module, Week 2 ("Taking Care of
 * Our Bodies"). Its own look, distinct from Week 1's sprout card: a fresh
 * teal-to-coral page, a two-tone title, an SVG kid mid-stretch inside a slowly
 * pulsing energy ring, a friendly caption, a row of labelled body-care habit
 * chips, and the objective inside a rounded card. Purely presentational — the
 * week's teaching is left to the lesson steps.
 */
export interface LessonWellnessBodyWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** Body-care habits — shown as chips under the mascot. */
  habits: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "mood heart" welcome layout — Wellness Module, Week 3 ("Taking Care of
 * Our Feelings"). Its own look, distinct from Weeks 1–2: a soft lavender-to-
 * yellow page, a two-tone title, an SVG heart that gently shifts colour with
 * small mood faces drifting around it, a friendly caption, a row of labelled
 * feeling chips, and the objective inside a rounded card. Purely
 * presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonWellnessFeelingsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** Feelings to name — shown as chips under the mascot. */
  feelings: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "daily routine clock" welcome layout — Wellness Module, Week 4 ("Building
 * a Wellness Routine"). Its own look, distinct from Weeks 1–3: an amber-to-
 * deep-blue day-to-night page, a two-tone title, an SVG clock face with a
 * sweeping hand and small routine icons at the hour marks, a friendly caption,
 * a row of labelled routine-step chips, and the objective inside a rounded
 * card. Purely presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonWellnessRoutineWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** Steps of a daily wellness routine — shown as chips under the clock. */
  routineSteps: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "fuel plate" welcome layout — Nutrition Module, Week 1 ("Why Do We Need
 * Food?"). Its own look: a warm tomato-to-amber page, a two-tone title, an SVG
 * dinner plate whose three food wedges light up in turn while an energy bolt
 * rises from the plate and a small battery beside it charges to full, a
 * friendly caption, a row of labelled "food gives us…" benefit chips, and the
 * objective inside a rounded menu-card. Purely presentational — the week's
 * teaching is left to the lesson steps.
 */
export interface LessonNutritionWhyFoodWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** What food gives our bodies — shown as chips under the plate. */
  benefits: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "food-group pyramid" welcome layout — Nutrition Module, Week 2
 * ("Different Foods Help Our Bodies"). Its own look, distinct from Week 1's
 * plate: a fresh leaf-green-to-cream page, a two-tone title, an SVG stack of
 * food-group tiers that build up from the base one after another, each tier
 * carrying its group's emoji, a friendly caption, a row of labelled food-group
 * chips, and the objective inside a rounded card. Purely presentational — the
 * week's teaching is left to the lesson steps.
 */
export interface LessonNutritionFoodGroupsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** The food-group tiers, base first — each is drawn on the pyramid and shown as a chip. */
  groups: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "balance scale" welcome layout — Nutrition Module, Week 3 ("Healthy
 * Choices vs Unhealthy Choices"). Its own look, distinct from Weeks 1–2: a
 * split mint-green / warm-peach page, a two-tone title, an SVG balance scale
 * that gently rocks and settles with the healthy pan sitting lower, a friendly
 * caption, and two labelled chip columns — "everyday" foods and "sometimes"
 * foods — followed by the objective inside a rounded card. Purely
 * presentational — the week's teaching is left to the lesson steps.
 */
export interface LessonNutritionHealthyChoicesWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  everydayLabel: string;
  everydayFoods: { icon: string; label: string }[];
  sometimesLabel: string;
  sometimesFoods: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "habit house" welcome layout — Nutrition Module, Week 4 ("Building
 * Healthy Eating Habits"). Its own look, distinct from Weeks 1–3: a warm
 * amber-to-cream page, a two-tone title, an SVG little house that builds itself
 * brick by brick from the ground up and then adds its roof, a friendly
 * caption, a row of labelled daily-habit chips, and the objective inside a
 * rounded card. Purely presentational — the week's teaching is left to the
 * lesson steps.
 */
export interface LessonNutritionHabitsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  caption: string;
  /** Everyday eating habits — shown as chips under the house. */
  habits: { icon: string; label: string }[];
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "talk and listen" welcome layout (Teamwork Module, Week 3 —
 * "Communication in Teams"). A deliberately spare beginner page: a week pill, a
 * two-tone title, a hand-drawn scene of two team members with a speech bubble
 * that travels back and forth between them while small listening ears pulse, a
 * short caption, and a single Objective card. No intro paragraph or trait
 * cards — the week's teaching is delivered by the lesson steps. Purely
 * presentational.
 */
export interface LessonTeamworkTalkWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Caption under the scene, e.g. "Talk clearly, listen well". */
  talkMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "role lineup" welcome layout (Teamwork Module, Week 2 — "Roles in a
 * Team"). A deliberately spare beginner page: a week pill, a two-tone title, a
 * hand-drawn line-up of four team members that pop in one by one, each wearing
 * a differently-coloured role badge and captioned with a role name, a short
 * caption, and a single Objective card. No intro paragraph or trait cards —
 * the week's teaching is delivered by the lesson steps. Purely presentational.
 */
export interface LessonTeamworkRolesWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** The four short role names shown under the team members, e.g. "Leader". Exactly four. */
  roleLabels: string[];
  /** Caption under the line-up, e.g. "Everyone has a job to do". */
  rolesMark: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "serve where you are" welcome layout (Service Module, Week 2 — "Serving
 * at Home and School"). A deliberately spare beginner page: a week pill, a
 * two-tone title, a hand-drawn scene of a house and a school joined by a
 * dotted path of small hearts, and a single Objective card. No intro
 * paragraph or trait cards — the week's teaching is delivered by the lesson
 * steps. Purely presentational.
 */
export interface LessonServiceSpotsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Caption under the house, e.g. "At home". */
  homeLabel: string;
  /** Caption under the school, e.g. "At school". */
  schoolLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "kindness + responsibility" welcome layout (Service Module, Week 3 —
 * "Kindness and Responsibility"). A deliberately spare beginner page: a week
 * pill, a two-tone title, a hand-drawn "equation" — a heart plus a checkmark
 * badge equals a glowing service star — and a single Objective card. No intro
 * paragraph or trait cards — the week's teaching is delivered by the lesson
 * steps. Purely presentational.
 */
export interface LessonServiceKindnessWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Caption under the heart, e.g. "Kindness". */
  kindnessLabel: string;
  /** Caption under the checkmark badge, e.g. "Responsibility". */
  responsibilityLabel: string;
  /** Caption under the star, e.g. "Service". */
  serviceLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/**
 * The "making a difference" welcome layout (Service Module, Week 4 — "Making a
 * Difference"). A deliberately spare beginner page: a week pill, a two-tone
 * title, a hand-drawn ripple where one glowing heart at the centre sends rings
 * out to a circle of dots that light up in turn, and a single Objective card.
 * No intro paragraph or trait cards — the week's teaching is delivered by the
 * lesson steps. Purely presentational.
 */
export interface LessonServiceRippleWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  /** Caption at the centre of the ripple, e.g. "One kind act". */
  centreLabel: string;
  /** Caption at the edge of the ripple, e.g. "Reaches many". */
  reachLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  startLabel: string;
  footerNote: string;
}

/** One labelled bin in the "grouping" panel of the "memory workshop" welcome, e.g. 🍎 "Fruits". */
export interface MemoryGroupBin {
  icon: string;
  label: string;
}

/** One "a strong memory…" card on the "memory workshop" welcome. */
export interface MemoryWorkshopTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "memory workshop" welcome layout (Thinking module, Week 3) — a warm
 * cream-to-rose page with a week pill and two-tone title, then a board holding
 * two small diagrams of the recall strategies: a "grouping" panel where loose
 * items drop into three labelled bins, and a "repetition" panel where one short
 * string echoes three times around a loop arrow. Below sit an "Our Objective"
 * card and a row of "a strong memory…" cards, then a start button and a footer
 * note. Purely presentational — nothing on the board is interactive.
 */
export interface LessonMemoryWorkshopWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  boardLabel: string;
  groupingLabel: string;
  groupingCaption: string;
  groups: MemoryGroupBin[];
  repetitionLabel: string;
  repetitionCaption: string;
  /** The short string shown echoing in the repetition panel, e.g. "7 · 4 · 2". */
  repetitionText: string;
  calloutText: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: MemoryWorkshopTrait[];
  startLabel: string;
  footerNote: string;
}

/** One numbered station on the path on the "solution path" welcome, e.g. 🔎 "Spot the problem". */
export interface SolutionPathStep {
  icon: string;
  label: string;
}

/** One "a good problem-solver…" card on the "solution path" welcome. */
export interface SolutionPathTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "solution path" welcome layout (Thinking module, Week 2) — a pale-aqua
 * page with a week pill and two-tone title, then a decorative SVG scene: a
 * scribbled "problem" tangle on the lower left is joined to a glowing "solved"
 * target on the upper right by a single path that passes through three numbered
 * stations, each captioned with one problem-solving step. Below sit an "Our
 * Objective" card and a row of "a good problem-solver…" cards, then a start
 * button and a footer note. Purely presentational — nothing in the scene is
 * interactive.
 */
export interface LessonSolutionPathWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  pathLabel: string;
  problemIcon: string;
  problemLabel: string;
  solvedIcon: string;
  solvedLabel: string;
  steps: SolutionPathStep[];
  calloutText: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: SolutionPathTrait[];
  startLabel: string;
  footerNote: string;
}

/** One crisp detail sitting inside the attention lens on the "attention lens" welcome, e.g. 🔑 "a small key". */
export interface AttentionFocusItem {
  icon: string;
  label: string;
}

/** One "sharp focus looks like…" card on the "attention lens" welcome. */
export interface AttentionTrait {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "attention lens" welcome layout (Thinking module, Week 1) — a deep-violet
 * page with a week pill and two-tone title, then a decorative scene: a large
 * round magnifying lens throws a bright spotlight over a cluster of small
 * details that read sharp and labelled inside the glass, while distraction icons
 * drift dim and blurred around the edges. Below sit an "Our Objective" card and
 * a row of "sharp focus looks like…" cards, then a start button and a footer
 * note. Purely presentational — nothing in the scene is interactive.
 */
export interface LessonAttentionLensWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  lensLabel: string;
  focusItems: AttentionFocusItem[];
  distractionItems: AttentionFocusItem[];
  calloutText: string;
  objectiveLabel: string;
  objectiveText: string;
  traitsHeading: string;
  traits: AttentionTrait[];
  startLabel: string;
  footerNote: string;
}

/** One stop on the "before → pause → after" strip on the "pause button" welcome. */
export interface PauseMomentStop {
  icon: string;
  label: string;
}

/** One "in the pause you can…" card on the "pause button" welcome. */
export interface PauseThinkCard {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "pause button" welcome layout (Strategizing module, Week 2) — a calm
 * teal-to-plum twilight page with a week pill and two-tone title, then a large
 * glowing circular PAUSE button (two bars) with a ring that sweeps slowly
 * around it like a held beat. Under it sits a "something happens → pause & think
 * → better choice" strip, an "Our Objective" card, and a row of "in the pause
 * you can…" cards, then a start button and a footer note. Purely presentational
 * — the button is not interactive.
 */
export interface LessonPauseButtonWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  pauseLabel: string;
  momentBefore: PauseMomentStop;
  momentPause: PauseMomentStop;
  momentAfter: PauseMomentStop;
  objectiveLabel: string;
  objectiveText: string;
  waysHeading: string;
  ways: PauseThinkCard[];
  startLabel: string;
  footerNote: string;
}

/** One key fanned off the ring on the "strategy keyring" welcome, e.g. 🪜 "Break it into steps". */
export interface StrategyKey {
  icon: string;
  label: string;
}

/** One "match the strategy to the problem" card on the "strategy keyring" welcome. */
export interface StrategyKeyringMatch {
  problemIcon: string;
  problem: string;
  strategy: string;
}

/**
 * The "strategy keyring" welcome layout (Strategizing module, Week 3) — a warm
 * brass-and-green workshop page with a week pill and two-tone title, then a
 * decorative keyring: a central ring with several differently-shaped keys
 * fanned out around it, each carrying a tag that names one strategy. Below sit a
 * caption, an "Our Objective" card, and a row of "problem → strategy" match
 * cards, then a start button and a footer note. Purely presentational — the
 * keyring is not interactive.
 */
export interface LessonStrategyKeyringWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  ringLabel: string;
  keys: StrategyKey[];
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  matchesHeading: string;
  matches: StrategyKeyringMatch[];
  startLabel: string;
  footerNote: string;
}

/** One numbered stepping stone along the path on the "goal path" welcome, e.g. 🎒 "Pack what you need". */
export interface GoalPathStep {
  icon: string;
  label: string;
}

/** One "a goal-getter's strategy…" card on the "goal path" welcome. */
export interface GoalPathTip {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "goal path" welcome layout (Strategizing module, Week 4) — a bright
 * sunrise page (peach → sky → gold) with a week pill and two-tone title, then a
 * winding path of numbered stepping stones that climbs from a "you now" marker
 * at the foot to a goal flag at the top, the stones alternating left and right.
 * Below sit a caption, an "Our Objective" card, and a row of "a goal-getter's
 * strategy…" cards, then a start button and a footer note. Purely
 * presentational — the path is not interactive.
 */
export interface LessonGoalPathWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  startNodeIcon: string;
  startNodeLabel: string;
  goalNodeIcon: string;
  goalNodeLabel: string;
  steps: GoalPathStep[];
  caption: string;
  objectiveLabel: string;
  objectiveText: string;
  tipsHeading: string;
  tips: GoalPathTip[];
  startLabel: string;
  footerNote: string;
}

/** One kind of project the learner can choose in a CreativeProjectChallengeStep, e.g. 🎨 "A drawing". */
export interface CreativeProjectOption {
  id: string;
  icon: string;
  label: string;
}

/** One process step the learner ticks off in a CreativeProjectChallengeStep, e.g. "Imagine". */
export interface CreativeProjectStepItem {
  id: string;
  label: string;
}

/** One typed reflection field in a CreativeProjectChallengeStep. */
export interface CreativeProjectField {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "My Creative Project" final challenge (Creativity module closer) — a
 * gallery-wall showcase where the learner picks what to create, ticks off the
 * Imagine/Plan/Create/Share process steps as they do them, then writes three
 * reflection answers on a plaque. Submitting with a project picked, every step
 * ticked and all fields filled awards a star, followed by a "Final Recap" of
 * what the whole module covered.
 */
export interface CreativeProjectChallengeStep extends BaseExercise {
  type: 'creative-project-challenge';
  badge: string;
  title: string;
  intro: string;
  pickHeading: string;
  options: CreativeProjectOption[];
  stepsHeading: string;
  steps: CreativeProjectStepItem[];
  reflectionHeading: string;
  fields: CreativeProjectField[];
  submitLabel: string;
  recapHeading: string;
  recapPoints: string[];
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One question the learner answers in their own words inside a ProblemScenarioWarmupStep. */
export interface ProblemScenarioQuestion {
  id: string;
  prompt: string;
  placeholder: string;
  /** A model answer the learner can reveal once they have written their own. */
  sampleAnswer: string;
}

/**
 * The "What Would You Do?" warm-up (Thinking module, Week 2) — a bold comic-book
 * panel. The top panel draws the tricky moment (a snapped pencil mid-test) with
 * a "SNAP!" starburst; below it the learner works through a stack of
 * speech-bubble questions, answering each in their own words. Answering a
 * question fills the next segment of a "solved" meter and unlocks that bubble's
 * sample-answer reveal. Every question must have a written answer before the
 * Continue button unlocks. A parent-assist note sits at the foot of the step.
 */
export interface ProblemScenarioWarmupStep extends BaseExercise {
  type: 'problem-scenario-warmup';
  title: string;
  intro: string;
  /** Caption on the comic panel, e.g. "The moment". */
  scenarioLabel: string;
  /** The situation the learner reasons about, e.g. "Your pencil breaks during a test.". */
  scenarioText: string;
  /** Label beside the progress meter, e.g. "Solved". */
  progressLabel: string;
  /** Label on each bubble's reveal control, e.g. "Reveal a sample answer". */
  sampleAnswerLabel: string;
  questions: ProblemScenarioQuestion[];
  /** Optional encouraging line shown once every question is answered. */
  feedbackText?: string;
  parentNote: string;
  completeLabel: string;
}

/** One observation question the learner answers in their own words inside a SpotTheDifferenceWarmupStep. */
export interface SpotDifferenceQuestion {
  id: string;
  /** The question, e.g. "What colour changed?". */
  prompt: string;
  /** Hint text shown in the empty answer box. */
  placeholder: string;
  /** A model answer the learner can reveal to compare against once they have written their own. */
  sampleAnswer: string;
}

/**
 * The "Spot the Difference" warm-up (Thinking module, Week 1) — a parchment
 * observation-notebook card holding two side-by-side hand-drawn SVG scenes
 * ("Picture A" and "Picture B") with a handful of planted differences. Below the
 * pictures is a stack of questions the learner answers in their own words; each
 * answered question ticks a magnifier along a "clues found" trail and unlocks a
 * "reveal a sample answer" line for that card. Every question must have a
 * written answer before the Continue button unlocks, at which point an
 * encouraging feedback banner appears. A parent-assist note sits at the foot of
 * the step.
 */
export interface SpotTheDifferenceWarmupStep extends BaseExercise {
  type: 'spot-the-difference-warmup';
  title: string;
  intro: string;
  /** Caption under the left-hand scene, e.g. "Picture A". */
  pictureALabel: string;
  /** Caption under the right-hand scene, e.g. "Picture B". */
  pictureBLabel: string;
  /** How many differences are planted between the two scenes — shown as a hint. */
  differenceCount: number;
  /** Label beside the progress trail, e.g. "Clues found". */
  progressLabel: string;
  /** Label on the per-question reveal control, e.g. "Reveal a sample answer". */
  sampleAnswerLabel: string;
  questions: SpotDifferenceQuestion[];
  /** Encouraging line shown once every question is answered, e.g. "Great thinkers notice small details.". */
  feedbackText: string;
  parentNote: string;
  completeLabel: string;
}

/** One question the learner answers about their worked example in a SmartThinkerPlanChallengeStep. */
export interface SmartThinkerQuestion {
  id: string;
  prompt: string;
  placeholder: string;
}

/**
 * The "Final Challenge: The Smart Thinker Plan" closing step for Thinking
 * module, Week 4 — a royal-blue capstone with a gold medal that fills a segment
 * for each of five days the learner pauses before a decision to ask three
 * questions. At the end they write up one real decision, answering those
 * questions about it. Submitting with all five days marked and the example
 * written lights the medal and a Finish button closes the module and awards a
 * star.
 */
export interface SmartThinkerPlanChallengeStep extends BaseExercise {
  type: 'smart-thinker-plan-challenge';
  badge: string;
  title: string;
  intro: string;
  pledgeHeading: string;
  /** The three questions to ask before a decision, shown as reference. */
  pledgeQuestions: string[];
  trackerHeading: string;
  dayLabels: string[];
  dayCheckLabel: string;
  exampleHeading: string;
  decisionLabel: string;
  decisionPlaceholder: string;
  /** The three questions again, this time with answer boxes for the worked example. */
  exampleQuestions: SmartThinkerQuestion[];
  sampleLabel: string;
  sampleReflection: string;
  submitLabel: string;
  savedText: string;
  finishLabel: string;
  parentNote?: string;
}

/** One "if… then…" question the learner answers in their own words inside an IfThenWarmupStep. */
export interface IfThenQuestion {
  id: string;
  /** The short condition shown on the "IF" domino, e.g. "you don't study". Omit for reflection questions that are not an "if…". */
  ifText?: string;
  /** The full question, e.g. "If you don't study, what might happen?". */
  prompt: string;
  placeholder: string;
  /** A model answer the learner can reveal once they have written their own. */
  sampleAnswer: string;
}

/**
 * The "If… Then…" warm-up (Thinking module, Week 4) — a deep-aubergine board
 * built on a falling-domino motif. Each question pairs an "IF" domino (the
 * condition) with a "THEN…" answer slot; writing an answer topples that domino
 * and lights the next segment of a chain across the top. Reflection questions
 * with no condition show a "THINK" tile instead. Every question must have a
 * written answer before the Continue button unlocks. A parent-assist note sits
 * at the foot of the step.
 */
export interface IfThenWarmupStep extends BaseExercise {
  type: 'if-then-warmup';
  title: string;
  intro: string;
  /** Label beside the domino chain, e.g. "Dominoes toppled". */
  progressLabel: string;
  /** Label on each question's reveal control, e.g. "Reveal a sample answer". */
  sampleAnswerLabel: string;
  questions: IfThenQuestion[];
  /** Optional encouraging line shown once every question is answered. */
  feedbackText?: string;
  parentNote: string;
  completeLabel: string;
}

/** One recall strategy the learner can tag on a day in a MemoryGymChallengeStep, e.g. 🔁 "Repeating". */
export interface MemoryGymStrategy {
  id: string;
  icon: string;
  label: string;
}

/**
 * The "Challenge of the Week" closing step for Thinking module, Week 3 — a
 * charcoal "memory gym" log with an electric-orange accent and a streak flame
 * that grows as days are completed. For each of three days the learner lists
 * five items to memorise, comes back after ten minutes to recall them, tags
 * which strategies they used (repeating, grouping, drawing) and writes how it
 * went. Submitting with all three days logged prints a training summary, and a
 * Finish button closes the week and awards a star.
 */
export interface MemoryGymChallengeStep extends BaseExercise {
  type: 'memory-gym-challenge';
  badge: string;
  title: string;
  intro: string;
  /** Reminder line, e.g. "Pick 5 items each day, then recall them after 10 minutes.". */
  ruleLine: string;
  dayLabels: string[];
  /** Placeholder for the "your 5 items" field. */
  itemsPlaceholder: string;
  /** Heading over the strategy chips, e.g. "How did you remember them?". */
  strategiesLabel: string;
  strategies: MemoryGymStrategy[];
  /** Placeholder for the "how it went" field. */
  howPlaceholder: string;
  sampleLabel: string;
  sampleReflection: string;
  submitLabel: string;
  savedText: string;
  finishLabel: string;
  parentNote?: string;
}

/** One recall question the learner answers from memory inside a MemoryTestWarmupStep. */
export interface MemoryRecallQuestion {
  id: string;
  prompt: string;
  placeholder: string;
  /** A model answer the learner can reveal once they have written their own. */
  sampleAnswer: string;
}

/**
 * The "Memory Test" warm-up (Thinking module, Week 3) — a deep-teal focus board.
 * A study phase shows a short list of word cards with a countdown ring; when the
 * timer runs out (or the learner taps "I've memorised them") the cards flip
 * face-down and a recall phase asks a stack of questions answered from memory,
 * each with a revealable sample answer. Every question must have a written
 * answer before the Continue button unlocks. A parent-assist note sits at the
 * foot of the step.
 */
export interface MemoryTestWarmupStep extends BaseExercise {
  type: 'memory-test-warmup';
  title: string;
  intro: string;
  /** Caption on the study board, e.g. "Study the list". */
  studyLabel: string;
  /** How long the list is shown, in seconds. */
  studySeconds: number;
  /** The words to memorise. */
  words: string[];
  /** Label on the button that starts the countdown, e.g. "Start the timer". */
  startTimerLabel: string;
  /** Label on the button that ends study early, e.g. "I've memorised them". */
  readyLabel: string;
  /** Line shown above the questions once the list is hidden. */
  recallIntro: string;
  /** Label beside the progress meter, e.g. "Recalled". */
  progressLabel: string;
  /** Label on each question's reveal control, e.g. "Reveal a sample answer". */
  sampleAnswerLabel: string;
  questions: MemoryRecallQuestion[];
  parentNote: string;
  completeLabel: string;
}

/** One of the three thinking-step slots the learner fills in a ThinkingStepsChallengeStep. */
export interface ThinkingStepPrompt {
  id: string;
  /** Short tag shown on the step, e.g. "The problem". */
  label: string;
  /** The question the learner answers, e.g. "What is the problem?". */
  prompt: string;
  placeholder: string;
}

/**
 * The "Challenge of the Week" closing step for Thinking module, Week 2 — a deep
 * indigo "thinking machine" console. Three connected step slots ask the learner
 * to write one real problem they solved this week: what the problem was, two
 * solutions they thought of, and which was best. A revealable sample reflection
 * models the answer. Submitting with all three slots filled prints a "solved"
 * receipt assembling their example, and a Finish button closes the week and
 * awards a star.
 */
export interface ThinkingStepsChallengeStep extends BaseExercise {
  type: 'thinking-steps-challenge';
  badge: string;
  title: string;
  intro: string;
  stepsHeading: string;
  steps: ThinkingStepPrompt[];
  exampleHeading: string;
  /** Label on the reveal control for the model reflection, e.g. "Reveal a sample reflection". */
  sampleLabel: string;
  sampleReflection: string;
  submitLabel: string;
  savedText: string;
  finishLabel: string;
  parentNote?: string;
}

/** One "do this each day" practice line in a WeeklyAttentionChallengeStep, e.g. 👂 "Listen carefully to instructions before starting a task.". */
export interface AttentionChallengePractice {
  icon: string;
  text: string;
}

/**
 * The "Challenge of the Week" closing step for Thinking module, Week 1 — a
 * forest-green field-journal card. It lists three "do this each day" attention
 * practices, then a three-day tracker strip where the learner ticks off each day
 * they kept the habit, and finally a reflection question they answer in their
 * own words (with a revealable sample answer). Submitting with all three days
 * ticked and the reflection written stamps the card "Challenge complete" and a
 * Finish button closes the week and awards a star.
 */
export interface WeeklyAttentionChallengeStep extends BaseExercise {
  type: 'weekly-attention-challenge';
  badge: string;
  title: string;
  intro: string;
  practicesHeading: string;
  practices: AttentionChallengePractice[];
  trackerHeading: string;
  /** One label per day the learner tracks, e.g. ["Day 1", "Day 2", "Day 3"]. */
  dayLabels: string[];
  /** Caption on each day's tick control, e.g. "I did all three today". */
  dayCheckLabel: string;
  reflectionQuestion: string;
  reflectionPlaceholder: string;
  /** Label on the reveal control for the model answer, e.g. "Reveal a sample answer". */
  reflectionSampleLabel: string;
  reflectionSample: string;
  submitLabel: string;
  savedText: string;
  finishLabel: string;
  parentNote?: string;
}

/** One "put the steps in order" question inside a SequenceOrderGameStep. */
export interface SequenceOrderQuestion {
  id: string;
  /** What is being made, e.g. "Drawing a Picture". */
  title: string;
  /** The steps listed in their correct order — the view shuffles them for the tray. */
  steps: string[];
}

/**
 * The "Put the Steps in Order" warm-up (Creativity module, Week 4) — one task
 * at a time shown as numbered storyboard panels above a tray of shuffled step
 * cards. The learner taps cards into the panels; once every panel is filled the
 * order is checked. A correct order locks the panels and advances; a wrong
 * order shakes and clears so they can try again. Every task must be ordered
 * correctly before the Continue button unlocks. A parent-assist note sits at
 * the foot of the step.
 */
export interface SequenceOrderGameStep extends BaseExercise {
  type: 'sequence-order-game';
  title: string;
  intro: string;
  questions: SequenceOrderQuestion[];
  parentNote: string;
  completeLabel: string;
}

/** One small problem the learner can pick to solve in a SolveItDifferentlyChallengeStep. */
export interface SolveDifferentlyPick {
  id: string;
  icon: string;
  label: string;
}

/** One sticky-note solution slot in a SolveItDifferentlyChallengeStep. */
export interface SolveDifferentlyNote {
  id: string;
  label: string;
  placeholder: string;
}

/**
 * The "Solve It Differently" weekly challenge (Creativity module, Week 3
 * closer) — a cork idea-board where the learner pins one small problem, then
 * writes two different solutions on two sticky notes. Submitting with a problem
 * pinned and both notes written awards a star, followed by a "You learned…"
 * recap.
 */
export interface SolveItDifferentlyChallengeStep extends BaseExercise {
  type: 'solve-it-differently-challenge';
  badge: string;
  title: string;
  intro: string;
  pickHeading: string;
  picks: SolveDifferentlyPick[];
  solutionsHeading: string;
  notes: SolveDifferentlyNote[];
  submitLabel: string;
  recapHeading: string;
  recapPoints: string[];
  /** Optional note reminding a parent/caregiver to help with the at-home part. */
  parentNote?: string;
}

/** One problem/solution pair to wire together in a SolutionMatchGameStep. */
export interface SolutionMatchPair {
  id: string;
  problem: string;
  solution: string;
}

/**
 * The "Solution Workshop" warm-up (Creativity module, Week 3) — a patch-panel
 * board with problem pegs down the left and shuffled creative-solution pegs down
 * the right. The learner taps a problem, then the solution that fixes it: a
 * correct pair locks with a coloured link, a wrong pair flashes and clears so
 * they can try again. Every pair must be wired correctly before the Continue
 * button unlocks. A parent-assist note sits at the foot of the step.
 */
export interface SolutionMatchGameStep extends BaseExercise {
  type: 'solution-match-game';
  title: string;
  intro: string;
  problemHeading: string;
  solutionHeading: string;
  pairs: SolutionMatchPair[];
  parentNote: string;
  completeLabel: string;
}

/** One action tread on the creative-staircase welcome, e.g. ✏️ "Sketch it". */
export interface CreativeStaircaseStep {
  icon: string;
  label: string;
}

/** One "creativity comes out when you…" card on the creative-staircase welcome. */
export interface CreativeStaircaseWay {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "idea to creation, step by step" welcome layout (Creativity module, Week
 * 4) — a warm paint-studio gradient page with a week pill and two-tone title,
 * then a decorative rising staircase: a "ground" idea block on the left climbs
 * through numbered action treads up to a "summit" flag where the idea is
 * expressed. Below sit an "Our Objective" card and a row of "creativity comes
 * out when you…" cards, then a start button and a footer note. Purely
 * presentational — the staircase is not interactive.
 */
export interface LessonCreativeStaircaseWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  stairLabel: string;
  groundIcon: string;
  groundLabel: string;
  steps: CreativeStaircaseStep[];
  summitIcon: string;
  summitLabel: string;
  objectiveLabel: string;
  objectiveText: string;
  waysHeading: string;
  ways: CreativeStaircaseWay[];
  startLabel: string;
  footerNote: string;
}

/** One route around the problem on the puzzle-paths welcome, e.g. 🔧 "Try a different tool". */
export interface PuzzlePathRoute {
  icon: string;
  label: string;
}

/** One "a creative problem-solver…" card on the puzzle-paths welcome. */
export interface PuzzlePathMove {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "many paths to one solution" welcome layout (Creativity module, Week 3) —
 * a fresh mint-to-sky map page with a week pill and two-tone title, then a
 * decorative SVG route map: a "problem" node on the left joined to a "solved"
 * flag on the right by several curved trails that each bow out differently, with
 * a labelled approach chip on each trail. Below sit an "Our Objective" card and
 * a row of "a creative problem-solver…" cards, then a start button and a footer
 * note. Purely presentational — the map is not interactive.
 */
export interface LessonPuzzlePathsWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  mapLabel: string;
  problemIcon: string;
  problemLabel: string;
  solvedIcon: string;
  solvedLabel: string;
  routes: PuzzlePathRoute[];
  objectiveLabel: string;
  objectiveText: string;
  movesHeading: string;
  moves: PuzzlePathMove[];
  startLabel: string;
  footerNote: string;
}

/** One imagined "scene" frame shown on the mind-cinema screen, e.g. 🏰 "A castle on a cloud". */
export interface MindCinemaFrame {
  icon: string;
  caption: string;
}

/** One "when you imagine, you can…" card on the mind-cinema welcome. */
export interface MindCinemaPower {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "cinema in your mind" welcome layout (Creativity module, Week 2) — a deep
 * indigo, softly spotlit page with a week pill and two-tone title, then a
 * decorative "mind screen": a rounded projector screen framed by film-strip
 * perforations, with a row of imagined-scene frames gliding across it. Below sit
 * an "Our Objective" card and a row of "when you imagine, you can…" cards, then
 * a start button and a footer note. Purely presentational — the screen is not
 * interactive.
 */
export interface LessonMindCinemaWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  screenLabel: string;
  frames: MindCinemaFrame[];
  marqueeNote: string;
  objectiveLabel: string;
  objectiveText: string;
  powersHeading: string;
  powers: MindCinemaPower[];
  startLabel: string;
  footerNote: string;
}

/** One wedge of the day-clock donut on the "screen-time balance" welcome, e.g. a 2-hour "Screens" slice. */
export interface ScreenBalanceSegment {
  label: string;
  /** Hours this slice takes up in the child's day — the wedges are drawn proportionally. */
  hours: number;
  /** Hex colour for the wedge. */
  color: string;
  icon: string;
  /** True for the slice that represents screen time — it gets the highlighted, pulsing treatment. */
  screen?: boolean;
}

/** One self-control strategy card under the balance clock, e.g. "Set a timer". */
export interface ScreenBalanceStrategy {
  icon: string;
  title: string;
  text: string;
}

/**
 * The "screen-time balance clock" welcome layout (Habits module, Week 3) — a
 * dawn-to-dusk gradient page (peach → periwinkle → deep indigo) with a week
 * pill and two-tone title, then a decorative SVG "day clock": a donut whose
 * coloured wedges show how a balanced day is shared between school, play,
 * family, sleep and a modest screen-time slice (the screen wedge pulses and is
 * called out with a leader label). Beside it sits a "self-control charge"
 * battery meter that fills to `meterPercent`. Below are an "Our Objective" card
 * and a row of self-control strategy cards, then a start button and a footer
 * note. Purely presentational — nothing on the clock is interactive.
 */
export interface LessonScreenBalanceWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  clockLabel: string;
  clockCaption: string;
  segments: ScreenBalanceSegment[];
  meterLabel: string;
  meterValueLabel: string;
  /** How full the self-control battery is drawn, 0–100. */
  meterPercent: number;
  objectiveLabel: string;
  objectiveText: string;
  strategiesHeading: string;
  strategies: ScreenBalanceStrategy[];
  startLabel: string;
  footerNote: string;
}

/** One "valuable" locked inside the privacy vault, e.g. a padlocked "Home address" card. */
export interface PrivacyVaultValuable {
  icon: string;
  label: string;
}

/** One "keep it private" habit chip under the privacy vault. */
export interface PrivacyVaultHabit {
  icon: string;
  text: string;
}

/**
 * The "personal info vault" welcome layout (Habits module, Week 2) — a cream
 * page with a week pill and two-tone title, then a decorative vault: a big
 * circular combination dial ringed with bolts, and a grid of padlocked
 * "valuables" cards (name, home address, passwords, photos…) sitting inside it.
 * Below are an "Our Objective" card and a wrapping row of "keep it private"
 * habit chips, then a start button and a footer note. Purely presentational —
 * the vault is not interactive.
 */
export interface LessonPrivacyVaultWelcome {
  weekLabel: string;
  titleStart: string;
  titleAccent: string;
  intro: string;
  vaultLabel: string;
  valuables: PrivacyVaultValuable[];
  objectiveLabel: string;
  objectiveText: string;
  keepPrivateHeading: string;
  keepPrivate: PrivacyVaultHabit[];
  startLabel: string;
  footerNote: string;
}

/**
 * The "Little Lantern" welcome layout — a branded top bar (heart badge +
 * brand name on the left, a "Week N of M" marker on the right), a two-column
 * hero whose left column has a dotted "WEEK N · TOPIC" eyebrow, a two-tone
 * title, a subtitle, a "Start this lesson" button and a small lock reassurance
 * line, and whose right column is a circle-backed illustration with a speech
 * bubble, followed by a full-width "Our objective" card with a "TODAY'S FOCUS"
 * kicker.
 */
export interface LessonLittleLanternWelcome {
  brandName: string;
  weekMarker: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  startLabel: string;
  lockLine: string;
  image: string;
  imageAlt: string;
  speechBubble: string;
  objectiveKicker: string;
  objectiveHeading: string;
  objectiveText: string;
}

/**
 * The "Tiny Voices" welcome layout — a branded top bar (book badge + brand
 * name on the left, a "Week N" badge on the right), a two-column hero whose
 * left column has a sand "Week N Lesson" pill, a two-tone title, a subtitle,
 * an "Our Goal" card and a gradient "Let's Begin" button, and whose right
 * column is a rounded illustration card with a small speech bubble, followed
 * by a footer row of short reassurance checks (e.g. "Short & fun").
 */
export interface LessonTinyVoicesWelcome {
  brandName: string;
  weekBadge: string;
  weekLessonPill: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  goalHeading: string;
  goalText: string;
  startLabel: string;
  image: string;
  imageAlt: string;
  speechBubble: string;
  footerChecks: string[];
}

/**
 * The "identity mosaic" welcome layout (Identity Module — Advanced, Week 1 —
 * "What Makes Me, Me?"). A full-width theme banner sits above an ages badge,
 * a two-tone title, and an illustration of teens each thinking about a
 * different piece of themselves. Below, a bordered card carries the week and
 * stage pills, the quoted week title, an Objective box with icon-led bullets,
 * and a row of tag pills naming the pieces that make up identity. A closing
 * line sits under the card. Purely presentational.
 */
export interface LessonIdentityMosaicWelcome {
  themeLabel: string;
  ageBadge: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  weekPill: string;
  stagePill: string;
  cardTitle: string;
  objectiveLabel: string;
  objectives: { icon: string; text: string }[];
  tagsHeading: string;
  tags: { icon: string; label: string; variant: 'peach' | 'blue' }[];
  startLabel: string;
  footerNote: string;
}

/**
 * The plain "spare intro" welcome layout (Identity Module — Advanced) —
 * used for weeks whose intro is meant to read as nice, straightforward, and
 * less wordy than the Week 1 mosaic layout: a week/stage pill, a title, one
 * short subtitle line, and a compact objective list on a single card — no
 * banner, hero image, or tag row. First used for Week 2 ("My Strengths &
 * Temperament"), reused as-is for later weeks that want the same brief.
 */
export interface LessonIdentityStrengthsWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  objectives: { icon: string; text: string }[];
  startLabel: string;
}

export interface LessonPlanningWhyWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  /** The week's objectives, drawn as a numbered route. */
  objectives: { text: string }[];
  startLabel: string;
}

export interface LessonPlanningPrioritiesWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  /** Horizontal axis ends, e.g. ["Urgent", "Not urgent"]. */
  axisX: string[];
  /** Vertical axis ends, top then bottom, e.g. ["Important", "Not important"]. */
  axisY: string[];
  /** Four short quadrant labels in reading order: top-left, top-right, bottom-left, bottom-right. */
  quadrants: string[];
  objectives: { text: string }[];
  startLabel: string;
}

export interface LessonPlanningGoalsWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  /** The SMART breakdown — one entry per letter, e.g. { letter: 'S', word: 'Specific' }. */
  smartLetters: { letter: string; word: string }[];
  objectives: { text: string }[];
  startLabel: string;
}

export interface LessonPlanningGrowthWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  /** The growth row — a small progression, e.g. seed → sprout → plant. */
  growthStages: { icon: string; label: string }[];
  objectives: { text: string }[];
  startLabel: string;
}

export interface LessonPlanningCapstoneWelcome {
  /** Small badge above the title, e.g. "Bonus · End-of-Module Project". */
  badgeLabel: string;
  title: string;
  subtitle: string;
  tasks: { text: string }[];
  startLabel: string;
}

/**
 * Week 1 welcome layout — Self-Confidence Module (Advanced). A single spark-themed
 * card: week/stage pills, a title, one short subtitle, the week's objective on
 * its own line, and a small reflection prompt that recaps a point from the
 * Planning module (a question plus a sample answer) instead of a wall of text.
 */
export interface LessonConfidenceSparkWelcome {
  weekPill: string;
  stagePill: string;
  title: string;
  subtitle: string;
  objectiveText: string;
  recapLabel: string;
  recapQuestion: string;
  sampleAnswerLabel: string;
  sampleAnswerText: string;
  startLabel: string;
}

/**
 * "Capstone trophy" welcome layout — Self-Confidence Module (Advanced), End-of-
 * Module Project ("Confidence Check-In"). A single coral-gradient card: a
 * trophy badge, a short title, one subtitle line, and a compact task list.
 */
export interface LessonConfidenceCapstoneWelcome {
  badgeLabel: string;
  title: string;
  subtitle: string;
  tasks: { text: string }[];
  startLabel: string;
}

/** 'game' modules show up on the Games page instead of the main module list. */
export type ModuleCategory = 'life-skills' | 'game';

export interface Module {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  createdByTrainerId: string;
  lessons: Lesson[];
  createdAt: string;
  category: ModuleCategory;
  /** Curriculum track a life-skills module belongs to, e.g. "Personal Empowerment" — shown as a group heading. */
  trackName?: string;
  /** Which student age group this module was built for; only shown to students with a matching ageGroup. */
  ageGroup: AgeGroup;
}

/** Module joined with a student's progress, used for dashboard/player views. */
export interface ModuleWithProgress extends Module {
  progressPercent: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lessonsCompleted: number;
  lessonsTotal: number;
}
