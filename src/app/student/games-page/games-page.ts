import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/user.model';
import { ModuleWithProgress } from '../../core/models/module.model';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-page.html',
  styleUrl: './games-page.scss',
})
export class GamesPage implements OnInit {
  private auth = inject(AuthService);
  private studentService = inject(StudentService);
  private router = inject(Router);

  readonly student = computed(() => this.auth.currentUser() as Student);
  private readonly allModules = signal<ModuleWithProgress[]>([]);
  readonly loading = signal(true);

  readonly games = computed(() => this.allModules().filter((m) => m.category === 'game'));

  ngOnInit(): void {
    const student = this.student();
    if (!student) return;

    this.studentService.getModulesForStudent(student.id).subscribe((modules) => {
      this.allModules.set(modules);
      this.loading.set(false);
    });
  }

  openGame(moduleId: string): void {
    this.router.navigate(['/student/games', moduleId]);
  }
}
