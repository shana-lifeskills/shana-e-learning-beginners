import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-recap-welcome',
  standalone: true,
  templateUrl: './recap-welcome.html',
  styleUrl: './recap-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecapWelcome extends WelcomeVariantBase {
  @Input({ required: true }) rw!: NonNullable<Lesson['recapWelcome']>;
}
