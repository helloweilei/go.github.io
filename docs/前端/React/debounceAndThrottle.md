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

## 防抖（debounce）

防抖的一个使用场景时搜索功能，当输入框的内容发生变化时就调用接口搜索关键字，当快速输入搜索某个单词时，每输入一个字母都会执行搜索，而实际有效的只是最后一次搜索，这就造成了不必要的接口调用，浪费了带宽和影响的性能。

使用防抖功能可以在连续调用某个函数时只让最后一次生效，从而减少不必要的开销。

### 实现

JS实现：

```js
export function debounce(fn, delay) {
  let timer = null;
  return function debounceFn(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
```

在React Hook中的使用：

```js
export default function useDebounce(fn, delay) {

  const ref = useRef(debounce(fn, delay));

  return ref.current;

}
```

## 结论

以上就是节流和防抖功能的简单介绍，实际使用中可能还要考虑更多的因素，比如对于节流，在时间间隔之内的函数是不会执行的，但是我们有时需要最后一个函数调用必须要被执行（比如需要在mousemove事件中记录鼠标的最新位置，如果节流导致最后几次函数调用没有被执行，那记录的鼠标位置就不是最新的），因此需要增加额外的代码区控制。

关于节流问题的参考实现如下：

```js
export function throttle2(fn, delay) {
  let lastTime = 0;
  let lastFn = null;
  let runLastFnTimer = null;

  return function throttleFn(...args) {
    const timeElapsed = Date.now() - lastTime;
    if (timeElapsed > delay) {
      fn.apply(this, args);
      lastTime = Date.now();
      lastFn = null;
      if (runLastFnTimer) {
        clearTimeout(runLastFnTimer);
      }
      runLastFnTimer = setTimeout(() => {
        if (lastFn) {
          // eslint-disable-next-line no-console
          console.log("trailing fun called");
          lastFn();
        }
        runLastFnTimer = null;
      }, delay * 2); // 参考值，延迟时间需要略大于delay
    } else {
      lastFn = fn.bind(this, ...args);
    }
  }
}
```
