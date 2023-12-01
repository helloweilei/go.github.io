---
title: useEffect和useLayoutEffect的差异
---
## useEffect

`useEffect`用于注册一个副作用，它的回调函数执行时机是在浏览器重绘屏幕之后异步执行，因此不会阻塞浏览器的渲染。react能够保证回调函数在下一次组件更新之前执行。`useEffect`使用的场景包括获取后端数据，订阅以及与Dom的交互等。

## useLayoutEffect

与`useEffect`类似，接口完全相同，大部分情况下可以直接替代`useEffect`，与`useEffect`不同的是`useLayoutEffect`是在dom更新后浏览器重绘之前同步执行，因此`useLayoutEffect`的副作用函数执行的时候状态的改变还没有更新到屏幕上。由于是同步执行的，因此回阻塞浏览器的重绘，如果回调函数包含复杂耗时的计算可能会导致状态不能及时更新影响用户的体验。

`use LayoutEffect`通常使用在一些特定的场景中，如measuring dom、dom动画和过渡、以及需要尽快反映在屏幕上的Dom更新等。

综上所述，大部分场景下优先使用`useEffect`，只用在`useEffect`不能满足一些效果时考虑使用`useLayoutEffect`。
