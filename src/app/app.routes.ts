import { Routes } from '@angular/router';
import { studentGuard } from './core/guards/student.guard';
import { trainerGuard } from './core/guards/trainer.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', loadComponent: () => import('./auth/role-select/role-select').then((m) => m.RoleSelect) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then((m) => m.Login) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then((m) => m.Signup) },
  {
    path: 'student',
    canActivate: [studentGuard],
    children: [
      { path: '', loadComponent: () => import('./student/dashboard/dashboard').then((m) => m.Dashboard) },
      { path: 'module/:id', loadComponent: () => import('./student/module-player/module-player').then((m) => m.ModulePlayer) },
      { path: 'rewards', loadComponent: () => import('./student/rewards-page/rewards-page').then((m) => m.RewardsPage) },
      { path: 'games', loadComponent: () => import('./student/games-page/games-page').then((m) => m.GamesPage) },
      { path: 'games/:id', loadComponent: () => import('./student/game-player/game-player').then((m) => m.GamePlayer) },
    ],
  },
  {
    path: 'trainer',
    canActivate: [trainerGuard],
    children: [
      { path: '', loadComponent: () => import('./trainer/dashboard/dashboard').then((m) => m.TrainerDashboard) },
      { path: 'modules', loadComponent: () => import('./trainer/module-list/module-list').then((m) => m.ModuleList) },
      { path: 'modules/new', loadComponent: () => import('./trainer/module-editor/module-editor').then((m) => m.ModuleEditor) },
      { path: 'modules/:id/assign', loadComponent: () => import('./trainer/assign-module/assign-module').then((m) => m.AssignModule) },
    ],
  },
  { path: '**', redirectTo: 'welcome' },
];
