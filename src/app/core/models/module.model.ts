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
  | 'smart-thinker-plan-challenge';

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
  progressHeading: string;
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
  | SmartThinkerPlanChallengeStep;

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
}

/** Module joined with a student's progress, used for dashboard/player views. */
export interface ModuleWithProgress extends Module {
  progressPercent: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lessonsCompleted: number;
  lessonsTotal: number;
}
