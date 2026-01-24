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
 * Create X (Twitter) Profile Picture SVG (400x400, displays as circle)
 * Design: Small bank icon above "BankSift" text, all within circle-safe area
 */
function createXProfileSVG() {
  const size = 400;
  const centerX = size / 2;

  // Everything needs to fit within the circle crop (~70% of width from center)
  const safeRadius = size * 0.35;

  // Small bank icon at top
  const iconScale = 0.35;
  const iconCenterY = 130;
  const roofY = iconCenterY - 50 * iconScale;
  const roofBaseY = iconCenterY + 10 * iconScale;
  const pedimentY = iconCenterY + 5 * iconScale;
  const columnY = iconCenterY + 18 * iconScale;
  const columnHeight = 45 * iconScale;
  const columnWidth = 12 * iconScale;
  const columnSpacing = 28 * iconScale;
  const baseY = iconCenterY + 65 * iconScale;

  const columns = [-1.5, -0.5, 0.5, 1.5].map(i => {
    const x = centerX + i * columnSpacing - columnWidth / 2;
    return `<rect x="${x}" y="${columnY}" width="${columnWidth}" height="${columnHeight}" fill="${WHITE}"/>`;
  }).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="${HEADER_COLOR}"/>

  <!-- Bank Icon - small, at top -->
  <polygon points="${centerX - 55 * iconScale},${roofBaseY} ${centerX},${roofY} ${centerX + 55 * iconScale},${roofBaseY}" fill="${WHITE}"/>
  <rect x="${centerX - 60 * iconScale}" y="${pedimentY}" width="${120 * iconScale}" height="${10 * iconScale}" fill="${WHITE}"/>
  ${columns}
  <rect x="${centerX - 65 * iconScale}" y="${baseY}" width="${130 * iconScale}" height="${8 * iconScale}" fill="${WHITE}"/>

  <!-- BankSift text - centered below icon -->
  <text x="${centerX}" y="250" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="56" font-weight="bold" fill="${WHITE}" text-anchor="middle" letter-spacing="-1">BankSift</text>

  <!-- Subtle tagline -->
  <text x="${centerX}" y="290" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="18" fill="${LIGHT_BLUE}" text-anchor="middle" letter-spacing="2">BANK INVESTMENT TOOLS</text>
</svg>`;
}

/**
 * Create X (Twitter) Header/Banner SVG (1500x500)
 * Design: Clean, minimal with centered content
 */
function createXHeaderSVG() {
  const width = 1500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  // Bank icon - small, to the left of text
  const iconX = centerX - 280;
  const iconScale = 0.5;
  const roofY = centerY - 70 * iconScale;
  const roofBaseY = centerY - 10 * iconScale;
  const pedimentY = centerY - 15 * iconScale;
  const columnY = centerY + 5 * iconScale;
  const columnHeight = 60 * iconScale;
  const columnWidth = 14 * iconScale;
  const columnSpacing = 32 * iconScale;

  const columns = [-1.5, -0.5, 0.5, 1.5].map(i => {
    const x = iconX + i * columnSpacing - columnWidth / 2;
    return `<rect x="${x}" y="${columnY}" width="${columnWidth}" height="${columnHeight}" fill="${WHITE}"/>`;
  }).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <!-- Clean solid background -->
  <rect width="${width}" height="${height}" fill="${HEADER_COLOR}"/>

  <!-- Subtle accent line at bottom -->
  <rect x="0" y="${height - 3}" width="${width}" height="3" fill="${ACCENT_BLUE}" opacity="0.7"/>

  <!-- Bank Icon -->
  <polygon points="${iconX - 65 * iconScale},${roofBaseY} ${iconX},${roofY} ${iconX + 65 * iconScale},${roofBaseY}" fill="${WHITE}"/>
  <rect x="${iconX - 70 * iconScale}" y="${pedimentY}" width="${140 * iconScale}" height="${12 * iconScale}" fill="${WHITE}"/>
  ${columns}
  <rect x="${iconX - 75 * iconScale}" y="${columnY + columnHeight}" width="${150 * iconScale}" height="${10 * iconScale}" fill="${WHITE}"/>

  <!-- BankSift text -->
  <text x="${centerX + 80}" y="${centerY + 5}" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="100" font-weight="bold" fill="${WHITE}" text-anchor="middle" letter-spacing="-2">BankSift</text>

  <!-- Tagline below -->
  <text x="${centerX + 80}" y="${centerY + 55}" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="24" fill="${LIGHT_BLUE}" text-anchor="middle" letter-spacing="3">SIFT THROUGH THE NOISE</text>

  <!-- Website URL - right aligned -->
  <text x="${width - 60}" y="${height - 25}" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif" font-size="22" fill="${GRAY}" text-anchor="end">BankSift.org</text>
</svg>`;
}

/**
 * Create ICO file from multiple PNG buffers
 * ICO format: ICONDIR header + ICONDIRENTRY for each image + image data
 */
function createIcoFromPngs(images) {
  const numImages = images.length;
  const headerSize = 6; // ICONDIR
  const dirEntrySize = 16; // ICONDIRENTRY per image
  const dirSize = headerSize + (dirEntrySize * numImages);

  // Calculate total size
  let totalSize = dirSize;
  for (const img of images) {
    totalSize += img.buffer.length;
  }

  const buffer = Buffer.alloc(totalSize);
  let offset = 0;

  // ICONDIR header
  buffer.writeUInt16LE(0, offset); offset += 2; // Reserved
  buffer.writeUInt16LE(1, offset); offset += 2; // Type: 1 = ICO
  buffer.writeUInt16LE(numImages, offset); offset += 2; // Number of images

  // Calculate image data offsets
  let dataOffset = dirSize;

  // ICONDIRENTRY for each image
  for (const img of images) {
    buffer.writeUInt8(img.size, offset); offset += 1; // Width (0 = 256)
    buffer.writeUInt8(img.size, offset); offset += 1; // Height
    buffer.writeUInt8(0, offset); offset += 1; // Color palette
    buffer.writeUInt8(0, offset); offset += 1; // Reserved
    buffer.writeUInt16LE(1, offset); offset += 2; // Color planes
    buffer.writeUInt16LE(32, offset); offset += 2; // Bits per pixel
    buffer.writeUInt32LE(img.buffer.length, offset); offset += 4; // Image size
    buffer.writeUInt32LE(dataOffset, offset); offset += 4; // Image offset
    dataOffset += img.buffer.length;
  }

  // Image data (PNG format)
  for (const img of images) {
    img.buffer.copy(buffer, offset);
    offset += img.buffer.length;
  }

  return buffer;
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

    // Generate apple-touch-icon (180x180)
    const appleTouchSvg = createLogoSVG(180);
    const appleTouchPath = join(publicDir, 'apple-touch-icon.png');
    await svgToPng(appleTouchSvg, appleTouchPath, 180, 180);
    console.log(`Generated: ${appleTouchPath}`);

    // Generate favicons for browsers and Google
    const faviconSizes = [16, 32, 48];
    for (const size of faviconSizes) {
      const faviconSvg = createLogoSVG(size);
      const faviconPath = join(publicDir, `favicon-${size}x${size}.png`);
      await svgToPng(faviconSvg, faviconPath, size, size);
      console.log(`Generated: ${faviconPath}`);
    }

    // Generate favicon.ico (using 32x32 as base, converted to ICO format)
    // Modern browsers accept PNG, but we'll create an ICO for maximum compatibility
    const favicon32Svg = createLogoSVG(32);
    const faviconIcoPath = join(publicDir, 'favicon.ico');
    // Create multi-size ICO by embedding 16x16 and 32x32
    const favicon16Buffer = await sharp(Buffer.from(createLogoSVG(16)))
      .resize(16, 16)
      .png()
      .toBuffer();
    const favicon32Buffer = await sharp(Buffer.from(favicon32Svg))
      .resize(32, 32)
      .png()
      .toBuffer();

    // Create ICO file manually (ICO format: header + directory + image data)
    const icoBuffer = createIcoFromPngs([
      { buffer: favicon16Buffer, size: 16 },
      { buffer: favicon32Buffer, size: 32 }
    ]);
    writeFileSync(faviconIcoPath, icoBuffer);
    console.log(`Generated: ${faviconIcoPath}`);

    // Generate X (Twitter) profile picture (400x400)
    const xProfileSvg = createXProfileSVG();
    const xProfilePath = join(publicDir, 'x-profile.png');
    await svgToPng(xProfileSvg, xProfilePath, 400, 400);
    console.log(`Generated: ${xProfilePath}`);
    writeFileSync(join(publicDir, 'x-profile.svg'), xProfileSvg);

    // Generate X (Twitter) header/banner (1500x500)
    const xHeaderSvg = createXHeaderSVG();
    const xHeaderPath = join(publicDir, 'x-header.png');
    await svgToPng(xHeaderSvg, xHeaderPath, 1500, 500);
    console.log(`Generated: ${xHeaderPath}`);
    writeFileSync(join(publicDir, 'x-header.svg'), xHeaderSvg);

    console.log('\nDone! All images generated in public/');

  } catch (error) {
    console.error('Error generating images:', error.message);
    process.exit(1);
  }
}

main();
