import { hexToRgb, hsbToRgb, hslToRgb, rgbToHex, rgbToHsb, rgbToHsl } from './color-converter';

export interface ColorArrange {
  brightness: number;
  saturation: number;
  warmth: number;
}

export function arrangeColors(colors: string[], arrange: ColorArrange): string[] {
  return colors.map((color) => {
    const withBrightness = changeBrightness(color, arrange.brightness);
    const withSaturation = changeSaturation(withBrightness, arrange.saturation);
    return changeWarmth(withSaturation, arrange.warmth, colors);
  });
}

export function changeBrightness(color: string, brightness: number): string {
  return blendColor(color, brightness >= 0 ? '#ffffff' : '#000000', Math.abs(brightness));
}

export function blendColor(color1: string, color2: string, ratio: number): string {
  const hsv1 = rgbToHsb(hexToRgb(color1));
  const hsv2 = rgbToHsb(hexToRgb(color2));

  if (hsv1.s === 0) hsv1.h = hsv2.h;
  if (hsv2.s === 0) hsv2.h = hsv1.h;
  if (hsv1.b === 0) hsv1.s = 100;
  if (hsv2.b === 0) hsv2.s = 100;

  return rgbToHex(
    hsbToRgb({
      h: blendValue(hsv1.h, hsv2.h, ratio),
      s: blendValue(hsv1.s, hsv2.s, ratio),
      b: blendValue(hsv1.b, hsv2.b, ratio)
    })
  );
}

function blendValue(value1: number, value2: number, ratio: number): number {
  const safeRatio = Math.min(Math.max(ratio, 0), 100);
  return (value1 * (100 - safeRatio) + value2 * safeRatio) * 0.01;
}

export function changeSaturation(color: string, saturation: number): string {
  const hsl = rgbToHsl(hexToRgb(color));
  return rgbToHex(
    hslToRgb({
      h: hsl.h,
      s: hsl.s + (saturation > 0 ? 100 - hsl.s : hsl.s) * saturation * 0.01,
      l: hsl.l
    })
  );
}

export function changeWarmth(color: string, warmth: number, colors: string[]): string {
  const hslColors = colors.map((entry) => rgbToHsl(hexToRgb(entry)));
  const avgS = hslColors.reduce((acc, entry) => acc + entry.s, 0) / hslColors.length;
  const avgL = hslColors.reduce((acc, entry) => acc + entry.l, 0) / hslColors.length;

  return blendColorOverlay(
    color,
    rgbToHex(
      hslToRgb({
        h: warmth > 0 ? 20 : 220,
        s: avgS,
        l: avgL
      })
    ),
    Math.abs(warmth)
  );
}

export function blendColorOverlay(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const ratioOne = Math.min(Math.max(ratio, 0), 100) * 0.01;

  const blendChannel = (value1: number, value2: number): number => {
    const value =
      value1 < 128
        ? (2 * value2 * value1) / 255
        : 255 - (2 * (255 - value1) * (255 - value2)) / 255;
    return Math.round(Math.min(value * ratioOne + value1 * (1 - ratioOne), 255));
  };

  return rgbToHex({
    r: blendChannel(rgb1.r, rgb2.r),
    g: blendChannel(rgb1.g, rgb2.g),
    b: blendChannel(rgb1.b, rgb2.b)
  });
}
