import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TrainerService } from '../../core/services/trainer.service';
import { ModuleService } from '../../core/services/module.service';
import { Trainer } from '../../core/models/user.model';
import { Student } from '../../core/models/user.model';
import { Module } from '../../core/models/module.model';
import { AVATAR_EMOJI } from '../../shared/avatar-emoji';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class TrainerDashboard implements OnInit {
  private auth = inject(AuthService);
  private trainerService = inject(TrainerService);
  private moduleService = inject(ModuleService);

  readonly trainer = computed(() => this.auth.currentUser() as Trainer);
  readonly students = signal<Student[]>([]);
  readonly modules = signal<Module[]>([]);
  readonly loading = signal(true);
  readonly avatarEmoji = AVATAR_EMOJI;

  ngOnInit(): void {
    const trainer = this.trainer();
    if (!trainer) return;

    this.trainerService.getStudents().subscribe((students) => {
      this.students.set(students);
      this.loading.set(false);
    });
    this.moduleService.getModulesByTrainer(trainer.id).subscribe((modules) => this.modules.set(modules));
  }

  assignedCount(student: Student): number {
    return student.assignedModuleIds.length;
  }
}
