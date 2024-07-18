---
title: 基础
---

### 文件操作

#### 判断文件夹是否存在

  判断文件夹是否存在可以通过`[ -d "$FOLDER_PATH" ]`实现，但是需要注意的是对于一个文件夹的软链接测试也会通过，所以下面的代码会报错：

  ```shell
  ln -s "$SOURCE_FOLDER" "$SYMLINK"
  if [ -d "$SYMLINK" ]; then
    rmdir "$SYMLINK"
  fi
  ```
  上面的代码会报错： 'rmdir: failed to remove `symlink': Not a directory'
  所以对于软连接需要进行额外的判断：

  ```shell
  if [ -d "$FOLDER_OR_SYMLINK"  ]; then
    if [ -L "$FOLDER_OR_SYMLINK" ]; then
      rm "$FOLDER_OR_SYMLINK"
    else
      rmdir "$FOLDER_OR_SYMLINK"
  fi
  ```
