import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../models/user.model';
import { BackendUser } from './auth.service';

/** One row of GET /api/students — a backend user plus the modules assigned to them. */
type BackendStudent = BackendUser & { assignedModuleIds: string[] };

/** Maps a backend student to the app's Student shape. */
export function toStudent(s: BackendStudent): Student {
  return {
    id: s.id,
    email: s.email,
    firstName: s.firstName,
    lastName: s.lastName,
    role: 'student',
    avatarId: s.avatarId ?? 'nova',
    avatarUrl: s.avatarUrl ?? undefined,
    profileImage: s.profileImage ?? undefined,
    createdAt: s.createdAt ?? '',
    hasSeenWelcome: s.hasSeenWelcome ?? false,
    streakCount: s.streakCount ?? 0,
    lastActiveDate: s.lastActiveDate ?? '',
    emailVerified: s.emailVerified ?? false,
    assignedModuleIds: s.assignedModuleIds,
    ageGroup: s.ageGroup ?? 'beginner',
    hasPaid: s.hasPaid ?? false,
  };
}

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private http = inject(HttpClient);
  private readonly assignmentsUrl = `${environment.apiUrl}/assignments`;
  private readonly studentsUrl = `${environment.apiUrl}/students`;

  /** Every student account on the backend, with their assigned modules — the same list on every device. */
  getStudents(): Observable<Student[]> {
    return this.http
      .get<BackendStudent[]>(this.studentsUrl, { withCredentials: true })
      .pipe(map((students) => students.map(toStudent)));
  }

  assignModuleToStudents(moduleId: string, studentIds: string[]): Observable<void> {
    return this.http
      .post<{ assigned: number }>(this.assignmentsUrl, { moduleId, studentIds }, { withCredentials: true })
      .pipe(map(() => void 0));
  }
}
