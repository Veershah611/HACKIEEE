import type { Fighter } from '@/content/roster';
import { asset } from '@/lib/asset';

/**
 * Renders the shareable builder card to a PNG.
 *
 * Everything is drawn on a canvas at 2x for retina, then handed back as a blob
 * URL. Nothing is uploaded — the card never leaves the device.
 *
 * Fonts: the page has already loaded Pixelify Sans and Silkscreen by the time
 * anyone can click, and `document.fonts.ready` is awaited before the first
 * fillText so canvas does not silently fall back to a system face.
 */

const W = 800;
const H = 1000;
const SCALE = 2;

type Palette = {
  bg: string;
  panel: string;
  accent: string;
  ink: string;
  muted: string;
};

const HERO_PALETTE: Palette = {
  bg: '#0A0A0F',
  panel: '#14141C',
  accent: '#FF4E00',
  ink: '#F0EDE8',
  muted: 'rgba(240,237,232,0.62)',
};

const VILLAIN_PALETTE: Palette = {
  bg: '#07120A',
  panel: '#0E1C12',
  accent: '#4B9F4A',
  ink: '#EAF3EA',
  muted: 'rgba(234,243,234,0.62)',
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`could not load ${src}`));
    img.src = src;
  });
}

/** rounded rect, because canvas still has no primitive for it everywhere */
function panel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** the LEGO stud row that runs along the top of the card */
function studs(ctx: CanvasRenderingContext2D, y: number, accent: string) {
  const pitch = 43;
  const count = Math.floor((W - 80) / pitch);
  const start = (W - (count - 1) * pitch) / 2;
  ctx.fillStyle = accent;
  for (let i = 0; i < count; i++) {
    panel(ctx, start + i * pitch - 13, y, 26, 14, 5);
    ctx.fill();
  }
}

export async function renderSquadCard(fighter: Fighter, eventLine: string): Promise<string> {
  const pal = fighter.side === 'villain' ? VILLAIN_PALETTE : HERO_PALETTE;

  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d unavailable');
  ctx.scale(SCALE, SCALE);

  await document.fonts.ready;

  // ---- ground -----------------------------------------------------------
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, W, H);

  // stud grid, matching the page background
  ctx.fillStyle = 'rgba(240,237,232,0.05)';
  for (let y = 12; y < H; y += 24) {
    for (let x = 12; x < W; x += 24) ctx.fillRect(x, y, 2, 2);
  }

  // accent wash behind the figure
  const glow = ctx.createRadialGradient(W / 2, H * 0.52, 0, W / 2, H * 0.52, W * 0.62);
  glow.addColorStop(0, `${pal.accent}44`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  studs(ctx, 22, pal.accent);

  // ---- figure -----------------------------------------------------------
  try {
    const img = await loadImage(asset(fighter.src));
    const maxW = W * 0.62;
    const maxH = H * 0.46;
    const k = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
    const dw = img.naturalWidth * k;
    const dh = img.naturalHeight * k;
    ctx.drawImage(img, (W - dw) / 2, H * 0.3 - dh / 2 + 90, dw, dh);
  } catch {
    // a missing render should not cost the whole card
  }

  // ---- text -------------------------------------------------------------
  ctx.textAlign = 'center';

  ctx.fillStyle = pal.accent;
  ctx.font = '600 20px Silkscreen, monospace';
  ctx.fillText('MY HACKIEEE BUILDER', W / 2, 92);

  ctx.fillStyle = pal.ink;
  ctx.font = '700 66px "Pixelify Sans", sans-serif';
  ctx.fillText(fighter.name, W / 2, H * 0.615);

  if (fighter.track) {
    ctx.fillStyle = pal.accent;
    ctx.font = '600 22px Silkscreen, monospace';
    ctx.fillText(fighter.track.toUpperCase(), W / 2, H * 0.66);
  }

  // flavour line, wrapped by hand — canvas has no text wrapping
  ctx.fillStyle = pal.muted;
  ctx.font = '400 24px Archivo, sans-serif';
  const words = fighter.line.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > W - 160 && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => {
    ctx.fillText(l, W / 2, H * 0.715 + i * 34);
  });

  // ---- footer plate -----------------------------------------------------
  ctx.fillStyle = pal.panel;
  panel(ctx, 60, H - 150, W - 120, 92, 12);
  ctx.fill();
  ctx.strokeStyle = `${pal.accent}66`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = pal.ink;
  ctx.font = '700 34px "Pixelify Sans", sans-serif';
  ctx.fillText('HackIEEE 2026', W / 2, H - 100);

  ctx.fillStyle = pal.muted;
  ctx.font = '400 17px Silkscreen, monospace';
  ctx.fillText(eventLine, W / 2, H - 72);

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  );
  return URL.createObjectURL(blob);
}
