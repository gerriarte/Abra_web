const fs = require('fs');
const path = require('path');

const dir = 'components/sections';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace section backgrounds
    content = content.replace(/<section([^>]*)className="([^"]*)\bbg-white\b([^"]*)"/g, '<section$1className="$2bg-transparent$3"');
    content = content.replace(/<section([^>]*)className="([^"]*)\bbg-off\b([^"]*)"/g, '<section$1className="$2bg-transparent$3"');
    content = content.replace(/<section([^>]*)className="([^"]*)\bbg-primary-darkest\b([^"]*)"/g, '<section$1className="$2bg-transparent$3"');
    
    fs.writeFileSync(filePath, content);
  }
});
