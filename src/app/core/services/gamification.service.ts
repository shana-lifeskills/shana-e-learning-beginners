import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RawRewardDetails, RewardEvent, RewardKind, RewardTotals } from '../models/gamification.model';

/**
 * Talks to the backend's idempotent star/badge/trophy bookkeeping (see
 * `/api/progress/rewards/*` and the standalone star endpoint). Badge/trophy awarding
 * itself happens server-side as part of `ProgressService`'s step-completion call — this
 * service's `awardStar` is only used for the one standalone case (a story-tabs
 * sub-question) that isn't part of the normal advance-a-step flow.
 *
 * Also owns `rewardEvent$`, a purely local event bus (no server round-trip) that any
 * component (e.g. the global celebration overlay) can react to whenever a reward is
 * newly earned, wherever that happens.
 */
@Injectable({ providedIn: 'root' })
export class GamificationService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/progress`;

  private readonly rewardEventSubject = new Subject<RewardEvent>();
  readonly rewardEvent$ = this.rewardEventSubject.asObservable();

  awardStar(studentId: string, moduleId: string, exerciseId: string): Observable<boolean> {
    return this.http
      .post<{ awarded: boolean }>(`${this.apiUrl}/${moduleId}/stars/${exerciseId}`, {}, { withCredentials: true })
      .pipe(
        map(({ awarded }) => {
          if (awarded) this.notifyReward('star', 1, 'Great job! You earned a star!');
          return awarded;
        })
      );
  }

  getTotals(studentId?: string): Observable<RewardTotals> {
    return this.http.get<RewardTotals>(`${this.apiUrl}/rewards/totals`, {
      params: studentId ? { studentId } : {},
      withCredentials: true,
    });
  }

  getDetails(studentId?: string): Observable<RawRewardDetails> {
    return this.http.get<RawRewardDetails>(`${this.apiUrl}/rewards/details`, {
      params: studentId ? { studentId } : {},
      withCredentials: true,
    });
  }

  getStarsThisWeek(studentId?: string): Observable<{ starsThisWeek: number }> {
    return this.http.get<{ starsThisWeek: number }>(`${this.apiUrl}/rewards/stars-this-week`, {
      params: studentId ? { studentId } : {},
      withCredentials: true,
    });
  }

  /** Fires the local celebration-toast event with no server round-trip — used by
   *  ProgressService after a step-completion response reports what was newly awarded. */
  notifyReward(kind: RewardKind, count: number, message: string): void {
    this.rewardEventSubject.next({ kind, count, message });
  }
}
