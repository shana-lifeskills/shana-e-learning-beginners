import { Component, input, output } from '@angular/core';

export type AccountType = 'beginner' | 'advanced' | 'trainer';

interface AccountTypeOption {
  id: AccountType;
  label: string;
  description: string;
}

const OPTIONS: AccountTypeOption[] = [
  { id: 'beginner', label: 'Beginner', description: 'Just starting out — guided, playful lessons.' },
  { id: 'advanced', label: 'Advanced', description: 'Ready for deeper projects and challenges.' },
  { id: 'trainer', label: 'Admin', description: 'Upload and assign modules for your class.' },
];

/** The Beginner / Advanced / Admin card row shown on both the login and signup pages. */
@Component({
  selector: 'app-account-type-picker',
  standalone: true,
  templateUrl: './account-type-picker.html',
  styleUrl: './account-type-picker.scss',
})
export class AccountTypePicker {
  readonly heading = input('I\'m joining as a...');
  readonly selected = input.required<AccountType>();
  readonly selectedChange = output<AccountType>();

  readonly options = OPTIONS;

  choose(id: AccountType): void {
    this.selectedChange.emit(id);
  }
}
