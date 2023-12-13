---
title: 接口
---
### 概述

接口是一个抽象类型，类似于Java中的接口或Rust中的trait，它定义了一个类型可以做什么。接口的定义包含一组方法，需要指定方法名、参数和返回值类型。如果一个类型包含裂口中定义的所有方法就说该类型满足接口，一个类型可以满足多个接口，一个接口也可以同时被多个类型满足。

只要类型包含了接口的所有方法就已经满足该接口，不需要特别的声明。

### 接口定义

接口通过 `type InterfaceName interface{ }`定义，下面定义了一个叫Player的接口，该接口包含两个方法：`Play`和 `Stop`:

```go
type Player interface {
	Play();
	Stop();
}
```

接下来定义一个自定义类型RecordPlayer，该类型实现了接口中的方法：

```go
type RecordPlayer struct {
	Name string;
	Time int32;
}

func (r *RecordPlayer) Play() { // 函数名前面括号中的内容称为接收器，作用类似于python和rust方法参数中的的self
	fmt.Printf("RecordPlayer %s is playing...\n", r.Name);
}
func (r *RecordPlayer) Stop() {
	fmt.Printf("RecordPlayer %s is stopped.\n", r.Name);
}
func (r *RecordPlayer) MethodFromRecordPlayer() {
	fmt.Printf("call method from record player");
}

func main() {
	var player Player = &RecordPlayer{ Name: "player_1", Time: 100 };
	player.Play();
	player.Stop();
}
```

### 类型断言

在上面的例子中，Player类型的变量只能调用Play和Stop方法，尽管它的实际类型为RecordPlayer，如果想调用RecordPlayer中特有的方法，需要进行类型转换：

```go
var recordPlayer, ok = player.(*RecordPlayer);
if ok {
  recordPlayer.MethodFromRecordPlayer();
}
```

可以通过第二个bool类型的返回值判断类型转换是否成功。
