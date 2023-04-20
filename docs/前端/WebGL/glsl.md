---
title: OpenGL ES着色器语言
---
### 数据值类型

- 数值类型： 整型、浮点型
- 布尔值类型： 包含true、false两个布尔常量

### 变量

变量不能以gl_, webgl_, \_webgl\_开头，被保留。

关键字：

| attribute | bool      | break       | bvec2  | bvec3 | bvec4     |
| --------- | --------- | ----------- | ------ | ----- | --------- |
| const     | continue  | discard     | do     | else  | false     |
| float     | for       | highp       | if     | in    | inout     |
| Int       | invariant | ivec2       | ivec3  | ivec4 | lowp      |
| mat2      | mat3      | mat4        | medium | out   | precision |
| return    | sampler2D | samplerCube | struct | true  | uniform   |
| varying   | vec2      | vec3        | vec4   | void  | while     |

保留字：

| asm       | cast          | class     | default         | double        | dvec2               | dvec3          |
| --------- | ------------- | --------- | --------------- | ------------- | ------------------- | -------------- |
| dvec4     | enum          | extern    | external        | fixed         | flat                | fvec2          |
| fvec3     | fvec4         | goto      | half            | hvec2         | hvec3               | hvec4          |
| inline    | input         | interface | long            | namespace     | noinline            | output         |
| packed    | public        | sampler1D | sampler1DShadow | sampler2DRect | sampler2DRectShadow | shadow2DShadow |
| sampler3D | sampler3DRect | short     | sizeof          | static        | superp              | switch         |
| template  | this          | typedef   | union           | unsigned      | using               | volatile       |

### 基本类型

float、bool、int；

#### 类型转换

int(float), int(bool), float(int), float(bool), bool(int),

bool(float) // 0.0被转换成false， 其他为true

示例：

```c
int i = 8;
float f1 = float(i);
```

#### 运算符

与javascript类似。

^^: 逻辑异或

### 矢量与矩阵

#### 类型：

vec2, vec3, vec4   // 浮点数元素矢量

ivec2, ivec3, ivec4

bvec2, bvec3, bvec4

mat2, mat3, mat4   // 浮点数元素矩阵

#### 矢量构造函数：

vec3 v3 = vec3(1.0, 0.0, 0.5);

vec2 v2 = vec2(v3);

vec4 v4 = vec4(1.0);

vec4 v4b = vec4(v2, v3);

#### 矩阵构造函数：

- 传入矩阵每一个元素，顺序为列主序；
  mat2 m2 = mat2(1.0, 2.0, 3.0, 4.0);  // [[1.0, 3.0], [2.0, 4.0]]
- 传入多个矢量，按列主序列；
  vec2 v2_1 = vec2(1.0, 2.0);  vec2 v2_2 = vec2(3.0, 4.0);
  mat2 m2 = mat2(v2_1, v2_2);
- 传入矢量和数值；
  vec2 v2 = vec2(3.0, 4.0);
  mat2 m2 = mat2(1.0, 2.0, v2);
- 传入单值，对角线为该元素，其余位置为0.0;mat4 m4 = mat4(1.0);

#### 访问元素

- 通过分量名：
  x，y，z，w    // 获取顶点坐标分量
  r，g，b，a     // 获取颜色分量
  s，t，p，q     // 获取纹理坐标分量
  通过分量可以增强程序的可读性，实际上，x，r，t访问的都是矢量的第一个分量；

  ```c
  vec3 v3 = vec3(1.0, 2.0, 3.0);
  v3.x; // 1.0
  v3.r; // 1.0
  v2 = v3.xy; // [1.0, 2.0]
  v2_1 = v3.xx; // [1.0, 1.0]
  vec v3a = v3.zyx; // [3.0, 2.0, 1.0]
  v3a.yz = vec2(3.0, 4.0)
  ```
- []运算符，必须使用常数索引

```c
float m23 = m4[1,2]; // 第二列的第三个元素
```

#### 运算符

支持常用的运算符。

```c
// 1. 矢量与浮点数运算
v3b = v3a + ;
// 2. 矢量运算
v3c = v3a + v3b;
// 3. 矩阵与浮点数
m3b = m3a * f;
// 4. 矩阵右乘/左乘矢量
v3b = m3 * v3a;
// 5. 矩阵乘矩阵
```

### 结构体

```c
struct light {
	vec4 color;
	vec3 position
}
light l1;
light l2;
```

#### 赋值与构造

```c
l1 = light(vec4(1.0, 0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0));
```

#### 访问成员

```c
vec4 color = l1.color;
vec3 postion = l1.position;
```

#### 运算符

- =：赋值
- ==, !=：比较，当且仅当所有成员都相等时==返回true

### 数组

同c中的数组类似，不能在申明时初始化，必须显式的对每一个元素进行初始化，只支持索引运算符；

```js
float floatArr[4];
vec4 vec4Arr[size];
floatArr[0] = 3.14;
```

### 取样器

取样器时GLSL ES内置类型，只能通过该类型访问纹理；

两种类型的取样器：sampler2D, samplerCube;

取样器只能是uniform类型的变量，或者访问纹理函数(texture2D())的参数；

```c
uniform sampler2D u_Sampler;
```

只能将纹理单元编号赋值给取样器，取值受编号数量的限制。除了赋值和比较，取样器不能作为操作数参与运算，只能通过gl.uniform1i()传递值。

### 程序流程控制：分支与循环

- if语句和if else语句
- for 语句

  - 循环变量只能在初始表达式中定义；
  - 循环变量只能是int或float类型；
  - 只能有一个循环变量；
  - 循环表达式只能是一下形式：i++, i--, i+=, i-=;
  - 条件表达式只能是循环变量与常量的比较；
  - 在循环体内，不能对循环变量赋值；

  这些限制只是为了能够对循环进行內联展开。
- continue, break 和discard
  discard只能在片元着色器中使用，表示放弃当前片元直接处理下一个片元。

### 函数

定义函数的方式接近C语言。
自己定义的结构体类型作为返回值时，结构体成员中不能有数组。
函数不能递归调用，这是为了内联展开。

#### 规范声明

如果函数的定义出现在函数的调用之后，则在调用之前需要对函数规范进行声明。

#### 参数限定词

- in（默认）: 参数传递给函数，函数内部对参数的修改不会影响到参数
- const in: 不能修改
- out: 传入引用，修改会影响到参数
- inout: 传入引用，读取初始值并进行修改

### 内置函数

- 数学函数
  - abs(x)：返回x的绝对值
  - acos(x)：返回x的反余弦值（以弧度为单位）
  - asin(x)：返回x的反正弦值（以弧度为单位）
  - atan(x)：返回x的反正切值（以弧度为单位）
  - atan(x,y)：返回点(x,y)与原点(0,0)的直线与x轴正半轴之间的夹角（以弧度为单位）
  - ceil(x)：返回大于或等于x的最小整数
  - clamp(x, minVal, maxVal)：返回一个值，该值在[minVal, maxVal]之间
  - cos(x)：返回x的余弦值（以弧度为单位）
  - degrees(x)：将以弧度为单位的角度转换为以度为单位的角度
  - exp(x)：返回自然对数的底数e的x次幂
  - floor(x)：返回小于或等于x的最大整数
  - fract(x)：返回x的小数部分
  - length(v)：返回向量v的长度
  - log(x)：返回x的自然对数
  - max(x,y)：返回x和y之间的最大值
  - min(x,y)：返回x和y之间的最小值
  - mix(x, y, a)：线性混合x和y，使用参数a作为混合系数
  - mod(x,y)：返回x除以y的余数
  - normalize(v)：返回与向量v的长度相同，但方向相同的向量
  - pow(x, y)：返回x的y次幂
  - radians(x)：将以度为单位的角度转换为以弧度为单位的角度
  - round(x)：返回x的四舍五入整数
  - sin(x)：返回x的正弦值（以弧度为单位）
  - sqrt(x)：返回x的平方根
  - step(edge, x)：如果x小于边界值，则返回0，否则返回1
  - tan(x)：返回x的正切值（以弧度为单位）
- 纹理函数
  - texture2D(sampler2D, vec2)：从纹理中获取像素值
  - texture2DProj(sampler2D, vec3)：从纹理中获取像素值，并根据向量的第三个分量进行透视修正
  - textureCube(samplerCube, vec3)：从立方体贴图中获取像素值
- 向量和矩阵函数
  - cross(a, b)：返回向量a和向量b的叉积
  - dot(a, b)：返回向量a和向量b的点积
  - faceforward(N, I, Nref)：如果向量I与向量Nref之间的夹角小于90度，则返回向量N，否则返回向量
  - length(v)：返回向量v的长度
  - matrixCompMult(x, y)：将两个矩阵x和y中的对应元素相乘
  - normalize(v)：返回与向量v的长度相同，但方向相同的向量
  - reflect(I, N)：返回向量I在法线向量N处的反射向量
  - refract(I, N, eta)：返回向量I在法线向量N处的折射向量，其中eta是两种介质的折射率之比
- 条件语句函数
  - bool any(bvec)：如果bvec中的任何一个分量都是true，则返回true，否则返回false
  - bool all(bvec)：如果bvec中的所有分量都是true，则返回true，否则返回false
  - float mix(float, float, float)：根据混合因子返回两个值之间的混合值
  - vec2 mix(vec2, vec2, float)：根据混合因子返回两个向量之间的混合向量
  - vec3 mix(vec3, vec3, float)：根据混合因子返回两个向量之间的混合向量
  - vec4 mix(vec4, vec4, float)：根据混合因子返回两个向量之间的混合向量
  - float step(float, float)：如果第一个值小于第二个值，则返回0，否则返回1
  - vec2 step(vec2, vec2)：对于每个分量，如果第一个向量的对应分量小于第二个向量的对应分量，则返回0，否则返回1
  - vec3 step(vec3, vec3)：对于每个分量，如果第一个向量的对应分量小于第二个向量的对应分量，则返回0，否则返回1
  - vec4 step(vec4, vec4)：对于每个分量，如果第一个向量的对应分量小于第二个向量的对应分量，则返回0，否则返回1
  - float smoothstep(float, float, float)：对于t值在[minVal, maxVal]之间，返回一个平滑的插值因子
- 几何函数
  - cross(a, b)：返回向量a和向量b的叉积
  - distance(p0, p1)：返回两个点p0和p1之间的距离
  - dot(a, b)：返回向量a和向量b的点积
  - faceforward(N, I, Nref)：如果向量I与向量Nref之间的夹角小于90度，则返回向量N，否则返回向量N
  - length(v)：返回向量v的长度
  - normalize(v)：返回与向量v的长度相同，但方向相同的向量
  - reflect(I, N)：返回向量I在法线向量N处的反射向量
  - refract(I, N, eta)：返回向量I在法线向量N处的折射向量，其中eta是两种介质的折射率之比
- 矩阵函数
  - determinant(m)：返回矩阵m的行列式
  - inverse(m)：返回矩阵m的逆矩阵
  - matrixCompMult(x, y)：将两个矩阵x和y中的对应元素相乘
  - outerProduct(c, r)：返回列向量c和行向量r的外积矩阵
  - transpose(m)：返回矩阵m的转置矩阵

### 全局变量和局部变量
  类似于javascript，定义在函数外的变量为全局变量，定义在函数内的变量为局部变量。

### 存储限定词
- const: 必须在申明是初始化，之后不能修改；
- attribute: 只能出现在顶点着色器中，且必须声明为全局变量，同来表示逐顶点信息；
- 