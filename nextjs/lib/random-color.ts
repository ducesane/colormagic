export function getRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16_777_215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}
