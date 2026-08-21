import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidekickMood } from '../../../core/services/sidekick.service';

@Component({
  selector: 'app-bolt-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bolt-avatar.html',
  styleUrl: './bolt-avatar.scss',
})
export class BoltAvatar {
  readonly mood = input<SidekickMood>('happy');
  readonly size = input(96);

  readonly moodClass = computed(() => `mood-${this.mood()}`);
}
