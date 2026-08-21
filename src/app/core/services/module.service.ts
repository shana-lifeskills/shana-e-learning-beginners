import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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

@Injectable({ providedIn: 'root' })
export class ModuleService {
  constructor(private db: DatabaseService) {}

  getAllModules(): Observable<Module[]> {
    return of(this.db.getAll<Module>(COLLECTIONS.modules)).pipe(delay(100));
  }

  getModuleById(id: string): Observable<Module | undefined> {
    return of(this.db.getById<Module>(COLLECTIONS.modules, id)).pipe(delay(100));
  }

  getModulesByTrainer(trainerId: string): Observable<Module[]> {
    const modules = this.db.getAll<Module>(COLLECTIONS.modules).filter((m) => m.createdByTrainerId === trainerId);
    return of(modules).pipe(delay(100));
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
    };

    this.db.insert(COLLECTIONS.modules, module);
    return of(module).pipe(delay(200));
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
