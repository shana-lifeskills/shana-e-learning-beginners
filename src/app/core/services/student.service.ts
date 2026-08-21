import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { AppUser, Student } from '../models/user.model';
import { Module, ModuleWithProgress } from '../models/module.model';
import { StudentProgress } from '../models/progress.model';
import { GamificationService } from './gamification.service';
import { BadgeLog, RewardTotals, StarLog, TrophyLog } from '../models/gamification.model';

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

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private db: DatabaseService, private gamification: GamificationService) {}

  getAllStudents(): Observable<Student[]> {
    const students = this.db.getAll<AppUser>(COLLECTIONS.users).filter((u): u is Student => u.role === 'student');
    return of(students).pipe(delay(100));
  }

  getModulesForStudent(studentId: string): Observable<ModuleWithProgress[]> {
    const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
    if (!student) return of([]);

    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);
    const allProgress = this.db.getAll<StudentProgress>(COLLECTIONS.progress);

    const modules: ModuleWithProgress[] = student.assignedModuleIds
      .map((moduleId) => allModules.find((m) => m.id === moduleId))
      .filter((m): m is Module => !!m)
      .map((module) => {
        const progress = allProgress.find((p) => p.studentId === studentId && p.moduleId === module.id);
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

    return of(modules).pipe(delay(100));
  }

  getRewardTotals(studentId: string): Observable<RewardTotals> {
    return of(this.gamification.getTotals(studentId)).pipe(delay(50));
  }

  getRewardHighlights(studentId: string): Observable<RewardHighlights> {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const starsThisWeek = this.db
      .getAll<StarLog>(COLLECTIONS.stars)
      .filter((log) => log.studentId === studentId && new Date(log.earnedAt).getTime() >= oneWeekAgo).length;

    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);
    const allProgress = this.db.getAll<StudentProgress>(COLLECTIONS.progress).filter((p) => p.studentId === studentId);

    const badgesAlmostUnlocked = allProgress.filter((progress) => {
      if (progress.status !== 'in-progress' || !progress.currentLessonId) return false;
      const module = allModules.find((m) => m.id === progress.moduleId);
      const lesson = module?.lessons.find((l) => l.id === progress.currentLessonId);
      if (!lesson || lesson.exercises.length === 0) return false;
      const doneInLesson = lesson.exercises.filter((e) => progress.completedExerciseIds.includes(e.id)).length;
      return doneInLesson > 0 && doneInLesson < lesson.exercises.length;
    }).length;

    return of({ starsThisWeek, badgesAlmostUnlocked }).pipe(delay(50));
  }

  getRewardDetails(studentId: string): Observable<RewardDetails> {
    const allModules = this.db.getAll<Module>(COLLECTIONS.modules);
    const moduleById = new Map(allModules.map((m) => [m.id, m]));

    const badges: EarnedBadge[] = this.db
      .getAll<BadgeLog>(COLLECTIONS.badges)
      .filter((log) => log.studentId === studentId)
      .map((log) => {
        const module = moduleById.get(log.moduleId);
        const lesson = module?.lessons.find((l) => l.id === log.lessonId);
        return {
          lessonTitle: lesson?.title ?? 'A lesson',
          moduleTitle: module?.title ?? 'A module',
          moduleIcon: module?.icon ?? '📘',
          earnedAt: log.earnedAt,
        };
      });

    const trophies: EarnedTrophy[] = this.db
      .getAll<TrophyLog>(COLLECTIONS.trophies)
      .filter((log) => log.studentId === studentId)
      .map((log) => {
        const module = moduleById.get(log.moduleId);
        return {
          moduleTitle: module?.title ?? 'A module',
          moduleIcon: module?.icon ?? '🏆',
          earnedAt: log.earnedAt,
        };
      });

    return of({ totals: this.gamification.getTotals(studentId), badges, trophies }).pipe(delay(100));
  }
}
