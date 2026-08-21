import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StudentService, RewardDetails } from '../../core/services/student.service';
import { Student } from '../../core/models/user.model';
import { RewardShelf } from '../../shared/components/reward-shelf/reward-shelf';

@Component({
  selector: 'app-rewards-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RewardShelf],
  templateUrl: './rewards-page.html',
  styleUrl: './rewards-page.scss',
})
export class RewardsPage implements OnInit {
  private auth = inject(AuthService);
  private studentService = inject(StudentService);

  readonly loading = signal(true);
  readonly details = signal<RewardDetails>({ totals: { stars: 0, badges: 0, trophies: 0 }, badges: [], trophies: [] });

  ngOnInit(): void {
    const student = this.auth.currentUser() as Student;
    if (!student) return;

    this.studentService.getRewardDetails(student.id).subscribe((details) => {
      this.details.set(details);
      this.loading.set(false);
    });
  }
}
