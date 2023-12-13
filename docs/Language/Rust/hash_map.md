---
title: HashMap
---
`HashMap`用于存储键值对，通过一个简单的例子看一下HashMap的用法：

```rust
use std::collections::HashMap;

fn main() {
  let mut student_manager = StudentManager::new();
  student_manager.add_student(Student { id: 1, name: "Charlie".to_string() }).unwrap();
  student_manager.add_student(Student { id: 2, name: "Lily".to_string() }).unwrap();

  if let Some(stu) = student_manager.get_student(1) {
    print!("student with id(1): {:?}", stu);
  }
}

#[derive(Debug)]
struct Student {
  id: u32,
  name: String,
}

struct StudentManager {
  students: HashMap<u32, Student>,
}

impl StudentManager {
  fn add_student(&mut self, student: Student) -> Result<(), String> {
    if self.students.contains_key(&student.id) {
      Err("student with key already exists.".to_string())
    } else {
      self.students.insert(student.id, student);
      Ok(())
    }
  }

  fn get_student(& self, key: u32) -> Option<&Student> {
    self.students.get(&key)
  }

  fn new() -> StudentManager {
    StudentManager {
      students: HashMap::new()
    }
  }
}
```
