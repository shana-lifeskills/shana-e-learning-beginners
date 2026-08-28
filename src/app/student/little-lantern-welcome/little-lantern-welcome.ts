import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-little-lantern-welcome',
  standalone: true,
  templateUrl: './little-lantern-welcome.html',
  styleUrl: './little-lantern-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LittleLanternWelcome extends WelcomeVariantBase {
  @Input({ required: true }) llw!: NonNullable<Lesson['littleLanternWelcome']>;
}
