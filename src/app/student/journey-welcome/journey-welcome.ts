import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-journey-welcome',
  standalone: true,
  templateUrl: './journey-welcome.html',
  styleUrl: './journey-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyWelcome extends WelcomeVariantBase {
  @Input({ required: true }) lesson!: Lesson;
}
