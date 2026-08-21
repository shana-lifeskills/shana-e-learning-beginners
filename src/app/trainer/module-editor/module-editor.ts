import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModuleService } from '../../core/services/module.service';
import { Trainer } from '../../core/models/user.model';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';

const ICON_CHOICES = ['🦊', '🦉', '🐼', '🦄', '🦕', '🐝', '🌈', '🚀', '🌟', '🐢'];
const COLOR_CHOICES = ['#FF6F59', '#FFC93C', '#4ECDC4', '#A66DD4', '#6BCB77', '#FF8FA3'];

@Component({
  selector: 'app-module-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FriendlyAlert],
  templateUrl: './module-editor.html',
  styleUrl: './module-editor.scss',
})
export class ModuleEditor {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private moduleService = inject(ModuleService);
  private router = inject(Router);

  readonly iconChoices = ICON_CHOICES;
  readonly colorChoices = COLOR_CHOICES;
  readonly errorMessage = signal('');
  readonly submitting = signal(false);

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    icon: [ICON_CHOICES[0], Validators.required],
    themeColor: [COLOR_CHOICES[0], Validators.required],
    lessons: this.fb.array([this.createLessonGroup(1)]),
  });

  get lessons(): FormArray<FormGroup> {
    return this.form.get('lessons') as FormArray<FormGroup>;
  }

  exercisesOf(lessonIndex: number): FormArray<FormGroup> {
    return this.lessons.at(lessonIndex).get('exercises') as FormArray<FormGroup>;
  }

  optionsOf(lessonIndex: number, exerciseIndex: number): FormArray {
    return this.exercisesOf(lessonIndex).at(exerciseIndex).get('options') as FormArray;
  }

  private createLessonGroup(weekDefault: number) {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      week: [weekDefault, [Validators.required, Validators.min(1)]],
      exercises: this.fb.array([this.createExerciseGroup()]),
    });
  }

  private createExerciseGroup() {
    return this.fb.group({
      prompt: ['', [Validators.required, Validators.minLength(3)]],
      options: this.fb.array(
        [this.fb.control('', Validators.required), this.fb.control('', Validators.required)],
        Validators.required
      ),
      correctOptionIndex: [0, Validators.required],
    });
  }

  addLesson(): void {
    this.lessons.push(this.createLessonGroup(this.lessons.length + 1));
  }

  removeLesson(index: number): void {
    if (this.lessons.length <= 1) return;
    this.lessons.removeAt(index);
  }

  addExercise(lessonIndex: number): void {
    this.exercisesOf(lessonIndex).push(this.createExerciseGroup());
  }

  removeExercise(lessonIndex: number, exerciseIndex: number): void {
    const exercises = this.exercisesOf(lessonIndex);
    if (exercises.length <= 1) return;
    exercises.removeAt(exerciseIndex);
  }

  addOption(lessonIndex: number, exerciseIndex: number): void {
    this.optionsOf(lessonIndex, exerciseIndex).push(this.fb.control('', Validators.required));
  }

  removeOption(lessonIndex: number, exerciseIndex: number, optionIndex: number): void {
    const options = this.optionsOf(lessonIndex, exerciseIndex);
    if (options.length <= 2) return;
    options.removeAt(optionIndex);

    const exercise = this.exercisesOf(lessonIndex).at(exerciseIndex);
    if (exercise.get('correctOptionIndex')?.value === optionIndex) {
      exercise.get('correctOptionIndex')?.setValue(0);
    }
  }

  setCorrectOption(lessonIndex: number, exerciseIndex: number, optionIndex: number): void {
    this.exercisesOf(lessonIndex).at(exerciseIndex).get('correctOptionIndex')?.setValue(optionIndex);
  }

  setIcon(icon: string): void {
    this.form.get('icon')?.setValue(icon);
  }

  setColor(color: string): void {
    this.form.get('themeColor')?.setValue(color);
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('A few boxes still need filling in — take a peek above!');
      this.form.markAllAsTouched();
      return;
    }

    const trainer = this.auth.currentUser() as Trainer;
    if (!trainer) return;

    this.errorMessage.set('');
    this.submitting.set(true);

    const raw = this.form.getRawValue();

    this.moduleService
      .createModule({
        title: raw.title!,
        description: raw.description!,
        icon: raw.icon!,
        themeColor: raw.themeColor!,
        createdByTrainerId: trainer.id,
        lessons: raw.lessons!.map((lesson) => ({
          title: lesson.title!,
          week: lesson.week!,
          exercises: lesson.exercises!.map((exercise) => ({
            prompt: exercise.prompt!,
            options: exercise.options as string[],
            correctOptionIndex: exercise.correctOptionIndex!,
          })),
        })),
      })
      .subscribe((module) => {
        this.submitting.set(false);
        this.router.navigate(['/trainer/modules', module.id, 'assign']);
      });
  }
}
