import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-privacy-vault-welcome',
  standalone: true,
  templateUrl: './privacy-vault-welcome.html',
  styleUrl: './privacy-vault-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyVaultWelcome extends WelcomeVariantBase {
  @Input({ required: true }) pvw!: NonNullable<Lesson['privacyVaultWelcome']>;
}
