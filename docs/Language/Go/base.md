---
title: 基础
order: 1
---
## 使用Printf和Sprintf格式化输出

### 格式化动词

| 动词 | 输出                                 |
| ---- | ------------------------------------ |
| %f   | 浮点数                               |
| %d   | 十进制整数                           |
| %s   | 字符串                               |
| %v   | 任何值                               |
| %t   | 布尔值                               |
| %#v  | 任何值（按在go程序代码中的格式输出） |
| %T   | 指类型                               |
| %%   | %                                    |

### 格式化值宽度

```go
fmt.Printf("name: %12s age: %2d", "Charlie", 9); // name:      Charlie age:  9
```

> 短于指定宽度时将用空格填充。

### 格式化小数宽度

```go
fmt.Printf("salary: %8.2f", 2345.678);
```

## 函数

### 创建Error

```go
var err1 = errors.New("Some error happened");
var err2 = fmt.Errorf("Age can not larger than");

log.Fatal(err1, err2);
```

### 返回多个值

```go
func getArea(width float32, height float32) (float32, error) {
	if (width < 0 || height < 0) {
		return 0, errors.New("width or height must be positive");
	}
	return width * height, nil;
}
```

### 参数传值

为go中的函数传值时，实际传递的是值的拷贝，所以无法直接在函数中修改更新参数的值：

```go
func double(number int) {
	number *= 2;
}
var num int = 10;
double(num);
print(num); // 10
```

如果想修改参数值，可以通过传入[指针](#指针)的方式解决：

```go

func double(numPointer *int) {
	*numPointer *= 2;
}

var num int = 10;
double(&num);
print(num); // 20
```

> 函数可以返回内部局部变量的指针，当指针不在被使用时，变量所占的内存才会被回收。

## 指针

指针存储的是变量的地址，通过在变量前面加上 `&`获取变量的地址，指针的类型通过在类型前面加上 `*`来指定，要获取指针变量的值，在指针变量前面加上 `*`。

```go
myInt := 10;
var myIntPointer *int = &myInt;

*myIntPointer += 2;
print(myInt); // 12
```

## 包管理

- 工作区目录默认为用户目录下的go文件夹中，可以通过GOAPTH环境变量设置新的工作区；
- 工作区使用三个子目录：

  - bin：编译过的二进制的可执行程序
  - pkg：编译过的包
  - src：go程序源代码
- src中的目录名构成了包的导入路径，嵌套的子目录对应打入路径中的“/"分隔符：

  - ```go
    import "path1/path2"
    ```
- 除main外包名应该与包含它的目录名相同；
- 可以通过 `go install` 将编译好的包存储在bin或pkg目录（取决于是否是main包）；
- `go doc`显示包的文档，`godoc -http:=8080`本地启动Web服务器查看文档；
