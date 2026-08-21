import { Component } from '@angular/core';
import { BrandLogo } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BrandLogo],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss',
})
export class AppFooter {
  readonly year = new Date().getFullYear();
}
