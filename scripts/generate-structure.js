const fs = require('fs');
const path = require('path');

function getStructure(dirPath) {
  const name = path.basename(dirPath);
  const item = { name };

  if (fs.statSync(dirPath).isDirectory()) {
    item.children = fs.readdirSync(dirPath)
      .filter(child => 
        !child.startsWith('.') && // Exclude hidden files/folders
        !['.git', 'node_modules', '.github', 'output.html', 'structure.json', 'structure.png', 'package-lock.json', 'package.json'].includes(child))
      .map(child => getStructure(path.join(dirPath, child)));
  }

  return item;
}

const structure = getStructure('.');


const templatePath = path.join(process.env.GITHUB_ACTION_PATH, 'scripts', 'structure.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

const fullHtml = htmlTemplate.replace('__STRUCTURE__', JSON.stringify(structure, null, 2));

const outputDir = path.join('.github', 'rgraph');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'output.html'), fullHtml);
fs.writeFileSync(path.join(outputDir, 'structure.json'), JSON.stringify(structure, null, 2)); // Optional debug

console.log('✅ Full folder structure saved to .github/rgraph/output.html and .github/rgraph/structure.json');
