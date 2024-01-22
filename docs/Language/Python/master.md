---
title: Python进阶
---
## 闭包

### 什么是闭包

闭包是作用域的延伸，类似于JS中的闭包，当在函数作用域中引用外部的非全局变量时，就会形成闭包。当函数在其他地方被调用时，依然可以访问到被引用的变量。闭包与函数是否为匿名函数无关。

> 可调用对象：对象实现了 `__call__`方法，可以像函数一样被调用。

示例：

```python
def make_averager():
    sum = 0
    count = 0

    def append(val):
        nonlocal sum, count
        sum = sum + val
        count += 1
        return sum / count

    return append


avg = make_averager()
avg(10)
avg(20)
print(avg(3)) # 11
print(avg.__code__.co_varnames)  # ('val', )
print(avg.__code__.co_freevars)  # ('count', 'sum'), 自由变量名
print(avg.__closure__[0].cell_contents,
      avg.__closure__[1].cell_contents)  # 3 33 // 闭包中自由变量的值
```

> Python中不需要申明变量，所以如果上面的代码中没有 `nonlocal`申明，在内部函数中直接为sum和count复制会创建新的同名局部变量，无法达到修改外部变量的目的。

### 总结

闭包是一种函数，该函数保留了定义函数时存在的自由变量的绑定，函数调用时即使离开了作用域依然可以使用绑定。

## 装饰器
