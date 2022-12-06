---
nav:
  title: WebGL
  order: 2
---

# 创建顶点缓冲区

有时我们需要一次想顶点着色器传递多个顶点的位置信息，使用方法 gl.vertexAttrib[n]f[v]已经不能满足要求，这个时候就需要借助缓冲区，下面的代码展示了如何创建顶点缓冲区并关联到顶点着色器的 attribute 变量：

```js
function initVertexBuffer(gl, vertices, attribLocation) {
  // 1. 创建缓冲区对象对象
  const buffer = gl.createBuffer();
  if (!buffer) {
    throw new Error('Failed to create buffer.');
  }

  // 2. 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // 3. 将数据写入到缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 4. 将缓冲区对象分配给attribute变量
  gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0);

  // 5. 开启attribute变量
  gl.enableVertexAttribArray(attribLocation);
}
```
