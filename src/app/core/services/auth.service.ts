import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, map, of, switchMap, tap, throwError } from 'rxjs';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { environment } from '../../../environments/environment';
import { AgeGroup, AppUser, Coach, Role, Student, Trainer } from '../models/user.model';

const SESSION_KEY = 'session_user_id';

/** The child-registration details collected by StudentSignupStepper —
 *  sent to the backend as-is and validated there (see auth.js). */
export interface StudentProfilePayload {
  middleName?: string;
  preferredName?: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  age: number;
  school: string;
  gradeClass: string;
  country: string;
  parentGuardianName: string;
  parentPhone: string;
  parentWhatsapp: string;
  enrolProgram: 'soft-skills' | 'tech-skills' | 'language-skills' | 'personal-coaching';
  howDidYouHear: string[];
  howDidYouHearOther?: string;
  growthAreas: string;
  desiredSkills: string;
  termsAccepted: boolean;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  role?: 'student' | 'admin' | 'instructor';
  ageGroup?: AgeGroup;
  /** Only present for the student signup stepper. */
  studentProfile?: StudentProfilePayload;
}

/** The user shape the backend returns from /auth/* and /users/me. */
export interface BackendUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string | null;
  role: 'student' | 'instructor' | 'admin';
  hasPaid?: boolean;
  emailVerified?: boolean;
  ageGroup?: AgeGroup;
  avatarId?: string | null;
  avatarUrl?: string | null;
  hasSeenWelcome?: boolean;
  streakCount?: number;
  lastActiveDate?: string | null;
  createdAt?: string;
}

interface AuthResponse {
  accessToken: string;
  user: BackendUser;
}

/**
 * Talks to the real backend for identity (register/login/refresh/logout), profile
 * (age group, avatar, welcome state, streak), assigned modules and payment
 * entitlement (hasPaid). The backend's values always win; a copy is kept in the
 * local mock DB, keyed by the backend user id, because module/progress views still
 * read the current student from there.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private db = inject(DatabaseService);

  /** Reactive current-session user, readable from anywhere without subscribing. */
  readonly currentUser = signal<AppUser | null>(null);
  /** In-memory only — never persisted, since a page reload re-derives it via /auth/refresh. */
  readonly accessToken = signal<string | null>(null);
  /** True once the initial silent-refresh attempt on app boot has settled. */
  readonly ready = signal(false);

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  /** Awaited by the app initializer before the router activates any guarded route. */
  async init(): Promise<void> {
    try {
      await firstValueFrom(this.silentRefresh());
    } finally {
      this.ready.set(true);
    }
  }

  register(payload: SignupPayload): Observable<AppUser> {
    const body = {
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      ...(payload.profileImage ? { profileImage: payload.profileImage } : {}),
      ...(payload.role ? { role: payload.role } : {}),
      ...(payload.ageGroup ? { ageGroup: payload.ageGroup } : {}),
      ...(payload.studentProfile ? { studentProfile: payload.studentProfile } : {}),
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, body, { withCredentials: true }).pipe(
      switchMap(({ accessToken, user }) => {
        this.accessToken.set(accessToken);
        return this.mergeIdentity(user, payload.ageGroup);
      }),
      tap((merged) => this.startSession(merged)),
      catchError((err) => throwError(() => new Error(this.friendlyError(err, 'signup'))))
    );
  }

  login(email: string, password: string): Observable<AppUser> {
    const body = { email: email.trim().toLowerCase(), password };

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body, { withCredentials: true }).pipe(
      switchMap(({ accessToken, user }) => {
        this.accessToken.set(accessToken);
        return this.mergeIdentity(user);
      }),
      tap((merged) => this.startSession(merged)),
      catchError((err) => throwError(() => new Error(this.friendlyError(err, 'login'))))
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      complete: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  /** Used by the HTTP interceptor to retry a request after a 401. */
  refreshAccessToken(): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap(({ accessToken }) => this.accessToken.set(accessToken)),
      map(({ accessToken }) => accessToken),
      catchError((err) => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  /** Records the welcome as seen locally (instant) and on the backend, so it doesn't pop up again on another device. */
  markWelcomeSeen(userId: string): void {
    const updated = this.db.update<AppUser>(COLLECTIONS.users, userId, { hasSeenWelcome: true });
    if (updated) this.currentUser.set(updated);
    // If this write fails the local flag still hides the welcome here; the worst
    // case is seeing it once more on another device — not worth interrupting a child.
    this.saveProfile({ hasSeenWelcome: true });
  }

  refreshCurrentUser(): void {
    const current = this.currentUser();
    if (!current) return;
    const fresh = this.db.getById<AppUser>(COLLECTIONS.users, current.id);
    if (fresh) this.currentUser.set(fresh);
  }

  /**
   * Re-fetches identity from the backend and re-merges it into `currentUser` —
   * used right after a verified payment, so `hasPaid` (now backend-owned)
   * reflects the just-confirmed entitlement without forcing a full re-login.
   */
  refreshCurrentUserFromBackend(): Observable<AppUser> {
    return this.http.get<BackendUser>(`${environment.apiUrl}/users/me`, { withCredentials: true }).pipe(
      switchMap((user) => this.mergeIdentity(user)),
      tap((merged) => this.currentUser.set(merged))
    );
  }

  /** Verifies an email using the token from the verification link — called
   *  by the /verify-email page, which the emailed link points to. */
  verifyEmail(token: string): Observable<{ message: string; emailVerified: boolean }> {
    return this.http.get<{ message: string; emailVerified: boolean }>(`${this.apiUrl}/verify-email`, {
      params: { token },
      withCredentials: true,
    });
  }

  /** Re-sends the verification email to the signed-in user, then refreshes
   *  `currentUser` in case verification state changed since last checked. */
  resendVerificationEmail(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/resend-verification`, {}, { withCredentials: true });
  }

  private silentRefresh(): Observable<void> {
    return this.refreshAccessToken().pipe(
      switchMap(() => this.http.get<BackendUser>(`${environment.apiUrl}/users/me`, { withCredentials: true })),
      switchMap((user) => this.mergeIdentity(user)),
      tap((merged) => this.startSession(merged)),
      map(() => void 0),
      catchError(() => of(void 0))
    );
  }

  private startSession(user: AppUser): void {
    this.db.setString(SESSION_KEY, user.id);
    this.currentUser.set(this.bumpStreak(user));
  }

  private clearSession(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    this.db.removeKey(SESSION_KEY);
  }

  /**
   * Builds the app's user from a fresh backend identity. Profile fields come from the
   * backend (so they follow the user across devices), falling back to this browser's
   * copy only for accounts the backend hasn't stored a value for yet. For a student,
   * assigned modules are fetched from the backend too. Returns an Observable since
   * that fetch is an HTTP call.
   */
  private mergeIdentity(backendUser: BackendUser, ageGroupHint?: AgeGroup): Observable<AppUser> {
    const existing = this.db.getById<AppUser>(COLLECTIONS.users, backendUser.id);
    const role: Role =
      backendUser.role === 'student' ? 'student' : backendUser.role === 'instructor' ? 'coach' : 'trainer';

    const avatarId = backendUser.avatarId ?? existing?.avatarId ?? this.randomAvatar();
    if (!backendUser.avatarId) this.saveProfile({ avatarId });

    const base = {
      id: backendUser.id,
      email: backendUser.email,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      profileImage: backendUser.profileImage ?? undefined,
      avatarId,
      avatarUrl: backendUser.avatarUrl ?? existing?.avatarUrl,
      createdAt: backendUser.createdAt ?? existing?.createdAt ?? new Date().toISOString(),
      // Once seen anywhere, stays seen.
      hasSeenWelcome: (backendUser.hasSeenWelcome ?? false) || (existing?.hasSeenWelcome ?? false),
      streakCount: backendUser.streakCount ?? existing?.streakCount ?? 0,
      lastActiveDate: backendUser.lastActiveDate ?? existing?.lastActiveDate ?? '',
      emailVerified: backendUser.emailVerified ?? false,
    };

    if (role === 'trainer') {
      const trainer: Trainer = {
        ...base,
        role: 'trainer',
        createdModuleIds: (existing as Trainer | undefined)?.createdModuleIds ?? [],
      };
      this.db.upsert(COLLECTIONS.users, trainer);
      return of(trainer);
    }

    if (role === 'coach') {
      const coach: Coach = { ...base, role: 'coach' };
      this.db.upsert(COLLECTIONS.users, coach);
      return of(coach);
    }

    return this.http
      .get<{ studentId: string; moduleIds: string[] }>(`${environment.apiUrl}/assignments/${backendUser.id}`, {
        withCredentials: true,
      })
      .pipe(
        map(({ moduleIds }) => moduleIds),
        catchError(() => of((existing as Student | undefined)?.assignedModuleIds ?? [])),
        map((assignedModuleIds) => {
          const student: Student = {
            ...base,
            role: 'student',
            assignedModuleIds,
            ageGroup: backendUser.ageGroup ?? (existing as Student | undefined)?.ageGroup ?? ageGroupHint ?? 'beginner',
            hasPaid: backendUser.hasPaid ?? false,
          };
          this.db.upsert(COLLECTIONS.users, student);
          return student;
        })
      );
  }

  /** Fire-and-forget profile write to the backend; the local copy is already updated. */
  private saveProfile(changes: { avatarId?: string; hasSeenWelcome?: boolean }): void {
    this.http.put(`${environment.apiUrl}/users/me`, changes, { withCredentials: true }).subscribe({ error: () => undefined });
  }

  /** Increments the streak once per calendar day, resets it if a day was missed. The
   *  backend already counts each login/refresh, so with a current backend value this is
   *  a no-op; it only covers a session whose backend streak couldn't be read. */
  private bumpStreak(user: AppUser): AppUser {
    const today = new Date().toISOString().slice(0, 10);
    if (user.lastActiveDate === today) return user;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streakCount = user.lastActiveDate === yesterday ? user.streakCount + 1 : 1;

    return this.db.update<AppUser>(COLLECTIONS.users, user.id, { streakCount, lastActiveDate: today }) ?? user;
  }

  private randomAvatar(): string {
    const avatars = ['nova', 'milo', 'zoe', 'kai', 'ruby', 'theo'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  private friendlyError(err: unknown, context: 'login' | 'signup'): string {
    const httpErr = err as HttpErrorResponse;
    const backendMessage = httpErr?.error?.message as string | undefined;
    if (backendMessage) return backendMessage;
    return context === 'login'
      ? "We couldn't sign you in. Double-check your email and password, then try again."
      : "We couldn't create your account. Please try again in a moment.";
  }
}
