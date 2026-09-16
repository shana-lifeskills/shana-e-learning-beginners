import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { IdentitySnapshotChallengeStep } from '../../core/models/module.model';

interface SnapshotSlot {
  image: string | null;
  reason: string;
}

@Component({
  selector: 'app-identity-snapshot-challenge-step-view',
  standalone: true,
  templateUrl: './identity-snapshot-challenge-step-view.html',
  styleUrl: './identity-snapshot-challenge-step-view.scss',
})
export class IdentitySnapshotChallengeStepView {
  readonly step = input.required<IdentitySnapshotChallengeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private activeSlot = 0;

  readonly slots = signal<SnapshotSlot[]>([
    { image: null, reason: '' },
    { image: null, reason: '' },
    { image: null, reason: '' },
  ]);
  readonly locked = signal(false);
  /** Swaps the page to the scrapbook reveal in place — no route change. */
  readonly revealed = signal(false);

  readonly canSubmit = computed(() =>
    this.slots().every((slot) => slot.image !== null && slot.reason.trim().length > 0)
  );

  chooseFile(index: number): void {
    if (this.locked()) return;
    this.activeSlot = index;
    this.fileInputRef()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result as string;
      this.slots.update((slots) => slots.map((slot, i) => (i === this.activeSlot ? { ...slot, image } : slot)));
    };
    reader.readAsDataURL(file);
  }

  setReason(index: number, value: string): void {
    this.slots.update((slots) => slots.map((slot, i) => (i === index ? { ...slot, reason: value } : slot)));
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);
    this.revealed.set(true);

    const values: Record<string, string> = {};
    this.slots().forEach((slot, i) => {
      values[`object${i + 1}Image`] = slot.image ?? '';
      values[`object${i + 1}Reason`] = slot.reason;
    });
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
