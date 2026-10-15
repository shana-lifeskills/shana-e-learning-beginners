import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { MeetingService } from '../../../core/services/meeting.service';
import { ChatContact } from '../../../core/models/chat.model';
import { Meeting } from '../../../core/models/meeting.model';

@Component({
  selector: 'app-meetings-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './meetings-panel.html',
  styleUrl: './meetings-panel.scss',
})
export class MeetingsPanel implements OnInit {
  private auth = inject(AuthService);
  private chat = inject(ChatService);
  private meetingService = inject(MeetingService);

  readonly isStaff = computed(() => this.auth.currentUser()?.role === 'trainer' || this.auth.currentUser()?.role === 'coach');

  readonly meetings = signal<Meeting[]>([]);
  readonly loading = signal(true);
  readonly students = signal<ChatContact[]>([]);

  readonly upcoming = computed(() => this.meetings().filter((m) => !m.canceledAt && new Date(m.scheduledAt) >= this.startOfToday()));
  readonly past = computed(() => this.meetings().filter((m) => m.canceledAt || new Date(m.scheduledAt) < this.startOfToday()));

  // Schedule-form state (staff only).
  readonly selectedStudentId = signal('');
  readonly title = signal('');
  readonly scheduledAt = signal('');
  readonly creating = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadMeetings();
    if (this.isStaff()) {
      this.chat.getConversations().subscribe((contacts) => this.students.set(contacts));
    }
  }

  private loadMeetings(): void {
    this.meetingService.listMeetings().subscribe((meetings) => {
      this.meetings.set(meetings);
      this.loading.set(false);
    });
  }

  private startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  scheduleMeeting(): void {
    const studentId = this.selectedStudentId();
    const title = this.title().trim();
    const scheduledAt = this.scheduledAt();
    if (!studentId || !title || !scheduledAt) {
      this.errorMessage.set('Pick a student, a title, and a date/time.');
      return;
    }

    this.creating.set(true);
    this.errorMessage.set('');
    this.meetingService.createMeeting({ studentId, title, scheduledAt: new Date(scheduledAt).toISOString() }).subscribe({
      next: (meeting) => {
        this.meetings.update((list) => [...list, meeting]);
        this.title.set('');
        this.scheduledAt.set('');
        this.selectedStudentId.set('');
        this.creating.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not schedule that meeting — try again.');
        this.creating.set(false);
      },
    });
  }

  cancelMeeting(meeting: Meeting): void {
    this.meetingService.cancelMeeting(meeting.id).subscribe((updated) => {
      this.meetings.update((list) => list.map((m) => (m.id === updated.id ? updated : m)));
    });
  }

  joinPath(meeting: Meeting): string[] {
    const role = this.auth.currentUser()?.role;
    const base = role === 'trainer' ? '/admin' : role === 'coach' ? '/coach' : '/student';
    return [base, 'meeting', meeting.id];
  }
}
