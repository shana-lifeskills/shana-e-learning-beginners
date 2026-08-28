import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ExerciseOption, PrivacyMatchItem, PrivacyMatchStep } from '../../core/models/module.model';

@Component({
  selector: 'app-privacy-match-step-view',
  standalone: true,
  templateUrl: './privacy-match-step-view.html',
  styleUrl: './privacy-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyMatchStepView {
  readonly step = input.required<PrivacyMatchStep>();
  readonly continued = output<void>();

  /** Map of item id → the safe action id it was locked with. */
  readonly links = signal<Record<string, string>>({});
  /** Item id currently buzzing after an unsafe pick. */
  readonly buzzing = signal<string | null>(null);

  readonly lockedCount = computed(() => Object.keys(this.links()).length);
  readonly allLocked = computed(() => this.lockedCount() === this.step().items.length);

  isLocked(itemId: string): boolean {
    return itemId in this.links();
  }

  lockedActionText(itemId: string): string {
    const actionId = this.links()[itemId];
    return this.step().actions.find((a) => a.id === actionId)?.text ?? '';
  }

  private isCorrect(item: PrivacyMatchItem, actionId: string): boolean {
    return item.correctOptionId === actionId || (item.acceptableOptionIds?.includes(actionId) ?? false);
  }

  pick(item: PrivacyMatchItem, action: ExerciseOption): void {
    if (this.isLocked(item.id)) return;

    if (this.isCorrect(item, action.id)) {
      this.buzzing.set(null);
      this.links.update((map) => ({ ...map, [item.id]: action.id }));
      return;
    }

    this.buzzing.set(item.id);
  }

  finish(): void {
    if (this.allLocked()) this.continued.emit();
  }
}
