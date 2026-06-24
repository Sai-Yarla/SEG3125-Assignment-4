const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ysaim\\.gemini\\antigravity-ide\\brain\\c40522cf-59af-402d-92d8-650e6e29ea44';
const destDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const prefixes = [
  'helm_01', 'coin_01', 'sword_01', 'pottery_01', 'helm_02',
  'manuscript_01', 'coin_02', 'shield_01', 'scroll_01', 'dagger_01',
  'book_01', 'book_02', 'jar_01', 'astrolabe_01', 'book_03'
];

for (const p of prefixes) {
  const file = files.find(f => f.startsWith(p) && f.endsWith('.png'));
  if (file) {
    const newName = p.replace('_', '-') + '.png'; // e.g., helm-01.png
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
    console.log(`Copied ${file} to ${newName}`);
  } else {
    console.log(`Warning: Could not find image for ${p}`);
  }
}
