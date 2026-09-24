import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoachService, Task, TaskSubmission } from '../../core/services/coach.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coachService = inject(CoachService);

  readonly task = signal<Task | null>(null);
  readonly submissions = signal<TaskSubmission[]>([]);
  readonly loading = signal(true);

  readonly reviewedCount = computed(() => this.submissions().filter((s) => s.status === 'reviewed').length);

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) return;

    this.coachService.getTask(taskId).subscribe((task) => {
      if (!task) {
        this.router.navigate(['/coach/assignments']);
        return;
      }
      this.task.set(task);

      this.coachService.listSubmissions().subscribe((allSubmissions) => {
        this.submissions.set(allSubmissions.filter((s) => s.taskId === taskId));
        this.loading.set(false);
      });
    });
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
