import { Component, computed, input, output, signal } from '@angular/core';
import { ConfidenceBadgeStep } from '../../core/models/module.model';
import { buildCertificateSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-confidence-badge-step-view',
  standalone: true,
  templateUrl: './confidence-badge-step-view.html',
  styleUrl: './confidence-badge-step-view.scss',
})
export class ConfidenceBadgeStepView {
  readonly step = input.required<ConfidenceBadgeStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly text = signal('');
  readonly hasSubmitted = signal(false);
  readonly downloading = signal(false);

  readonly canSubmit = computed(() => this.text().trim().length > 0);

  updateText(value: string): void {
    const max = this.step().maxLength;
    this.text.set(value.slice(0, max));
  }

  submit(): void {
    if (!this.canSubmit()) return;
    this.hasSubmitted.set(true);
    this.submitted.emit({ confidence: this.text().trim() });
  }

  async downloadCertificate(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const svg = buildCertificateSvg(this.step().certificateTitle, this.step().certificateIntro, this.text().trim());
      await downloadPngFromSvg(svg, 'confidence-certificate.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
