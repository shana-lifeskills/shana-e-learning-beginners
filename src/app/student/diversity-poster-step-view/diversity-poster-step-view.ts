import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { DiversityPosterFigure, DiversityPosterStep } from '../../core/models/module.model';
import { CollageItem, buildCollagePosterSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

interface CollagePhoto {
  id: string;
  dataUrl: string;
}

@Component({
  selector: 'app-diversity-poster-step-view',
  standalone: true,
  templateUrl: './diversity-poster-step-view.html',
  styleUrl: './diversity-poster-step-view.scss',
})
export class DiversityPosterStepView {
  readonly step = input.required<DiversityPosterStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly name = signal('');
  readonly selectedFigureIds = signal<string[]>([]);
  readonly photos = signal<CollagePhoto[]>([]);
  readonly downloading = signal(false);

  readonly selectedFigures = computed<DiversityPosterFigure[]>(() => {
    const ids = this.selectedFigureIds();
    return this.step().figures.filter((figure) => ids.includes(figure.id));
  });

  readonly hasItems = computed(() => this.selectedFigures().length > 0 || this.photos().length > 0);

  updateName(value: string): void {
    this.name.set(value);
  }

  isSelected(id: string): boolean {
    return this.selectedFigureIds().includes(id);
  }

  toggleFigure(id: string): void {
    this.selectedFigureIds.update((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
  }

  choosePhoto(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.photos.update((photos) => [...photos, { id: `photo-${Date.now()}`, dataUrl: reader.result as string }]);
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removePhoto(id: string): void {
    this.photos.update((photos) => photos.filter((p) => p.id !== id));
  }

  startOver(): void {
    this.name.set('');
    this.selectedFigureIds.set([]);
    this.photos.set([]);
  }

  async savePoster(): Promise<void> {
    if (this.downloading() || !this.hasItems()) return;
    this.downloading.set(true);
    try {
      const items: CollageItem[] = [
        ...this.selectedFigures().map((f): CollageItem => ({ kind: 'emoji', emoji: f.emoji })),
        ...this.photos().map((p): CollageItem => ({ kind: 'image', dataUrl: p.dataUrl })),
      ];
      const posterTitle = this.name().trim() || 'We Are Different, We Are Friends';
      const svg = buildCollagePosterSvg(posterTitle, 'We Are Different, We Are Friends', items);
      await downloadPngFromSvg(svg, 'we-are-friends-poster.png');
      this.submitted.emit({
        name: this.name(),
        friends: this.selectedFigures()
          .map((f) => f.label)
          .join(', '),
        uploadedPhotos: String(this.photos().length),
      });
    } finally {
      this.downloading.set(false);
    }
  }
}
