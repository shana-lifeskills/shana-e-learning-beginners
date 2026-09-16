import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { SevenDayPlanningProjectStep } from '../../core/models/module.model';

/**
 * "The 7-Day Planning Challenge" end-of-module project (Planning Module —
 * Advanced). A short reflection plus an optional "My Week of Wins"
 * collage/video upload. See `SevenDayPlanningProjectStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-seven-day-planning-project-step-view',
  standalone: true,
  templateUrl: './seven-day-planning-project-step-view.html',
  styleUrl: './seven-day-planning-project-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SevenDayPlanningProjectStepView {
  readonly step = input.required<SevenDayPlanningProjectStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly reflection = signal('');
  readonly fileUrl = signal<string | null>(null);
  readonly fileIsImage = signal(false);
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.reflection().trim().length > 0 && !this.locked());

  setReflection(value: string): void {
    if (this.locked()) return;
    this.reflection.set(value);
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

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    this.submitted.emit({
      reflection: this.reflection().trim(),
      weekOfWins: this.fileUrl() ? 'attached' : 'none',
    });
  }

  finish(): void {
    this.continued.emit();
  }
}
