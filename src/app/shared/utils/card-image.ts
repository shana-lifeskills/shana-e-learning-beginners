/**
 * Renders a title + label/value rows as a decorative gradient card, entirely
 * client-side (SVG → canvas → PNG, no server, no image-export library) — the
 * shared engine behind every "preview my card / download as picture" step.
 */
const CARD_WIDTH = 640;
const CARD_TOP_PADDING = 150;
const CARD_BOTTOM_PADDING = 60;
/** Height of a row with a single line of value text. */
const CARD_ROW_BASE_HEIGHT = 92;
/** Extra height added per wrapped value line beyond the first. */
const CARD_ROW_LINE_HEIGHT = 28;
/** Roughly how many characters of the 24px bold value font fit across the card. */
const CARD_ROW_MAX_CHARS = 34;

export interface CardRow {
  label: string;
  value: string;
}

export function buildFieldsCardSvg(title: string, rows: CardRow[]): string {
  const wrappedRows = rows.map((row) => ({ label: row.label, lines: capLines(wrapText(row.value, CARD_ROW_MAX_CHARS), 3) }));
  const rowHeights = wrappedRows.map((row) => CARD_ROW_BASE_HEIGHT + Math.max(0, row.lines.length - 1) * CARD_ROW_LINE_HEIGHT);
  const height = CARD_TOP_PADDING + rowHeights.reduce((sum, h) => sum + h, 0) + CARD_BOTTOM_PADDING;

  let y = CARD_TOP_PADDING;
  const rowMarkup = wrappedRows
    .map((row, i) => {
      const rowHeight = rowHeights[i];
      const rowTop = y;
      y += rowHeight;
      const valueLines = row.lines
        .map((line, li) => `<text x="72" y="${rowTop + 58 + li * CARD_ROW_LINE_HEIGHT}" font-family="Baloo 2, sans-serif" font-size="24" font-weight="800" fill="#2b2d42">${escapeXml(line)}</text>`)
        .join('');
      return `
        <rect x="48" y="${rowTop}" width="${CARD_WIDTH - 96}" height="${rowHeight - 20}" rx="16" fill="#fff8ed" />
        <text x="72" y="${rowTop + 30}" font-family="Baloo 2, sans-serif" font-size="15" font-weight="700" fill="#a66dd4">${escapeXml(row.label)}</text>
        ${valueLines}
      `;
    })
    .join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${height}" viewBox="0 0 ${CARD_WIDTH} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="${CARD_WIDTH}" y2="${height}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ff6f59" />
          <stop offset="1" stop-color="#a66dd4" />
        </linearGradient>
      </defs>
      <rect width="${CARD_WIDTH}" height="${height}" rx="32" fill="url(#bg)" />
      <text x="48" y="72" font-family="Baloo 2, sans-serif" font-size="34" font-weight="800" fill="#ffffff">${escapeXml(title)}</text>
      <text x="48" y="104" font-family="Quicksand, sans-serif" font-size="16" font-weight="600" fill="rgba(255,255,255,0.85)">Shana Lifeskills</text>
      ${rowMarkup}
    </svg>
  `;
}

const CERTIFICATE_WIDTH = 640;
const CERTIFICATE_HEIGHT = 420;

/** Renders a centered "certificate" card — ribbon icon, title, intro line, and the student's own answer. */
export function buildCertificateSvg(title: string, introLine: string, answer: string): string {
  const centerX = CERTIFICATE_WIDTH / 2;
  const wrapped = wrapText(answer, 42).slice(0, 4);
  const answerLines = wrapped
    .map((line, i) => `<text x="${centerX}" y="${268 + i * 34}" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="24" font-weight="800" fill="#2b2d42">${escapeXml(line)}</text>`)
    .join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}">
      <defs>
        <linearGradient id="underline" x1="0" y1="0" x2="${CERTIFICATE_WIDTH}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#a66dd4" />
          <stop offset="1" stop-color="#ff6f59" />
        </linearGradient>
      </defs>
      <rect width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" rx="28" fill="#ffffff" stroke="rgba(43,45,66,0.08)" stroke-width="2" />
      <circle cx="${centerX}" cy="86" r="34" fill="#4d78f0" />
      <text x="${centerX}" y="98" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="30" fill="#ffffff">🎖️</text>
      <text x="${centerX}" y="168" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="32" font-weight="800" fill="#2b2d42">${escapeXml(title)}</text>
      <rect x="${centerX - 60}" y="184" width="120" height="4" rx="2" fill="url(#underline)" />
      <text x="${centerX}" y="228" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="18" fill="rgba(43,45,66,0.65)">${escapeXml(introLine)}</text>
      ${answerLines}
    </svg>
  `;
}

const POSTER_WIDTH = 640;
const POSTER_HEIGHT = 480;

/** Renders a decorative "sticker poster" card — a title and a centered row of emoji stickers. */
export function buildStickerPosterSvg(title: string, emojis: string[]): string {
  const centerX = POSTER_WIDTH / 2;
  const rows: string[][] = [];
  for (let i = 0; i < emojis.length; i += 6) rows.push(emojis.slice(i, i + 6));
  const stickerMarkup = rows
    .map((row, ri) => {
      const rowY = 260 + ri * 70;
      const rowWidth = (row.length - 1) * 70;
      return row
        .map((emoji, ci) => `<text x="${centerX - rowWidth / 2 + ci * 70}" y="${rowY}" text-anchor="middle" font-size="48">${escapeXml(emoji)}</text>`)
        .join('');
    })
    .join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${POSTER_WIDTH}" height="${POSTER_HEIGHT}" viewBox="0 0 ${POSTER_WIDTH} ${POSTER_HEIGHT}">
      <defs>
        <linearGradient id="posterBg" x1="0" y1="0" x2="${POSTER_WIDTH}" y2="${POSTER_HEIGHT}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#eef4ff" />
          <stop offset="1" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="${POSTER_WIDTH}" height="${POSTER_HEIGHT}" rx="32" fill="url(#posterBg)" stroke="rgba(77,139,245,0.2)" stroke-width="2" />
      <circle cx="70" cy="70" r="46" fill="#ffd7dd" opacity="0.7" />
      <circle cx="${POSTER_WIDTH - 70}" cy="90" r="34" fill="#ffedc2" opacity="0.8" />
      <circle cx="${POSTER_WIDTH - 60}" cy="${POSTER_HEIGHT - 120}" r="40" fill="#d5ecff" opacity="0.8" />
      <circle cx="80" cy="${POSTER_HEIGHT - 90}" r="44" fill="#d9f2df" opacity="0.7" />
      <text x="${centerX}" y="120" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="34" font-weight="800" fill="#4d8bf5">${escapeXml(title)}</text>
      ${stickerMarkup}
    </svg>
  `;
}

const COLLAGE_WIDTH = 640;
const COLLAGE_CELL = 96;
const COLLAGE_GAP = 22;
const COLLAGE_COLS = 5;
const COLLAGE_TOP_PADDING = 150;
const COLLAGE_BOTTOM_PADDING = 60;

/** One avatar in a collage poster — either a doodle emoji figure or an uploaded photo (rendered as a circular crop). */
export type CollageItem = { kind: 'emoji'; emoji: string } | { kind: 'image'; dataUrl: string };

/** Renders a "collage poster" card — a title banner over a wrapping grid of circular doodle/photo avatars. */
export function buildCollagePosterSvg(title: string, subtitle: string, items: CollageItem[]): string {
  const cols = Math.min(COLLAGE_COLS, Math.max(1, items.length));
  const rows = Math.max(1, Math.ceil(items.length / COLLAGE_COLS));
  const gridWidth = cols * COLLAGE_CELL + (cols - 1) * COLLAGE_GAP;
  const startX = (COLLAGE_WIDTH - gridWidth) / 2;
  const height = COLLAGE_TOP_PADDING + rows * COLLAGE_CELL + (rows - 1) * COLLAGE_GAP + COLLAGE_BOTTOM_PADDING;

  const defs: string[] = [];
  const cells = items
    .map((item, i) => {
      const col = i % COLLAGE_COLS;
      const row = Math.floor(i / COLLAGE_COLS);
      const cx = startX + col * (COLLAGE_CELL + COLLAGE_GAP) + COLLAGE_CELL / 2;
      const cy = COLLAGE_TOP_PADDING + row * (COLLAGE_CELL + COLLAGE_GAP) + COLLAGE_CELL / 2;
      const r = COLLAGE_CELL / 2;
      if (item.kind === 'emoji') {
        return `
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="0.92" />
          <text x="${cx}" y="${cy + 17}" text-anchor="middle" font-size="50">${escapeXml(item.emoji)}</text>
        `;
      }
      const clipId = `collageClip${i}`;
      defs.push(`<clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${r}" /></clipPath>`);
      return `
        <circle cx="${cx}" cy="${cy}" r="${r + 3}" fill="#ffffff" />
        <image href="${item.dataUrl}" x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />
      `;
    })
    .join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${COLLAGE_WIDTH}" height="${height}" viewBox="0 0 ${COLLAGE_WIDTH} ${height}">
      <defs>
        <linearGradient id="collageBg" x1="0" y1="0" x2="${COLLAGE_WIDTH}" y2="${height}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4ecdc4" />
          <stop offset="1" stop-color="#a66dd4" />
        </linearGradient>
        ${defs.join('')}
      </defs>
      <rect width="${COLLAGE_WIDTH}" height="${height}" rx="32" fill="url(#collageBg)" />
      <text x="${COLLAGE_WIDTH / 2}" y="72" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="30" font-weight="800" fill="#ffffff">${escapeXml(title)}</text>
      <text x="${COLLAGE_WIDTH / 2}" y="104" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.85)">${escapeXml(subtitle)}</text>
      ${cells}
    </svg>
  `;
}

/** Truncates a wrapped-line list to `max` lines, appending an ellipsis to the last kept line if any were cut. */
function capLines(lines: string[], max: number): string[] {
  if (lines.length <= max) return lines;
  const kept = lines.slice(0, max);
  kept[max - 1] = `${kept[max - 1]}…`;
  return kept;
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function svgToPngDataUrl(svg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function downloadPngFromSvg(svg: string, filename: string): Promise<void> {
  const pngUrl = await svgToPngDataUrl(svg);
  const link = document.createElement('a');
  link.href = pngUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
