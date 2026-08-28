import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-tech-responsibly-welcome',
  standalone: true,
  templateUrl: './tech-responsibly-welcome.html',
  styleUrl: './tech-responsibly-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechResponsiblyWelcome extends WelcomeVariantBase {
  @Input({ required: true }) trw!: NonNullable<Lesson['techResponsiblyWelcome']>;
}
