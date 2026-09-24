import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoachService, Task } from '../../core/services/coach.service';
import { AgeGroup } from '../../core/models/user.model';

@Component({
  selector: 'app-coach-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class CoachAssignments implements OnInit {
  private fb = inject(FormBuilder);
  private coachService = inject(CoachService);

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(true);
  readonly formOpen = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    instructions: [''],
    ageGroup: ['beginner' as AgeGroup, Validators.required],
    dueAt: [''],
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.loading.set(true);
    this.coachService.listTasks().subscribe((tasks) => {
      this.tasks.set([...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      this.loading.set(false);
    });
  }

  openForm(): void {
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.form.reset({ title: '', instructions: '', ageGroup: 'beginner', dueAt: '' });
    this.errorMessage.set('');
  }

  setAgeGroup(ageGroup: AgeGroup): void {
    this.form.get('ageGroup')?.setValue(ageGroup);
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Give the assignment a title (and an age group) before saving.');
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);
    const raw = this.form.getRawValue();

    this.coachService
      .createTask({
        title: raw.title!,
        instructions: raw.instructions || undefined,
        ageGroup: raw.ageGroup!,
        dueAt: raw.dueAt || undefined,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.closeForm();
          this.loadTasks();
        },
        error: () => {
          this.submitting.set(false);
          this.errorMessage.set('Something went wrong saving that assignment — try again.');
        },
      });
  }
}
