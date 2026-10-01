/**
 * Renders the BankCEO home-screen icons from public/game/icons/bankceo.svg.
 * Run after editing the SVG: node scripts/generate-bankceo-icons.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const iconsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'game', 'icons');
const svg = readFileSync(join(iconsDir, 'bankceo.svg'));

const outputs = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];

for (const [name, size] of outputs) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(join(iconsDir, name));
  console.log(`wrote ${name} (${size}x${size})`);
}
