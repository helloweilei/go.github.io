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