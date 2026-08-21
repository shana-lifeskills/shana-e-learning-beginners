export type Role = 'student' | 'trainer';

export type AgeGroup = 'beginner' | 'advanced';

export interface BaseUser {
  id: string;
  email: string;
  /**
   * Stored in plain text because this is a mock, in-browser "database" with
   * no real backend. Replace with proper hashing/auth once a real API exists.
   */
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarId: string;
  /** Optional profile photo uploaded at signup, stored as a data URL. Takes priority over avatarId when present. */
  avatarUrl?: string;
  createdAt: string;
  hasSeenWelcome: boolean;
  /** Consecutive days with at least one login/session, used for the streak banner. */
  streakCount: number;
  /** Calendar date (YYYY-MM-DD) of the last session start, used to compute the streak. */
  lastActiveDate: string;
}

export interface Student extends BaseUser {
  role: 'student';
  assignedModuleIds: string[];
  ageGroup: AgeGroup;
}

export interface Trainer extends BaseUser {
  role: 'trainer';
  createdModuleIds: string[];
}

export type AppUser = Student | Trainer;

export const AVATAR_IDS = ['fox', 'panda', 'owl', 'otter', 'dino', 'unicorn'] as const;
export type AvatarId = (typeof AVATAR_IDS)[number];

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string }[] = [
  { id: 'beginner', label: 'Beginner', range: '3–9' },
  { id: 'advanced', label: 'Advanced', range: '9–13' },
];
