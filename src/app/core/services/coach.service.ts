import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgeGroup } from '../models/user.model';

export interface Task {
  id: string;
  title: string;
  instructions: string | null;
  ageGroup: AgeGroup;
  dueAt: string | null;
  createdByUserId: string;
  createdAt: string;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  studentId: string;
  studentName: string;
  fileName: string;
  fileSize: number;
  submittedAt: string;
  status: 'pending' | 'reviewed';
  late: boolean;
  reviewedAt: string | null;
}

export interface MySubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  fileName: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
}

export interface NewTask {
  title: string;
  instructions?: string;
  ageGroup: AgeGroup;
  dueAt?: string;
}

/** Talks to the backend's /api/tasks/* (file-upload "assignments") and the
 *  cross-student reward totals used by the trainer dashboard's stat cards. */
@Injectable({ providedIn: 'root' })
export class CoachService {
  private http = inject(HttpClient);
  private readonly tasksUrl = `${environment.apiUrl}/tasks`;
  private readonly progressUrl = `${environment.apiUrl}/progress`;

  createTask(task: NewTask): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, { withCredentials: true });
  }

  /** Every trainer/admin sees every task — same shared-catalog precedent as modules. */
  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl, { withCredentials: true });
  }

  /** No single-task backend route exists (tasks are a small shared list, same
   *  precedent as modules) — find it client-side from the full list. */
  getTask(taskId: string): Observable<Task | undefined> {
    return this.listTasks().pipe(map((tasks) => tasks.find((t) => t.id === taskId)));
  }

  listSubmissions(): Observable<TaskSubmission[]> {
    return this.http.get<TaskSubmission[]>(`${this.tasksUrl}/submissions`, { withCredentials: true });
  }

  markReviewed(submissionId: string): Observable<TaskSubmission> {
    return this.http.put<TaskSubmission>(`${this.tasksUrl}/submissions/${submissionId}/review`, {}, { withCredentials: true });
  }

  /** The download route requires the auth header, which a plain <a href> link
   *  can't send — fetch it as a blob and trigger a save via an object URL. */
  downloadSubmissionFile(submissionId: string, fileName: string): void {
    this.http
      .get(`${this.tasksUrl}/submissions/${submissionId}/file`, { withCredentials: true, responseType: 'blob' })
      .subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
      });
  }

  getRewardTotalsAcrossAllStudents(): Observable<{ stars: number; badges: number; trophies: number }> {
    return this.http.get<{ stars: number; badges: number; trophies: number }>(`${this.progressUrl}/rewards/totals-all`, {
      withCredentials: true,
    });
  }

  // --- Student-facing (used by StudentAssignments) ---

  listTasksForAgeGroup(ageGroup: AgeGroup): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl, { params: { ageGroup }, withCredentials: true });
  }

  listMySubmissions(): Observable<MySubmission[]> {
    return this.http.get<MySubmission[]>(`${this.tasksUrl}/submissions/mine`, { withCredentials: true });
  }

  submitTask(taskId: string, file: File): Observable<MySubmission> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MySubmission>(`${this.tasksUrl}/${taskId}/submissions`, formData, { withCredentials: true });
  }
}
