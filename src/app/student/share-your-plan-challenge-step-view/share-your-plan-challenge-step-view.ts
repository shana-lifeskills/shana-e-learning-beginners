import { Component, computed, input, output, signal } from '@angular/core';
import { ShareYourPlanChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-share-your-plan-challenge-step-view',
  standalone: true,
  templateUrl: './share-your-plan-challenge-step-view.html',
  styleUrl: './share-your-plan-challenge-step-view.scss',
})
export class ShareYourPlanChallengeStepView {
  readonly step = input.required<ShareYourPlanChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly goal = signal('');
  readonly start = signal('');
  readonly audioUrl = signal<string | null>(null);
  readonly recording = signal(false);
  readonly locked = signal(false);
  readonly revealed = signal(false);

  /** Whether this browser can capture audio at all — hides the record UI when it can't. */
  readonly recordingSupported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof (globalThis as { MediaRecorder?: unknown }).MediaRecorder === 'function';

  private mediaRecorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];

  readonly hasWrittenPlan = computed(() => this.goal().trim().length > 0 && this.start().trim().length > 0);
  readonly canSubmit = computed(() => this.hasWrittenPlan() || this.audioUrl() !== null);

  setGoal(value: string): void {
    this.goal.set(value);
  }

  setStart(value: string): void {
    this.start.set(value);
  }

  async toggleRecording(): Promise<void> {
    if (this.locked()) return;

    if (this.recording()) {
      this.mediaRecorder?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => this.chunks.push(e.data);
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => this.audioUrl.set(reader.result as string);
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
        this.recording.set(false);
      };

      this.mediaRecorder.start();
      this.recording.set(true);
    } catch {
      this.recording.set(false);
    }
  }

  clearRecording(): void {
    if (this.locked()) return;
    this.audioUrl.set(null);
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.revealed.set(true);
    this.submitted.emit({
      goal: this.goal().trim(),
      start: this.start().trim(),
      voiceNote: this.audioUrl() ? 'recorded' : 'none',
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
