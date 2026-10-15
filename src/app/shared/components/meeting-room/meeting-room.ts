import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth.service';
import { MeetingService } from '../../../core/services/meeting.service';
import { Meeting } from '../../../core/models/meeting.model';

@Component({
  selector: 'app-meeting-room',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meeting-room.html',
  styleUrl: './meeting-room.scss',
})
export class MeetingRoom implements OnInit {
  private route = inject(ActivatedRoute);
  private meetingService = inject(MeetingService);
  private sanitizer = inject(DomSanitizer);
  private auth = inject(AuthService);

  readonly meeting = signal<Meeting | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly embedUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.meetingService.getMeeting(id).subscribe({
      next: (meeting) => {
        this.meeting.set(meeting);
        const displayName = this.auth.currentUser() ? `${this.auth.currentUser()!.firstName} ${this.auth.currentUser()!.lastName}` : '';
        // Jitsi's URL-hash config parses each value as JSON, so a string needs its own quotes encoded in.
        const url = `${meeting.roomUrl}#userInfo.displayName=${encodeURIComponent(JSON.stringify(displayName))}`;
        this.embedUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }

  backPath(): string[] {
    const role = this.auth.currentUser()?.role;
    const base = role === 'trainer' ? '/admin' : role === 'coach' ? '/coach' : '/student';
    return [base, 'meetings'];
  }
}
