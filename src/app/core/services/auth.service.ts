import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { COLLECTIONS } from './collections';
import { AgeGroup, AppUser, Role, Student, Trainer } from '../models/user.model';

const SESSION_KEY = 'session_user_id';

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  ageGroup?: AgeGroup;
  avatarUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Reactive current-session user, readable from anywhere without subscribing. */
  readonly currentUser = signal<AppUser | null>(null);

  constructor(private db: DatabaseService) {
    const savedId = this.db.getString(SESSION_KEY);
    if (savedId) {
      const user = this.db.getById<AppUser>(COLLECTIONS.users, savedId);
      if (user) this.currentUser.set(this.bumpStreak(user));
    }
  }

  createAccount(payload: SignupPayload): Observable<AppUser> {
    const users = this.db.getAll<AppUser>(COLLECTIONS.users);
    const normalizedEmail = payload.email.trim().toLowerCase();
    const emailTaken = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (emailTaken) {
      return throwError(() => new Error('That email is already being used by another account.'));
    }

    const base = {
      id: this.db.generateId(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password.trim(),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      avatarId: this.randomAvatar(),
      avatarUrl: payload.avatarUrl,
      createdAt: new Date().toISOString(),
      hasSeenWelcome: false,
      streakCount: 0,
      lastActiveDate: '',
    };

    const user: AppUser =
      payload.role === 'student'
        ? ({ ...base, role: 'student', assignedModuleIds: [], ageGroup: payload.ageGroup ?? 'beginner' } as Student)
        : ({ ...base, role: 'trainer', createdModuleIds: [] } as Trainer);

    this.db.insert(COLLECTIONS.users, user);

    return of(user).pipe(
      delay(200),
      tap((created) => this.startSession(created))
    );
  }

  login(email: string, password: string): Observable<AppUser> {
    const users = this.db.getAll<AppUser>(COLLECTIONS.users);
    const normalizedEmail = email.trim().toLowerCase();
    const account = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!account) {
      return throwError(() => new Error("We couldn't find an account with that email. Double-check it, or create a new account."));
    }
    if (account.password !== password.trim()) {
      return throwError(() => new Error('That password doesn’t match this account. Try again?'));
    }

    return of(account).pipe(
      delay(200),
      tap((user) => this.startSession(user))
    );
  }

  logout(): void {
    this.db.removeKey(SESSION_KEY);
    this.currentUser.set(null);
  }

  markWelcomeSeen(userId: string): void {
    const updated = this.db.update<AppUser>(COLLECTIONS.users, userId, { hasSeenWelcome: true });
    if (updated) this.currentUser.set(updated);
  }

  refreshCurrentUser(): void {
    const current = this.currentUser();
    if (!current) return;
    const fresh = this.db.getById<AppUser>(COLLECTIONS.users, current.id);
    if (fresh) this.currentUser.set(fresh);
  }

  private startSession(user: AppUser): void {
    this.db.setString(SESSION_KEY, user.id);
    this.currentUser.set(this.bumpStreak(user));
  }

  /** Increments the streak once per calendar day, resets it if a day was missed. */
  private bumpStreak(user: AppUser): AppUser {
    const today = new Date().toISOString().slice(0, 10);
    if (user.lastActiveDate === today) return user;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streakCount = user.lastActiveDate === yesterday ? user.streakCount + 1 : 1;

    return this.db.update<AppUser>(COLLECTIONS.users, user.id, { streakCount, lastActiveDate: today }) ?? user;
  }

  private randomAvatar(): string {
    const avatars = ['fox', 'panda', 'owl', 'otter', 'dino', 'unicorn'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }
}
