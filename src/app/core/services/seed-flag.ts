/**
 * Pulled out of seed-data.service.ts into its own tiny file so app.config.ts
 * can check "has this browser already been seeded?" WITHOUT dynamically
 * importing the full seed-data chunk (~650KB minified) just to read one
 * string — see the app initializer in app.config.ts. Bump this whenever
 * module/lesson content in seed-data.service.ts changes, same as before.
 */
export const SEED_FLAG = 'seeded_v428';
