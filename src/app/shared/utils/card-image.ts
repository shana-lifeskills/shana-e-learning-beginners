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
