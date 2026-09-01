import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ServicePlaceMatchItem, ServicePlaceMatchStep } from '../../core/models/module.model';

type Place = 'home' | 'school';

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Where Does It Belong?" sorting warm-up (Service Module, Week 2). Helpful-act
 * cards start shuffled in a bank; the learner drags each one (or tap-selects
 * then taps a basket) into "At Home" or "At School". A wrong drop shakes and
 * bounces the card back; a correct drop drops it into the basket. The Continue
 * button is withheld until every card is sorted correctly.
 */
@Component({
  selector: 'app-service-place-match-step-view',
  standalone: true,
  templateUrl: './service-place-match-step-view.html',
  styleUrl: './service-place-match-step-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePlaceMatchStepView {
  readonly step = input.required<ServicePlaceMatchStep>();
  readonly continued = output<void>();

  private readonly shuffleTick = signal(0);
  readonly bank = computed(() => {
    this.shuffleTick();
    return shuffled(this.step().items);
  });

  readonly placedIds = signal<Set<string>>(new Set());
  readonly selectedId = signal<string | null>(null);
  readonly wrongZone = signal<Place | null>(null);
  private draggingId: string | null = null;

  readonly remaining = computed(() => this.bank().filter((i) => !this.placedIds().has(i.id)));
  readonly allPlaced = computed(() => this.placedIds().size === this.step().items.length);

  itemsInZone(zone: Place): ServicePlaceMatchItem[] {
    return this.step().items.filter((i) => i.place === zone && this.placedIds().has(i.id));
  }

  isZoneWrong(zone: Place): boolean {
    return this.wrongZone() === zone;
  }

  selectItem(id: string): void {
    if (this.wrongZone()) return;
    this.selectedId.set(this.selectedId() === id ? null : id);
  }

  placeInZone(zone: Place): void {
    if (this.wrongZone()) return;
    const id = this.selectedId();
    if (!id) return;
    this.attempt(id, zone);
  }

  onDragStart(event: DragEvent, id: string): void {
    this.draggingId = id;
    event.dataTransfer?.setData('text/plain', id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onZoneDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onZoneDrop(event: DragEvent, zone: Place): void {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain') || this.draggingId;
    this.draggingId = null;
    if (!id) return;
    this.attempt(id, zone);
  }

  private attempt(id: string, zone: Place): void {
    this.selectedId.set(null);
    if (this.placedIds().has(id)) return;
    const item = this.step().items.find((i) => i.id === id);
    if (!item) return;

    if (item.place === zone) {
      this.placedIds.update((ids) => new Set(ids).add(id));
      return;
    }

    this.wrongZone.set(zone);
    setTimeout(() => this.wrongZone.set(null), 500);
  }

  startOver(): void {
    this.placedIds.set(new Set());
    this.selectedId.set(null);
    this.wrongZone.set(null);
    this.shuffleTick.update((t) => t + 1);
  }

  finish(): void {
    if (!this.allPlaced()) return;
    this.continued.emit();
  }
}
