import { Component, computed, input, output } from '@angular/core';

export type AccountType = 'beginner' | 'advanced' | 'trainer' | 'coach';

interface AccountTypeOption {
  id: AccountType;
  label: string;
  description: string;
}

const OPTIONS: AccountTypeOption[] = [
  { id: 'beginner', label: 'Beginner', description: 'Just starting out — guided, playful lessons.' },
  { id: 'advanced', label: 'Advanced', description: 'Ready for deeper projects and challenges.' },
  { id: 'trainer', label: 'Admin', description: 'Upload and assign modules for your class.' },
  { id: 'coach', label: 'Trainer', description: 'Review assignments and track student progress.' },
];

/** The Beginner / Advanced / Admin / Trainer card row shown on both the login and signup pages. */
@Component({
  selector: 'app-account-type-picker',
  standalone: true,
  templateUrl: './account-type-picker.html',
  styleUrl: './account-type-picker.scss',
})
export class AccountTypePicker {
  readonly heading = input('I\'m joining as a...');
  readonly selected = input.required<AccountType>();
  /** Which cards to offer — signup passes only the student types, since staff accounts are admin-created. */
  readonly types = input<readonly AccountType[]>(OPTIONS.map((o) => o.id));
  readonly selectedChange = output<AccountType>();

  readonly options = computed(() => OPTIONS.filter((o) => this.types().includes(o.id)));

  choose(id: AccountType): void {
    this.selectedChange.emit(id);
  }
}
