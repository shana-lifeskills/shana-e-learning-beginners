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
  | 'share-prompt'
  | 'reflection'
  | 'challenge'
  | 'story'
  | 'story-tabs'
  | 'confidence-link'
  | 'matching-game'
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
  | 'smart-goals-lesson'
  | 'smart-goal-builder'
  | 'goal-challenge-tracker'
  | 'confidence-goal-tracker';

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

export type Exercise =
  | MultipleChoiceExercise
  | SharePromptExercise
  | ReflectionStep
  | ChallengeStep
  | StoryStep
  | StoryTabsStep
  | ConfidenceLinkStep
  | MatchingGameStep
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
  | SmartGoalsLessonStep
  | SmartGoalBuilderStep
  | GoalChallengeTrackerStep
  | ConfidenceGoalTrackerStep;

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
  weekPill: string;
  /** Plain part of the title, e.g. "Planning". */
  titleStart: string;
  /** Accent-colored part of the title, e.g. "Power". */
  titleAccent: string;
  subtitle: string;
  stageIcon: string;
  stageLabel: string;
  objectiveIcon: string;
  objectiveHeading: string;
  objectiveText: string;
  startLabel: string;
  image: string;
  imageAlt: string;
  /** Small speech-bubble greeting overlapping the image, e.g. "👋 Hi there!". */
  speechBubble?: string;
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
  /** Ordered steps the student walks through — warm-up, story, discussion, activity, challenge, questions. */
  exercises: Exercise[];
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
