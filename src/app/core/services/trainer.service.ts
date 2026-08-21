import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { AppUser, Student } from '../models/user.model';
import { Module } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  constructor(private db: DatabaseService) {}

  getStudents(): Observable<Student[]> {
    const students = this.db.getAll<AppUser>(COLLECTIONS.users).filter((u): u is Student => u.role === 'student');
    return of(students).pipe(delay(100));
  }

  assignModuleToStudents(moduleId: string, studentIds: string[]): Observable<void> {
    studentIds.forEach((studentId) => {
      const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
      if (!student) return;
      if (student.assignedModuleIds.includes(moduleId)) return;
      this.db.update<Student>(COLLECTIONS.users, studentId, {
        assignedModuleIds: [...student.assignedModuleIds, moduleId],
      });
    });

    return of(void 0).pipe(delay(150));
  }

  isModuleAssignedTo(module: Module, studentId: string): boolean {
    const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
    return !!student?.assignedModuleIds.includes(module.id);
  }
}
