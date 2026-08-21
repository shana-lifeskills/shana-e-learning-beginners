import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { GamificationService } from './gamification.service';
import { Module } from '../models/module.model';
import { StudentProgress } from '../models/progress.model';
import { Submission } from '../models/submission.model';

export interface AnswerResult {
  correct: boolean;
  progress: StudentProgress;
  lessonCompleted: boolean;
  moduleCompleted: boolean;
}

export interface AdvanceResult {
  progress: StudentProgress;
  lessonCompleted: boolean;
  moduleCompleted: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private db: DatabaseService, private gamification: GamificationService) {}

  getProgress(studentId: string, moduleId: string): StudentProgress | undefined {
    return this.db
      .getAll<StudentProgress>(COLLECTIONS.progress)
      .find((p) => p.studentId === studentId && p.moduleId === moduleId);
  }

  /** Fetches existing progress, or creates+starts a fresh record for this module. */
  startModule(studentId: string, module: Module): Observable<StudentProgress> {
    const existing = this.getProgress(studentId, module.id);
    if (existing) return of(existing).pipe(delay(100));

    const firstLesson = [...module.lessons].sort((a, b) => a.order - b.order)[0];
    const firstExercise = firstLesson ? [...firstLesson.exercises].sort((a, b) => a.order - b.order)[0] : null;

    const progress: StudentProgress = {
      id: `${studentId}__${module.id}`,
      studentId,
      moduleId: module.id,
      status: 'in-progress',
      completedExerciseIds: [],
      completedLessonIds: [],
      currentLessonId: firstLesson?.id ?? null,
      currentExerciseId: firstExercise?.id ?? null,
      startedAt: new Date().toISOString(),
      completedAt: null,
    };

    this.db.insert(COLLECTIONS.progress, progress);
    return of(progress).pipe(delay(100));
  }

  /**
   * Records the student's answer for one exercise. On a correct answer this
   * awards a star, advances to the next exercise/lesson, and — when a lesson
   * or the whole module is finished — awards the matching badge/trophy.
   */
  submitAnswer(
    studentId: string,
    module: Module,
    lessonId: string,
    exerciseId: string,
    selectedOptionId: string
  ): Observable<AnswerResult> {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    const exercise = lesson?.exercises.find((e) => e.id === exerciseId);
    const progress = this.getProgress(studentId, module.id);

    if (!lesson || !exercise || !progress || exercise.type !== 'multiple-choice') {
      throw new Error('Cannot submit an answer before the module has been started.');
    }

    const correct = exercise.correctOptionId === selectedOptionId;
    if (!correct) {
      return of({ correct, progress, lessonCompleted: false, moduleCompleted: false }).pipe(delay(150));
    }

    const result = this.advance(studentId, module, lesson, exerciseId, progress);
    return of({ correct: true, ...result }).pipe(delay(150));
  }

  /**
   * Records a share-prompt submission (e.g. "Name & Shine"): there's no right
   * answer, so it always counts as complete — save what the student typed,
   * then run the same star/badge/trophy advancement as a correct answer.
   */
  submitShare(
    studentId: string,
    studentName: string,
    module: Module,
    lessonId: string,
    exerciseId: string,
    values: Record<string, string>
  ): Observable<AdvanceResult> {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    const progress = this.getProgress(studentId, module.id);

    if (!lesson || !progress) {
      throw new Error('Cannot submit before the module has been started.');
    }

    const submission: Submission = {
      id: `${studentId}__${exerciseId}`,
      studentId,
      studentName,
      moduleId: module.id,
      lessonId,
      exerciseId,
      values,
      submittedAt: new Date().toISOString(),
    };
    this.db.upsert(COLLECTIONS.submissions, submission);

    const result = this.advance(studentId, module, lesson, exerciseId, progress);
    return of(result).pipe(delay(150));
  }

  getSubmissionsForExercise(exerciseId: string): Submission[] {
    return this.db.getAll<Submission>(COLLECTIONS.submissions).filter((s) => s.exerciseId === exerciseId);
  }

  /**
   * Advances past a step that has nothing to type or grade — a story moment,
   * a live discussion, or a challenge card — just tapping "Continue" is
   * enough to mark it done and award a star.
   */
  completeStep(studentId: string, module: Module, lessonId: string, exerciseId: string): Observable<AdvanceResult> {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    const progress = this.getProgress(studentId, module.id);

    if (!lesson || !progress) {
      throw new Error('Cannot complete a step before the module has been started.');
    }

    const result = this.advance(studentId, module, lesson, exerciseId, progress);
    return of(result).pipe(delay(150));
  }

  private advance(
    studentId: string,
    module: Module,
    lesson: Module['lessons'][number],
    exerciseId: string,
    progress: StudentProgress
  ): AdvanceResult {
    this.gamification.awardStar(studentId, module.id, exerciseId);

    const completedExerciseIds = progress.completedExerciseIds.includes(exerciseId)
      ? progress.completedExerciseIds
      : [...progress.completedExerciseIds, exerciseId];

    const sortedExercises = [...lesson.exercises].sort((a, b) => a.order - b.order);
    const currentIndex = sortedExercises.findIndex((e) => e.id === exerciseId);
    const nextExerciseInLesson = sortedExercises[currentIndex + 1] ?? null;

    let lessonCompleted = false;
    let moduleCompleted = false;
    let completedLessonIds = progress.completedLessonIds;
    let currentLessonId: string | null = lesson.id;
    let currentExerciseId: string | null = nextExerciseInLesson?.id ?? null;

    if (!nextExerciseInLesson) {
      // Finished every exercise in this lesson.
      lessonCompleted = !progress.completedLessonIds.includes(lesson.id);
      completedLessonIds = lessonCompleted ? [...progress.completedLessonIds, lesson.id] : progress.completedLessonIds;
      if (lessonCompleted) this.gamification.awardBadge(studentId, module.id, lesson.id);

      const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);
      const lessonIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
      const nextLesson = sortedLessons[lessonIndex + 1] ?? null;

      if (nextLesson) {
        currentLessonId = nextLesson.id;
        const firstExercise = [...nextLesson.exercises].sort((a, b) => a.order - b.order)[0];
        currentExerciseId = firstExercise?.id ?? null;
      } else {
        // That was the last lesson — the whole module is complete.
        moduleCompleted = progress.status !== 'completed';
        if (moduleCompleted) this.gamification.awardTrophy(studentId, module.id);
        currentLessonId = null;
        currentExerciseId = null;
      }
    }

    const updated: StudentProgress = {
      ...progress,
      completedExerciseIds,
      completedLessonIds,
      currentLessonId,
      currentExerciseId,
      status: moduleCompleted ? 'completed' : 'in-progress',
      completedAt: moduleCompleted ? new Date().toISOString() : progress.completedAt,
    };

    this.db.upsert(COLLECTIONS.progress, updated);
    return { progress: updated, lessonCompleted, moduleCompleted };
  }
}
