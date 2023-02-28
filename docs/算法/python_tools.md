---
title: Python工具函数
---
### 求解方程组的解

使用 numpy.linalg.solve(matrix, output)函数。

- matrix： 变换矩阵
- output：输出向量

```python
import numpy as ny
matrix = np.array((1, -1), (1, 2))
output = np.array(0, 8)
np.linalg.solve(matrix, output) # (8/3, 8/3)
```

### 矩阵的运算

- 逆矩阵： numpy.linalg.inv(matrix);
- 矩阵乘法：numpy.linalg.matmul(matrix, matrix/vector);
