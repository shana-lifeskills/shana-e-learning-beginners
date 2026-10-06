import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { StudentService, RewardHighlights } from '../../core/services/student.service';
import { Student } from '../../core/models/user.model';
import { ModuleWithProgress } from '../../core/models/module.model';
import { RewardTotals } from '../../core/models/gamification.model';
import { PaymentModal } from '../../shared/components/payment-modal/payment-modal';
import { VerifyEmailBanner } from '../../shared/components/verify-email-banner/verify-email-banner';

@Component({
  selector: 'app-dashboard-advanced',
  standalone: true,
  imports: [CommonModule, RouterLink, PaymentModal, VerifyEmailBanner],
  templateUrl: './dashboard-advanced.html',
  styleUrl: './dashboard-advanced.scss',
})
export class DashboardAdvanced implements OnInit {
  private auth = inject(AuthService);
  private sidekick = inject(SidekickService);
  private studentService = inject(StudentService);
  private router = inject(Router);

  readonly student = computed(() => this.auth.currentUser() as Student);
  readonly modules = signal<ModuleWithProgress[]>([]);
  readonly totals = signal<RewardTotals>({ stars: 0, badges: 0, trophies: 0 });
  readonly highlights = signal<RewardHighlights>({ starsThisWeek: 0, badgesAlmostUnlocked: 0 });
  readonly loading = signal(true);
  /** The module a student just clicked "Pay to unlock" on — null when the modal is closed. */
  readonly payingModule = signal<ModuleWithProgress | null>(null);

  // No XP/leveling system exists yet for the advanced tier — these numbers
  // preview the target layout and will be replaced once that's built.
  readonly level = 7;
  readonly xpToNextLevel = 260;

  ngOnInit(): void {
    const student = this.student();
    if (!student) return;

    this.studentService.getModulesForStudent(student.id).subscribe((modules) => {
      this.modules.set(modules);
      this.loading.set(false);
    });
    this.studentService.getRewardTotals(student.id).subscribe((totals) => this.totals.set(totals));
    this.studentService.getRewardHighlights(student.id).subscribe((highlights) => this.highlights.set(highlights));
  }

  openModule(module: ModuleWithProgress): void {
    if (module.locked) {
      this.payingModule.set(module);
      return;
    }
    this.router.navigate(['/student/module', module.id]);
  }

  onPaymentSuccess(): void {
    const student = this.student();
    const module = this.payingModule();
    this.payingModule.set(null);
    this.studentService.getModulesForStudent(student.id).subscribe((modules) => this.modules.set(modules));
    this.sidekick.say(`"${module?.title}" is unlocked, ${student.firstName}! 🎉`, 'wave', 4000);
  }

  buttonLabel(module: ModuleWithProgress): string {
    if (module.status === 'completed') return 'Play again';
    if (module.status === 'in-progress') return 'Continue';
    return 'Start';
  }

  notifyComingSoon(): void {
    this.sidekick.say('That part is still on the way — check back soon!', 'wave', 4000);
  }
}
