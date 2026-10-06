import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrainerService } from '../../core/services/trainer.service';
import { Student } from '../../core/models/user.model';
import { AVATAR_EMOJI } from '../../shared/avatar-emoji';

type PaymentFilter = 'all' | 'paid' | 'unpaid';
type TypeFilter = 'all' | 'beginner' | 'advanced';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList implements OnInit {
  private trainerService = inject(TrainerService);

  readonly students = signal<Student[]>([]);
  readonly loading = signal(true);
  readonly avatarEmoji = AVATAR_EMOJI;

  readonly searchTerm = signal('');
  readonly paymentFilter = signal<PaymentFilter>('all');
  readonly typeFilter = signal<TypeFilter>('all');

  readonly filteredStudents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const payment = this.paymentFilter();
    const type = this.typeFilter();

    return this.students().filter((s) => {
      if (term) {
        const haystack = `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (payment === 'paid' && !s.hasPaid) return false;
      if (payment === 'unpaid' && s.hasPaid) return false;
      if (type !== 'all' && s.ageGroup !== type) return false;
      return true;
    });
  });

  ngOnInit(): void {
    this.trainerService.getStudents().subscribe((students) => {
      // Most recently created first, so a freshly signed-up student is
      // immediately visible at the top instead of buried alphabetically.
      const sorted = [...students].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      this.students.set(sorted);
      this.loading.set(false);
    });
  }

  updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  setPaymentFilter(value: PaymentFilter): void {
    this.paymentFilter.set(value);
  }

  setTypeFilter(value: TypeFilter): void {
    this.typeFilter.set(value);
  }

  joinedLabel(student: Student): string {
    if (!student.createdAt) return '—';
    return new Date(student.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
