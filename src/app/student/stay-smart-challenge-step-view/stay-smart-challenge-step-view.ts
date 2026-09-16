import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { StaySmartChallengeStep } from '../../core/models/module.model';

type Phase = 'tracker' | 'partner' | 'reflect' | 'upload' | 'done';

/**
 * "Challenge of the Week: Stay SMART!" (Planning Module — Advanced, Week 3).
 * A phased challenge: 7-day tracker, accountability partner, reflection, and
 * an optional photo/video upload of the tracker. See `StaySmartChallengeStep`
 * in `module.model.ts`.
 */
@Component({
  selector: 'app-stay-smart-challenge-step-view',
  standalone: true,
  templateUrl: './stay-smart-challenge-step-view.html',
  styleUrl: './stay-smart-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaySmartChallengeStepView {
  readonly step = input.required<StaySmartChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly phase = signal<Phase>('tracker');
  readonly days = signal<Set<number>>(new Set());
  readonly partner = signal('');
  readonly reflections = signal<Record<string, string>>({});
  readonly uploadUrl = signal<string | null>(null);
  readonly uploadIsVideo = signal(false);

  readonly daysDone = computed(() => this.days().size);
  readonly canLeavePartner = computed(() => this.partner().trim().length > 0);
  readonly canSubmit = computed(() =>
    this.step().reflectPrompts.every((p) => (this.reflections()[p.id] ?? '').trim().length > 0),
  );

  isDayOn(index: number): boolean {
    return this.days().has(index);
  }

  toggleDay(index: number): void {
    this.days.update((set) => {
      const next = new Set(set);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  setPartner(value: string): void {
    this.partner.set(value);
  }

  setReflection(id: string, value: string): void {
    this.reflections.update((map) => ({ ...map, [id]: value }));
  }

  reflectionValue(id: string): string {
    return this.reflections()[id] ?? '';
  }

  chooseFile(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.uploadIsVideo.set(file.type.startsWith('video/'));
    const reader = new FileReader();
    reader.onload = () => this.uploadUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeUpload(): void {
    this.uploadUrl.set(null);
  }

  goTo(phase: Phase): void {
    this.phase.set(phase);
  }

  submit(): void {
    if (!this.canSubmit()) return;
    const values: Record<string, string> = {
      daysTracked: `${this.daysDone()} of 7`,
      partner: this.partner().trim(),
      upload: this.uploadUrl() ? (this.uploadIsVideo() ? 'video attached' : 'photo attached') : 'none',
    };
    for (const p of this.step().reflectPrompts) {
      values[p.id] = this.reflectionValue(p.id).trim();
    }
    this.phase.set('done');
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
