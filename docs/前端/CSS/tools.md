---
Tools
---
- 编译scss文件： `node-sass`

  ```js
  var sass = require('node-sass');
  sass.render({
    file: scss_filename,
    [, options..]
  }, function(err, result) { /*...*/ });
  // OR
  var result = sass.renderSync({
    data: scss_content
    [, options..]
  });
  ```
