import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../models/user.model';
import { BackendUser } from './auth.service';

/** One row of GET /api/students — a backend user plus the modules assigned to them. */
type BackendStudent = BackendUser & { assignedModuleIds: string[] };

/** Maps a backend student to the app's Student shape. */
export function toStudent(s: BackendStudent): Student {
  return {
    id: s.id,
    email: s.email,
    firstName: s.firstName,
    lastName: s.lastName,
    role: 'student',
    avatarId: s.avatarId ?? 'nova',
    avatarUrl: s.avatarUrl ?? undefined,
    profileImage: s.profileImage ?? undefined,
    createdAt: s.createdAt ?? '',
    hasSeenWelcome: s.hasSeenWelcome ?? false,
    streakCount: s.streakCount ?? 0,
    lastActiveDate: s.lastActiveDate ?? '',
    emailVerified: s.emailVerified ?? false,
    assignedModuleIds: s.assignedModuleIds,
    ageGroup: s.ageGroup ?? 'beginner',
    hasPaid: s.hasPaid ?? false,
  };
}

export type PaymentStatus = 'pending' | 'success' | 'failed';

/** One row of GET /api/payments — a payment attempt (any status), joined
 *  with who it's for and which module it was paying to unlock. */
export interface AdminPayment {
  id: string;
  reference: string;
  amountPesewas: number;
  currency: string;
  status: PaymentStatus;
  channel: 'card' | 'mobile_money';
  provider: string | null;
  moduleId: string | null;
  /** Falls back to the raw moduleId if the module was since deleted; null for
   *  historical payments made before per-module pricing existed. */
  moduleTitle: string | null;
  paidAt: string | null;
  createdAt: string;
  student: { id: string; firstName: string; lastName: string; email: string } | null;
}

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private http = inject(HttpClient);
  private readonly studentsUrl = `${environment.apiUrl}/students`;
  private readonly paymentsUrl = `${environment.apiUrl}/payments`;

  /** Every student account on the backend — every student now sees every
   *  age-appropriate module automatically (pay-as-you-go unlocks it), so this
   *  is no longer paired with a per-student module assignment list. */
  getStudents(): Observable<Student[]> {
    return this.http
      .get<BackendStudent[]>(this.studentsUrl, { withCredentials: true })
      .pipe(map((students) => students.map(toStudent)));
  }

  /** The admin payments ledger — every transaction across every student.
   *  Filtering happens client-side on the result (same pattern as the
   *  Students page), so no params are sent here; this always returns the
   *  full set an instructor/admin is allowed to see. */
  getPayments(): Observable<AdminPayment[]> {
    return this.http.get<AdminPayment[]>(this.paymentsUrl, { withCredentials: true });
  }
}
