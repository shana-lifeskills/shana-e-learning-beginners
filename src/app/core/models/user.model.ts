/** 'trainer' is the existing Admin role (uploads/assigns modules — displayed
 *  as "Admin"). 'coach' is the real Trainer role (displayed as "Trainer") —
 *  reviews assignment submissions and tracks student progress. Named
 *  differently internally to avoid colliding with the existing trainer/
 *  Trainer code that already represents the Admin feature area. */
export type Role = 'student' | 'trainer' | 'coach';

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

/** The real Trainer role — displayed as "Trainer" (see the `Role` comment
 *  above for why this is internally `Coach`, not `Trainer`). */
export interface Coach extends BaseUser {
  role: 'coach';
}

export type AppUser = Student | Trainer | Coach;

/** Where each role lands after login/signup, and what a guard sends the
 *  wrong role back to — single source of truth so this 3-way mapping isn't
 *  duplicated across guards, redirects, and nav components. */
export const ROLE_HOME_PATH: Record<Role, string> = {
  student: '/student',
  trainer: '/admin',
  coach: '/coach',
};

export const AVATAR_IDS = ['nova', 'milo', 'zoe', 'kai', 'ruby', 'theo'] as const;
export type AvatarId = (typeof AVATAR_IDS)[number];

export const AGE_GROUPS: { id: AgeGroup; label: string; range: string }[] = [
  { id: 'beginner', label: 'Beginner', range: '3–9' },
  { id: 'advanced', label: 'Advanced', range: '10–17' },
];
