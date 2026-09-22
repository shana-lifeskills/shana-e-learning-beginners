import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { AppUser, Student } from '../models/user.model';
import { Module } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private db = inject(DatabaseService);
  private http = inject(HttpClient);
  private readonly assignmentsUrl = `${environment.apiUrl}/assignments`;

  /** Local student list, enriched with `assignedModuleIds` fetched from the backend so
   *  assignment now survives across devices instead of living only in `users` localStorage. */
  getStudents(): Observable<Student[]> {
    const students = this.db.getAll<AppUser>(COLLECTIONS.users).filter((u): u is Student => u.role === 'student');
    if (students.length === 0) return of(students);

    const studentIds = students.map((s) => s.id).join(',');
    return this.http
      .get<Record<string, string[]>>(`${this.assignmentsUrl}/batch`, { params: { studentIds }, withCredentials: true })
      .pipe(map((assignments) => students.map((s) => ({ ...s, assignedModuleIds: assignments[s.id] ?? [] }))));
  }

  assignModuleToStudents(moduleId: string, studentIds: string[]): Observable<void> {
    return this.http
      .post<{ assigned: number }>(this.assignmentsUrl, { moduleId, studentIds }, { withCredentials: true })
      .pipe(map(() => void 0));
  }

  isModuleAssignedTo(module: Module, studentId: string): boolean {
    const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
    return !!student?.assignedModuleIds.includes(module.id);
  }
}
