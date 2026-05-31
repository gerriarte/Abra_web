import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

function* walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(full);
    else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) yield full;
  }
}

let totalSaved = 0;
let count = 0;

for (const inputPath of walkDir(publicDir)) {
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

    const inKB  = (fs.statSync(inputPath).size  / 1024).toFixed(1);
    const outKB = (fs.statSync(outputPath).size / 1024).toFixed(1);
    const saved = Math.round((1 - outKB / inKB) * 100);
    totalSaved += Number(inKB) - Number(outKB);

    console.log(`✓ ${path.relative(publicDir, inputPath).padEnd(60)} ${inKB}KB → ${outKB}KB  (${saved}% smaller)`);

    fs.unlinkSync(inputPath);
    count++;
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err.message}`);
  }
}

console.log(`\n${count} images converted. Total saved: ${(totalSaved / 1024).toFixed(1)} MB`);
