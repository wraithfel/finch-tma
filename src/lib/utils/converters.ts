export function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): `#${string}` {
  return `#${[r, g, b]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')}` as `#${string}`;
}

export function toHex(
  color: { r: number; g: number; b: number } | `#${string}` | undefined
): `#${string}` {
  if (!color) return '#000000' as `#${string}`; 
  return typeof color === 'string' ? color : rgbToHex(color);
}