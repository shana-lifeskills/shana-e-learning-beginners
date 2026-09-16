import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { ConfidenceContractStep } from '../../core/models/module.model';

/**
 * "Confidence Contract" — End-of-Module Project creative reflection
 * (Self-Confidence Module — Advanced). A format pick, a written action plan,
 * and an optional photo/video attachment. See `ConfidenceContractStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-confidence-contract-step-view',
  standalone: true,
  templateUrl: './confidence-contract-step-view.html',
  styleUrl: './confidence-contract-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfidenceContractStepView {
  readonly step = input.required<ConfidenceContractStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly formatId = signal<string | null>(null);
  readonly plan = signal('');
  readonly fileUrl = signal<string | null>(null);
  readonly fileIsImage = signal(false);
  readonly locked = signal(false);

  readonly canSubmit = computed(() => !!this.formatId() && this.plan().trim().length > 0 && !this.locked());

  chooseFormat(id: string): void {
    if (this.locked()) return;
    this.formatId.set(id);
  }

  setPlan(value: string): void {
    if (this.locked()) return;
    this.plan.set(value);
  }

  chooseFile(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.fileIsImage.set(file.type.startsWith('image/'));
    const reader = new FileReader();
    reader.onload = () => this.fileUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  removeFile(): void {
    if (this.locked()) return;
    this.fileUrl.set(null);
  }

  chosenFormat() {
    return this.step().formats.find((f) => f.id === this.formatId()) ?? null;
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    this.submitted.emit({
      format: this.formatId() ?? '',
      plan: this.plan().trim(),
      attachment: this.fileUrl() ? 'attached' : 'none',
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
