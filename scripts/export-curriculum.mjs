/**
 * Exports the curriculum authored in src/app/core/services/seed-data.service.ts as the
 * JSON file the backend loads with `npm run db:seed:curriculum`.
 *
 * It runs the real seed code against an in-memory stand-in for DatabaseService and
 * captures every module it writes, so the export is exactly what the app itself seeds.
 * Fails (exit 1) on duplicate module/lesson/exercise ids — the backend's reward and
 * submission tables key on those ids, so a duplicate silently merges two activities.
 *
 * Usage:
 *   npm run export:curriculum [-- --out <path>]
 * Default output: ../shana-beginners-backend/db/curriculum/curriculum.json
 */
import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outArg = process.argv.indexOf('--out');
const outFile = outArg > -1 ? resolve(process.argv[outArg + 1]) : resolve(root, '..', 'shana-beginners-backend', 'db', 'curriculum', 'curriculum.json');
// Inside node_modules so the bundle's external @angular/* imports resolve from this project.
const bundleFile = resolve(root, 'node_modules', '.cache', 'export-curriculum', 'bundle.mjs');

/** Fields the seed fills in per browser (a generation timestamp, a local-only trainer id) — not content. */
const RUNTIME_FIELDS = ['createdAt', 'createdByTrainerId'];

const entry = `
import { SeedDataService } from './src/app/core/services/seed-data.service';
const modules = [];
const db = new Proxy({
  getFlag: () => false,
  upsert: (collection, record) => { if (collection === 'modules') modules.push(record); },
  insert: (collection, record) => { if (collection === 'modules') modules.push(record); },
}, { get: (target, key) => target[key] ?? (() => undefined) });
new SeedDataService(db).seedIfNeeded();
export default modules;
`;

function gitDescribe() {
  try {
    const commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
    const dirty = execSync('git status --porcelain -- src/app/core', { cwd: root }).toString().trim() !== '';
    return dirty ? `${commit}+uncommitted` : commit;
  } catch {
    return 'unknown';
  }
}

function findDuplicates(modules) {
  const owners = { module: new Map(), lesson: new Map(), exercise: new Map() };
  const problems = [];
  const claim = (kind, id, owner) => {
    const previous = owners[kind].get(id);
    if (previous) problems.push(`duplicate ${kind} id "${id}": ${previous}  AND  ${owner}`);
    else owners[kind].set(id, owner);
  };
  for (const mod of modules) {
    claim('module', mod.id, mod.id);
    for (const lesson of mod.lessons) {
      claim('lesson', lesson.id, `${mod.id} > ${lesson.id}`);
      for (const exercise of lesson.exercises) claim('exercise', exercise.id, `${mod.id} > ${lesson.id} (${exercise.type})`);
    }
  }
  return problems;
}

await build({
  stdin: { contents: entry, resolveDir: root, loader: 'ts', sourcefile: 'export-curriculum-entry.ts' },
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: bundleFile,
  external: ['@angular/*'],
  tsconfig: resolve(root, 'tsconfig.app.json'),
  logLevel: 'error',
});

const { default: captured } = await import(`${pathToFileURL(bundleFile).href}?t=${Date.now()}`);
const modules = captured.map((mod) => Object.fromEntries(Object.entries(mod).filter(([key]) => !RUNTIME_FIELDS.includes(key))));

const duplicates = findDuplicates(modules);
if (duplicates.length) {
  console.error(`✘ Curriculum has ${duplicates.length} duplicate id(s); nothing was exported:`);
  duplicates.forEach((d) => console.error(`  - ${d}`));
  process.exit(1);
}

const lessons = modules.reduce((n, m) => n + m.lessons.length, 0);
const exercises = modules.reduce((n, m) => n + m.lessons.reduce((k, l) => k + l.exercises.length, 0), 0);
const payload = {
  exportedAt: new Date().toISOString(),
  source: `shana-e-learning-beginners@${gitDescribe()}`,
  counts: { modules: modules.length, lessons, exercises },
  modules,
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`✔ Exported ${modules.length} modules, ${lessons} lessons, ${exercises} exercises → ${relative(process.cwd(), outFile)}`);
