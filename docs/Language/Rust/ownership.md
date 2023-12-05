---
所有权
---
### 所有权规则

- 每个值的所有权归属于引用它的变量；
- 同一时间只能有一个所有者；
- 当变量离开作用域时其拥有的值被销毁；

```rust
fn main() {
    let s1 = String::from("Hello world");
    let s2 = s1; // 所有权转移到了s2, 之后无法在访问s1
    print!("value of s1: {}", s1); // error: borrow of moved value: `s1`
}
```

存储类型：

- 栈： 只能存储大小确定的数据（如基本数据类型如integer, float, bool等）
- 队：数据的大小不确定

> 对于非基本类型的值如字符串，数据存储在堆中，栈中只存储了数据的一些元信息（对于字符串包括指向堆中数据的指针 `ptr`, `size` 以及 `capacity`）。

对于基本类型的值，由于数据保存在栈中，进行赋值操作时会直接复制栈中的数据，不会产生所有权问题：

```rust
fn main() {
    let s1 = 10;
    let _s2 = s1;
    print!("value of s1: {}", s1); // OK
}
```

### 函数中的所有权

- 函数传参时会转移所有权
- 返回函数的参数或函数内的局部变量时会转移所有权

示例一：

```rust
fn main() {
  let s1: String = String::from("this is me, ");
  let s2: &str = "Nouman";
  some_function(s1, s2); // error: borrow of moved value: `s1`
  println!("{} {}", s1, s2);
}

fn some_function(a1: String, a2: &str) {
  println!("{} {}", a1, a2);
}
```

示例二：

```rust
let mut my_vec = vec![1, 2, 3, 4, 5];
let mut temp;

while !my_vec.is_empty() {
  // temp = my_vec; // Something wrong on this line
  temp = &my_vec;
  println!("Elements in temporary vector are: {:?}", temp);


  if let Some(last_element) = my_vec.pop() { // pop() is used to remove an element from the vec
      println!("Popped element: {}", last_element);
  }
}
```

示例三：

```rust
fn main() {
  {
      let str1 = generate_string();
  }
  let str2 = str1;   // error: cannot found value `str1` in this scope
}

fn generate_string() -> String {
  let some_string = String::from("I will generate a string");
  some_string
}
```