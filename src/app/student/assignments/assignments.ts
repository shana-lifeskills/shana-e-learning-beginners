import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CoachService, MySubmission, Task } from '../../core/services/coach.service';
import { Student } from '../../core/models/user.model';

interface TaskRow {
  task: Task;
  submission: MySubmission | null;
}

@Component({
  selector: 'app-student-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class StudentAssignments implements OnInit {
  private auth = inject(AuthService);
  private coachService = inject(CoachService);

  readonly loading = signal(true);
  readonly rows = signal<TaskRow[]>([]);
  readonly uploadingTaskId = signal<string | null>(null);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    const student = this.auth.currentUser() as Student;
    if (!student) return;

    this.coachService.listTasksForAgeGroup(student.ageGroup).subscribe((tasks) => {
      this.coachService.listMySubmissions().subscribe((submissions) => {
        const rows: TaskRow[] = tasks
          .map((task) => ({
            task,
            submission: submissions.find((s) => s.taskId === task.id) ?? null,
          }))
          .sort((a, b) => new Date(b.task.createdAt).getTime() - new Date(a.task.createdAt).getTime());
        this.rows.set(rows);
        this.loading.set(false);
      });
    });
  }

  onFileSelected(taskId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.errorMessage.set('');
    this.uploadingTaskId.set(taskId);

    this.coachService.submitTask(taskId, file).subscribe({
      next: (submission) => {
        this.uploadingTaskId.set(null);
        input.value = '';
        this.rows.update((rows) => rows.map((row) => (row.task.id === taskId ? { ...row, submission } : row)));
      },
      error: () => {
        this.uploadingTaskId.set(null);
        input.value = '';
        this.errorMessage.set("That file didn't upload — try again.");
      },
    });
  }

  isOverdue(task: Task): boolean {
    return !!task.dueAt && new Date(task.dueAt).getTime() < Date.now();
  }
}
