import { Component, input } from '@angular/core';

@Component({
  selector: 'app-friendly-alert',
  standalone: true,
  templateUrl: './friendly-alert.html',
  styleUrl: './friendly-alert.scss',
})
export class FriendlyAlert {
  readonly message = input.required<string>();
  readonly icon = input('💛');
}
