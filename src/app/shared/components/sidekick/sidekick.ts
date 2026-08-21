import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidekickService } from '../../../core/services/sidekick.service';
import { BoltAvatar } from '../bolt-avatar/bolt-avatar';

@Component({
  selector: 'app-sidekick',
  standalone: true,
  imports: [CommonModule, BoltAvatar],
  templateUrl: './sidekick.html',
  styleUrl: './sidekick.scss',
})
export class Sidekick {
  constructor(public sidekick: SidekickService) {}

  readonly mood = computed(() => this.sidekick.state().mood);
  readonly message = computed(() => this.sidekick.state().message);
  readonly visible = computed(() => this.sidekick.state().visible);

  dismiss(): void {
    this.sidekick.hide();
  }
}
