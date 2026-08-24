import { Component, computed, input, output, signal } from '@angular/core';
import { BelieveInYourselfChallengeStep } from '../../core/models/module.model';

@Component({
  selector: 'app-believe-in-yourself-challenge-step-view',
  standalone: true,
  templateUrl: './believe-in-yourself-challenge-step-view.html',
  styleUrl: './believe-in-yourself-challenge-step-view.scss',
})
export class BelieveInYourselfChallengeStepView {
  readonly step = input.required<BelieveInYourselfChallengeStep>();
  readonly submitted = output<Record<string, string>>();

  readonly completedDays = signal<Set<number>>(new Set());
  readonly quoteIndex = signal(0);
  readonly copied = signal(false);

  readonly days = computed(() => Array.from({ length: this.step().totalDays }, (_, i) => i));
  readonly completedCount = computed(() => this.completedDays().size);
  readonly canComplete = computed(() => this.completedCount() > 0);
  readonly currentQuote = computed(() => this.step().confidenceQuotes[this.quoteIndex()] ?? '');

  isDayDone(day: number): boolean {
    return this.completedDays().has(day);
  }

  toggleDay(day: number): void {
    this.completedDays.update((days) => {
      const next = new Set(days);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  }

  nextQuote(): void {
    const total = this.step().confidenceQuotes.length;
    if (total <= 1) return;
    this.quoteIndex.update((i) => (i + 1) % total);
  }

  async share(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.currentQuote());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard access can be unavailable (permissions, insecure context) — fail silently.
    }
  }

  complete(): void {
    if (!this.canComplete()) return;
    this.submitted.emit({ daysCompleted: String(this.completedCount()) });
  }
}
