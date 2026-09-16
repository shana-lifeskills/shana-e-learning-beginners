import { Component, computed, input, output, signal } from '@angular/core';
import { PassTheDreamWarmupStep } from '../../core/models/module.model';

@Component({
  selector: 'app-pass-the-dream-warmup-step-view',
  standalone: true,
  templateUrl: './pass-the-dream-warmup-step-view.html',
  styleUrl: './pass-the-dream-warmup-step-view.scss',
})
export class PassTheDreamWarmupStepView {
  readonly step = input.required<PassTheDreamWarmupStep>();
  readonly submitted = output<Record<string, string>>();
  readonly continued = output<void>();

  readonly dream = signal('');
  /** Which friend the ball is being tossed to next; equals friends.length once it's been all the way round. */
  readonly tossIndex = signal(0);
  readonly shareText = signal('');
  readonly posted = signal(false);

  readonly tossedAll = computed(() => this.tossIndex() >= this.step().friends.length);
  readonly currentFriend = computed(() => this.step().friends[this.tossIndex()] ?? null);
  readonly canToss = computed(() => this.dream().trim().length > 0 && !this.tossedAll());
  readonly canShare = computed(() => this.shareText().trim().length > 0);
  readonly canFinish = computed(() => this.tossedAll() && this.posted());

  setDream(value: string): void {
    this.dream.set(value);
  }

  pickChip(label: string): void {
    this.dream.set(label);
  }

  toss(): void {
    if (!this.canToss()) return;
    this.tossIndex.update((i) => i + 1);
  }

  setShareText(value: string): void {
    this.shareText.set(value);
  }

  share(): void {
    if (!this.canShare() || this.posted()) return;
    this.posted.set(true);
    this.submitted.emit({ dream: this.dream().trim(), proudMoment: this.shareText().trim() });
  }

  finish(): void {
    this.continued.emit();
  }
}
