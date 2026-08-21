import { Component, input } from '@angular/core';

/** Ollie the owl — the app's learning companion, shown at key celebration/guidance moments. */
@Component({
  selector: 'app-ollie-mascot',
  standalone: true,
  templateUrl: './ollie-mascot.html',
  styleUrl: './ollie-mascot.scss',
})
export class OllieMascot {
  readonly size = input(96);
}
