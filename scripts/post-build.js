const fs = require('fs');
const path = require('path');

const dist_path = path.resolve(__dirname, "../dist")

const files = fs.readdirSync(dist_path)
files.forEach(file => {
  if (file.endsWith(".js")) {
    fs.renameSync(path.join(dist_path, file), path.join(dist_path, 'umi.js'))
  }
  if (file.endsWith(".css")) {
    fs.renameSync(path.join(dist_path, file), path.join(dist_path, 'umi.css'))
  }
})

let htmlContent = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'))
  .toString();

let jsContent = fs
  .readFileSync(path.resolve(__dirname, '../dist/umi.js'))
  .toString()
  .replace(/static\//g, 'dist/static/');

fs.writeFileSync(path.resolve(__dirname, '../dist/umi.js'), jsContent);

htmlContent = htmlContent
  .replace(/umi(\w+)\.css/, 'dist/umi.css')
  .replace(/umi(\w+)\.js/, 'dist/umi.js')
  .replace(
    /(?=<link)/,
    '<link rel="shortcut icon" href="/favicon.ico" />\n\t\t',
  );

fs.writeFileSync(path.resolve(__dirname, '../index.html'), htmlContent);
