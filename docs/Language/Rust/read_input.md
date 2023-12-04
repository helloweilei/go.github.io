---
title: 从控制台读取输入
---
```rust
fn main() {
    let mut input_str = String::new();
    std::io::stdin().read_line(&mut input_str).expect("read input failed");
    let n: usize = input_str.trim().parse().expect("please input a number");

    let mut sum = 0;
    for i in 1..=n {
        sum += i;
    }

    print!("{sum}");
}

```
