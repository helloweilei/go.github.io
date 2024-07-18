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
  上面的代码会报错： 'rmdir: failed to remove `symlink': Not a directory',
  所以对于软连接需要进行额外的判断：

  ```shell
  if [ -d "$FOLDER_OR_SYMLINK"  ]; then
    if [ -L "$FOLDER_OR_SYMLINK" ]; then
      rm "$FOLDER_OR_SYMLINK"
    else
      rmdir "$FOLDER_OR_SYMLINK"
  fi
  ```

#### 判断文件是否存在

- 方式1:

```shell
if [ -e "$file_path" ]; then
  echo yes
else
  echo no
fi
```

- 方式2:

```shell
(ls x.txt >> /dev/null 2>&1 && echo yes) || echo no
```

### 常用命令

1. __basename__: 从路径中提取文件名

```shell
basename /aa/bb/cc.txt # cc.txt
basename /aa/bb/cc.txt .txt # cc
```

2. __date__: 获取当前时间

```shell
date +%Y/%m/%d # 2024/07/18, command executed at 18 July, 2024
```

3. __cmp__: 文件比较

cmp命令用于比较两个文件的内容，如果文件相同，则不显示任何信息；如果文件不同，则显示第一个不同的位置。cmp命令的语法包括可选的参数，如-l（列出所有不同之处）、-s（不显示错误信息）等.

```shell
cmp -s file1.txt file2.txt
```

### 控制流

#### For 循环

1. 基本结构

```bash
for <variable name> in <a list of items>;do <some command> $<variable name>;done;
```

  items是有空格或换行符分割的列表。例如可以通过for语句批量更新文件名：

  ```bash
  for i in $(ls *.pdf); do
    mv $i $(basename $i .pdf)_$(date +%Y%m%d).pdf
  done
  ```
2. 列表项推断

```shell
for i in {0..8}; do echo $i; done # 0 1 2 3 4 5 6 7 8
for i in {china,america}-{1..2}; do echo $i; done # china-1 china-2 america-1 america-2
for i in $(cat xxx.txt); do echo $i; done # 从文件中获取列表项
```

3. 嵌套循环

```shell
for i in {0..10}; do
  for j in {1..4}; do
    echo "($i, $j)";
  done
done # (0, 0) (0, 1) ... (10, 3) (10, 4)
```

4. 与其他命令组合完成更复杂的任务

```shell
# 将所有的FILE*.txt文件重命名为TEXT*.txt
$ for i in $(ls FILE*.txt);do mv $i `echo $i | sed s/FILE/TEXT/`;done
```