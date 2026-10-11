import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StudentService, RewardHighlights } from '../../core/services/student.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { Student } from '../../core/models/user.model';
import { ModuleWithProgress } from '../../core/models/module.model';
import { RewardTotals } from '../../core/models/gamification.model';
import { RewardShelf } from '../../shared/components/reward-shelf/reward-shelf';
import { OllieMascot } from '../../shared/components/ollie-mascot/ollie-mascot';
import { PaymentModal } from '../../shared/components/payment-modal/payment-modal';
import { VerifyEmailBanner } from '../../shared/components/verify-email-banner/verify-email-banner';
import { levelIndexOf } from '../../core/services/levels';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RewardShelf, OllieMascot, PaymentModal, VerifyEmailBanner],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private auth = inject(AuthService);
  private studentService = inject(StudentService);
  private sidekick = inject(SidekickService);
  private router = inject(Router);

  readonly student = computed(() => this.auth.currentUser() as Student);
  readonly modules = signal<ModuleWithProgress[]>([]);
  readonly totals = signal<RewardTotals>({ stars: 0, badges: 0, trophies: 0 });
  readonly highlights = signal<RewardHighlights>({ starsThisWeek: 0, badgesAlmostUnlocked: 0 });
  readonly showWelcome = signal(false);
  readonly loading = signal(true);
  /** The module a student just clicked "Pay to unlock" on — null when the modal is closed. */
  readonly payingModule = signal<ModuleWithProgress | null>(null);

  /** Other modules in the clicked module's Level that are payment-locked
   *  (not Level-locked) — the pool a bundle purchase can pick its other
   *  modules from, since bundling in a still-Level-locked module would be
   *  useless (it'd stay locked regardless). */
  readonly bundleCandidates = computed(() => {
    const module = this.payingModule();
    if (!module) return [];
    return this.modules()
      .filter((m) => m.id !== module.id && m.trackName === module.trackName && m.lockReason === 'payment')
      .map((m) => ({ id: m.id, title: m.title }));
  });

  /** Life-skills modules only (games live on their own page), grouped by
   *  curriculum track and sorted into Level order (untracked modules sort
   *  last — they're not part of the Level sequence). */
  readonly tracks = computed(() => {
    const groups = new Map<string, ModuleWithProgress[]>();
    for (const module of this.modules()) {
      if (module.category !== 'life-skills') continue;
      const track = module.trackName ?? 'My Modules';
      groups.set(track, [...(groups.get(track) ?? []), module]);
    }
    return Array.from(groups, ([trackName, modules]) => ({
      trackName,
      modules,
      levelNumber: levelIndexOf(trackName) + 1,
    })).sort((a, b) => {
      if (a.levelNumber <= 0) return 1;
      if (b.levelNumber <= 0) return -1;
      return a.levelNumber - b.levelNumber;
    });
  });

  ngOnInit(): void {
    const student = this.student();
    if (!student) return;

    this.studentService.getModulesForStudent(student.id).subscribe((modules) => {
      this.modules.set(modules);
      this.loading.set(false);
    });
    this.studentService.getRewardTotals(student.id).subscribe((totals) => this.totals.set(totals));
    this.studentService.getRewardHighlights(student.id).subscribe((highlights) => this.highlights.set(highlights));

    if (!student.hasSeenWelcome) {
      this.showWelcome.set(true);
    } else {
      this.sidekick.say(`Welcome back, ${student.firstName}! Ready to learn something fun?`, 'wave', 4000);
    }
  }

  dismissWelcome(): void {
    const student = this.student();
    this.showWelcome.set(false);
    this.auth.markWelcomeSeen(student.id);
    this.sidekick.say(`Let's explore your modules, ${student.firstName}!`, 'wave', 4000);
  }

  openModule(module: ModuleWithProgress): void {
    if (module.lockReason === 'level') {
      const levelNumber = levelIndexOf(module.trackName); // previous Level's 1-based number
      this.sidekick.say(
        `Finish Level ${levelNumber} before starting "${module.title}" — you're almost there!`,
        'wave',
        4000
      );
      return;
    }
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
    if (module.status === 'completed') return 'Play Again';
    if (module.status === 'in-progress') return 'Continue';
    return 'Start';
  }

  greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
