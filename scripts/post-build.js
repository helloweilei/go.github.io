const fs = require('fs');
const path = require('path');

let htmlContent = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'))
  .toString();

htmlContent = htmlContent
  .replace('umi.css', 'dist/umi.css')
  .replace('umi.js', 'dist/umi.js');

fs.writeFileSync(path.resolve(__dirname, '../index.html'), htmlContent);
