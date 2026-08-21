import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModuleService } from '../../core/services/module.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { Student } from '../../core/models/user.model';
import { Exercise, Module } from '../../core/models/module.model';
import { ExerciseView, ExerciseAnswer } from '../exercise-view/exercise-view';
import { MatchingGameStepView } from '../matching-game-step-view/matching-game-step-view';

/**
 * A pure "just play" screen for `category: 'game'` modules — no lesson map,
 * no week/welcome screens, and no reward ceremony at all. Games are for
 * taking a break, not for progress: stars, badges, and trophies only ever
 * come from lessons. Every exercise across every lesson is flattened into
 * one flat playthrough with no persistence, freely replayable.
 */
@Component({
  selector: 'app-game-player',
  standalone: true,
  imports: [ExerciseView, MatchingGameStepView],
  templateUrl: './game-player.html',
  styleUrl: './game-player.scss',
})
export class GamePlayer implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private moduleService = inject(ModuleService);
  private sidekick = inject(SidekickService);

  readonly loading = signal(true);
  readonly module = signal<Module | null>(null);
  readonly currentIndex = signal(0);
  readonly playing = signal(true);

  readonly student = computed(() => this.auth.currentUser() as Student);

  readonly flatExercises = computed<Exercise[]>(() => {
    const module = this.module();
    if (!module) return [];
    return [...module.lessons]
      .sort((a, b) => a.order - b.order)
      .flatMap((lesson) => [...lesson.exercises].sort((a, b) => a.order - b.order));
  });

  readonly currentExercise = computed<Exercise | null>(() => this.flatExercises()[this.currentIndex()] ?? null);
  readonly finished = computed(() => this.flatExercises().length > 0 && this.currentIndex() >= this.flatExercises().length);

  ngOnInit(): void {
    const moduleId = this.route.snapshot.paramMap.get('id');
    if (!moduleId) return;

    this.moduleService.getModuleById(moduleId).subscribe((module) => {
      if (!module) {
        this.router.navigate(['/student/games']);
        return;
      }
      this.module.set(module);
      this.loading.set(false);
    });
  }

  onAnswered(answer: ExerciseAnswer): void {
    if (!answer.correct) {
      this.sidekick.say('So close! You can do this — try again!', 'thinking', 2500);
      return;
    }
    this.currentIndex.update((i) => i + 1);
  }

  onMatchingContinued(): void {
    this.currentIndex.update((i) => i + 1);
  }

  playAgain(): void {
    this.currentIndex.set(0);
    // Toggle out and back in on the next tick to force a clean remount of
    // whichever exercise view is first — clearing any answered/matched state
    // left over from the previous round.
    this.playing.set(false);
    setTimeout(() => this.playing.set(true), 0);
  }

  backToGames(): void {
    this.router.navigate(['/student/games']);
  }
}
