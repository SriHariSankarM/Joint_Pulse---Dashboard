const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove unused React imports
  content = content.replace(/import React(?:, \{[^}]+\})? from 'react';\n?/g, (match) => {
    if (match.includes('{')) {
      return match.replace(/React, /, '');
    }
    return '';
  });

  // Fix type imports for types from ../types or ../../types
  content = content.replace(/import \{([^}]+)\} from '(\.\.\/types|\.\.\/\.\.\/types)';/g, "import type { $1 } from '$2';");

  fs.writeFileSync(file, content);
});

console.log('Fixed imports');
