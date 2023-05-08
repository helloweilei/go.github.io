---
title: Kernal SVM
---
### 高维投射

- 考虑一维中的一些点，无法通过一条直线分割成两部分（如下图）：

![1682314733614](./image/Kernal_SVM/1682314733614.png)

通过二次函数投影之后的效果：

![1682314902118](./image/Kernal_SVM/1682314902118.png)

- 扩展到二位中的例子：

![1682315131975](./image/Kernal_SVM/1682315131975.png)

反向投影得到分类边界；

![1682315238641](./image/Kernal_SVM/1682315238641.png)

问题：映射到高维空间增加了计算开销...

### 核函数技巧

1. 高斯径向基核函数（Gaussian RBF Kernal）

<img src="./image/Kernal_SVM/1682400248122.png" width=200>

`l`是一个基准向量，如果 `l`取原点的话，那么当x靠近原点时映射后的值接近1，而当x远离原点时映射后的值接近0，效果如下图：

<img src="./image/Kernal_SVM/1682400388518.png" width=400 />

系数的影响：

![1682400635166](./image/Kernal_SVM/1682400635166.png)

更复杂的场景可以考虑使用和函数的线性组合：

![1682400913260](./image/Kernal_SVM/1682400913260.png)

### 核函数分类

- 高斯RBF核函数
- Digmoid Kernal

  <img src="./image/Kernal_SVM/1683273883979.png" width="400" />

  <img src="./image/Kernal_SVM/1683273924997.png" width="400" />
- Polynomial Kernal

  <img src="./image/Kernal_SVM/1683273975313.png" width="400" />

  <img src="./image/Kernal_SVM/1683274012795.png" width="400" />

### 代码示例

- Python

```python
# diff with SVM
from sklearn.svm import SVC
classifier = SVC(kernel = 'rbf', random_state = 0)
classifier.fit(X_train, y_train)
```

- R

```r
  # install.packages('e1071') 
  library(e1071)
  classifier = svm(formula = Purchased ~ .,
                   data = training_set,
                   type = 'C-classification',
                   kernel = 'radial')
```

![1683276572766](./image/Kernal_SVM/1683276572766.png)
