import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-quick-recap-welcome',
  standalone: true,
  templateUrl: './quick-recap-welcome.html',
  styleUrl: './quick-recap-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickRecapWelcome extends WelcomeVariantBase {
  @Input({ required: true }) qrw!: NonNullable<Lesson['quickRecapWelcome']>;
}
