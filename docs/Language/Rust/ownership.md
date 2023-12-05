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
