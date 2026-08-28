import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-classic-welcome',
  standalone: true,
  templateUrl: './classic-welcome.html',
  styleUrl: './classic-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassicWelcome extends WelcomeVariantBase {
  @Input({ required: true }) lesson!: Lesson;
}
