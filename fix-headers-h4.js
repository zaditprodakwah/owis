const fs = require('fs');
const glob = require('glob');

const files = glob.sync('docs/90-API/*.md');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  let currentParent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('### ')) {
      currentParent = line.replace('### ', '').trim();
      currentParent = currentParent.replace(/`/g, '');
      currentParent = currentParent.replace(/\[([^\]]+)\]\(.*?\)/g, '$1');
    }
    
    if (line.match(/^#### (Signature|Parameters|Return Value|Example|Errors|Arguments|Output Files Written|Stdout Format|Exit Codes)$/)) {
      if (currentParent) {
         let type = line.replace('#### ', '').trim();
         lines[i] = `#### ${currentParent} ${type}`;
      }
    }
  }
  
  fs.writeFileSync(file, lines.join('\n'));
});
