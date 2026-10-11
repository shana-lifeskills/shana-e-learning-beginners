/**
 * The 8 curriculum tracks, in the sequence they unlock as "Levels" —
 * Duolingo-style: a module's Level is its `trackName`'s position here, and
 * Level N+1 stays locked until every Level N module is completed. This is a
 * fixed business sequence, not admin-editable content, so it's a plain
 * constant rather than a backend-driven field — mirrors
 * `shana-beginners-backend/src/config/levelOrder.js`, intentionally
 * duplicated the same way `trackName`/`category` already are between the
 * frontend's static content and the backend's CurriculumModule table.
 */
export const LEVEL_ORDER: string[] = [
  'Personal Empowerment',
  'Communication',
  'Character Development',
  'Digital Responsibility',
  'Cognitive Skills',
  'Financial Responsibility',
  'Leadership Potential',
  'Health and Wellbeing',
];

/** Returns the 0-based Level index for a track name, or -1 for an
 *  untracked/unrecognized trackName (exempt from level-gating, same as
 *  game-category modules). */
export function levelIndexOf(trackName: string | undefined | null): number {
  if (!trackName) return -1;
  return LEVEL_ORDER.indexOf(trackName);
}
