---
title: TypeScript

---
### tsc的使用

1. 安装

   ```bash
   npm install -g typescript
   ```
2. 常用参数

   - `tsc -v` : check the bersion
   - `tsc test.tsc`: compile specified file
   - `tsc src/*.ts` : compile all files in src folder
   - `tsc test.ts --declaration --emitDeclarationOnly`: generate declaration files only
   - `tsc test1.ts test2.ts --target esnext --outfile index.js`: compile multiple files into one file

   > If there is no params in `tsc` command, the compiler will interpret configuration infomation from `tsconfig.json` file, throw error if the file does not exists.
   >

### TS-Node

1. 安装：`npm install -g ts-node`
2. usage: `ts-ndoe index.ts`
   > Playground: [点这里](https://www.typescriptlang.org/play)
   >

### tsconfig.json文件

可以通过命令自动生成：`tsc init`
