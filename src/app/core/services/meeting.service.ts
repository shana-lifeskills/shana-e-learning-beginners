import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Meeting } from '../models/meeting.model';

export interface CreateMeetingRequest {
  studentId: string;
  title: string;
  scheduledAt: string;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/meetings`;

  listMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl, { withCredentials: true });
  }

  getMeeting(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createMeeting(request: CreateMeetingRequest): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, request, { withCredentials: true });
  }

  cancelMeeting(id: string): Observable<Meeting> {
    return this.http.delete<Meeting>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
