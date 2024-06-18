---
title: 数学相关
---
#### 1. 已知起始点和控制点坐标，构建三阶贝塞尔曲线函数：

```typescript
interface Point {
  x: number;
  y: number;
}

function bezierCubic(p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;

  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  return (t: number) => {
    const tSquared = t * t;
    const tCubed = tSquared * t;

    const x = ax * tCubed + bx * tSquared + cx * t + p0.x;
    const y = ay * tCubed + by * tSquared + cy * t + p0.y;

    return { x, y };
  }
}
```
