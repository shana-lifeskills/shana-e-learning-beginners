import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TrainerService } from '../../core/services/trainer.service';
import { ModuleService } from '../../core/services/module.service';
import { Trainer } from '../../core/models/user.model';
import { Student } from '../../core/models/user.model';
import { Module } from '../../core/models/module.model';
import { VerifyEmailBanner } from '../../shared/components/verify-email-banner/verify-email-banner';
import { AnalyticsOverview } from '../../shared/components/analytics-overview/analytics-overview';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, VerifyEmailBanner, AnalyticsOverview],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class TrainerDashboard implements OnInit {
  private auth = inject(AuthService);
  private trainerService = inject(TrainerService);
  private moduleService = inject(ModuleService);

  readonly trainer = computed(() => this.auth.currentUser() as Trainer);
  // Only the count is used here now — the full list, with search/filters,
  // lives on its own page at /admin/students.
  readonly students = signal<Student[]>([]);
  readonly modules = signal<Module[]>([]);
  // Only the count is used here too — the full ledger, with filters, lives
  // on its own page at /admin/payments.
  readonly successfulPaymentCount = signal(0);

  ngOnInit(): void {
    const trainer = this.trainer();
    if (!trainer) return;

    this.trainerService.getStudents().subscribe((students) => this.students.set(students));
    // Every admin sees the full shared module catalog now (not just what they
    // personally authored) — there's a single flat admin role managing one
    // shared catalog, so per-creator filtering no longer applies.
    this.moduleService.getAllModules().subscribe((modules) => this.modules.set(modules));
    this.trainerService.getPayments().subscribe((payments) => {
      this.successfulPaymentCount.set(payments.filter((p) => p.status === 'success').length);
    });
  }
}
