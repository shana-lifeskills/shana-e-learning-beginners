import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminPayment, PaymentStatus, TrainerService } from '../../core/services/trainer.service';

type StatusFilter = 'all' | PaymentStatus;

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payments-list.html',
  styleUrl: './payments-list.scss',
})
export class PaymentsList implements OnInit {
  private trainerService = inject(TrainerService);

  readonly payments = signal<AdminPayment[]>([]);
  readonly loading = signal(true);

  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly fromDate = signal('');
  readonly toDate = signal('');

  readonly filteredPayments = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    const from = this.fromDate() ? new Date(this.fromDate()) : null;
    const to = this.toDate() ? new Date(this.toDate() + 'T23:59:59') : null;

    return this.payments().filter((p) => {
      if (term) {
        const haystack = `${p.student?.firstName ?? ''} ${p.student?.lastName ?? ''} ${p.student?.email ?? ''} ${p.moduleTitle ?? ''} ${p.reference}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (status !== 'all' && p.status !== status) return false;
      if (from || to) {
        const created = new Date(p.createdAt);
        if (from && created < from) return false;
        if (to && created > to) return false;
      }
      return true;
    });
  });

  /** Revenue only ever counts successful payments — pending/failed never collected. */
  readonly totalRevenuePesewas = computed(() =>
    this.filteredPayments()
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + p.amountPesewas, 0)
  );

  readonly successCount = computed(() => this.filteredPayments().filter((p) => p.status === 'success').length);

  ngOnInit(): void {
    this.trainerService.getPayments().subscribe((payments) => {
      this.payments.set(payments);
      this.loading.set(false);
    });
  }

  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  setStatusFilter(value: StatusFilter): void {
    this.statusFilter.set(value);
  }

  updateFromDate(value: string): void {
    this.fromDate.set(value);
  }

  updateToDate(value: string): void {
    this.toDate.set(value);
  }

  amountLabel(payment: AdminPayment): string {
    return `${payment.currency} ${(payment.amountPesewas / 100).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
  }

  dateLabel(value: string | null): string {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  channelLabel(payment: AdminPayment): string {
    if (payment.channel === 'card') return 'Card / Paystack';
    const providerLabels: Record<string, string> = { mtn: 'MTN MoMo', vod: 'Telecel Cash', atl: 'AirtelTigo Money' };
    return providerLabels[payment.provider ?? ''] ?? 'Mobile Money';
  }
}
