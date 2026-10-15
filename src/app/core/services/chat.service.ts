import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatContact, ChatMessage } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/messages`;

  /** Staff get every student as a contact; a student gets every staff member — whether or not they've messaged yet. */
  getConversations(): Observable<ChatContact[]> {
    return this.http.get<ChatContact[]>(`${this.apiUrl}/conversations`, { withCredentials: true });
  }

  getMessages(withUserId: string, after?: string): Observable<ChatMessage[]> {
    const url = after ? `${this.apiUrl}/${withUserId}?after=${encodeURIComponent(after)}` : `${this.apiUrl}/${withUserId}`;
    return this.http.get<ChatMessage[]>(url, { withCredentials: true });
  }

  sendMessage(recipientId: string, body: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.apiUrl, { recipientId, body }, { withCredentials: true });
  }

  markRead(withUserId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${withUserId}/read`, {}, { withCredentials: true });
  }
}
