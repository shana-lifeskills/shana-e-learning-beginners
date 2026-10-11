import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsOverview } from '../../shared/components/analytics-overview/analytics-overview';

/** Thin page shell — the actual charts (data-fetching + markup) live in
 *  AnalyticsOverview, shared with the admin dashboard home, which embeds
 *  the same component beneath its KPI cards. */
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterLink, AnalyticsOverview],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {}
