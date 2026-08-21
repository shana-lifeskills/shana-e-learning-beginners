import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { WarmupScenarioStep } from '../../core/models/module.model';

@Component({
  selector: 'app-warmup-scenario-step-view',
  standalone: true,
  templateUrl: './warmup-scenario-step-view.html',
  styleUrl: './warmup-scenario-step-view.scss',
})
export class WarmupScenarioStepView {
  readonly step = input.required<WarmupScenarioStep>();
  readonly continued = output<void>();

  private readonly destroyRef = inject(DestroyRef);

  readonly activeIndex = signal(0);
  /** scenarioId -> selected option id, so a scenario re-shows its pick when the student goes back. */
  readonly answers = signal<Record<string, string>>({});
  private readonly startedAt = Date.now();
  readonly elapsedSeconds = signal(0);
  private readonly timer = setInterval(() => this.elapsedSeconds.set(Math.floor((Date.now() - this.startedAt) / 1000)), 1000);

  constructor() {
    this.destroyRef.onDestroy(() => clearInterval(this.timer));
  }

  readonly total = computed(() => this.step().scenarios.length);
  readonly currentScenario = computed(() => this.step().scenarios[this.activeIndex()] ?? null);
  readonly isLast = computed(() => this.activeIndex() === this.total() - 1);
  readonly progressPercent = computed(() => Math.round(((this.activeIndex() + 1) / this.total()) * 100));

  readonly formattedTime = computed(() => {
    const total = this.elapsedSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  selectOption(scenarioId: string, optionId: string): void {
    this.answers.update((draft) => ({ ...draft, [scenarioId]: optionId }));
  }

  isSelected(scenarioId: string, optionId: string): boolean {
    return this.answers()[scenarioId] === optionId;
  }

  previous(): void {
    if (this.activeIndex() === 0) return;
    this.activeIndex.update((i) => i - 1);
  }

  next(): void {
    const scenario = this.currentScenario();
    if (!scenario || !this.answers()[scenario.id]) return;

    if (this.isLast()) {
      clearInterval(this.timer);
      this.continued.emit();
      return;
    }

    this.activeIndex.update((i) => i + 1);
  }
}
