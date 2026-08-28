import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-warmup-preview-welcome',
  standalone: true,
  templateUrl: './warmup-preview-welcome.html',
  styleUrl: './warmup-preview-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarmupPreviewWelcome extends WelcomeVariantBase {
  @Input({ required: true }) wpw!: NonNullable<Lesson['warmupPreviewWelcome']>;
}
