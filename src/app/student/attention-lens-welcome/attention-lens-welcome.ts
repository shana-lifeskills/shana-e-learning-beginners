import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Attention lens" welcome layout — Thinking module, Week 1 ("Paying
 * Attention"). A deep-violet page with a week pill and two-tone title, then a
 * decorative scene: a large round magnifying lens throws a bright spotlight over
 * a cluster of small details that read sharp and labelled inside the glass,
 * while distraction icons drift dim and blurred around the edges. Below sit an
 * "Our Objective" card and a row of "sharp focus looks like…" cards, then a
 * start button and a footer note. Purely presentational.
 */
@Component({
  selector: 'app-attention-lens-welcome',
  standalone: true,
  templateUrl: './attention-lens-welcome.html',
  styleUrl: './attention-lens-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttentionLensWelcome extends WelcomeVariantBase {
  @Input({ required: true }) alw!: NonNullable<Lesson['attentionLensWelcome']>;

  /** Distraction chips spread evenly around the lens on a circle just outside the glass. */
  get scatteredDistractions(): { item: { icon: string; label: string }; x: number; y: number }[] {
    const items = this.alw.distractionItems;
    const count = items.length;
    return items.map((item, i) => {
      // Start at the top and step clockwise; nudge off dead-centre so labels clear the lens.
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(count, 1) + 0.25;
      return {
        item,
        x: 50 + Math.cos(angle) * 54,
        y: 50 + Math.sin(angle) * 54,
      };
    });
  }
}
