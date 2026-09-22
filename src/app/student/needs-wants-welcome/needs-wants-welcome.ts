import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-needs-wants-welcome',
  standalone: true,
  templateUrl: './needs-wants-welcome.html',
  styleUrl: './needs-wants-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedsWantsWelcome extends WelcomeVariantBase {
  @Input({ required: true }) nww!: NonNullable<Lesson['needsWantsWelcome']>;
}
