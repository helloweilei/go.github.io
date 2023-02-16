---
title: 数据预处理
---

## 下载数据集

从数据源下载数据到项目中。

## 导入标准库

在 python 中通常需要导入的库有：numpy, pandas, sklearn;

在 R 中需要安装的包：caTools(分离测试集和训练集)， ggplot2(可视化)；

## 导入数据集

假设数据保存在 CSV 文件中：

```python
import pandas as pd
dataset = pd.read_csv("file.csv")
# 分离出自变量（矩阵）和因变量（向量）
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values
```

在 R 中代码如下：

```R
dataset = read.csv("Position_Salaries.csv")
```

## 缺失数据

处理缺失数据的有多中，删除整个记录、取该列的平均值、取该列的中位数等，以取平均值为例：

In python:

```python
# Taking care of missing data
from sklearn.preprocessing import Imputer
imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
imputer = imputer.fit(X[:, 1:3])
X[:, 1:3] = imputer.transform(X[:, 1:3])
```

In R:

```R
# Taking care of missing data
dataset$Age[is.na(dataset$Age)] = mean(dataset$Age, na.rm = T)
dataset$Salary[is.na(dataset$Salary)] = mean(dataset$Salary, na.rm = T)
```

## 分类数据

分类数据指字符串类型的数据，这种数据不方便用于数学运算，所以在训练模型之前需要将分类数据转换成数值型数据，可以理解成特征数值化。最常采用的是 OneHot 编码。

OneHot 编码是一种编码方式，它将离散的类别特征转换为一组二进制值，其中每个类别有一个特定的二进制值，而其他类别的值为零。这种编码方式可以有效地将类别特征转换为可以被机器学习算法处理的数值特征。比如，如果有一个类别特征，其中有三个可能的值，即“男”，“女”和“其他”，那么使用 OneHot 编码，可以将这三个值分别转换为三个二进制值，即“男”为[1,0,0]，“女”为[0,1,0]，“其他”为[0,0,1]。

In Python:

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

label_encoder_X = LabelEncoder()
X[:, 0] = label_encoder_X.fit_transform(X[:, 0])
# one_hot_encoder = OneHotEncoder(categorical_features=[[0])

from sklearn.compose import ColumnTransformer
categorical_features = [0]
encoder = OneHotEncoder()
column_transformer = ColumnTransformer([('name', encoder, categorical_features)], remainder="passthrough")
X = column_transformer.fit_transform(X)
label_encoder_y = LabelEncoder()
y = label_encoder_y.fit_transform(y)
```

In R:

```R
dataset$Country = factor(dataset$Country, levels = c('France', 'Spain', 'Germany'), labels = c(0, 1, 2))
dataset$Purchased = factor(dataset$Purchased, levels = c('Yes', 'No'), labels = c(1, 0))
```

## 分离数据集

将数据分离为训练集和测试集。

In python：

```python
# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
```

In R:

```R
library(caTools)
set.seed(123)
split = sample.split(dataset$Purchased, SplitRatio = 0.8)
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)
```

## 特征缩放

不同的数据列数据大小相差多个数量级，比如年龄和用户的收入，这样在做一些计算时（如计算点的距离）较小的数据可能就对结果影响非常小，这样可能会弱化较小的自变量对因变量的影响，从而影响模型的准度性。通过特征缩放可以将不同的特征值缩放到相同的数量级。
In python:

```python
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)
```

In R:

```R
# Feature Scaling
training_set[, 2:3] = scale(training_set[, 2:3])
test_set[, 2:3] = scale(test_set[, 2:3])
```

在实际处理时，一些步骤可能不是必须的，如缺失数据、分类编码以及特征缩放等。
