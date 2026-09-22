export interface StarLog {
  id: string;
  studentId: string;
  moduleId: string;
  exerciseId: string;
  earnedAt: string;
}

export interface BadgeLog {
  id: string;
  studentId: string;
  moduleId: string;
  lessonId: string;
  earnedAt: string;
}

export interface TrophyLog {
  id: string;
  studentId: string;
  moduleId: string;
  earnedAt: string;
}

export type RewardKind = 'star' | 'badge' | 'trophy';

export interface RewardEvent {
  kind: RewardKind;
  count: number;
  message: string;
}

export interface RewardTotals {
  stars: number;
  badges: number;
  trophies: number;
}

/** Raw badge/trophy history as the backend returns it — no title/icon join, since
 *  those live only in the frontend's static module/lesson content. */
export interface RawRewardDetails {
  totals: RewardTotals;
  badges: { moduleId: string; lessonId: string; earnedAt: string }[];
  trophies: { moduleId: string; earnedAt: string }[];
}
