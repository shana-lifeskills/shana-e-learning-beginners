import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [RouterLink, AuthHero],
  templateUrl: './role-select.html',
  styleUrl: './role-select.scss',
})
export class RoleSelect {}
