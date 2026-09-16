import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { LateProjectStoryStep } from '../../core/models/module.model';

/**
 * "The Late Project" picture story (Planning Module — Advanced, Week 1). A
 * storyboard the learner steps through one panel at a time: a big emoji scene,
 * a caption, and a mood tint that shifts from anxious to calm as Nana turns
 * things around. Continue is always available — see `LateProjectStoryStep` in
 * `module.model.ts`.
 */
@Component({
  selector: 'app-late-project-story-step-view',
  standalone: true,
  templateUrl: './late-project-story-step-view.html',
  styleUrl: './late-project-story-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LateProjectStoryStepView {
  readonly step = input.required<LateProjectStoryStep>();
  readonly continued = output<void>();

  readonly index = signal(0);

  readonly total = computed(() => this.step().panels.length);
  readonly panel = computed(() => this.step().panels[this.index()] ?? null);
  readonly isFirst = computed(() => this.index() === 0);
  readonly isLast = computed(() => this.index() === this.total() - 1);

  prev(): void {
    if (!this.isFirst()) this.index.update((i) => i - 1);
  }

  next(): void {
    if (!this.isLast()) this.index.update((i) => i + 1);
  }

  go(i: number): void {
    this.index.set(i);
  }

  finish(): void {
    this.continued.emit();
  }
}
