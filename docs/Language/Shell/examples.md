---
title: 编程实例
---

### 1. 比较两个文件（file1， file2）的差异并文件2（file2）的更新同步到文件1（file1）

```shell
#! /bin/sh
source=$1
target=$2

# check if source folder exists
if [ ! -d "$source" ]; then
  echo "Source Folder $source does not exit!"
  exit 0
fi

# check if target folder exists
if [ ! -d "$target" ]; then
  echo "Target Folder $target does not exit!"
  exit 0
fi

# get all files in source folder
source_files=$(find "$source" -type f)

# iterate all files in source folder
for file in $source_files; do
  # get file relative path
  relative_path="${file#$source}"
  target_file="$target$relative_path"
  # file does not exist
  if [ ! -f $target_file ]; then
    target_dir=$(dirname "$target_file")
    mkdir -p $target_dir
    echo "copying $file to $target_file"
    cp "$file" "$target_file"
    echo 'updated'
  elif ! cmp -s "$file" "$target_file"; then
      echo "copying $file to $target_file"
      cp "$file" "$target_file"
      echo "updated"
  fi
done
```