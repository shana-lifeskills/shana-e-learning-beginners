import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoalVideoReflectStep } from '../../core/models/module.model';

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

type Phase = 'goal' | 'video' | 'questions' | 'done';

/**
 * "How to Write a SMART Goal" video step (Planning Module — Advanced, Week
 * 3). Phased: set a goal → watch → reflect → done. See `GoalVideoReflectStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-goal-video-reflect-step-view',
  standalone: true,
  templateUrl: './goal-video-reflect-step-view.html',
  styleUrl: './goal-video-reflect-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalVideoReflectStepView {
  private sanitizer = inject(DomSanitizer);

  readonly step = input.required<GoalVideoReflectStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('goal');
  readonly goal = signal('');
  readonly playing = signal(false);
  readonly watched = signal(false);
  readonly text = signal<Record<string, string>>({});
  readonly choice = signal<string | null>(null);

  readonly videoId = computed(() => extractYoutubeId(this.step().videoYoutubeUrl));
  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    );
  });

  readonly canLeaveGoal = computed(() => this.goal().trim().length > 0);
  readonly canSubmit = computed(
    () =>
      this.step().textQuestions.every((q) => (this.text()[q.id] ?? '').trim().length > 0) &&
      this.choice() !== null,
  );

  setGoal(value: string): void {
    this.goal.set(value);
  }

  play(): void {
    this.playing.set(true);
  }

  toggleWatched(): void {
    this.watched.update((v) => !v);
  }

  setText(id: string, value: string): void {
    this.text.update((map) => ({ ...map, [id]: value }));
  }

  textValue(id: string): string {
    return this.text()[id] ?? '';
  }

  pickChoice(option: string): void {
    this.choice.set(option);
  }

  goTo(phase: Phase): void {
    this.phase.set(phase);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    const values: Record<string, string> = { myGoal: this.goal().trim() };
    for (const q of this.step().textQuestions) {
      values[q.id] = this.textValue(q.id).trim();
    }
    values[this.step().choiceQuestion.id] = this.choice() ?? '';
    this.phase.set('done');
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
