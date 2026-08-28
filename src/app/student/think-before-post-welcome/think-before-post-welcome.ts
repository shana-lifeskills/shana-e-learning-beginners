import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-think-before-post-welcome',
  standalone: true,
  templateUrl: './think-before-post-welcome.html',
  styleUrl: './think-before-post-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinkBeforePostWelcome extends WelcomeVariantBase {
  @Input({ required: true }) tbp!: NonNullable<Lesson['thinkBeforePostWelcome']>;
}
