import { Component, computed, input, output, signal } from '@angular/core';
import { WeeklyTaskPlannerStep } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

interface WeeklyPlannerTask {
  id: string;
  label: string;
}

@Component({
  selector: 'app-weekly-task-planner-step-view',
  standalone: true,
  templateUrl: './weekly-task-planner-step-view.html',
  styleUrl: './weekly-task-planner-step-view.scss',
})
export class WeeklyTaskPlannerStepView {
  readonly step = input.required<WeeklyTaskPlannerStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly tasksByDay = signal<Record<string, WeeklyPlannerTask[]>>({});
  private readonly drafts = signal<Record<string, string>>({});
  private readonly doneIds = signal<Set<string>>(new Set());
  readonly celebrationNote = signal('');
  readonly downloading = signal(false);

  tasksFor(dayId: string): WeeklyPlannerTask[] {
    return this.tasksByDay()[dayId] ?? [];
  }

  readonly totalCount = computed(() => this.step().days.reduce((sum, d) => sum + this.tasksFor(d.id).length, 0));
  readonly doneCount = computed(() => this.doneIds().size);
  readonly allDone = computed(() => this.totalCount() > 0 && this.doneCount() === this.totalCount());
  readonly progressPercent = computed(() => (this.totalCount() === 0 ? 0 : Math.round((this.doneCount() / this.totalCount()) * 100)));

  isDone(taskId: string): boolean {
    return this.doneIds().has(taskId);
  }

  toggle(taskId: string): void {
    this.doneIds.update((ids) => {
      const next = new Set(ids);
      next.has(taskId) ? next.delete(taskId) : next.add(taskId);
      return next;
    });
  }

  draftFor(dayId: string): string {
    return this.drafts()[dayId] ?? '';
  }

  updateDraft(dayId: string, value: string): void {
    this.drafts.update((d) => ({ ...d, [dayId]: value }));
  }

  addTask(dayId: string): void {
    const label = this.draftFor(dayId).trim();
    if (!label) return;
    const id = `task-${dayId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.tasksByDay.update((map) => ({ ...map, [dayId]: [...(map[dayId] ?? []), { id, label }] }));
    this.drafts.update((d) => ({ ...d, [dayId]: '' }));
  }

  updateCelebrationNote(value: string): void {
    this.celebrationNote.set(value);
  }

  proceed(): void {
    if (!this.allDone()) return;
    const values: Record<string, string> = { celebration: this.celebrationNote().trim() };
    this.step().days.forEach((day) => {
      values[day.id] = this.tasksFor(day.id)
        .map((task) => task.label)
        .join(', ');
    });
    this.submitted.emit(values);
  }

  async downloadCelebration(): Promise<void> {
    if (this.downloading() || !this.allDone()) return;
    this.downloading.set(true);
    try {
      const rows = this.step().days.map((day) => ({
        label: day.label,
        value: this.tasksFor(day.id).map((task) => `✓ ${task.label}`).join(', ') || '—',
      }));
      rows.push({ label: 'My Celebration', value: this.celebrationNote().trim() || "I did it! 🎉" });
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-celebration-box.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
