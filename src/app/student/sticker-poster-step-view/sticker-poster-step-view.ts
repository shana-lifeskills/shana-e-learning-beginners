import { Component, computed, input, output, signal } from '@angular/core';
import { StickerOption, StickerPosterStep } from '../../core/models/module.model';
import { buildStickerPosterSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-sticker-poster-step-view',
  standalone: true,
  templateUrl: './sticker-poster-step-view.html',
  styleUrl: './sticker-poster-step-view.scss',
})
export class StickerPosterStepView {
  readonly step = input.required<StickerPosterStep>();
  readonly submitted = output<Record<string, string>>();

  readonly name = signal('');
  readonly selectedIds = signal<string[]>([]);
  readonly downloading = signal(false);

  readonly selectedStickers = computed<StickerOption[]>(() => {
    const ids = this.selectedIds();
    return this.step().stickers.filter((sticker) => ids.includes(sticker.id));
  });

  updateName(value: string): void {
    this.name.set(value);
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggleSticker(id: string): void {
    this.selectedIds.update((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
  }

  startOver(): void {
    this.name.set('');
    this.selectedIds.set([]);
  }

  async savePoster(): Promise<void> {
    if (this.downloading() || !this.selectedStickers().length) return;
    this.downloading.set(true);
    try {
      const svg = buildStickerPosterSvg(this.step().posterTitle, this.selectedStickers().map((s) => s.emoji));
      await downloadPngFromSvg(svg, 'respect-stickers-poster.png');
      this.submitted.emit({
        name: this.name(),
        stickers: this.selectedStickers()
          .map((s) => s.label)
          .join(', '),
      });
    } finally {
      this.downloading.set(false);
    }
  }
}
