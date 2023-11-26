---
title: Angular 库
---
## 创建库

### 创建新库骨架

```shell
ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib
```

### 构建、测试和Lint

```shell
ng build my-lib --configuration development
ng test my-lib
ng lint my-lib
```

### 发布

```shell
ng build my-lib
cd dist/my-lib
npm publish
```
