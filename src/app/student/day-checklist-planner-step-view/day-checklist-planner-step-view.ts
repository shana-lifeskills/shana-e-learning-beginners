import { Component, computed, input, output, signal } from '@angular/core';
import { DayChecklistPlannerStep, DayChecklistSection, DayChecklistTask } from '../../core/models/module.model';
import { buildFieldsCardSvg, downloadPngFromSvg } from '../../shared/utils/card-image';

@Component({
  selector: 'app-day-checklist-planner-step-view',
  standalone: true,
  templateUrl: './day-checklist-planner-step-view.html',
  styleUrl: './day-checklist-planner-step-view.scss',
})
export class DayChecklistPlannerStepView {
  readonly step = input.required<DayChecklistPlannerStep>();
  readonly submitted = output<Record<string, string>>();

  readonly dateLabel = computed(
    () => this.step().dateLabel ?? new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
  );

  readonly customTasks = signal<Record<string, DayChecklistTask[]>>({});
  readonly drafts = signal<Record<string, string>>({});
  readonly doneIds = signal<Set<string>>(new Set());
  readonly downloading = signal(false);

  tasksFor(section: DayChecklistSection): DayChecklistTask[] {
    return [...section.tasks, ...(this.customTasks()[section.id] ?? [])];
  }

  readonly totalCount = computed(() => this.step().sections.reduce((sum, s) => sum + this.tasksFor(s).length, 0));
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

  draftFor(sectionId: string): string {
    return this.drafts()[sectionId] ?? '';
  }

  updateDraft(sectionId: string, value: string): void {
    this.drafts.update((d) => ({ ...d, [sectionId]: value }));
  }

  addTask(sectionId: string): void {
    const label = this.draftFor(sectionId).trim();
    if (!label) return;
    const id = `custom-${sectionId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.customTasks.update((map) => ({ ...map, [sectionId]: [...(map[sectionId] ?? []), { id, label }] }));
    this.drafts.update((d) => ({ ...d, [sectionId]: '' }));
  }

  next(): void {
    if (!this.allDone()) return;
    const values: Record<string, string> = {};
    this.step().sections.forEach((section) => {
      values[section.id] = this.tasksFor(section)
        .map((task) => task.label)
        .join(', ');
    });
    this.submitted.emit(values);
  }

  async downloadPlan(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    try {
      const rows = this.step().sections.map((section) => ({
        label: section.label,
        value:
          this.tasksFor(section)
            .map((task) => `${this.isDone(task.id) ? '✓ ' : ''}${task.label}`)
            .join(', ') || '—',
      }));
      const svg = buildFieldsCardSvg(this.step().cardTitle, rows);
      await downloadPngFromSvg(svg, 'my-saturday-planner.png');
    } finally {
      this.downloading.set(false);
    }
  }
}
