import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RevenueOverTime {
  days: { date: string; revenuePesewas: number }[];
  totalRevenuePesewas: number;
}

export interface PaymentsByModule {
  moduleId: string;
  moduleTitle: string;
  successCount: number;
  revenuePesewas: number;
}

export interface PaymentStatusBreakdown {
  paidStudentCount: number;
  unpaidStudentCount: number;
  totalStudentCount: number;
}

export interface ModuleCompletion {
  moduleId: string;
  moduleTitle: string;
  startedCount: number;
  completedCount: number;
  completionRate: number;
}

export interface TopStudent {
  id: string;
  name: string;
  stars: number;
  badges: number;
  trophies: number;
}

/** Cross-student, aggregate reads for the admin Analytics page —
 *  instructor/admin only on the backend. */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/analytics`;

  revenueOverTime(days = 30): Observable<RevenueOverTime> {
    return this.http.get<RevenueOverTime>(`${this.apiUrl}/revenue-over-time`, { params: { days }, withCredentials: true });
  }

  paymentsByModule(): Observable<PaymentsByModule[]> {
    return this.http.get<PaymentsByModule[]>(`${this.apiUrl}/payments-by-module`, { withCredentials: true });
  }

  paymentStatus(): Observable<PaymentStatusBreakdown> {
    return this.http.get<PaymentStatusBreakdown>(`${this.apiUrl}/payment-status`, { withCredentials: true });
  }

  moduleCompletion(): Observable<ModuleCompletion[]> {
    return this.http.get<ModuleCompletion[]>(`${this.apiUrl}/module-completion`, { withCredentials: true });
  }

  topStudents(): Observable<TopStudent[]> {
    return this.http.get<TopStudent[]>(`${this.apiUrl}/top-students`, { withCredentials: true });
  }
}
