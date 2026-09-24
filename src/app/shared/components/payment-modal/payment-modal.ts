import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

declare global {
  interface Window {
    PaystackPop?: { setup(options: PaystackSetupOptions): { openIframe(): void } };
  }
}

interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number;
  ref: string;
  currency?: string;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

interface InitializeResponse {
  reference: string;
  amountPesewas: number;
  publicKey?: string;
}

interface MobileMoneyResponse {
  reference: string;
  status: 'success' | 'send_otp' | 'pay_offline';
  displayText?: string;
  hasPaid?: boolean;
}

/** Paystack's Ghana mobile money provider codes — 'vod' is still Paystack's
 *  code for what's branded Telecel Cash today (legacy Vodafone Cash code). */
type MomoProvider = 'mtn' | 'vod' | 'atl';

const MOMO_PROVIDER_LABELS: Record<MomoProvider, string> = {
  mtn: 'MTN Mobile Money',
  vod: 'Telecel Cash',
  atl: 'AirtelTigo Money',
};

type CheckoutStep = 'method' | 'card' | 'mock-card' | 'phone' | 'otp' | 'awaiting-approval' | 'processing' | 'success' | 'error';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20; // ~1 minute

let inlineScriptPromise: Promise<void> | null = null;

/** Lazily loads Paystack's Inline checkout script once per page load. */
function loadPaystackInline(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  if (!inlineScriptPromise) {
    inlineScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Could not load the Paystack checkout script.'));
      document.head.appendChild(script);
    });
  }
  return inlineScriptPromise;
}

/**
 * Real checkout, five ways — Card and Paystack both open Paystack Inline
 * (Popup): the backend creates the transaction and hands back a reference +
 * public key, Paystack's own hosted UI collects payment details (this app
 * never sees card numbers), while MTN / Telecel / AirtelTigo go through
 * Paystack's Charge API directly — the backend starts the charge and either
 * gets an immediate result, a one-time code to collect, or an instruction to
 * approve a prompt on the customer's own phone. Either way, the backend
 * independently verifies the result with Paystack before entitlement is
 * granted — "success" here always reflects a real, server-confirmed payment.
 */
@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-modal.html',
  styleUrl: './payment-modal.scss',
})
export class PaymentModal {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/payments`;

  readonly email = input.required<string>();
  readonly closed = output<void>();
  readonly paid = output<void>();

  readonly step = signal<CheckoutStep>('method');
  readonly amountCedisDisplay = signal('399.00'); // placeholder until the backend confirms the real price
  readonly errorMessage = signal('');

  readonly momoProviders = MOMO_PROVIDER_LABELS;
  readonly selectedProvider = signal<MomoProvider | null>(null);
  readonly phoneNumber = signal('');
  readonly otpCode = signal('');
  readonly momoDisplayText = signal('');
  private readonly failedLogos = signal<Set<string>>(new Set());

  readonly mockCardNumber = signal('');
  readonly mockCardExpiry = signal('');
  readonly mockCardCvv = signal('');

  private momoReference: string | null = null;
  private mockCardReference: string | null = null;
  private pollTimeoutId: ReturnType<typeof setTimeout> | null = null;

  close(): void {
    if (this.step() === 'processing') return;
    this.stopPolling();
    this.closed.emit();
  }

  retry(): void {
    this.stopPolling();
    this.step.set('method');
    this.selectedProvider.set(null);
    this.errorMessage.set('');
    this.mockCardReference = null;
  }

  /** "Card" jumps straight to Paystack's real, standard card-entry checkout —
   *  no middle confirmation screen. */
  chooseCard(): void {
    this.pay();
  }

  /** "Paystack" — the generic Paystack checkout option — shows the amount/email
   *  confirmation screen first, then opens the same real Paystack popup. */
  choosePaystackCheckout(): void {
    this.step.set('card');
  }

  logoFailed(key: string): boolean {
    return this.failedLogos().has(key);
  }

  onLogoError(key: string): void {
    this.failedLogos.update((set) => new Set(set).add(key));
  }

  chooseMomo(provider: MomoProvider): void {
    this.selectedProvider.set(provider);
    this.phoneNumber.set('');
    this.step.set('phone');
  }

  backToMethods(): void {
    this.step.set('method');
  }

  updatePhone(value: string): void {
    this.phoneNumber.set(value);
  }

  updateOtp(value: string): void {
    this.otpCode.set(value);
  }

  /** Card checkout — Paystack Inline (Popup), or our own mock card-details
   *  form while demo/placeholder Paystack keys are in place (Paystack's real
   *  popup would reject a dummy key immediately, before any card details are
   *  even shown, so it can't stand in for that UI itself). */
  pay(): void {
    this.step.set('processing');

    this.http
      .post<InitializeResponse>(`${this.apiUrl}/initialize`, {}, { withCredentials: true })
      .pipe(
        switchMap((init) => {
          this.amountCedisDisplay.set((init.amountPesewas / 100).toLocaleString('en-GH', { minimumFractionDigits: 2 }));
          if (!init.publicKey) return of(init);
          return loadPaystackInline().then(() => init);
        }),
        catchError((err) => {
          this.fail(err?.error?.message ?? 'Could not start checkout. Please try again.');
          return of(null);
        })
      )
      .subscribe((init) => {
        if (!init) return;
        if (!init.publicKey) {
          // TEMPORARY DEMO BYPASS: no real Paystack public key configured yet.
          // Collect (fake) card details in our own form first, then verify —
          // remove this branch once real Paystack keys are in place.
          this.mockCardReference = init.reference;
          this.mockCardNumber.set('');
          this.mockCardExpiry.set('');
          this.mockCardCvv.set('');
          this.step.set('mock-card');
          return;
        }
        if (!window.PaystackPop) {
          this.fail('Could not load the Paystack checkout script.');
          return;
        }

        window.PaystackPop.setup({
          key: init.publicKey,
          email: this.email(),
          amount: init.amountPesewas,
          ref: init.reference,
          currency: 'GHS',
          callback: (response) => this.verify(response.reference),
          onClose: () => {
            if (this.step() === 'processing') this.step.set('card');
          },
        }).openIframe();
      });
  }

  updateMockCardNumber(value: string): void {
    this.mockCardNumber.set(value);
  }

  updateMockCardExpiry(value: string): void {
    this.mockCardExpiry.set(value);
  }

  updateMockCardCvv(value: string): void {
    this.mockCardCvv.set(value);
  }

  submitMockCard(): void {
    if (!this.mockCardReference) return;
    this.verify(this.mockCardReference);
  }

  /** Mobile money checkout — Paystack Charge API. */
  payWithMomo(): void {
    const provider = this.selectedProvider();
    if (!provider) return;

    this.step.set('processing');
    this.http
      .post<MobileMoneyResponse>(
        `${this.apiUrl}/mobile-money/initiate`,
        { phone: this.phoneNumber().trim(), provider },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          this.fail(err?.error?.message ?? 'Could not start the mobile money payment.');
          return of(null);
        })
      )
      .subscribe((result) => {
        if (!result) return;
        this.momoReference = result.reference;

        if (result.status === 'success' || result.hasPaid) {
          this.step.set('success');
          setTimeout(() => this.paid.emit(), 900);
          return;
        }
        if (result.status === 'send_otp') {
          this.momoDisplayText.set(result.displayText ?? 'Enter the one-time code sent to your phone.');
          this.otpCode.set('');
          this.step.set('otp');
          return;
        }
        // 'pay_offline'
        this.momoDisplayText.set(result.displayText ?? 'Approve the payment prompt on your phone.');
        this.step.set('awaiting-approval');
        this.startPolling(1);
      });
  }

  submitOtp(): void {
    if (!this.momoReference) return;
    this.step.set('processing');

    this.http
      .post<{ hasPaid: boolean }>(
        `${this.apiUrl}/mobile-money/submit-otp`,
        { reference: this.momoReference, otp: this.otpCode().trim() },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          this.fail(err?.error?.message ?? "That code didn't work — please try again.");
          return of(null);
        })
      )
      .subscribe((result) => {
        if (!result?.hasPaid) return;
        this.step.set('success');
        setTimeout(() => this.paid.emit(), 900);
      });
  }

  /** Polls /verify for a `pay_offline` charge until the customer approves it
   *  on their phone (or the reference times out) — same endpoint card
   *  checkout uses, since Paystack's verify covers Charge API transactions too. */
  private startPolling(attempt: number): void {
    if (!this.momoReference) return;

    this.pollTimeoutId = setTimeout(() => {
      if (!this.momoReference) return;

      this.http
        .post<{ hasPaid: boolean }>(`${this.apiUrl}/verify`, { reference: this.momoReference }, { withCredentials: true })
        .pipe(catchError(() => of(null))) // not approved yet (or still pending) — keep polling silently
        .subscribe((result) => {
          if (result?.hasPaid) {
            this.step.set('success');
            setTimeout(() => this.paid.emit(), 900);
            return;
          }
          if (attempt >= MAX_POLL_ATTEMPTS) {
            this.fail("We haven't seen your approval yet. Check your phone, then try again.");
            return;
          }
          this.startPolling(attempt + 1);
        });
    }, POLL_INTERVAL_MS);
  }

  private stopPolling(): void {
    if (this.pollTimeoutId) {
      clearTimeout(this.pollTimeoutId);
      this.pollTimeoutId = null;
    }
  }

  private verify(reference: string): void {
    this.step.set('processing');
    this.http
      .post<{ hasPaid: boolean }>(`${this.apiUrl}/verify`, { reference }, { withCredentials: true })
      .pipe(
        catchError((err) => {
          this.fail(err?.error?.message ?? 'We could not confirm your payment. Please contact support.');
          return of(null);
        })
      )
      .subscribe((result) => {
        if (!result?.hasPaid) return;
        this.step.set('success');
        setTimeout(() => this.paid.emit(), 900);
      });
  }

  private fail(message: string): void {
    this.stopPolling();
    this.errorMessage.set(message);
    this.step.set('error');
  }
}
