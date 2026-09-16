import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ShareReflectChallengeStep } from '../../core/models/module.model';

type SlotId = 'feedback' | 'note';

interface RecorderSlot {
  audioUrl: string | null;
  recording: boolean;
}

/**
 * "Challenge of the Week: Share & Reflect" (Planning Module — Advanced, Week
 * 4). Share the Growth Map, capture the feedback received (typed or
 * recorded), and optionally record a short voice note about what was
 * learned. See `ShareReflectChallengeStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-share-reflect-challenge-step-view',
  standalone: true,
  templateUrl: './share-reflect-challenge-step-view.html',
  styleUrl: './share-reflect-challenge-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareReflectChallengeStepView {
  readonly step = input.required<ShareReflectChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly feedbackText = signal('');
  readonly feedbackRecordMode = signal(false);
  readonly locked = signal(false);

  readonly slots = signal<Record<SlotId, RecorderSlot>>({
    feedback: { audioUrl: null, recording: false },
    note: { audioUrl: null, recording: false },
  });

  /** Whether this browser can capture audio at all — hides the record UI when it can't. */
  readonly recordingSupported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof (globalThis as { MediaRecorder?: unknown }).MediaRecorder === 'function';

  private recorders: Partial<Record<SlotId, MediaRecorder>> = {};
  private chunks: Partial<Record<SlotId, BlobPart[]>> = {};

  readonly canSubmit = computed(
    () => (this.feedbackText().trim().length > 0 || this.slots().feedback.audioUrl !== null) && !this.locked(),
  );

  slotAudio(id: SlotId): string | null {
    return this.slots()[id].audioUrl;
  }

  isRecording(id: SlotId): boolean {
    return this.slots()[id].recording;
  }

  setFeedbackText(value: string): void {
    if (this.locked()) return;
    this.feedbackText.set(value);
  }

  toggleFeedbackRecordMode(): void {
    if (this.locked()) return;
    this.feedbackRecordMode.update((v) => !v);
  }

  async toggleRecording(id: SlotId): Promise<void> {
    if (this.locked()) return;

    if (this.isRecording(id)) {
      this.recorders[id]?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.chunks[id] = [];
      const recorder = new MediaRecorder(stream);
      this.recorders[id] = recorder;

      recorder.ondataavailable = (e) => this.chunks[id]?.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(this.chunks[id] ?? [], { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          this.slots.update((map) => ({ ...map, [id]: { ...map[id], audioUrl: reader.result as string } }));
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
        this.slots.update((map) => ({ ...map, [id]: { ...map[id], recording: false } }));
      };

      recorder.start();
      this.slots.update((map) => ({ ...map, [id]: { ...map[id], recording: true } }));
    } catch {
      this.slots.update((map) => ({ ...map, [id]: { ...map[id], recording: false } }));
    }
  }

  clearRecording(id: SlotId): void {
    if (this.locked()) return;
    this.slots.update((map) => ({ ...map, [id]: { ...map[id], audioUrl: null } }));
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    this.submitted.emit({
      feedback: this.feedbackText().trim() || 'voice recording',
      note: this.slotAudio('note') ? 'voice note recorded' : 'none',
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
