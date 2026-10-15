import { Routes } from '@angular/router';
import { studentGuard } from './core/guards/student.guard';
import { trainerGuard } from './core/guards/trainer.guard';
import { coachGuard } from './core/guards/coach.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signup' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then((m) => m.Login) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then((m) => m.Signup) },
  { path: 'verify-email', loadComponent: () => import('./auth/verify-email/verify-email').then((m) => m.VerifyEmail) },
  {
    path: 'student',
    canActivate: [studentGuard],
    children: [
      { path: '', loadComponent: () => import('./student/student-home/student-home').then((m) => m.StudentHome) },
      { path: 'module/:id', loadComponent: () => import('./student/module-player/module-player').then((m) => m.ModulePlayer) },
      { path: 'rewards', loadComponent: () => import('./student/rewards-page/rewards-page').then((m) => m.RewardsPage) },
      { path: 'games', loadComponent: () => import('./student/games-page/games-page').then((m) => m.GamesPage) },
      { path: 'games/:id', loadComponent: () => import('./student/game-player/game-player').then((m) => m.GamePlayer) },
      { path: 'assignments', loadComponent: () => import('./student/assignments/assignments').then((m) => m.StudentAssignments) },
      { path: 'chat', loadComponent: () => import('./shared/components/chat-panel/chat-panel').then((m) => m.ChatPanel) },
      { path: 'meetings', loadComponent: () => import('./shared/components/meetings-panel/meetings-panel').then((m) => m.MeetingsPanel) },
      { path: 'meeting/:id', loadComponent: () => import('./shared/components/meeting-room/meeting-room').then((m) => m.MeetingRoom) },
    ],
  },
  {
    path: 'coach',
    canActivate: [coachGuard],
    children: [
      { path: '', loadComponent: () => import('./coach/dashboard/dashboard').then((m) => m.CoachDashboard) },
      { path: 'assignments', loadComponent: () => import('./coach/assignments/assignments').then((m) => m.CoachAssignments) },
      { path: 'assignments/:id', loadComponent: () => import('./coach/assignment-detail/assignment-detail').then((m) => m.AssignmentDetail) },
      { path: 'chat', loadComponent: () => import('./shared/components/chat-panel/chat-panel').then((m) => m.ChatPanel) },
      { path: 'meetings', loadComponent: () => import('./shared/components/meetings-panel/meetings-panel').then((m) => m.MeetingsPanel) },
      { path: 'meeting/:id', loadComponent: () => import('./shared/components/meeting-room/meeting-room').then((m) => m.MeetingRoom) },
    ],
  },
  {
    path: 'admin',
    canActivate: [trainerGuard],
    children: [
      { path: '', loadComponent: () => import('./trainer/dashboard/dashboard').then((m) => m.TrainerDashboard) },
      { path: 'students', loadComponent: () => import('./trainer/students-list/students-list').then((m) => m.StudentsList) },
      { path: 'payments', loadComponent: () => import('./trainer/payments-list/payments-list').then((m) => m.PaymentsList) },
      { path: 'analytics', loadComponent: () => import('./trainer/analytics/analytics').then((m) => m.Analytics) },
      { path: 'modules', loadComponent: () => import('./trainer/module-list/module-list').then((m) => m.ModuleList) },
      { path: 'modules/new', loadComponent: () => import('./trainer/module-editor/module-editor').then((m) => m.ModuleEditor) },
      { path: 'chat', loadComponent: () => import('./shared/components/chat-panel/chat-panel').then((m) => m.ChatPanel) },
      { path: 'meetings', loadComponent: () => import('./shared/components/meetings-panel/meetings-panel').then((m) => m.MeetingsPanel) },
      { path: 'meeting/:id', loadComponent: () => import('./shared/components/meeting-room/meeting-room').then((m) => m.MeetingRoom) },
    ],
  },
  { path: '**', redirectTo: 'signup' },
];
