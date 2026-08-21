import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import { ProudMomentStep } from '../../core/models/module.model';

const BRUSH_COLORS = ['#ff6f59', '#ffc93c', '#6bcb77', '#4ecdc4', '#a66dd4', '#ff8fa3'];

@Component({
  selector: 'app-proud-moment-step-view',
  standalone: true,
  templateUrl: './proud-moment-step-view.html',
  styleUrl: './proud-moment-step-view.scss',
})
export class ProudMomentStepView {
  readonly step = input.required<ProudMomentStep>();
  readonly submitted = output<Record<string, string>>();

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly colors = BRUSH_COLORS;
  readonly selectedPromptId = signal<string | null>(null);
  readonly textAnswer = signal('');
  readonly brushColor = signal(BRUSH_COLORS[0]);
  readonly brushSize = signal(15);
  readonly hasDrawing = signal(false);
  readonly locked = signal(false);

  readonly canSubmit = computed(() => this.textAnswer().trim().length > 0 || this.hasDrawing());

  private drawing = false;
  private lastX = 0;
  private lastY = 0;

  selectPrompt(id: string): void {
    this.selectedPromptId.set(this.selectedPromptId() === id ? null : id);
  }

  updateText(value: string): void {
    this.textAnswer.set(value);
  }

  setColor(color: string): void {
    this.brushColor.set(color);
  }

  setBrushSize(value: string): void {
    this.brushSize.set(Number(value));
  }

  onPointerDown(event: PointerEvent): void {
    if (this.locked()) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    this.drawing = true;
    const point = this.pointFromEvent(canvas, event);
    this.lastX = point.x;
    this.lastY = point.y;
    this.drawDot(canvas, point.x, point.y);
    this.hasDrawing.set(true);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.drawing || this.locked()) return;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const point = this.pointFromEvent(canvas, event);
    this.drawLine(canvas, this.lastX, this.lastY, point.x, point.y);
    this.lastX = point.x;
    this.lastY = point.y;
  }

  onPointerUp(): void {
    this.drawing = false;
  }

  clearDrawing(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    this.hasDrawing.set(false);
  }

  submit(): void {
    if (!this.canSubmit() || this.locked()) return;
    this.locked.set(true);

    const values: Record<string, string> = {};
    const promptId = this.selectedPromptId();
    if (promptId && this.textAnswer().trim()) {
      values['promptId'] = promptId;
      values['story'] = this.textAnswer().trim();
    }
    if (this.hasDrawing()) {
      const canvas = this.canvasRef()?.nativeElement;
      if (canvas) values['drawing'] = canvas.toDataURL('image/png');
    }
    this.submitted.emit(values);
  }

  private pointFromEvent(canvas: HTMLCanvasElement, event: PointerEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
  }

  private drawDot(canvas: HTMLCanvasElement, x: number, y: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = this.brushColor();
    ctx.beginPath();
    ctx.arc(x, y, this.brushSize() / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawLine(canvas: HTMLCanvasElement, x1: number, y1: number, x2: number, y2: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.brushColor();
    ctx.lineWidth = this.brushSize();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
