import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-practice-welcome',
  standalone: true,
  templateUrl: './practice-welcome.html',
  styleUrl: './practice-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pw!: NonNullable<Lesson['practiceWelcome']>;
}
