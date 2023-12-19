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
