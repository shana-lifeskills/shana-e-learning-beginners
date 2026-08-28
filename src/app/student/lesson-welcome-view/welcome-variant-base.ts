import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../core/models/module.model';

/**
 * Shared plumbing for the lesson-welcome layout variants.
 *
 * Each variant is a small presentational component that renders one module's
 * bespoke welcome screen. They were split out of `ModulePlayer` (whose
 * `module-player.scss` had grown past the Angular style budget) — the templates
 * are the original markup verbatim, so these pass-through methods keep the same
 * names the markup already called (`beginLesson()`, `isCompletedLessonWelcome()`
 * …) and simply forward to `@Output`s that `LessonWelcomeView` wires back to
 * `ModulePlayer`.
 */
@Directive()
export abstract class WelcomeVariantBase {
  /** True when this welcome screen is for a week the student has already finished. */
  @Input() completed = false;
  /** The lesson the "Continue to Week N" button will open, if any. */
  @Input() next: Lesson | null = null;
  /** The student's first name — used by the layouts with a personalised greeting. */
  @Input() firstName = '';

  @Output() begin = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();
  @Output() backToModules = new EventEmitter<void>();

  isCompletedLessonWelcome(): boolean {
    return this.completed;
  }

  nextLesson(): Lesson | null {
    return this.next;
  }

  beginLesson(): void {
    this.begin.emit();
  }

  continueToNextLesson(): void {
    this.proceed.emit();
  }

  backToMap(): void {
    this.backToModules.emit();
  }

  /** Mirrors `ModulePlayer.student()` for the greeting layouts — only `firstName` is referenced. */
  student(): { firstName: string } {
    return { firstName: this.firstName };
  }
}
