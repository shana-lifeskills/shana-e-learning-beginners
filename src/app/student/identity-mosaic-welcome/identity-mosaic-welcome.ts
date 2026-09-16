import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Identity mosaic" welcome layout — Identity Module (Advanced), Week 1
 * ("What Makes Me, Me?"). A full-width theme banner, an ages badge, a
 * two-tone title above an illustration of teens each lost in thought about a
 * different piece of themselves, and a bordered card with week/stage pills,
 * a quoted title, an Objective box, and a row of identity-piece tag pills.
 * Purely presentational — see `LessonIdentityMosaicWelcome` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-identity-mosaic-welcome',
  standalone: true,
  templateUrl: './identity-mosaic-welcome.html',
  styleUrl: './identity-mosaic-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityMosaicWelcome extends WelcomeVariantBase {
  @Input({ required: true }) imw!: NonNullable<Lesson['identityMosaicWelcome']>;
}
