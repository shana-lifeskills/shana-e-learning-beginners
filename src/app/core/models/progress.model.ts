export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';

export interface StudentProgress {
  /** Composite key: `${studentId}__${moduleId}` — keeps one record per student per module. */
  id: string;
  studentId: string;
  moduleId: string;
  status: ModuleStatus;
  completedExerciseIds: string[];
  completedLessonIds: string[];
  currentLessonId: string | null;
  currentExerciseId: string | null;
  startedAt: string | null;
  completedAt: string | null;
}
