import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainerService } from '../../core/services/trainer.service';
import { ModuleService } from '../../core/services/module.service';
import { Student } from '../../core/models/user.model';
import { Module } from '../../core/models/module.model';
import { AVATAR_EMOJI } from '../../shared/avatar-emoji';

@Component({
  selector: 'app-assign-module',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assign-module.html',
  styleUrl: './assign-module.scss',
})
export class AssignModule implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private trainerService = inject(TrainerService);
  private moduleService = inject(ModuleService);

  readonly module = signal<Module | null>(null);
  readonly students = signal<Student[]>([]);
  readonly alreadyAssignedIds = signal<Set<string>>(new Set());
  readonly newlySelectedIds = signal<Set<string>>(new Set());
  readonly loading = signal(true);
  readonly saved = signal(false);
  readonly avatarEmoji = AVATAR_EMOJI;

  /** Only students in the module's own age group can ever see it on their
   *  dashboard (beginner/advanced content is filtered there), so this list
   *  only offers students that assignment would actually be visible to. */
  readonly matchingStudents = computed(() => {
    const ageGroup = this.module()?.ageGroup;
    return this.students().filter((s) => s.ageGroup === ageGroup);
  });

  ngOnInit(): void {
    const moduleId = this.route.snapshot.paramMap.get('id');
    if (!moduleId) return;

    this.moduleService.getModuleById(moduleId).subscribe((module) => {
      if (!module) {
        this.router.navigate(['/admin/modules']);
        return;
      }
      this.module.set(module);

      this.trainerService.getStudents().subscribe((students) => {
        this.students.set(students);
        this.alreadyAssignedIds.set(new Set(students.filter((s) => s.assignedModuleIds.includes(moduleId)).map((s) => s.id)));
        this.loading.set(false);
      });
    });
  }

  isAlreadyAssigned(student: Student): boolean {
    return this.alreadyAssignedIds().has(student.id);
  }

  isNewlySelected(student: Student): boolean {
    return this.newlySelectedIds().has(student.id);
  }

  toggle(student: Student): void {
    if (this.isAlreadyAssigned(student)) return;
    const next = new Set(this.newlySelectedIds());
    if (next.has(student.id)) next.delete(student.id);
    else next.add(student.id);
    this.newlySelectedIds.set(next);
    this.saved.set(false);
  }

  save(): void {
    const module = this.module();
    if (!module || this.newlySelectedIds().size === 0) return;

    this.trainerService.assignModuleToStudents(module.id, [...this.newlySelectedIds()]).subscribe(() => {
      this.alreadyAssignedIds.set(new Set([...this.alreadyAssignedIds(), ...this.newlySelectedIds()]));
      this.newlySelectedIds.set(new Set());
      this.saved.set(true);
    });
  }
}
