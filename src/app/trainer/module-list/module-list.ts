import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModuleService } from '../../core/services/module.service';
import { Trainer } from '../../core/models/user.model';
import { Module } from '../../core/models/module.model';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './module-list.html',
  styleUrl: './module-list.scss',
})
export class ModuleList implements OnInit {
  private auth = inject(AuthService);
  private moduleService = inject(ModuleService);

  readonly modules = signal<Module[]>([]);
  readonly loading = signal(true);

  // Beginner and advanced modules can share the same title (e.g. both
  // tiers have a "Self-Confidence" module with different content), so
  // they're always shown as two separate, clearly-labeled groups.
  readonly beginnerModules = computed(() => this.modules().filter((m) => m.ageGroup === 'beginner'));
  readonly advancedModules = computed(() => this.modules().filter((m) => m.ageGroup === 'advanced'));

  ngOnInit(): void {
    const admin = this.auth.currentUser() as Trainer;
    if (!admin) return;

    // Every admin sees the full shared module catalog — modules aren't
    // scoped to whoever happened to create them.
    this.moduleService.getAllModules().subscribe((modules) => {
      this.modules.set(modules);
      this.loading.set(false);
    });
  }

  lessonsLabel(module: Module): string {
    const count = module.lessons.length;
    return count === 1 ? '1 lesson' : `${count} lessons`;
  }

  exercisesLabel(module: Module): string {
    const count = module.lessons.reduce((sum, l) => sum + l.exercises.length, 0);
    return count === 1 ? '1 question' : `${count} questions`;
  }
}
