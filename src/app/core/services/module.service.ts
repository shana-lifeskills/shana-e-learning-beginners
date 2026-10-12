import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { Exercise, Lesson, Module } from '../models/module.model';

export interface NewExerciseDraft {
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  mediaUrl?: string;
}

export interface NewLessonDraft {
  title: string;
  week: number;
  exercises: NewExerciseDraft[];
}

export interface NewModuleDraft {
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  createdByTrainerId: string;
  lessons: NewLessonDraft[];
}

/**
 * Module/lesson/exercise content now comes from the backend's curriculum
 * API (`GET /api/curriculum`, `GET /api/curriculum/:id`) — the same
 * `CurriculumModules` table every content change already syncs into via
 * `npm run export:curriculum` + `seed-curriculum.js`. `DatabaseService` is
 * no longer the content source of truth; it's kept only as a local overlay
 * for admin-created modules ("Upload Module"), which still don't persist
 * to the backend (a separate, later pass) — so a locally-created module
 * still shows up for its own creator's browser, same as before.
 */
@Injectable({ providedIn: 'root' })
export class ModuleService {
  private http = inject(HttpClient);
  private db = inject(DatabaseService);
  private readonly apiUrl = `${environment.apiUrl}/curriculum`;

  /** Fetched once per app session and reused — a content update goes live
   *  on next reload, the same mental model as the old `SEED_FLAG` bump,
   *  just without needing one. */
  private allModules$: Observable<Module[]> | null = null;
  /** Full-detail (with lessons) modules already fetched this session, by id. */
  private readonly detailCache = new Map<string, Module>();

  private fetchAllModules(): Observable<Module[]> {
    if (!this.allModules$) {
      this.allModules$ = this.http.get<Module[]>(this.apiUrl, { withCredentials: true }).pipe(shareReplay(1));
    }
    return this.allModules$;
  }

  private localOnlyModules(): Module[] {
    return this.db.getAll<Module>(COLLECTIONS.modules);
  }

  getAllModules(): Observable<Module[]> {
    return this.fetchAllModules().pipe(
      map((fetched) => {
        const fetchedIds = new Set(fetched.map((m) => m.id));
        const localOnly = this.localOnlyModules().filter((m) => !fetchedIds.has(m.id));
        return [...fetched, ...localOnly];
      })
    );
  }

  getModuleById(id: string): Observable<Module | undefined> {
    const local = this.db.getById<Module>(COLLECTIONS.modules, id);
    if (local) return of(local);

    const cached = this.detailCache.get(id);
    if (cached) return of(cached);

    return this.http.get<Module>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      tap((module) => this.detailCache.set(id, module)),
      map((module) => module as Module | undefined)
    );
  }

  getModulesByTrainer(trainerId: string): Observable<Module[]> {
    return this.getAllModules().pipe(map((modules) => modules.filter((m) => m.createdByTrainerId === trainerId)));
  }

  createModule(draft: NewModuleDraft): Observable<Module> {
    const module: Module = {
      id: this.db.generateId(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      themeColor: draft.themeColor,
      icon: draft.icon,
      createdByTrainerId: draft.createdByTrainerId,
      createdAt: new Date().toISOString(),
      lessons: draft.lessons.map((lessonDraft, lessonIndex) => this.buildLesson(lessonDraft, lessonIndex)),
      category: 'life-skills',
      ageGroup: 'beginner',
    };

    this.db.insert(COLLECTIONS.modules, module);
    return of(module);
  }

  private buildLesson(draft: NewLessonDraft, order: number): Lesson {
    return {
      id: this.db.generateId(),
      title: draft.title.trim(),
      order: order + 1,
      week: draft.week,
      exercises: draft.exercises.map((exerciseDraft, exerciseIndex) => this.buildExercise(exerciseDraft, exerciseIndex)),
    };
  }

  private buildExercise(draft: NewExerciseDraft, order: number): Exercise {
    const options = draft.options.map((text) => ({ id: this.db.generateId(), text: text.trim() }));
    return {
      id: this.db.generateId(),
      type: 'multiple-choice',
      order: order + 1,
      prompt: draft.prompt.trim(),
      mediaUrl: draft.mediaUrl,
      options,
      correctOptionId: options[draft.correctOptionIndex].id,
    };
  }
}
