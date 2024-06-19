---
title: 编程实例
---

#### 通过宏构建Json数据结构

```rust
use std::collections::HashMap;

#[derive(Debug)]
pub enum Json {
    Null,
    String(String),
    Number(f64),
    Boolean(bool),
    Array(Vec<Json>),
    Object(Box<HashMap<String, Json>>)
}

impl From<bool> for Json {
    fn from(val: bool) -> Json {
        Json::Boolean(val)
    }
}

impl From<String> for Json {
    fn from(val: String) -> Json {
        Json::String(val)
    }
}

impl From<&str> for Json {
    fn from(val: &str) -> Json {
        Json::String(val.to_string())
    }
}

impl From<f64> for Json {
    fn from(val: f64) -> Json {
        Json::Number(val)
    }
}

impl From<i32> for Json {
    fn from(val: i32) -> Json {
        Json::Number(val as f64)
    }
}

#[macro_export]
macro_rules! json {
    (null) => {
        $crate::utils::Json::Null
    };
    ([$($element: tt),*]) => {
        $crate::utils::Json::Array(vec![$(json!($element)),*])
    };
    ({$($key:tt : $value:tt),*}) => {
        $crate::utils::Json::Object(Box::new(vec![
            $( ($key.to_string(), json!($value)) ),*
        ].into_iter().collect()))
    };
    ($other:tt) => {
        $crate::utils::Json::from($other)
    }
}
```

#### 读取toml文件的两种方式

1. 动态读取，主要用于读取没有固定格式的toml文件，文件中的存在的字段名称、以及类型等信息并不确定。

```rust
use std::path::Path;

pub fn read_toml<T: AsRef<Path>>(path: T) -> toml::Value {
    let config_text = std::fs::read_to_string(path).unwrap();
    let config = config_text.parse::<toml::Value>().unwrap();

    config
}

// 查询字段
let config = read_toml("Cargo.toml");
println!("Original: {:#?}", config);
print!("toml version: {}", config.get("dependencies").unwrap().get("toml").unwrap());
```

2. 静态读取，这种方式更适合于具有固定格式的toml文件，文件中可能包含的字段以及字段的类型等信息都是确定的，类似于具有schema描述的json文件。下面以读取`Cargo.toml`文件中的package部分为例：

```rust
/// 首先需要定义好数据的结构
#[allow(unused)]
#[derive(Deserialize)]
struct Config {
    package: Package
}

#[allow(unused)]
#[derive(Deserialize)] /// 需要添加serde_derive包
struct Package {
    name: String,
    version: String,
    edition: String
}
/// 接下来就可以对文件进行反序列化
let config: Config = toml::from_str(std::fs::read_to_string("Cargo.toml").unwrap().as_str()).unwrap();
println!("{}", config.package.name);
```

#### 在Rust中访问sqlite数据库

- 首先需要安装包`rusqlite`, 在Cargo.toml文件中加入依赖:

```toml
[dependencies]
rusqlite = { version = "0.31.0", features = ["bundled"] }
```

- 创建，更新以及查询的实例代码如下：

```rust
use rusqlite::params;

let db_file = "products.db";
// 建立连接
let conn = rusqlite::Connection::open(db_file).unwrap();
// 创建表
conn.execute("DROP TABLE products", params![]).unwrap();
conn.execute("CREATE TABLE products (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE
)", params![]).unwrap();
// 插入数据
conn.execute(
    "INSERT INTO products VALUES($1, $2, $3)", 
    params!["1", "fruits", "apple"]
).unwrap();
// 查询操作
let mut command = conn.prepare("
    SELECT id, category, name FROM products
").unwrap();
for product in command.query_map(params![], |row| {
    Ok(ProductItem {
        id: row.get(0).unwrap(),
        category: row.get(1).unwrap(),
        name: row.get(2).unwrap(),
    })
}).unwrap() {
    if let Ok(item) = product {
        print!("Product({:?}, {:?}, {:?})", item.id, item.category, item.name);
    }
}
```

#### 