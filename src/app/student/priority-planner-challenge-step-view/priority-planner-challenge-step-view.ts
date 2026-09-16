import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EisenhowerQuadrant, PriorityPlannerChallengeStep, PriorityReflectPrompt } from '../../core/models/module.model';

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

type Phase = 'learn' | 'video' | 'plan' | 'reflect' | 'done';

/**
 * "The Weekly Priority Planner Challenge" (Planning Module — Advanced, Week
 * 2). A phased activity — learn the Eisenhower matrix, watch a video, fill a
 * box per quadrant, then reflect. See `PriorityPlannerChallengeStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-priority-planner-challenge-step-view',
  standalone: true,
  templateUrl: './priority-planner-challenge-step-view.html',
  styleUrl: './priority-planner-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityPlannerChallengeStepView {
  private sanitizer = inject(DomSanitizer);

  readonly step = input.required<PriorityPlannerChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly phase = signal<Phase>('learn');
  readonly playing = signal(false);
  readonly watched = signal(false);
  readonly plan = signal<Record<string, string>>({});
  readonly reflections = signal<Record<string, string>>({});

  readonly videoId = computed(() => extractYoutubeId(this.step().videoYoutubeUrl));
  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    );
  });

  readonly planComplete = computed(() =>
    this.step().quadrants.every((q) => (this.plan()[q.key] ?? '').trim().length > 0),
  );

  readonly reflectComplete = computed(() =>
    this.step().prompts.every((p) => (this.reflections()[p.id] ?? '').trim().length > 0),
  );

  play(): void {
    this.playing.set(true);
  }

  toggleWatched(): void {
    this.watched.update((v) => !v);
  }

  setPlan(key: string, value: string): void {
    this.plan.update((map) => ({ ...map, [key]: value }));
  }

  setReflection(id: string, value: string): void {
    this.reflections.update((map) => ({ ...map, [id]: value }));
  }

  planValue(key: string): string {
    return this.plan()[key] ?? '';
  }

  reflectionValue(id: string): string {
    return this.reflections()[id] ?? '';
  }

  goTo(phase: Phase): void {
    this.phase.set(phase);
  }

  submit(): void {
    if (!this.planComplete() || !this.reflectComplete()) return;
    const values: Record<string, string> = {};
    for (const q of this.step().quadrants) {
      values[`quadrant${q.key}`] = this.planValue(q.key).trim();
    }
    for (const p of this.step().prompts) {
      values[p.id] = this.reflectionValue(p.id).trim();
    }
    this.phase.set('done');
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }

  /* template helpers */
  trackQuadrant(_: number, q: EisenhowerQuadrant): string {
    return q.key;
  }

  trackPrompt(_: number, p: PriorityReflectPrompt): string {
    return p.id;
  }
}
