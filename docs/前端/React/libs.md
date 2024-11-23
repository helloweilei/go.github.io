---
title: 常用的第三方库
---

### 状态管理

- recoil
  官方文档： https://recoiljs.org/zh-hans/docs/introduction/core-concepts
  特点： 使用简单，API 类似于 react hook
- redux(@reductjs/toolkit) + react-redux
  官方文档：https://redux.js.org/introduction/getting-started、
- jotai
- zustand

### 过渡和动画

- react-transition-group
  官网：https://reactcommunity.org/react-transition-group/
- 示例

  ```jsx | pure
  import { Transition } from 'react-transition-group';
  import { useRef } from 'react';

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  function Fade({ in: inProp }) {
    const nodeRef = useRef(null);
    return (
      <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            I'm a fade Transition!
          </div>
        )}
      </Transition>
    );
  }
  ```

- react-reveal

  官方文档： https://www.react-reveal.com/docs/

- 示例

  ```jsx | pure
  import React from 'react';
  import Fade from 'react-reveal/Fade';

  class FadeExample extends React.Component {
    render() {
      return (
        <div>
          <Fade left>
            <h1>React Reveal</h1>
          </Fade>
        </div>
      );
    }
  }

  export default FadeExample;
  ```

### 通用工具

- ahooks: 一套高质量可靠的 React Hooks 库
  [Docs](https://ahooks.js.org/zh-CN/guide/)

### webpack 插件

- webpack-bundle-analyzer: webpack 输出文件大小可视化展示
  [npm link](https://www.npmjs.com/package/webpack-bundle-analyzer)

- speed-measure-webpack-plugin: 测量 webpack 的打包速度
  [npm link](https://www.npmjs.com/package/speed-measure-webpack-plugin)
