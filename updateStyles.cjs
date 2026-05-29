const fs = require('fs');

let css = fs.readFileSync('src/styles/components.css', 'utf8');

// Update modal-backdrop color
css = css.replace(/background: rgba\(10, 16, 36, 0\.75\);/g, 'background: rgba(54, 46, 37, 0.65);');

// Update modal-box to glassmorphism vintage
css = css.replace(
  /background: #101e3a;/g, 
  'background: rgba(247, 243, 232, 0.65);\n  backdrop-filter: blur(24px);\n  -webkit-backdrop-filter: blur(24px);'
);

// Update farol-label to glassmorphism
css = css.replace(
  /background: rgba\(0,0,0,0\.2\);/g, 
  'background: rgba(0, 0, 0, 0.04);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);'
);

// exp-card
css = css.replace(
  /background: rgba\(0,0,0,0\.1\);/g,
  'background: rgba(0, 0, 0, 0.03);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);'
);
css = css.replace(
  /background: rgba\(0,0,0,0\.2\);/g,
  'background: rgba(0, 0, 0, 0.05);'
);

// toast (if it has hardcoded)
css = css.replace(/background: rgba\(10, 16, 36, 0\.75\)/g, 'background: rgba(247, 243, 232, 0.8)');

fs.writeFileSync('src/styles/components.css', css);

// Also fix layout.css
let lcss = fs.readFileSync('src/styles/layout.css', 'utf8');
// remove pointer-events from inner if it exists incorrectly
lcss = lcss.replace(/pointer-events: none;/g, 'pointer-events: none;'); // it's already there on wrapper
// Ensure controls-inner has pointer-events: auto;
if (!lcss.includes('pointer-events: auto;')) {
  lcss = lcss.replace(/\.wizard-controls-inner \{([^}]*)\}/g, '.wizard-controls-inner {$1\n  pointer-events: auto;\n}');
}
fs.writeFileSync('src/styles/layout.css', lcss);

console.log('CSS updated for glassmorphism and vintage theme.');
