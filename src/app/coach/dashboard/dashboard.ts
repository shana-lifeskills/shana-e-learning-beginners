import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CoachService, TaskSubmission } from '../../core/services/coach.service';
import { StudentService } from '../../core/services/student.service';
import { TrainerService } from '../../core/services/trainer.service';
import { Coach, Student } from '../../core/models/user.model';

type DashboardTab = 'submissions' | 'progress';

interface StudentProgressRow {
  student: Student;
  progressPercent: number;
  stars: number;
  badges: number;
  trophies: number;
}

@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class CoachDashboard implements OnInit {
  private auth = inject(AuthService);
  private coachService = inject(CoachService);
  private studentService = inject(StudentService);
  private trainerService = inject(TrainerService);

  readonly coach = computed(() => this.auth.currentUser() as Coach);
  readonly tab = signal<DashboardTab>('submissions');
  readonly loading = signal(true);

  readonly submissions = signal<TaskSubmission[]>([]);
  readonly studentRows = signal<StudentProgressRow[]>([]);
  readonly totals = signal({ stars: 0, badges: 0, trophies: 0 });

  readonly awaitingReview = computed(() => this.submissions().filter((s) => s.status === 'pending').length);

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  ngOnInit(): void {
    this.coachService.listSubmissions().subscribe((submissions) => {
      this.submissions.set(submissions);
      this.loading.set(false);
    });
    this.coachService.getRewardTotalsAcrossAllStudents().subscribe((totals) => this.totals.set(totals));

    this.trainerService.getStudents().subscribe((students) => {
      const rows: StudentProgressRow[] = [];
      if (students.length === 0) {
        this.studentRows.set(rows);
        return;
      }
      students.forEach((student) => {
        this.studentService.getModulesForStudent(student.id).subscribe((modules) => {
          const progressPercent =
            modules.length === 0 ? 0 : Math.round(modules.reduce((sum, m) => sum + m.progressPercent, 0) / modules.length);
          this.studentService.getRewardTotals(student.id).subscribe((rewardTotals) => {
            rows.push({ student, progressPercent, ...rewardTotals });
            this.studentRows.set([...rows]);
          });
        });
      });
    });
  }

  setTab(tab: DashboardTab): void {
    this.tab.set(tab);
  }

  markReviewed(submission: TaskSubmission): void {
    this.coachService.markReviewed(submission.id).subscribe(() => {
      this.submissions.update((subs) =>
        subs.map((s) => (s.id === submission.id ? { ...s, status: 'reviewed', late: false } : s))
      );
    });
  }

  download(submission: TaskSubmission): void {
    this.coachService.downloadSubmissionFile(submission.id, submission.fileName);
  }

  statusLabel(submission: TaskSubmission): string {
    if (submission.status === 'reviewed') return 'reviewed';
    return submission.late ? 'late' : 'pending';
  }
}
