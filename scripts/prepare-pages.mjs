import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

if (!fs.existsSync(dist)) {
  console.error('dist/ is missing. Run npm run export:web first.');
  process.exit(1);
}

function addDirectoryIndexes(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      addDirectoryIndexes(fullPath);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const name = entry.name.slice(0, -'.html'.length);
    if (name === 'index' || name === '404') continue;
    const folder = path.join(directory, name);
    fs.mkdirSync(folder, { recursive: true });
    const target = path.join(folder, 'index.html');
    if (!fs.existsSync(target)) fs.copyFileSync(fullPath, target);
  }
}

addDirectoryIndexes(dist);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('Prepared dist/ for GitHub Pages.');
