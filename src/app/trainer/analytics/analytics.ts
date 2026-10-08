import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService, PaymentStatusBreakdown } from '../../core/services/analytics.service';
import { RevenueLineChart, RevenuePoint } from '../../shared/components/revenue-line-chart/revenue-line-chart';
import { BarChartRow, HorizontalBarChart } from '../../shared/components/horizontal-bar-chart/horizontal-bar-chart';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink, RevenueLineChart, HorizontalBarChart],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
  private analyticsService = inject(AnalyticsService);

  readonly loading = signal(true);

  readonly revenuePoints = signal<RevenuePoint[]>([]);
  readonly totalRevenuePesewas = signal(0);
  readonly paymentsByModuleRows = signal<BarChartRow[]>([]);
  readonly moduleCompletionRows = signal<BarChartRow[]>([]);
  readonly paymentStatus = signal<PaymentStatusBreakdown>({ paidStudentCount: 0, unpaidStudentCount: 0, totalStudentCount: 0 });

  /** Status-pair colors (not the app's brand categorical hues — those don't
   *  pass the dataviz skill's CVD check together): paid reads as "good",
   *  unpaid as "still pending", a real status encoding, not a series choice. */
  readonly paidColor = '#0ca30c';
  readonly unpaidColor = '#fab219';

  readonly paidPercent = computed(() => {
    const s = this.paymentStatus();
    return s.totalStudentCount === 0 ? 0 : Math.round((s.paidStudentCount / s.totalStudentCount) * 100);
  });

  ngOnInit(): void {
    this.analyticsService.revenueOverTime(30).subscribe((res) => {
      this.revenuePoints.set(res.days);
      this.totalRevenuePesewas.set(res.totalRevenuePesewas);
      this.loading.set(false);
    });

    this.analyticsService.paymentsByModule().subscribe((rows) => {
      this.paymentsByModuleRows.set(
        rows.map((r) => ({
          label: r.moduleTitle,
          value: r.revenuePesewas,
          displayValue: `GHS ${(r.revenuePesewas / 100).toLocaleString('en-GH', { minimumFractionDigits: 0 })}`,
        }))
      );
    });

    this.analyticsService.moduleCompletion().subscribe((rows) => {
      this.moduleCompletionRows.set(
        rows.map((r) => ({
          label: r.moduleTitle,
          value: r.completionRate,
          displayValue: `${r.completionRate}% (${r.completedCount}/${r.startedCount})`,
        }))
      );
    });

    this.analyticsService.paymentStatus().subscribe((status) => this.paymentStatus.set(status));
  }

  totalRevenueLabel(): string {
    return `GHS ${(this.totalRevenuePesewas() / 100).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
  }
}
