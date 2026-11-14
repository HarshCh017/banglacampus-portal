const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = path.resolve('/Users/AyaanshPratapSingh/.gemini/antigravity/brain/9fe11a97-7f18-4a89-8837-7f363a4def61/audit_screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'colleges', path: '/colleges' },
  { name: 'college_detail', path: '/colleges/iem-kolkata' },
  { name: 'simulator', path: '/counselling-simulator' },
  { name: 'compare', path: '/compare' },
];

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const userDataDir = '/tmp/chrome-audit-profile';

for (const route of routes) {
  for (const vp of viewports) {
    const filename = `${route.name}_${vp.name}_${vp.width}x${vp.height}.png`;
    const dest = path.join(outputDir, filename);
    const url = `http://localhost:3000${route.path}`;
    
    console.log(`Capturing ${route.name} (${vp.name} ${vp.width}x${vp.height})...`);
    const cmd = `"${chromePath}" --headless=new --disable-gpu --user-data-dir="${userDataDir}" --screenshot="${dest}" --window-size=${vp.width},${vp.height} "${url}"`;
    try {
      execSync(cmd, { stdio: 'pipe' });
      console.log(`Saved: ${filename}`);
    } catch (err) {
      console.error(`Failed ${filename}:`, err.message);
    }
  }
}

console.log('Screenshot audit complete. Files saved in:', outputDir);
