---
title: 代码合并与撤销
---
### 撤销Merge

Git提供了多种撤销Merge的方法，以下是其中两种流程详述。

**方法1：使用Git merge --abort命令**

```shell
git merge --abort
```

可以使用命令行中的--abort选项来撤销合并。

**方法2：使用Git reset命令**

```shell
git reset --hard HEAD^
```
