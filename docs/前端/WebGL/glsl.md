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

只能将纹理单元编号赋值给取样器，取值受编号数量的限制。除了赋值和比较，取样器不能作为操作数参与运算。


### 程序流程控制：分支与循环
