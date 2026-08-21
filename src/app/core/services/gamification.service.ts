import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { BadgeLog, RewardEvent, RewardTotals, StarLog, TrophyLog } from '../models/gamification.model';

/**
 * Single place that awards stars/badges/trophies and idempotently guards
 * against double-awarding (e.g. revisiting an already-completed exercise).
 * Emits `rewardEvent$` so any component (e.g. the global celebration
 * overlay) can react to a reward being earned, wherever it happens.
 */
@Injectable({ providedIn: 'root' })
export class GamificationService {
  private readonly rewardEventSubject = new Subject<RewardEvent>();
  readonly rewardEvent$ = this.rewardEventSubject.asObservable();

  constructor(private db: DatabaseService) {}

  awardStar(studentId: string, moduleId: string, exerciseId: string): boolean {
    const existing = this.db
      .getAll<StarLog>(COLLECTIONS.stars)
      .some((log) => log.studentId === studentId && log.exerciseId === exerciseId);
    if (existing) return false;

    const log: StarLog = {
      id: this.db.generateId(),
      studentId,
      moduleId,
      exerciseId,
      earnedAt: new Date().toISOString(),
    };
    this.db.insert(COLLECTIONS.stars, log);
    this.rewardEventSubject.next({ kind: 'star', count: 1, message: 'Great job! You earned a star!' });
    return true;
  }

  awardBadge(studentId: string, moduleId: string, lessonId: string): boolean {
    const existing = this.db
      .getAll<BadgeLog>(COLLECTIONS.badges)
      .some((log) => log.studentId === studentId && log.lessonId === lessonId);
    if (existing) return false;

    const log: BadgeLog = {
      id: this.db.generateId(),
      studentId,
      moduleId,
      lessonId,
      earnedAt: new Date().toISOString(),
    };
    this.db.insert(COLLECTIONS.badges, log);
    this.rewardEventSubject.next({ kind: 'badge', count: 1, message: 'Lesson complete! You earned a badge!' });
    return true;
  }

  awardTrophy(studentId: string, moduleId: string): boolean {
    const existing = this.db
      .getAll<TrophyLog>(COLLECTIONS.trophies)
      .some((log) => log.studentId === studentId && log.moduleId === moduleId);
    if (existing) return false;

    const log: TrophyLog = {
      id: this.db.generateId(),
      studentId,
      moduleId,
      earnedAt: new Date().toISOString(),
    };
    this.db.insert(COLLECTIONS.trophies, log);
    this.rewardEventSubject.next({ kind: 'trophy', count: 1, message: 'Module complete! You earned a trophy!' });
    return true;
  }

  getTotals(studentId: string): RewardTotals {
    return {
      stars: this.db.getAll<StarLog>(COLLECTIONS.stars).filter((l) => l.studentId === studentId).length,
      badges: this.db.getAll<BadgeLog>(COLLECTIONS.badges).filter((l) => l.studentId === studentId).length,
      trophies: this.db.getAll<TrophyLog>(COLLECTIONS.trophies).filter((l) => l.studentId === studentId).length,
    };
  }
}
