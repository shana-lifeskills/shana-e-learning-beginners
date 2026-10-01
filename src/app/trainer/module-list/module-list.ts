import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModuleService } from '../../core/services/module.service';
import { AgeGroup, Trainer } from '../../core/models/user.model';
import { Module } from '../../core/models/module.model';

type ModuleListTab = AgeGroup | 'games';

interface TrackGroup {
  trackName: string;
  modules: Module[];
}

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
  readonly activeTab = signal<ModuleListTab>('beginner');

  // Beginner and advanced modules can share the same title (e.g. both
  // tiers have a "Self-Confidence" module with different content), so
  // they're always kept as two separate, clearly-labeled groups — now
  // switched between via tabs instead of stacked sections. Game-category
  // modules (e.g. Counting Critters, Strength Match) live under their own
  // Games tab regardless of age group, not mixed into Beginner/Advanced.
  readonly beginnerModules = computed(() => this.modules().filter((m) => m.ageGroup === 'beginner' && m.category !== 'game'));
  readonly advancedModules = computed(() => this.modules().filter((m) => m.ageGroup === 'advanced' && m.category !== 'game'));
  readonly gameModules = computed(() => this.modules().filter((m) => m.category === 'game'));

  readonly visibleModules = computed(() => {
    switch (this.activeTab()) {
      case 'beginner':
        return this.beginnerModules();
      case 'advanced':
        return this.advancedModules();
      case 'games':
        return this.gameModules();
    }
  });

  /** Beginner/Advanced modules grouped by their curriculum track (e.g.
   *  "Character Development", "Personal Empowerment") — same grouping the
   *  student dashboard already uses (dashboard.ts's `tracks`). Games have
   *  no trackName, so the Games tab stays a flat list. */
  readonly visibleTrackGroups = computed<TrackGroup[]>(() => {
    const groups = new Map<string, Module[]>();
    for (const module of this.visibleModules()) {
      const track = module.trackName ?? 'Other';
      groups.set(track, [...(groups.get(track) ?? []), module]);
    }
    return Array.from(groups, ([trackName, modules]) => ({ trackName, modules }));
  });

  readonly isGroupedTab = computed(() => this.activeTab() !== 'games');

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

  setTab(tab: ModuleListTab): void {
    this.activeTab.set(tab);
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
