import { Component, input } from '@angular/core';

/** The Shana Lifeskills Centre logo mark, used anywhere the brand appears. */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.scss',
})
export class BrandLogo {
  /** Rendered height in px — width scales automatically to the logo's natural aspect ratio. */
  readonly size = input(32);
}
