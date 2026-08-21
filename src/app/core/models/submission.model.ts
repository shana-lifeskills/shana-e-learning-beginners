/** A student's typed answer to a share-prompt exercise (e.g. "Name & Shine"). */
export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  moduleId: string;
  lessonId: string;
  exerciseId: string;
  values: Record<string, string>;
  submittedAt: string;
}
