---
面试题
---
## setState的执行是同步还是异步

同步:

1. 首先在 `legacy模式`下
2. 在执行上下文为空的时候去调用 `setState`
   * 可以使用异步调用如 `setTimeout`, `Promise`, `MessageChannel`等
   * 可以监听原生事件, 注意不是合成事件, 在原生事件的回调函数中执行 setState 就是同步的

异步:

1. 如果是合成事件中的回调, `executionContext |= DiscreteEventContext`, 所以不会进入, 最终表现出异步
2. concurrent 模式下都为异步
