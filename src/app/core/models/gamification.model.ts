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
