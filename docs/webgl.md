---
nav:
  title: WebGL
  order: 2
---

# WebGL

## 创建顶点缓冲区

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

## 设置片元颜色

从顶点着色器到片元着色器会经历两个过程：图形装配、光栅化；

- 图形装配会将孤立的顶点转化成基本的集合图形（gl.drawArrays 的第一个参数指定）
- 光栅化将图形转换成片元

片元着色器会为生成的每一个片元执行一次，当通过 varying 变量从顶点着色器为顶点指定颜色时，顶点之间的片元颜色会被插值。

```js
const VERTEX_SHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

// 通过变量gl_FragCoord可以读取到每个片元的坐标信息
const FRAG_SHADER_SOURCE = `
  precision mediump float;
  uniform float u_drawingWidth;
  uniform float u_drawingHeight;
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / u_drawingWidth, 0.0, gl_FragCoord.y / u_drawingHeight, 1.0);
  }
`;

const program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE);
const a_Position = gl.getAttribLocation(program, 'a_Position');
const u_drawingWidth = gl.getUniformLocation(program, 'u_drawingWidth');
const u_drawingHeight = gl.getUniformLocation(program, 'u_drawingHeight');

const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

initVertexBuffer(gl, vertices, a_Position);

gl.clearColor(1.0, 1.0, 1.0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform1f(u_drawingWidth, canvas.width);
gl.uniform1f(u_drawingHeight, canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, 3);
```
