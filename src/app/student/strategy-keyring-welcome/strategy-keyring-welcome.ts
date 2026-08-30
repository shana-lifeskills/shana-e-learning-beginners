import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, StrategyKey } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

interface FannedKey {
  key: StrategyKey;
  /** Rotation of the key around the ring, in degrees (0 = pointing down). */
  angle: number;
  /** Staggered swing-in delay, in seconds. */
  delay: number;
}

@Component({
  selector: 'app-strategy-keyring-welcome',
  standalone: true,
  templateUrl: './strategy-keyring-welcome.html',
  styleUrl: './strategy-keyring-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyKeyringWelcome extends WelcomeVariantBase {
  @Input({ required: true }) skr!: NonNullable<Lesson['strategyKeyringWelcome']>;

  /** Keys fan out across a 150° arc below the ring, each hanging at its own angle. */
  get fannedKeys(): FannedKey[] {
    const keys = this.skr.keys;
    const count = keys.length;
    if (!count) return [];
    const spread = 30;
    const start = -spread / 2;
    const stepDeg = count > 1 ? spread / (count - 1) : 0;
    return keys.map((key, i) => ({
      key,
      angle: start + i * stepDeg,
      delay: 0.25 + i * 0.12,
    }));
  }
}
