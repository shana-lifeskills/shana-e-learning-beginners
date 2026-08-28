import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { Lesson } from '../../core/models/module.model';
import { WelcomeVariantBase } from '../lesson-welcome-view/welcome-variant-base';

@Component({
  selector: 'app-feelings-check-welcome',
  standalone: true,
  templateUrl: './feelings-check-welcome.html',
  styleUrl: './feelings-check-welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelingsCheckWelcome extends WelcomeVariantBase implements OnInit {
  @Input({ required: true }) fw!: NonNullable<Lesson['feelingsCheckWelcome']>;

  /** Which mood is picked — a purely decorative recap, not graded or saved. */
  readonly feelingsCheckSelectedId = signal<string | null>(null);

  ngOnInit(): void {
    this.feelingsCheckSelectedId.set(this.fw.defaultSelectedOptionId ?? null);
  }

  selectFeelingsOption(optionId: string): void {
    this.feelingsCheckSelectedId.set(optionId);
  }
}
