---
title: Enum
---
`struct`可以让我们将一组关联的字段和数据组合到一起，而通过 `enum`我们可以定义某个值来自于某个集合。通过enum可以定义一个枚举，比如下面的例子定义了 `WeekDay`枚举，每一个枚举值称为一个 `变体（variant）`：

```rust
enum WeekDay {
    Monday,
    Tuesday,
    WednesDay,
    Thursday,
    Friday,
    SaturDay,
    Sunday
}

fn main() {
    let day = WeekDay::Monday;
}
```

### 为变体关联数据

可以为每一个变体关联一个一个数据，数据的类型可以是基本类型、元组、struct等，不同变体的关联值类型可以不一致。

```rust
enum Shape {
    Circle(f32),
    Rectangle {
        width: f32,
        height: f32,
    },
    Square(f32),
}

fn main() {
    let rect = Shape::Rectangle { width: 12.0, height: 20.0 };
}
```

### 匹配枚举变体

可以通过 `match`表达式匹配枚举变体，使用方式如下：

```rust
fn main() {
    let rect = Shape::Rectangle { width: 12.0, height: 20.0 };
    let area = match rect {
        Shape::Circle(r) => PI * r * r,
        Shape::Rectangle { width, height } => width * height,
        Shape::Square(a) => a.powi(2),
    };
    print!("area is: {}", area); // area is: 240
}
```

### 为枚举定义方法

我们也可以像struct一样为枚举类型定义方法：

```rust
impl Shape {
    fn area(&self) -> f32 {
        match self {
            Shape::Circle(r) => PI * r * r,
            Shape::Rectangle { width, height } => width * height,
            Shape::Square(a) => a.powi(2),
        }
    }
}

fn main() {
    let rect = Shape::Rectangle { width: 12.0, height: 20.0 };
    print!("area is: {}", rect.area()); // area is: 240
}
```

### 标准库预定义的枚举类型

#### Option

`option`的用法类似于java中的optional，表示一个可能为空的值。它的定义类似于：

```rust
enum Option<T> {
	Some(T),
	None
}
```

简单示例：

```rust
fn first_char(char_vec: &Vec<char>) -> Option<char> {
    if char_vec.len() > 0 {
        Some(char_vec[0])
    } else {
        None
    }
}

fn main() {
    let chars = vec!['c', 'a', 'z'];
    match first_char(&chars) {
        Some(c) => print!("First char is: {c}"),
        None => print!("No character found."),
    }
}
```

在上面的例子中我们通过 `match`对Option的变体进行匹配，如果我们只关心枚举某一个变体，可以直接使用 if let ...进行匹配：

```rust
fn main() {
    let chars = vec!['c', 'a', 'z'];
    if let Some(c) = first_char(&chars) {
        print!("First char: {c}");
    }
}
```

#### Result

`Result`枚举通常用于可能会产生错误的的函数的返回值，它有两个变体：`Ok`和 `Err`，分别表示函数正常返回或产生了异常，它的定义类似于：

```rust
enum Result<T, E> {
	Ok(T),
	Err(E)
}
```

下面是一个简单的例子：

```rust
enum Measurement {
    CircleArea(f64),
    RectangleArea(f64, f64),
    TriangleArea(f64, f64),
    Perimeter(Vec<f64>),
}

impl Measurement {
    fn calculate(self) -> Result<f64, String> {
        match self {
            Self::CircleArea(radius) => {
                if radius < 0.0 {
                    Err(String::from("Radius cannot be negative"))
                } else {
                    Ok(std::f64::consts::PI * radius * radius)
                }
            }
            Self::RectangleArea(length, width) => {
                if length < 0.0 || width < 0.0 {
                    Err(String::from("Length and width cannot be negative"))
                } else {
                    Ok(length * width)
                }
            }
            Self::TriangleArea(base, height) => {
                if base < 0.0 || height < 0.0 {
                    Err(String::from("Base and height cannot be negative"))
                } else {
                    Ok(0.5 * base * height)
                }
            }
            Self::Perimeter(sides) => {
                if sides.len() < 3 {
                    Err(String::from("A polygon must have at least 3 sides"))
                } else {
                    Ok(sides.iter().sum())
                }
            }
        }
    }
}

fn main() {
    let user_input = Measurement::TriangleArea(5.0, 8.0);
    match user_input.calculate() {
       Ok(res) => println!("Result: {res}"),
       Err(e) => println!("Error: {e}"),
    }
}
```
