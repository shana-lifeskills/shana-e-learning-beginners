import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { Student } from '../models/user.model';
import { Module, ModuleWithProgress } from '../models/module.model';
import { GamificationService } from './gamification.service';
import { ModuleService } from './module.service';
import { RewardTotals } from '../models/gamification.model';
import { LEVEL_ORDER, levelIndexOf } from './levels';

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
  private moduleService = inject(ModuleService);
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/progress`;
  private readonly paymentsUrl = `${environment.apiUrl}/payments`;

  /** Every module id this student has a real, successful payment for — the
   *  pay-as-you-go source of truth for what's unlocked. Games don't appear
   *  here (they're never locked in the first place, see getModulesForStudent). */
  getUnlockedModuleIds(studentId: string): Observable<string[]> {
    return this.http
      .get<{ moduleIds: string[] }>(`${this.paymentsUrl}/unlocked-modules`, { params: { studentId }, withCredentials: true })
      .pipe(map((res) => res.moduleIds));
  }

  /** Every module matching the student's age group — not just ones a trainer
   *  manually assigned, now that every module is auto-visible and gated
   *  purely by payment (or free, for games). */
  getModulesForStudent(studentId: string): Observable<ModuleWithProgress[]> {
    const student = this.db.getById<Student>(COLLECTIONS.users, studentId);
    if (!student) return of([]);

    return forkJoin({
      allModulesUnfiltered: this.moduleService.getAllModules(),
      allProgress: this.http.get<ProgressDto[]>(this.apiUrl, { params: { studentId }, withCredentials: true }),
      unlockedModuleIds: this.getUnlockedModuleIds(studentId),
    }).pipe(
      map(({ allModulesUnfiltered, allProgress, unlockedModuleIds }) => {
        const allModules = allModulesUnfiltered.filter((m) => m.ageGroup === student.ageGroup);
        const unlocked = new Set(unlockedModuleIds);
        const progressByModuleId = new Map(allProgress.map((p) => [p.moduleId, p]));

        // Level-sequencing: a Level is "complete" once every life-skills
        // module sharing its trackName (within this student's already
        // ageGroup-filtered module list) has status 'completed'. Computed
        // once up front so each module's lock check below is a simple lookup.
        const modulesByTrack = new Map<string, Module[]>();
        for (const m of allModules) {
          if (m.category !== 'life-skills' || !m.trackName) continue;
          modulesByTrack.set(m.trackName, [...(modulesByTrack.get(m.trackName) ?? []), m]);
        }
        const isLevelComplete = (trackName: string): boolean => {
          const mods = modulesByTrack.get(trackName);
          if (!mods || mods.length === 0) return true;
          return mods.every((m) => progressByModuleId.get(m.id)?.status === 'completed');
        };

        const modules: ModuleWithProgress[] = allModules.map((module) => {
          const progress = progressByModuleId.get(module.id);
          // `getAllModules()` returns metadata-only summaries (lessons: []) —
          // lessonsTotal/exercisesTotal carry the real counts in that case;
          // fall back to the full lesson array for a locally-created module.
          const totalExercises = module.exercisesTotal ?? module.lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
          const lessonsTotal = module.lessonsTotal ?? module.lessons.length;
          const completedExercises = progress?.completedExerciseIds.length ?? 0;
          const progressPercent = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100);

          const levelIndex = levelIndexOf(module.trackName);
          const levelLocked =
            module.category === 'life-skills' && levelIndex > 0 && !isLevelComplete(LEVEL_ORDER[levelIndex - 1]);
          const paymentLocked = module.category !== 'game' && !unlocked.has(module.id);

          return {
            ...module,
            progressPercent,
            status: progress?.status ?? 'not-started',
            lessonsCompleted: progress?.completedLessonIds.length ?? 0,
            lessonsTotal,
            locked: paymentLocked || levelLocked,
            lockReason: levelLocked ? 'level' : paymentLocked ? 'payment' : null,
          };
        });
        return modules;
      })
    );
  }

  getRewardTotals(studentId: string): Observable<RewardTotals> {
    return this.gamification.getTotals(studentId);
  }

  /** Needs each referenced module's *full* lesson content (to find the
   *  current lesson and check its exercises) — `getAllModules()` only
   *  returns metadata, so this fetches full detail for just the handful of
   *  distinct modules actually referenced, not the whole catalog. */
  private moduleDetailsByIds(moduleIds: string[]): Observable<Map<string, Module>> {
    const uniqueIds = [...new Set(moduleIds)];
    if (uniqueIds.length === 0) return of(new Map());
    return forkJoin(uniqueIds.map((id) => this.moduleService.getModuleById(id))).pipe(
      map((modules) => new Map(modules.filter((m): m is Module => !!m).map((m) => [m.id, m])))
    );
  }

  getRewardHighlights(studentId: string): Observable<RewardHighlights> {
    return forkJoin({
      starsThisWeek: this.gamification.getStarsThisWeek(studentId),
      allProgress: this.http.get<ProgressDto[]>(this.apiUrl, { params: { studentId }, withCredentials: true }),
    }).pipe(
      switchMap(({ starsThisWeek, allProgress }) => {
        const inProgress = allProgress.filter((p) => p.status === 'in-progress' && p.currentLessonId);
        return this.moduleDetailsByIds(inProgress.map((p) => p.moduleId)).pipe(
          map((moduleById) => {
            const badgesAlmostUnlocked = inProgress.filter((progress) => {
              const module = moduleById.get(progress.moduleId);
              const lesson = module?.lessons.find((l) => l.id === progress.currentLessonId);
              if (!lesson || lesson.exercises.length === 0) return false;
              const doneInLesson = lesson.exercises.filter((e) => progress.completedExerciseIds.includes(e.id)).length;
              return doneInLesson > 0 && doneInLesson < lesson.exercises.length;
            }).length;

            return { starsThisWeek: starsThisWeek.starsThisWeek, badgesAlmostUnlocked };
          })
        );
      })
    );
  }

  getRewardDetails(studentId: string): Observable<RewardDetails> {
    return this.gamification.getDetails(studentId).pipe(
      switchMap((raw) =>
        this.moduleDetailsByIds([...raw.badges.map((b) => b.moduleId), ...raw.trophies.map((t) => t.moduleId)]).pipe(
          map((moduleById) => ({ raw, moduleById }))
        )
      ),
      map(({ raw, moduleById }) => {
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
