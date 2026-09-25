import { Component, computed, input } from '@angular/core';
import { AgeGroup } from '../../../core/models/user.model';

/** 'trainer' here is the existing Admin variant (module upload/assign);
 *  'coach' is the real Trainer role (assignments + progress review) — see
 *  the `Role` comment in user.model.ts for why the code names differ from
 *  the display text. */
export type HeroVariant = AgeGroup | 'trainer' | 'coach';

const HERO_IMAGE: Record<HeroVariant, string> = {
  beginner: '/assets/images/12-day-streak-img.png',
  advanced: '/assets/images/Advanced/signin-up-image.png',
  trainer: '/assets/images/trainers-signup.png',
  coach: '/assets/images/trainers-signup.png',
};

const PILL_TEXT: Record<HeroVariant, { streak: string; adventure: string }> = {
  beginner: { streak: '⭐ 12-day streak', adventure: '✨ New adventures' },
  advanced: { streak: '⭐ Keep your streak', adventure: '✨ New challenges' },
  trainer: { streak: '⭐ Learners progressing', adventure: '✨ Fresh ideas' },
  coach: { streak: '⭐ Students progressing', adventure: '✨ Assignments reviewed' },
};

const HERO_COPY: Record<HeroVariant, { tagline: string; headline: string }> = {
  beginner: { tagline: 'Learn • Create • Grow', headline: 'Big ideas start with a little curiosity.' },
  advanced: { tagline: 'Learn • Create • Grow', headline: 'Big ideas start with a little curiosity.' },
  trainer: { tagline: 'Teach • Inspire • Grow', headline: 'Great learning starts with a great guide.' },
  coach: { tagline: 'Guide • Review • Grow', headline: 'Great learning starts with a great trainer.' },
};

/** Full-bleed illustrated panel shown beside the auth forms (login, signup). */
@Component({
  selector: 'app-auth-hero',
  standalone: true,
  templateUrl: './auth-hero.html',
  styleUrl: './auth-hero.scss',
})
export class AuthHero {
  readonly variant = input<HeroVariant>('beginner');

  readonly heroImage = computed(() => HERO_IMAGE[this.variant()]);
  readonly streakPillText = computed(() => PILL_TEXT[this.variant()].streak);
  readonly adventurePillText = computed(() => PILL_TEXT[this.variant()].adventure);
  readonly tagline = computed(() => HERO_COPY[this.variant()].tagline);
  readonly headline = computed(() => HERO_COPY[this.variant()].headline);
}
