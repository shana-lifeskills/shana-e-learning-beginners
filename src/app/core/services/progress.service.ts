import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
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

/** Shape the backend's `/api/progress/*` routes return — `userId` instead of `studentId`,
 *  since the server only ever knows the caller's own JWT-derived id. */
interface ProgressDto {
  id: string;
  userId: string;
  moduleId: string;
  status: StudentProgress['status'];
  completedExerciseIds: string[];
  completedLessonIds: string[];
  currentLessonId: string | null;
  currentExerciseId: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

interface CompleteStepResponse {
  progress: ProgressDto;
  lessonCompleted: boolean;
  moduleCompleted: boolean;
  starAwarded: boolean;
  badgeAwarded: boolean;
  trophyAwarded: boolean;
}

/**
 * Curriculum order/structure (which exercise is next, when a lesson or module is
 * "done") lives only in the frontend's static content, so it stays computed here,
 * exactly as before — `advance()` below is unchanged, pure logic. Only its two
 * side-effecting statements changed: instead of writing to localStorage and calling
 * GamificationService synchronously, it POSTs the already-computed outcome to the
 * backend, which does the actual persistence and idempotent star/badge/trophy award.
 *
 * A small in-memory cache holds the last-fetched progress per module so submitAnswer/
 * submitShare/completeStep — which are always called after startModule during the same
 * module-player session — can run their pure computation synchronously, the same way
 * they used to read straight from localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private http = inject(HttpClient);
  private gamification = inject(GamificationService);
  private readonly apiUrl = `${environment.apiUrl}/progress`;

  private readonly cache = new Map<string, StudentProgress>();

  private cacheKey(studentId: string, moduleId: string): string {
    return `${studentId}__${moduleId}`;
  }

  private toStudentProgress(studentId: string, dto: ProgressDto): StudentProgress {
    return {
      id: dto.id,
      studentId,
      moduleId: dto.moduleId,
      status: dto.status,
      completedExerciseIds: dto.completedExerciseIds ?? [],
      completedLessonIds: dto.completedLessonIds ?? [],
      currentLessonId: dto.currentLessonId,
      currentExerciseId: dto.currentExerciseId,
      startedAt: dto.startedAt,
      completedAt: dto.completedAt,
    };
  }

  /** Fetches existing progress, or creates+starts a fresh record for this module —
   *  including the same "first not-yet-completed lesson" self-heal the module used to
   *  do purely off localStorage, now informed by one GET before the start/heal POST. */
  startModule(studentId: string, module: Module): Observable<StudentProgress> {
    return this.http.get<ProgressDto>(`${this.apiUrl}/${module.id}`, { withCredentials: true }).pipe(
      map((dto) => this.toStudentProgress(studentId, dto)),
      catchError((err) => (err?.status === 404 ? of(null) : throwError(() => err))),
      switchMap((existing) => {
        let resumeLessonId: string | null = null;
        let resumeExerciseId: string | null = null;

        if (existing && existing.status !== 'completed' && existing.currentLessonId === null) {
          // Self-heal: a lesson can be added to a module after a student already started
          // it with zero lessons, leaving `currentLessonId: null` stuck forever. Pick up
          // the first not-yet-completed lesson so the student isn't permanently locked out.
          const nextLesson = [...module.lessons]
            .sort((a, b) => a.order - b.order)
            .find((lesson) => !existing.completedLessonIds.includes(lesson.id));
          resumeLessonId = nextLesson?.id ?? null;
          resumeExerciseId = nextLesson ? ([...nextLesson.exercises].sort((a, b) => a.order - b.order)[0]?.id ?? null) : null;
        } else if (existing) {
          resumeLessonId = existing.currentLessonId;
          resumeExerciseId = existing.currentExerciseId;
        } else {
          const firstLesson = [...module.lessons].sort((a, b) => a.order - b.order)[0];
          resumeLessonId = firstLesson?.id ?? null;
          resumeExerciseId = firstLesson ? ([...firstLesson.exercises].sort((a, b) => a.order - b.order)[0]?.id ?? null) : null;
        }

        return this.http.post<ProgressDto>(
          `${this.apiUrl}/${module.id}/start`,
          { resumeLessonId, resumeExerciseId },
          { withCredentials: true }
        );
      }),
      map((dto) => {
        const progress = this.toStudentProgress(studentId, dto);
        this.cache.set(this.cacheKey(studentId, module.id), progress);
        return progress;
      })
    );
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
    const progress = this.cache.get(this.cacheKey(studentId, module.id));

    if (!lesson || !exercise || !progress || exercise.type !== 'multiple-choice') {
      throw new Error('Cannot submit an answer before the module has been started.');
    }

    const correct = exercise.correctOptionId === selectedOptionId;
    if (!correct) {
      return of({ correct, progress, lessonCompleted: false, moduleCompleted: false });
    }

    return this.advance(studentId, module, lesson, exerciseId, progress).pipe(
      map((result) => ({ correct: true, ...result }))
    );
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
    const progress = this.cache.get(this.cacheKey(studentId, module.id));

    if (!lesson || !progress) {
      throw new Error('Cannot submit before the module has been started.');
    }

    return this.advance(studentId, module, lesson, exerciseId, progress, { studentName, values });
  }

  getSubmissionsForExercise(exerciseId: string): Observable<Submission[]> {
    return this.http
      .get<{ userId: string; studentName: string; moduleId: string; lessonId: string; exerciseId: string; values: Record<string, string>; submittedAt: string }[]>(
        `${this.apiUrl}/submissions`,
        { params: { exerciseId }, withCredentials: true }
      )
      .pipe(
        map((rows) =>
          rows.map((r) => ({
            id: `${r.userId}__${r.exerciseId}`,
            studentId: r.userId,
            studentName: r.studentName,
            moduleId: r.moduleId,
            lessonId: r.lessonId,
            exerciseId: r.exerciseId,
            values: r.values,
            submittedAt: r.submittedAt,
          }))
        )
      );
  }

  /**
   * Advances past a step that has nothing to type or grade — a story moment,
   * a live discussion, or a challenge card — just tapping "Continue" is
   * enough to mark it done and award a star.
   */
  completeStep(studentId: string, module: Module, lessonId: string, exerciseId: string): Observable<AdvanceResult> {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    const progress = this.cache.get(this.cacheKey(studentId, module.id));

    if (!lesson || !progress) {
      throw new Error('Cannot complete a step before the module has been started.');
    }

    return this.advance(studentId, module, lesson, exerciseId, progress);
  }

  private advance(
    studentId: string,
    module: Module,
    lesson: Module['lessons'][number],
    exerciseId: string,
    progress: StudentProgress,
    submission?: { studentName: string; values: Record<string, string> }
  ): Observable<AdvanceResult> {
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
        currentLessonId = null;
        currentExerciseId = null;
      }
    }

    return this.http
      .post<CompleteStepResponse>(
        `${this.apiUrl}/${module.id}/steps/${exerciseId}/complete`,
        {
          lessonId: lesson.id,
          lessonCompleted,
          moduleCompleted,
          completedExerciseIds,
          completedLessonIds,
          currentLessonId,
          currentExerciseId,
          submissionValues: submission?.values,
          studentName: submission?.studentName,
        },
        { withCredentials: true }
      )
      .pipe(
        map((response) => {
          const updated = this.toStudentProgress(studentId, response.progress);
          this.cache.set(this.cacheKey(studentId, module.id), updated);

          if (response.starAwarded) this.gamification.notifyReward('star', 1, 'Great job! You earned a star!');
          if (response.badgeAwarded) this.gamification.notifyReward('badge', 1, 'Lesson complete! You earned a badge!');
          if (response.trophyAwarded) this.gamification.notifyReward('trophy', 1, 'Module complete! You earned a trophy!');

          return { progress: updated, lessonCompleted: response.lessonCompleted, moduleCompleted: response.moduleCompleted };
        })
      );
  }
}
