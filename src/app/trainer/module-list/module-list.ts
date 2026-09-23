import { Component, OnInit, inject, signal } from '@angular/core';
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

  lessonCount(module: Module): number {
    return module.lessons.length;
  }

  exerciseCount(module: Module): number {
    return module.lessons.reduce((sum, l) => sum + l.exercises.length, 0);
  }
}
