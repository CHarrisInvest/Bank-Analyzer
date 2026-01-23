/**
 * Generate PNG images from SVG sources using sharp
 * Run: node scripts/generate-images.mjs
 */

import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Colors
const HEADER_COLOR = '#1a365d';
const WHITE = '#ffffff';
const LIGHT_BLUE = '#90cdf4';
const GRAY = '#a0aec0';
const ACCENT_BLUE = '#4299e1';

/**
 * Create logo SVG with stylized bank icon
 */
function createLogoSVG(size = 512) {
  const scale = size / 512;
  const centerX = size / 2;
  const centerY = size / 2;

  // Bank building icon points
  const roofY = centerY - 160 * scale;
  const roofBaseY = centerY - 40 * scale;
  const pedimentY = centerY - 50 * scale;
  const columnY = centerY - 10 * scale;
  const columnHeight = 150 * scale;
  const columnWidth = 35 * scale;
  const columnSpacing = 80 * scale;
  const baseY = centerY + 140 * scale;

  // Build column rects
  const columns = [-1.5, -0.5, 0.5, 1.5].map(i => {
    const x = centerX + i * columnSpacing - columnWidth / 2;
    return `<rect x="${x}" y="${columnY}" width="${columnWidth}" height="${columnHeight}" fill="${WHITE}"/>`;
  }).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${HEADER_COLOR}"/>

  <!-- Bank Icon -->
  <!-- Roof/Triangle -->
  <polygon points="${centerX - 160 * scale},${roofBaseY} ${centerX},${roofY} ${centerX + 160 * scale},${roofBaseY}" fill="${WHITE}"/>

  <!-- Pediment (bar under roof) -->
  <rect x="${centerX - 170 * scale}" y="${pedimentY}" width="${340 * scale}" height="${30 * scale}" fill="${WHITE}"/>

  <!-- Columns -->
  ${columns}

  <!-- Base/Steps -->
  <rect x="${centerX - 180 * scale}" y="${baseY}" width="${360 * scale}" height="${25 * scale}" fill="${WHITE}"/>
  <rect x="${centerX - 200 * scale}" y="${baseY + 25 * scale}" width="${400 * scale}" height="${20 * scale}" fill="${WHITE}"/>
</svg>`;
}

/**
 * Create OG Image SVG
 */
function createOGImageSVG() {
  const width = 1200;
  const height = 630;
  const centerX = width / 2;
  const iconY = 130;
  const iconScale = 0.7;

  // Bank icon geometry
  const roofY = iconY - 40 * iconScale;
  const roofBaseY = iconY + 60 * iconScale;
  const pedimentY = iconY + 55 * iconScale;
  const columnY = iconY + 75 * iconScale;
  const columnHeight = 75 * iconScale;
  const columnWidth = 18 * iconScale;
  const columnSpacing = 40 * iconScale;

  // Build column rects
  const columns = [-1.5, -0.5, 0.5, 1.5].map(i => {
    const x = centerX + i * columnSpacing - columnWidth / 2;
    return `<rect x="${x}" y="${columnY}" width="${columnWidth}" height="${columnHeight}" fill="${WHITE}"/>`;
  }).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${HEADER_COLOR}"/>

  <!-- Bank Icon -->
  <polygon points="${centerX - 80 * iconScale},${roofBaseY} ${centerX},${roofY} ${centerX + 80 * iconScale},${roofBaseY}" fill="${WHITE}"/>
  <rect x="${centerX - 85 * iconScale}" y="${pedimentY}" width="${170 * iconScale}" height="${15 * iconScale}" fill="${WHITE}"/>
  ${columns}
  <rect x="${centerX - 90 * iconScale}" y="${columnY + columnHeight}" width="${180 * iconScale}" height="${12 * iconScale}" fill="${WHITE}"/>
  <rect x="${centerX - 100 * iconScale}" y="${columnY + columnHeight + 12 * iconScale}" width="${200 * iconScale}" height="${10 * iconScale}" fill="${WHITE}"/>

  <!-- BankSift text -->
  <text x="${centerX}" y="340" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="96" font-weight="bold" fill="${WHITE}" text-anchor="middle">BankSift</text>

  <!-- Tagline -->
  <text x="${centerX}" y="420" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="36" fill="${LIGHT_BLUE}" text-anchor="middle">Bank Investment Tools</text>

  <!-- Subtitle -->
  <text x="${centerX}" y="480" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="28" fill="${GRAY}" text-anchor="middle" font-style="italic">Sift through the noise.</text>

  <!-- Bottom accent line -->
  <rect x="${centerX - 150}" y="530" width="300" height="4" fill="${ACCENT_BLUE}" rx="2"/>
</svg>`;
}

/**
 * Convert SVG to PNG using sharp
 */
async function svgToPng(svg, outputPath, width, height) {
  const buffer = Buffer.from(svg);
  await sharp(buffer)
    .resize(width, height)
    .png()
    .toFile(outputPath);
}

// Main
async function main() {
  console.log('Generating image assets...\n');

  try {
    // Generate logo.png (512x512)
    const logoSvg = createLogoSVG(512);
    const logoPath = join(publicDir, 'logo.png');
    await svgToPng(logoSvg, logoPath, 512, 512);
    console.log(`Generated: ${logoPath}`);

    // Also save SVG version
    writeFileSync(join(publicDir, 'logo.svg'), logoSvg);
    console.log(`Generated: ${join(publicDir, 'logo.svg')}`);

    // Generate og-image.png (1200x630)
    const ogSvg = createOGImageSVG();
    const ogPath = join(publicDir, 'og-image.png');
    await svgToPng(ogSvg, ogPath, 1200, 630);
    console.log(`Generated: ${ogPath}`);

    // Also save SVG version
    writeFileSync(join(publicDir, 'og-image.svg'), ogSvg);
    console.log(`Generated: ${join(publicDir, 'og-image.svg')}`);

    // Generate PWA icons
    const iconSizes = [192, 512];
    for (const size of iconSizes) {
      const iconSvg = createLogoSVG(size);
      const iconPath = join(publicDir, `icon-${size}.png`);
      await svgToPng(iconSvg, iconPath, size, size);
      console.log(`Generated: ${iconPath}`);
    }

    console.log('\nDone! All images generated in public/');

  } catch (error) {
    console.error('Error generating images:', error.message);
    process.exit(1);
  }
}

main();
