import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type CheckoutStep = 'details' | 'processing' | 'success';

/**
 * Stands in for the real Paystack Inline/Popup checkout until that integration
 * is wired up. Mimics the look and step flow of a Paystack payment popup
 * (email → pay → processing → success) but never talks to a real gateway —
 * "success" just resolves after a short delay so the paid-account experience
 * can be built and demoed today.
 */
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-modal.html',
  styleUrl: './payment-modal.scss',
})
export class PaymentModal {
  readonly email = input.required<string>();
  readonly amountKobo = input(500000); // ₦5,000.00 placeholder course-access price
  readonly closed = output<void>();
  readonly paid = output<void>();

  readonly step = signal<CheckoutStep>('details');

  get amountNaira(): string {
    return (this.amountKobo() / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
  }

  close(): void {
    if (this.step() === 'processing') return;
    this.closed.emit();
  }

  pay(): void {
    this.step.set('processing');
    setTimeout(() => {
      this.step.set('success');
      setTimeout(() => this.paid.emit(), 900);
    }, 1400);
  }
}
