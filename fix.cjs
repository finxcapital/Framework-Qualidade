const fs = require('fs');
let c = fs.readFileSync('src/app.js', 'utf8');
c = c.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
fs.writeFileSync('src/app.js', c);
