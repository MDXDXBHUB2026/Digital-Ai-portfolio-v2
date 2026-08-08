import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'maritime',
  'maritime-fleet',
  'maritime-anomaly',
  'maritime-maintenance',
  'maritime-voyage',
  'maritime-staging'
];

async function convertAll() {
  for (const name of files) {
    const svgPath = path.join(__dirname, 'public', 'images', `${name}.svg`);
    if (!fs.existsSync(svgPath)) {
      console.log(`SVG not found at ${svgPath}`);
      continue;
    }
    const svg = fs.readFileSync(svgPath, 'utf8');
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1600 }
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    const targets = [
      path.join(__dirname, 'public', 'images', `${name}.png`),
      path.join(__dirname, 'images', `${name}.png`),
      path.join(__dirname, 'dist', 'images', `${name}.png`)
    ];

    for (const target of targets) {
      const dir = path.dirname(target);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(target, pngBuffer);
    }
    console.log(`Successfully converted ${name}.svg -> ${name}.png (${pngBuffer.length} bytes)`);
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
