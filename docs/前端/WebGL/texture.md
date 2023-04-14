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

   内置函数texture2D(sampler, coord)用于抽取纹素颜色, 参数sampler和coord分别用于指定纹理单元和纹理坐标。
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

   - 创建纹理对象， 纹理对象用于管理纹理

     ```js
     var textute = gl.createTexture();
     ```
   - 获取着色器变量u_Sampler(取样器的位置)，以及加载图片

     ```js
     var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
     var image = new Image();
     image.onlocad = function() {
     	loadTexture();
     }
     image.src = 'path/to/image';
     ```
   - 配置纹理（实现loadTexture()函数）

     ```js
     function loadTexture() {
     	// 对纹理对象进行Y轴反转
     	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
     	// 开启0号纹理单元
     	gl.activeTexture(gl.TEXTURE0);
     	// 绑定纹理对象
     	gl.bindTexture(gl.TEXTURE_2D, texture);
     	// 配置纹理参数
     	gl.texParameteri(gl.TEXTURE_2D, gl.MIN_FILTER, gl.LINEAR);
     	// 配置纹理图像
     	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
     	// 将0号纹理对象传递给变量u_Sampler
     	gl.uniform1i(u_Sampler, 0);
     }
     ```

     - Y轴反转：图片的Y坐标与纹理坐标系相反；
     - 纹理单元：用于同时使用多个纹理，每一个纹理单元通过编号管理一张纹理图像；
     - 纹理对象：WebGL中不能直接操作纹理对象，需要先绑定到纹理单元，然后通过操作纹理单元来操作纹理对象；
     - 配置纹理参数：gl.texParameteri(target, pname, param);
     - 专用于纹理的数据类型： sampler2D（绑定到gl.TEXTURE_2D）、samplerCube（绑定到gl.TEXTURE_CUBE_MAP）；
   - 对程序做如下修改可实现repeat效果：

     ```js
     var verticesTexCoords = new Float32Array([
     	-0.5,  0.5, -0.3, 1.7,
     	-0.5, -0.5, -0.3, -0.2,
     	0.5, 0.5, 1.7, 1.7,
     	0.5, -0.5, 1.7, -0.2
     ]);

     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
     ```

### 使用多幅纹理

与前面的代码主要有以下几点区别：

- 片元着色器可以访问两个纹理；
- 片元的颜色由两个纹理的纹素共同决定；
- initTexture()函数创建了两个纹理；

代码片段：

1. 片元着色器：

```c
uniform sampler2D u_Sampler2;
// ...
vec4 color1 = texture2D(u_Sampler2, v_TextureCoord);
// ...
gl_FragColor = color0 * color1;
```

2. initTextre() 函数：

```js
var texture1 = gl.createTexture();
// ...
var u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
// ...
```

3. loadTexture() 函数修改类似，分别开启不同的纹理单元并传递给对应的变量；
