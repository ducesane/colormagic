export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSB {
  h: number;
  s: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace('#', '');
  const parsed = Number.parseInt(cleanHex, 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const value = (1 << 24) + (r << 16) + (g << 8) + b;
  return `#${value.toString(16).slice(1)}`;
}

export function rgbToHsb({ r, g, b }: RGB): HSB {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rN) h = ((gN - bN) / delta) % 6;
    else if (max === gN) h = (bN - rN) / delta + 2;
    else h = (rN - gN) / delta + 4;
  }

  return {
    h: Math.round((h * 60 + 360) % 360),
    s: Math.round((max === 0 ? 0 : delta / max) * 100),
    b: Math.round(max * 100)
  };
}

export function hsbToRgb({ h, s, b }: HSB): RGB {
  const sN = s / 100;
  const vN = b / 100;
  const c = vN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vN - c;
  let rN = 0;
  let gN = 0;
  let bN = 0;

  if (h < 60) [rN, gN, bN] = [c, x, 0];
  else if (h < 120) [rN, gN, bN] = [x, c, 0];
  else if (h < 180) [rN, gN, bN] = [0, c, x];
  else if (h < 240) [rN, gN, bN] = [0, x, c];
  else if (h < 300) [rN, gN, bN] = [x, 0, c];
  else [rN, gN, bN] = [c, 0, x];

  return {
    r: Math.round((rN + m) * 255),
    g: Math.round((gN + m) * 255),
    b: Math.round((bN + m) * 255)
  };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rN) h = ((gN - bN) / delta) % 6;
    else if (max === gN) h = (bN - rN) / delta + 2;
    else h = (rN - gN) / delta + 4;
  }

  return {
    h: Math.round((h * 60 + 360) % 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;

  let rN = 0;
  let gN = 0;
  let bN = 0;

  if (h < 60) [rN, gN, bN] = [c, x, 0];
  else if (h < 120) [rN, gN, bN] = [x, c, 0];
  else if (h < 180) [rN, gN, bN] = [0, c, x];
  else if (h < 240) [rN, gN, bN] = [0, x, c];
  else if (h < 300) [rN, gN, bN] = [x, 0, c];
  else [rN, gN, bN] = [c, 0, x];

  return {
    r: Math.round((rN + m) * 255),
    g: Math.round((gN + m) * 255),
    b: Math.round((bN + m) * 255)
  };
}
