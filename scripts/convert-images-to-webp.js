// Convert all .png, .jpg, .jpeg to .webp in the same locations
// Usage: node scripts/convert-images-to-webp.js
// Requires: pnpm install sharp glob

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

const PATTERN = "**/*.{png,jpg,jpeg}";
const IGNORE = [
    "**/node_modules/**", 
    "dist/**", 
    "build/**",
    ".astro/**",
    ".next/**",
    ".vscode/**",
    "**/.agent/**"
];

(async () => {
  try {
    console.log(`Searching for images with pattern: ${PATTERN}...`);
    const files = await glob(PATTERN, { nodir: true, ignore: IGNORE });
    
    if (files.length === 0) {
        console.log("No images found to convert.");
        return;
    }

    console.log(`Found ${files.length} images. Starting conversion...`);

    for (const file of files) {
      const extension = path.extname(file).toLowerCase();
      const out = file.replace(new RegExp(`\\${extension}$`, 'i'), '.webp');

      // Skip if output file already exists (optional, but good for performance)
      // if (fs.existsSync(out)) {
      //   console.log(`Skipping ${file} - output already exists.`);
      //   continue;
      // }
      
      try {
        await sharp(file)
            .webp({ quality: 80 })
            .toFile(out);
            
        console.log(`✓ Converted: ${file} -> ${out}`);
      } catch (err) {
        console.error(`✗ Failed to convert ${file}:`, err?.message || String(err));
      }
    }

    console.log("Conversion complete.");
  } catch (err) {
    console.error('Error during conversion process:', err?.message || String(err));
    process.exit(1);
  }
})();