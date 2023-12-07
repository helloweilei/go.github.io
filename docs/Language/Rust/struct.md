---
title: Struct
---
`struct`可以将一组相关的数据绑定到一起，方便后续的操作，类似于C中的结构体。

## 定义及创建struct实例

```rust
fn main() {
    let my_car = Car{owner: "charlie".to_string(), year:2023, price: 5_000.0};
    let another_car = Car{
        year: 2022,
        ..my_car
    };
}

struct Car {
    owner: String,
    year: i32,
    price: f32,
}
```

- 访问struct中在堆上创建的字段会将所有权转移到所赋值的变量上：
  ```rust
  let owner = my_car.owner;
  print!("owner: {}", my_car.owner); // error: borrow of moved value: `my_car.owner`
  ```
- 可以通过元组定义struct：
  ```rust
  struct Point3D(f32, f32, f32);

  // 初始化
  let point = Point3D(1.0, 1.0, 0.0);
  ```
- 修改字段的值：
  ```rust
  let mut my_car = Car{owner: "charlie".to_string(), year:2023, price: 5_000.0};
  my_car.owner = String::from("John");
  ```

## 为struct定义方法及关联函数

```rust
impl Car {
    fn current_price(&self) -> f32 {
        self.price
    }

    // 不带&的self会将实例的所有权转移到方法内部
    fn sell(self, new_owner: String) -> Self {
        Car { owner: new_owner, year: self.year, price: self.price }
    }

    // 关联函数
    fn new(owner: String, price: f32) -> Self {
        Car { owner, year: 2023, price }
    }
}

// 方法调用
let new_car = Car::new("Petter".to_string(), 3_000.0);
print!("price: {}", new_car.current_price());
let sold_car = new_car.sell("Jenny".to_string());
```