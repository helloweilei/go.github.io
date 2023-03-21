---
title: 纹理
---
### 纹理映射

将一张图片映射（贴）到几何图形的表面，图像可以称为 `纹理图像`或 `纹理`。组成纹理图像的像素称为**纹素**，纹素的颜色通过RGB或RGBA编码。

### 纹理映射的步骤

1. 准备纹理图像；
2. 配置纹理映射方式；
3. 加载纹理图像并进行配置；
4. 在片元着色器中抽取纹素并应用到片元；

### 纹理坐标

纹理坐标就是相对于纹理图像的坐标，通过纹理坐标可以获取纹素的颜色，纹理坐标的四个点分别对应图像的四个角，左下角（0，0），右下角（1， 0），左上角（0， 1）以及右上角（1，1），坐标值与图像的尺寸无关。

### 示例程序

1. 在顶点着色器中指定纹理坐标：

```js
var VSHADER_SOURCE = `
	attribute vec4 a_Position;
	attribute vec2 a_TextureCoord;
	varying vec2 v_TextureCoord;
	void main() {
		gl_Position = a_Position;
		v_TextureCoord = a_TextureCoord;
	}
`;
```

2. 在片元着色器中读取纹素：

   ```js
   var FSHADER_SOURCE = `
   	uniform sampler2D u_Sampler;
   	varying vec2 v_TextureCoord;
   	void main() {
   		gl_FragColor = texture2D(u_sampler, v_TextureCoord);
   	}
   `;
   ```
3. 设置纹理坐标，在这里将顶点坐标和纹理坐标保存在同一个缓冲区，然后分别获取a_Position和a_TextureCood变量的位置，设置坐标并启用：

   ```js
   var verticesTexCoord = new Float32Array([
   	-0.5, -0.5, 0.0, 0.0,
   	-0.5, 0.5, 0.0, 1.0,
   	0.5, 0.5, 1.0, 1.0,
   	0.5, 0, 1, 0
   ]);
   var verticesTexCoordBuffer = gl.createBuffer();
   gl.bindBuffer(gl.BUFFER_ARRAY, verticesTexCoordBuffer);
   gl.bufferData(gl.BUFFER_ARRAY, verticesTexCoord, gl.STATIC_DRAW);
   var FSIZE = verticesTexCoord.BYTES_PER_ELEMENT;
   // 为顶点变量赋值
   var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE * 4, 0);
   gl.enableVertexAttribArray(a_Position);
   var a_TextureCoord = gl.getAttribLocation(gl.program, 'a_TextureCoord');
   gl.vertexAttribPointer(a_TextureCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
   gl.enableVertexAttribArray(a_TextureCoord);
   ```
4. 配置和加载纹理
