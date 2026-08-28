import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-tvw-welcome',
  standalone: true,
  templateUrl: './tvw-welcome.html',
  styleUrl: './tvw-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvwWelcome extends WelcomeVariantBase {
  @Input({ required: true }) tvw!: NonNullable<Lesson['tinyVoicesWelcome']>;
}
