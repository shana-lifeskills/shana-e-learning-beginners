import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-feelings-review-welcome',
  standalone: true,
  templateUrl: './feelings-review-welcome.html',
  styleUrl: './feelings-review-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelingsReviewWelcome extends WelcomeVariantBase implements OnInit {
  @Input({ required: true }) frw!: NonNullable<Lesson['feelingsReviewWelcome']>;

  /** Which mood is picked — a purely decorative recap, not graded or saved. */
  readonly feelingsCheckSelectedId = signal<string | null>(null);

  ngOnInit(): void {
    this.feelingsCheckSelectedId.set(this.frw.defaultSelectedOptionId ?? null);
  }

  selectFeelingsOption(optionId: string): void {
    this.feelingsCheckSelectedId.set(optionId);
  }
}
