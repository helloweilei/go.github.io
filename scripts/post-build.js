const fs = require('fs');
const path = require('path');

let htmlContent = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'))
  .toString();

let jsContent = fs
  .readFileSync(path.resolve(__dirname, '../dist/umi.js'))
  .toString()
  .replace(/static\//g, 'dist/static/');

fs.writeFileSync(path.resolve(__dirname, '../dist/umi.js'), jsContent);

htmlContent = htmlContent
  .replace('umi.css', 'dist/umi.css')
  .replace('umi.js', 'dist/umi.js')
  .replace(
    /(?=<link)/,
    '<link rel="shortcut icon" href="/favicon.ico" />\n\t\t',
  );

fs.writeFileSync(path.resolve(__dirname, '../index.html'), htmlContent);
