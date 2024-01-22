---
title: OpenCV的运用与图像数据的处理
---
# OpenCV基础

openCV是一个强大的图像处理库，首先需要安装依赖包：

```shell
pip install opencv-python
```

## 图像的读取与显示

```python
import cv2

img = cv2.imread('test.jpg')
cv2.imshow('sample', img)
cv2.waitKey(0)
```

## 图像的创建与保存

图像中的像素是按照[B,G,R]的格式存储的。

下面的示例创建一张纯红色的图片：

```python
import numpy as np
import cv2

image_size = (512, 512)
img = np.array([[[0, 0, 255] for _ in range(image_size[1])]
               for _ in range(image_size[0])], dtype='uint8')
cv2.imshow('sample', img)
cv2.imwrite('test_img.jpg', img)
```

## 图像的裁剪与缩放

```python

```
