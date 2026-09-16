import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PersonalGrowthMapStep } from '../../core/models/module.model';

interface SectionEntry {
  text: string;
  fileUrl: string | null;
  fileIsImage: boolean;
  uploadMode: boolean;
}

/**
 * "My Personal Growth Map" activity (Planning Module — Advanced, Week 4).
 * Three sections, each filled by typing or by attaching a file. See
 * `PersonalGrowthMapStep` in `module.model.ts`.
 */
@Component({
  selector: 'app-personal-growth-map-step-view',
  standalone: true,
  templateUrl: './personal-growth-map-step-view.html',
  styleUrl: './personal-growth-map-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalGrowthMapStepView {
  readonly step = input.required<PersonalGrowthMapStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly entries = signal<Record<string, SectionEntry>>({});
  readonly locked = signal(false);

  private entry(id: string): SectionEntry {
    return this.entries()[id] ?? { text: '', fileUrl: null, fileIsImage: false, uploadMode: false };
  }

  sectionText(id: string): string {
    return this.entry(id).text;
  }

  sectionFile(id: string): string | null {
    return this.entry(id).fileUrl;
  }

  sectionFileIsImage(id: string): boolean {
    return this.entry(id).fileIsImage;
  }

  isUploadMode(id: string): boolean {
    return this.entry(id).uploadMode;
  }

  readonly canSubmit = computed(() =>
    this.step().sections.every((s) => {
      const e = this.entries()[s.id];
      return !!e && (e.text.trim().length > 0 || e.fileUrl !== null);
    }),
  );

  setText(id: string, value: string): void {
    if (this.locked()) return;
    this.entries.update((map) => ({ ...map, [id]: { ...this.entry(id), text: value } }));
  }

  toggleUploadMode(id: string): void {
    if (this.locked()) return;
    this.entries.update((map) => ({ ...map, [id]: { ...this.entry(id), uploadMode: !this.entry(id).uploadMode } }));
  }

  onFileSelected(id: string, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();
    reader.onload = () => {
      this.entries.update((map) => ({
        ...map,
        [id]: { ...this.entry(id), fileUrl: reader.result as string, fileIsImage: isImage },
      }));
    };
    reader.readAsDataURL(file);
  }

  removeFile(id: string): void {
    if (this.locked()) return;
    this.entries.update((map) => ({ ...map, [id]: { ...this.entry(id), fileUrl: null } }));
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.locked.set(true);
    const values: Record<string, string> = {};
    for (const s of this.step().sections) {
      const e = this.entry(s.id);
      values[s.id] = e.text.trim() || (e.fileUrl ? 'file attached' : '');
    }
    this.submitted.emit(values);
  }

  finish(): void {
    this.continued.emit();
  }
}
