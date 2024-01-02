---
title: Taro尺寸配置
---
# 设计稿及尺寸单位（[Taro官方文档](https://docs.taro.zone/docs/1.x/size/)）

在 Taro 中尺寸单位建议使用 `px`、 `百分比 %`，Taro 默认会对所有单位进行转换。在 Taro 中书写尺寸按照 1:1 的关系来进行书写，即从设计稿上量的长度 `100px`，那么尺寸书写就是 `100px`，当转成微信小程序的时候，尺寸将默认转换为 `100rpx`，当转成 H5 时将默认转换为以 `rem` 为单位的值。

如果你希望部分 `px` 单位不被转换成 `rpx` 或者 `rem` ，最简单的做法就是在 px 单位中增加一个大写字母，例如 `Px` 或者 `PX` 这样，则会被转换插件忽略。

结合过往的开发经验，Taro 默认以 `750px` 作为换算尺寸标准，如果设计稿不是以 `750px` 为标准，则需要在项目配置 `config/index.js` 中进行设置，例如设计稿尺寸是 `640px`，则需要修改项目配置 `config/index.js` 中的 `designWidth` 配置为 `640`：

```jsx
const config ={
projectName:'myProject',
date:'2018-4-18',
designWidth:640,
....
}
```

目前 Taro 支持 `750`、 `640` 、 `828` 三种尺寸设计稿，他们的换算规则如下：

```jsx
constDEVICE_RATIO={
'640':2.34/2,
'750':1,
'828':1.81/2
}
```

建议使用 Taro 时，设计稿以 iPhone 6 `750px` 作为设计尺寸标准。

如果你的设计稿是 `375` ，不在以上三种之中，那么你需要把 `designWidth` 配置为 `375`，同时在 `DEVICE_RATIO` 中添加换算规则如下：

```jsx
constDEVICE_RATIO={
'640':2.34/2,
'750':1,
'828':1.81/2,
'375':2/1
}
```

## API

在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API `Taro.pxTransform` 来做运行时的尺寸转换。

```jsx
Taro.pxTransform(10)// 小程序：rpx，H5：rem
```
