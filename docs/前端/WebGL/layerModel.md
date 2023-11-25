---
title: 高级技术
---
### 帧缓冲区对象

WebGL中的帧缓冲区对象（Frame Buffer Object，FBO）是一种用于渲染到纹理或多重渲染目标的技术。它允许我们将渲染过程从屏幕上的默认帧缓冲区转移到自定义帧缓冲区，以便进行后续处理或者实现一些高级效果，例如反射、阴影等等。

一个FBO由一个或多个附着点 (attachment points) 组成，每个附着点可以用来存储一个颜色缓冲区（color buffer）、深度缓冲区（depth buffer）、模板缓冲区（stencil buffer）等等。在创建一个FBO时，我们需要指定它包含的附着点数量和类型，并将渲染结果输出到指定的附着点上。使用完FBO后，我们可以通过gl.bindFramebuffer()函数将渲染目标切换回默认的帧缓冲区。

以下是一个简单的WebGL FBO示例，这里我们将渲染结果输出到一个纹理上：

```js
// 创建一个帧缓冲区对象
const fbo = gl.createFramebuffer();

// 创建一个颜色附着点并绑定到纹理上
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
gl.generateMipmap(gl.TEXTURE_2D);

const colorAttachment = gl.COLOR_ATTACHMENT0;
gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture, 0);

// 检查帧缓冲区是否完整
const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
if (status !== gl.FRAMEBUFFER_COMPLETE) {
  console.error('Frame buffer is not complete');
}

// 渲染过程
gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
gl.viewport(0, 0, width, height);
// 在此处进行渲染操作

// 将渲染结果输出到屏幕上
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
gl.viewport(0, 0, canvas.width, canvas.height);
// 在此处进行纹理绘制操作
```

以上代码中，我们首先创建了一个FBO，并为其创建了一个颜色附着点并将其绑定到一个纹理上。随后，在渲染过程中，我们使用gl.bindFramebuffer()函数将渲染目标切换到了FBO上。最后，我们又使用gl.bindFramebuffer()函数将渲染目标切换回默认的帧缓冲区，这样就可以在屏幕上看到渲染结果了。

需要注意的是，由于WebGL的限制，我们不能直接将一个FBO中的纹理用作另一个FBO的输入。如果需要多个FBO之间进行渲染数据共享，可以使用gl.copyTexImage2D()函数将FBO中的渲染结果拷贝到纹理上，再将该纹理绑定到另外一个FBO上进行下一步渲染操作。
