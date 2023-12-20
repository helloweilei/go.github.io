---
title: 进阶
---
## 滚动驱动的动画

我们发现，根据滚动位置而不断改变动画的进度是一种比较常见的场景，这类动画可以让人感觉到界面交互很连贯自然，体验更好。因此，从小程序基础库 [2.9.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始支持一种由滚动驱动的动画机制。

基于上述的关键帧动画接口，新增一个 `ScrollTimeline` 的参数，用来绑定滚动元素（目前只支持 scroll-view）。接口定义如下：

```javascript
this.animate(selector, keyframes, duration, ScrollTimeline)
```

**ScrollTimeline 中对象的结构**

| 属性              | 类型   | 默认值   | 必填 | 说明                                                                                            |
| ----------------- | ------ | -------- | ---- | ----------------------------------------------------------------------------------------------- |
| scrollSource      | String |          | 是   | 指定滚动元素的选择器（只支持 scroll-view），该元素滚动时会驱动动画的进度                        |
| orientation       | String | vertical | 否   | 指定滚动的方向。有效值为 horizontal 或 vertical                                                 |
| startScrollOffset | Number |          | 是   | 指定开始驱动动画进度的滚动偏移量，单位 px                                                       |
| endScrollOffset   | Number |          | 是   | 指定停止驱动动画进度的滚动偏移量，单位 px                                                       |
| timeRange         | Number |          | 是   | 起始和结束的滚动范围映射的时间长度，该时间可用于与关键帧动画里的时间 (duration) 相匹配，单位 ms |

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/994o8jmY7FcQ "在开发者工具中预览效果")

```javascript
  this.animate('.avatar', [{
    borderRadius: '0',
    borderColor: 'red',
    transform: 'scale(1) translateY(-20px)',
    offset: 0,
  }, {
    borderRadius: '25%',
    borderColor: 'blue',
    transform: 'scale(.65) translateY(-20px)',
    offset: .5,
  }, {
    borderRadius: '50%',
    borderColor: 'blue',
    transform: `scale(.3) translateY(-20px)`,
    offset: 1
  }], 2000, {
    scrollSource: '#scroller',
    timeRange: 2000,
    startScrollOffset: 0,
    endScrollOffset: 85,
  })

  this.animate('.search_input', [{
    opacity: '0',
    width: '0%',
  }, {
    opacity: '1',
    width: '100%',
  }], 1000, {
    scrollSource: '#scroller',
    timeRange: 1000,
    startScrollOffset: 120,
    endScrollOffset: 252
  })
```

> Taro中获取page实例的方法：
>
> `const page = Taro.getCurrentPages().pop();`



## 获取状态栏和导航栏的高度

很多时候我们开发微信小程序，都需要先知道状态栏和导航栏的高度，才能去做其他功能。

### 获取微信小程序状态栏高度

用 `wx.getSystemInfoSync()`【官方文档】获取系统信息，里面有个参数：`statusBarHeight（状态栏高度）`，是我们后面计算整个导航栏的高度需要用到的。

```javascript
let res = wx.getSystemInfoSync();
let statusHeight = res.statusBarHeight; // 注意：此时获取到的值的单位为 'px'
```

### 获取微信小程序导航栏高度

#### 1）方法一（个人不赞同该方法的）

很多人使用获取胶囊布局信息 ，`wx.getMenuButtonBoundingClientRect()`，**根据胶囊高度及上下位置，结合状态栏高度即可算出导航栏高度。**

```javascript
let res = wx.getSystemInfoSync(); //系统信息
let custom = wx.getMenuButtonBoundingClientRect() //胶囊按钮位置信息 { left, top, right, bottom, width, height... }
let navBarHeight = (custom.top - res.statusBarHeight) * 2 + custom.height //计算得出导航栏高度
```

**该方法原理：**

> **把微信小程序的胶囊按钮位于导航栏中间来使用，利用胶囊距离顶部的距离 - 状态栏高度，得出胶囊距离导航栏顶部的距离，认为胶囊距离导航栏底部也是这个距离，所以乘以2；再加上胶囊按钮的高度得出导航栏整体高度**

#### 2）方法二（个人项目中用的方法）

**计算公式：顶部导航栏总高度 = 状态栏高度 + 44。**

```javascript
let res = wx.getSystemInfoSync()
let navBarHeight = res.statusBarHeight + 44 //顶部状态栏+顶部导航，大部分机型默认44px
uni.setStorageSync('statusBarHeight', res.statusBarHeight)  //状态栏高度
uni.setStorageSync('navBarHeight', navBarHeight)  //状态栏+导航栏高度
```
