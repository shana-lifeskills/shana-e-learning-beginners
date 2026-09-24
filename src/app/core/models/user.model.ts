export type Role = 'student' | 'trainer';

export type AgeGroup = 'beginner' | 'advanced';

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarId: string;
  /** Optional profile photo uploaded at signup, stored as a data URL. Takes priority over avatarId when present. */
  avatarUrl?: string;
  /** Profile photo URL returned by the backend, if the account has one. */
  profileImage?: string;
  createdAt: string;
  hasSeenWelcome: boolean;
  /** Consecutive days with at least one login/session, used for the streak banner. */
  streakCount: number;
  /** Calendar date (YYYY-MM-DD) of the last session start, used to compute the streak. */
  lastActiveDate: string;
  /** Whether this account has confirmed ownership of its email address via the verification link. */
  emailVerified: boolean;
}

export interface Student extends BaseUser {
  role: 'student';
  assignedModuleIds: string[];
  ageGroup: AgeGroup;
  /** Whether this student has paid for module access. Modules stay locked behind a payment prompt until this is true. */
  hasPaid: boolean;
}

export interface Trainer extends BaseUser {
  role: 'trainer';
  createdModuleIds: string[];
}

export type AppUser = Student | Trainer;

export const AVATAR_IDS = ['nova', 'milo', 'zoe', 'kai', 'ruby', 'theo'] as const;
export type AvatarId = (typeof AVATAR_IDS)[number];

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string }[] = [
  { id: 'beginner', label: 'Beginner', range: '3–9' },
  { id: 'advanced', label: 'Advanced', range: '10–17' },
];
