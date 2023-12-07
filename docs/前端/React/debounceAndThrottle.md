---
title: React中的防抖和节流
---
## 节流（throttle）

节流目的是对频繁执行的动作进行限制，减少不必要的执行进而达到优化性能的目的。例如为mousemove事件绑定回调函数，因为mousemove事件触发的频率非常高，如果回调执行的事件较长就会导致频繁的处理事件阻塞用户交互，影响使用体验。

一种节流的方式是在指定的时间间隔内只执行一次回调，函数执行一次之后在给定的时间间隔再次调用函数竟会被忽略知道超过给定事件函数才有机会再次执行。

### 实现节流

可以用JS实现一个简单的节流函数：

```js
export function throttle(fn, delay) {
  let scheduled = false;
  return function throttleFn (...args) {
    if (!scheduled) {
      fn.apply(this, args);
      setTimeout(() => {
        scheduled = false;
      }, delay);
      scheduled = true;
    }
  }
}
```

在上面的例子中，定义了一个布尔变量 `scheduled`，当变量为false时表示可以执行函数，函数一旦执行就将变量置为true，一段时间后该变量被重新设置成false，函数又可以执行。

也可以用其他的方式实现：

```js
export function throttle2(fn, delay) {
  let lastTime = 0;

  return function throttleFn(...args) {
    const timeElapsed = Date.now() - lastTime;
    if (timeElapsed > delay) {
      fn.apply(this, args);
      lastTime = Date.now();
    }
  }
}
```

在React的函数组件中，由于每次更新时函数都会重新执行，因此需要将节流后的函数保存到ref中(下面的例子假设原函数不会更新)：

```js
export function useThrottle(fn, delay) {

  const ref = useRef();

  if (!ref.current) {
    ref.current = throttle(fn, delay);
  }

  return ref.current;
}
```
