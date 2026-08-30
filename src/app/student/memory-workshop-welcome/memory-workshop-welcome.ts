import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

/**
 * "Memory workshop" welcome layout — Thinking module, Week 3 ("Memory and
 * Recall"). A warm cream-to-rose page whose board shows two small diagrams of
 * the recall strategies: loose items dropping into labelled bins (grouping) and
 * one short string echoing around a loop arrow (repetition). Below sit an "Our
 * Objective" card and a row of "a strong memory…" cards. Purely presentational.
 */
@Component({
  selector: 'app-memory-workshop-welcome',
  standalone: true,
  templateUrl: './memory-workshop-welcome.html',
  styleUrl: './memory-workshop-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryWorkshopWelcome extends WelcomeVariantBase {
  @Input({ required: true }) mww!: NonNullable<Lesson['memoryWorkshopWelcome']>;

  /** Three fading echoes for the repetition panel. */
  readonly echoes = [0, 1, 2];
}
