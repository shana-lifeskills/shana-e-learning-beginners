import { Component, ElementRef, computed, inject, input, output, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GamificationService } from '../../core/services/gamification.service';
import { DiscussionStarterQuestion, ExerciseOption, ReflectionQuestion, StoryTabsStep } from '../../core/models/module.model';

/**
 * Pulls the video id out of the common YouTube URL shapes (watch?v=, with the
 * `v` param in any position among other query params like `si=`/`feature=`;
 * youtu.be/; /embed/; /shorts/).
 */
function extractYoutubeId(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(/^https?:\/\//.test(url) ? url : `https://${url}`);
    const host = parsed.hostname.replace(/^www\.|^m\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') {
        const v = parsed.searchParams.get('v');
        return v && /^[\w-]{11}$/.test(v) ? v : null;
      }
      const embedMatch = parsed.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/);
      return embedMatch?.[1] ?? null;
    }

    return null;
  } catch {
    return null;
  }
}

type TabId = 'video' | 'starters' | 'points';

interface StarterState {
  selectedOptionId: string | null;
  correct: boolean;
}

const BRUSH_COLORS = ['#ff6f59', '#ffc93c', '#6bcb77', '#4ecdc4', '#a66dd4', '#ff8fa3'];

@Component({
  selector: 'app-story-tabs-step-view',
  standalone: true,
  templateUrl: './story-tabs-step-view.html',
  styleUrl: './story-tabs-step-view.scss',
})
export class StoryTabsStepView {
  private gamification = inject(GamificationService);
  private sanitizer = inject(DomSanitizer);
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly step = input.required<StoryTabsStep>();
  readonly studentId = input.required<string>();
  readonly moduleId = input.required<string>();
  readonly continued = output<Record<string, string>>();

  readonly activeTab = signal<TabId>('video');
  readonly videoPlaying = signal(false);

  readonly youtubeVideoId = computed(() => extractYoutubeId(this.step().videoYoutubeUrl));

  readonly youtubeEmbedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.youtubeVideoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`);
  });

  playVideo(): void {
    this.videoPlaying.set(true);
  }

  readonly starterAnswers = signal<Record<string, StarterState>>({});
  readonly reflectionDraft = signal<Record<string, string>>({});
  /** Which Discussion Point question is currently showing — they're presented one at a time. */
  readonly activePointIndex = signal(0);

  // --- Activity tab (draw + caption, or ticket slots) state ---
  readonly colors = BRUSH_COLORS;
  readonly activityText = signal('');
  /** slotId -> what the student typed, for a `slots`-based activity (e.g. three Bravery Tickets). */
  readonly ticketDrafts = signal<Record<string, string>>({});
  readonly brushColor = signal(BRUSH_COLORS[0]);
  readonly brushSize = signal(15);
  readonly hasDrawing = signal(false);
  readonly activityLocked = signal(false);
  /** Holds a `slots`-activity's values between "Save" (which locks the tab to show a preview) and the follow-up Continue click. */
  private savedActivityValues: Record<string, string> | null = null;
  private drawing = false;
  private lastX = 0;
  private lastY = 0;

  readonly startersCorrectCount = computed(
    () => Object.values(this.starterAnswers()).filter((s) => s.correct).length
  );

  /** The third tab stays locked until every Discussion Starter question is answered correctly. */
  readonly startersComplete = computed(() => this.startersCorrectCount() >= this.step().discussionStarterQuestions.length);

  readonly currentPoint = computed<ReflectionQuestion | null>(() => (this.step().reflectionQuestions ?? [])[this.activePointIndex()] ?? null);

  readonly isLastPoint = computed(() => this.activePointIndex() >= (this.step().reflectionQuestions?.length ?? 0) - 1);

  readonly currentPointAnswered = computed(() => {
    const point = this.currentPoint();
    if (!point) return false;
    return (this.reflectionDraft()[point.id] ?? '').trim().length > 0;
  });

  readonly canSubmitActivity = computed(() => {
    const slots = this.step().activity?.slots;
    if (slots?.length) {
      const drafts = this.ticketDrafts();
      return slots.every((slot) => (drafts[slot.id] ?? '').trim().length > 0);
    }
    return this.activityText().trim().length > 0 || this.hasDrawing();
  });

  setTab(tab: TabId): void {
    if (tab === 'points' && !this.startersComplete()) return;
    this.activeTab.set(tab);
  }

  starterState(question: DiscussionStarterQuestion): StarterState {
    return this.starterAnswers()[question.id] ?? { selectedOptionId: null, correct: false };
  }

  optionState(question: DiscussionStarterQuestion, option: ExerciseOption): 'correct' | 'incorrect' | null {
    const state = this.starterState(question);
    if (!state.selectedOptionId) return null;
    if (option.id !== state.selectedOptionId) return null;
    return state.correct ? 'correct' : 'incorrect';
  }

  selectStarterOption(question: DiscussionStarterQuestion, option: ExerciseOption): void {
    const current = this.starterState(question);
    if (current.correct) return;

    const correct = option.id === question.correctOptionId;
    this.starterAnswers.update((state) => ({ ...state, [question.id]: { selectedOptionId: option.id, correct } }));

    if (correct) {
      this.gamification.awardStar(this.studentId(), this.moduleId(), `${question.id}__starter`);
    }
  }

  updateReflection(questionId: string, value: string): void {
    this.reflectionDraft.update((draft) => ({ ...draft, [questionId]: value }));
  }

  selectReflectionOption(question: ReflectionQuestion, option: ExerciseOption): void {
    this.updateReflection(question.id, option.text);
  }

  /** "Submit" on a Discussion Point — moves to the next question, or finishes the tab on the last one. */
  submitPoint(): void {
    if (!this.currentPointAnswered()) return;
    if (this.isLastPoint()) {
      this.continued.emit(this.reflectionDraft());
      return;
    }
    this.activePointIndex.update((i) => i + 1);
  }

  // --- Activity tab (draw + caption, or ticket slots) ---

  updateActivityText(value: string): void {
    this.activityText.set(value);
  }

  updateTicket(slotId: string, value: string): void {
    this.ticketDrafts.update((draft) => ({ ...draft, [slotId]: value }));
  }

  setBrushColor(color: string): void {
    this.brushColor.set(color);
  }

  setBrushSize(value: string): void {
    this.brushSize.set(Number(value));
  }

  onPointerDown(event: PointerEvent): void {
    if (this.activityLocked()) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    this.drawing = true;
    const point = this.pointFromEvent(canvas, event);
    this.lastX = point.x;
    this.lastY = point.y;
    this.drawDot(canvas, point.x, point.y);
    this.hasDrawing.set(true);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.drawing || this.activityLocked()) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const point = this.pointFromEvent(canvas, event);
    this.drawLine(canvas, this.lastX, this.lastY, point.x, point.y);
    this.lastX = point.x;
    this.lastY = point.y;
  }

  onPointerUp(): void {
    this.drawing = false;
  }

  clearDrawing(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    this.hasDrawing.set(false);
  }

  submitActivity(): void {
    if (!this.canSubmitActivity() || this.activityLocked()) return;
    this.activityLocked.set(true);

    const values: Record<string, string> = {};
    const slots = this.step().activity?.slots;
    if (slots?.length) {
      const drafts = this.ticketDrafts();
      slots.forEach((slot) => (values[slot.id] = (drafts[slot.id] ?? '').trim()));
      // Hold here instead of emitting right away — the student should get a moment to see their
      // saved tickets before the lesson advances out from under them; see continueAfterActivity().
      this.savedActivityValues = values;
      return;
    }

    if (this.activityText().trim()) values['caption'] = this.activityText().trim();
    if (this.hasDrawing()) {
      const canvas = this.canvasRef()?.nativeElement;
      if (canvas) values['drawing'] = canvas.toDataURL('image/png');
    }
    this.continued.emit(values);
  }

  /** Continues past a `slots`-based activity once the student is done reviewing their saved tickets. */
  continueAfterActivity(): void {
    if (!this.savedActivityValues) return;
    this.continued.emit(this.savedActivityValues);
  }

  private pointFromEvent(canvas: HTMLCanvasElement, event: PointerEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  }

  private drawDot(canvas: HTMLCanvasElement, x: number, y: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = this.brushColor();
    ctx.beginPath();
    ctx.arc(x, y, this.brushSize() / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawLine(canvas: HTMLCanvasElement, x1: number, y1: number, x2: number, y2: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.brushColor();
    ctx.lineWidth = this.brushSize();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
