import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-polite-online-welcome',
  standalone: true,
  templateUrl: './polite-online-welcome.html',
  styleUrl: './polite-online-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliteOnlineWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pow!: NonNullable<Lesson['politeOnlineWelcome']>;
}
