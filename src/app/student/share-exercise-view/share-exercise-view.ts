import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ProgressService } from '../../core/services/progress.service';
import { SharePromptExercise } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

interface DisplayEntry {
  studentName: string;
  values: Record<string, string>;
  isMe: boolean;
}

@Component({
  selector: 'app-share-exercise-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-exercise-view.html',
  styleUrl: './share-exercise-view.scss',
})
export class ShareExerciseView {
  private auth = inject(AuthService);
  private progressService = inject(ProgressService);

  readonly exercise = input.required<SharePromptExercise>();
  readonly submitted = output<Record<string, string>>();
  /** Fired only when offerCardDownload is set — lets the student preview/download before moving on. */
  readonly continued = output<void>();

  readonly draft = signal<Record<string, string>>({});
  readonly locked = signal(false);
  readonly entries = signal<DisplayEntry[]>([]);
  readonly showPreview = signal(false);
  readonly downloading = signal(false);

  readonly canSubmit = computed(() => {
    const values = this.draft();
    return this.exercise().fields.every((field) => (values[field.id] ?? '').trim().length > 0);
  });

  readonly lastFieldId = computed(() => this.exercise().fields.at(-1)?.id ?? '');

  readonly uniqueLastFieldCount = computed(() => {
    const fieldId = this.lastFieldId();
    const values = this.entries().map((e) => e.values[fieldId]?.trim().toLowerCase()).filter(Boolean);
    return new Set(values).size;
  });

  constructor() {
    effect(() => {
      const exercise = this.exercise();
      this.draft.set({});
      this.locked.set(false);
      this.showPreview.set(false);

      const student = this.auth.currentUser();
      const existing = this.progressService.getSubmissionsForExercise(exercise.id);
      this.entries.set(
        existing.map((s) => ({
          studentName: s.studentName,
          values: s.values,
          isMe: s.studentId === student?.id,
        }))
      );
    });
  }

  updateField(fieldId: string, value: string): void {
    this.draft.update((current) => ({ ...current, [fieldId]: value }));
  }

  submit(): void {
    if (this.locked() || !this.canSubmit()) return;

    const student = this.auth.currentUser();
    const values = this.draft();

    this.entries.update((current) => [...current, { studentName: student?.firstName ?? 'You', values, isMe: true }]);
    this.locked.set(true);
    this.submitted.emit(values);
  }

  togglePreview(): void {
    this.showPreview.update((show) => !show);
  }

  async downloadCard(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const values = this.draft();
      const svg = buildFieldsCardSvg(
        this.exercise().cardTitle ?? 'My Card',
        this.exercise().fields.map((field) => ({ label: field.label, value: values[field.id] ?? '' }))
      );
      await downloadPngFromSvg(svg, `${(this.exercise().cardTitle ?? 'my-card').replace(/\s+/g, '-').toLowerCase()}.png`);
    } finally {
      this.downloading.set(false);
    }
  }
}
