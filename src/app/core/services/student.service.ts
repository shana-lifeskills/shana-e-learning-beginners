import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { AppUser, Student } from '../models/user.model';
import { Module, ModuleWithProgress } from '../models/module.model';
import { GamificationService } from './gamification.service';
import { RewardTotals } from '../models/gamification.model';

export interface EarnedBadge {
  lessonTitle: string;
  moduleTitle: string;
  moduleIcon: string;
  earnedAt: string;
}

export interface EarnedTrophy {
  moduleTitle: string;
  moduleIcon: string;
  earnedAt: string;
}

export interface RewardDetails {
  totals: RewardTotals;
  badges: EarnedBadge[];
  trophies: EarnedTrophy[];
}

export interface RewardHighlights {
  /** Stars earned in the last 7 days — a real count, not a placeholder. */
  starsThisWeek: number;
  /** Modules where the current lesson is partway done — genuinely "almost" a badge. */
  badgesAlmostUnlocked: number;
}

/** Shape `/api/progress` (list) returns — see ProgressService's `ProgressDto`. */
interface ProgressDto {
  moduleId: string;
  status: ModuleWithProgress['status'];
  completedExerciseIds: string[];
  completedLessonIds: string[];
  currentLessonId: string | null;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private db = inject(DatabaseService);
  private gamification = inject(GamificationService);
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/progress`;

  getAllStudents(): Observable<Student[]> {
    const students = this.db.getAll<AppUser>(COLLECTIONS.users).filter((u): u is Student => u.role === 'student');
    return of(students);
  }

  getModulesForStudent(studentId: string): Observable<ModuleWithProgress[]> {
    const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
    if (!student) return of([]);

    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);

    return this.http.get<ProgressDto[]>(this.apiUrl, { params: { studentId }, withCredentials: true }).pipe(
      map((allProgress) => {
        const modules: ModuleWithProgress[] = student.assignedModuleIds
          .map((moduleId) => allModules.find((m) => m.id === moduleId))
          .filter((m): m is Module => !!m && m.ageGroup === student.ageGroup)
          .map((module) => {
            const progress = allProgress.find((p) => p.moduleId === module.id);
            const totalExercises = module.lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
            const completedExercises = progress?.completedExerciseIds.length ?? 0;
            const progressPercent = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100);

            return {
              ...module,
              progressPercent,
              status: progress?.status ?? 'not-started',
              lessonsCompleted: progress?.completedLessonIds.length ?? 0,
              lessonsTotal: module.lessons.length,
            };
          });
        return modules;
      })
    );
  }

  getRewardTotals(studentId: string): Observable<RewardTotals> {
    return this.gamification.getTotals(studentId);
  }

  getRewardHighlights(studentId: string): Observable<RewardHighlights> {
    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);

    return forkJoin({
      starsThisWeek: this.gamification.getStarsThisWeek(studentId),
      allProgress: this.http.get<ProgressDto[]>(this.apiUrl, { params: { studentId }, withCredentials: true }),
    }).pipe(
      map(({ starsThisWeek, allProgress }) => {
        const badgesAlmostUnlocked = allProgress.filter((progress) => {
          if (progress.status !== 'in-progress' || !progress.currentLessonId) return false;
          const module = allModules.find((m) => m.id === progress.moduleId);
          const lesson = module?.lessons.find((l) => l.id === progress.currentLessonId);
          if (!lesson || lesson.exercises.length === 0) return false;
          const doneInLesson = lesson.exercises.filter((e) => progress.completedExerciseIds.includes(e.id)).length;
          return doneInLesson > 0 && doneInLesson < lesson.exercises.length;
        }).length;

        return { starsThisWeek: starsThisWeek.starsThisWeek, badgesAlmostUnlocked };
      })
    );
  }

  getRewardDetails(studentId: string): Observable<RewardDetails> {
    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);
    const moduleById = new Map(allModules.map((m) => [m.id, m]));

    return this.gamification.getDetails(studentId).pipe(
      map((raw) => {
        const badges: EarnedBadge[] = raw.badges.map((log) => {
          const module = moduleById.get(log.moduleId);
          const lesson = module?.lessons.find((l) => l.id === log.lessonId);
          return {
            lessonTitle: lesson?.title ?? 'A lesson',
            moduleTitle: module?.title ?? 'A module',
            moduleIcon: module?.icon ?? '📘',
            earnedAt: log.earnedAt,
          };
        });

        const trophies: EarnedTrophy[] = raw.trophies.map((log) => {
          const module = moduleById.get(log.moduleId);
          return {
            moduleTitle: module?.title ?? 'A module',
            moduleIcon: module?.icon ?? '🏆',
            earnedAt: log.earnedAt,
          };
        });

        return { totals: raw.totals, badges, trophies };
      })
    );
  }
}
