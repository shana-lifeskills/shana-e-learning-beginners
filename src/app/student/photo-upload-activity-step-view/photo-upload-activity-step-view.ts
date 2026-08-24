import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { PhotoUploadActivityStep } from '../../core/models/module.model';

@Component({
  selector: 'app-photo-upload-activity-step-view',
  standalone: true,
  templateUrl: './photo-upload-activity-step-view.html',
  styleUrl: './photo-upload-activity-step-view.scss',
})
export class PhotoUploadActivityStepView {
  readonly step = input.required<PhotoUploadActivityStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly previewUrl = signal<string | null>(null);
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.previewUrl() !== null);

  chooseFile(): void {
    if (this.locked()) return;
    this.fileInputRef()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    const dataUrl = this.previewUrl();
    if (!dataUrl || this.locked()) return;
    this.locked.set(true);
    this.submitted.emit({ imageDataUrl: dataUrl });
  }
}
