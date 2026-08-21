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

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RewardShelf, OllieMascot],
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

  /** Life-skills modules only (games live on their own page), grouped by curriculum track. */
  readonly tracks = computed(() => {
    const groups = new Map<string, ModuleWithProgress[]>();
    for (const module of this.modules()) {
      if (module.category !== 'life-skills') continue;
      const track = module.trackName ?? 'My Modules';
      groups.set(track, [...(groups.get(track) ?? []), module]);
    }
    return Array.from(groups, ([trackName, modules]) => ({ trackName, modules }));
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

  openModule(moduleId: string): void {
    this.router.navigate(['/student/module', moduleId]);
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
