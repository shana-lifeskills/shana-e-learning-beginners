import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoReflectQuestion, VideoReflectStep } from '../../core/models/module.model';

/**
 * Pulls the video id out of the common YouTube URL shapes (watch?v=, youtu.be/,
 * /embed/, /shorts/). Mirrors the helper in `story-tabs-step-view`.
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

/**
 * "Watch and Reflect" video step (Planning Module — Advanced, Week 2). See
 * `VideoReflectStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-video-reflect-step-view',
  standalone: true,
  templateUrl: './video-reflect-step-view.html',
  styleUrl: './video-reflect-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoReflectStepView {
  private sanitizer = inject(DomSanitizer);

  readonly step = input.required<VideoReflectStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly playing = signal(false);
  readonly watched = signal(false);
  readonly locked = signal(false);

  readonly text = signal<Record<string, string>>({});
  readonly picks = signal<Record<string, Set<string>>>({});
  readonly otherOn = signal<Record<string, boolean>>({});
  readonly otherText = signal<Record<string, string>>({});

  readonly videoId = computed(() => extractYoutubeId(this.step().videoYoutubeUrl));

  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    );
  });

  readonly canSubmit = computed(() => {
    if (!this.watched() || this.locked()) return false;
    return this.step().questions.every((q) => this.isAnswered(q));
  });

  play(): void {
    this.playing.set(true);
  }

  toggleWatched(): void {
    if (this.locked()) return;
    this.watched.update((v) => !v);
  }

  setText(id: string, value: string): void {
    if (this.locked()) return;
    this.text.update((map) => ({ ...map, [id]: value }));
  }

  isPicked(id: string, option: string): boolean {
    return this.picks()[id]?.has(option) ?? false;
  }

  togglePick(id: string, option: string): void {
    if (this.locked()) return;
    this.picks.update((map) => {
      const next = new Set(map[id] ?? []);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return { ...map, [id]: next };
    });
  }

  isOtherOn(id: string): boolean {
    return this.otherOn()[id] ?? false;
  }

  toggleOther(id: string): void {
    if (this.locked()) return;
    this.otherOn.update((map) => ({ ...map, [id]: !map[id] }));
  }

  setOtherText(id: string, value: string): void {
    if (this.locked()) return;
    this.otherText.update((map) => ({ ...map, [id]: value }));
  }

  private isAnswered(q: VideoReflectQuestion): boolean {
    if (q.kind === 'text') return (this.text()[q.id] ?? '').trim().length > 0;
    const picked = (this.picks()[q.id]?.size ?? 0) > 0;
    const otherFilled = this.isOtherOn(q.id) && (this.otherText()[q.id] ?? '').trim().length > 0;
    return picked || otherFilled;
  }

  private answerFor(q: VideoReflectQuestion): string {
    if (q.kind === 'text') return (this.text()[q.id] ?? '').trim();
    const parts = [...(this.picks()[q.id] ?? [])];
    if (this.isOtherOn(q.id)) {
      const other = (this.otherText()[q.id] ?? '').trim();
      if (other) parts.push(`Other: ${other}`);
    }
    return parts.join(', ');
  }

  answerSummary(q: VideoReflectQuestion): string {
    return this.answerFor(q);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    const values: Record<string, string> = {};
    for (const q of this.step().questions) {
      values[q.id] = this.answerFor(q);
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
