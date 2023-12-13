---
title: 常用技巧
---
### 防止外边距折叠

- 为容器元素设置 overflow:auto(或除 visible 的其他值)；
- 在外边距之间边框或内边距；
- 容器元素为浮动元素，内联元素，绝对定位或固定定位时；
- 容器为 flex 布局时，flex 容器内的元素不会折叠；

### 省略文本

```scss
.textHide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### 使用@each快速生成样式

```scss
// size map
$sizes: (
  xxs: 4px,
  xs: 8px,
  sm: 12px,
  md: 16px,
  lg: 20px,
  xl: 24px,
  xxl: 28px
);

// side list
$sides: 'left', 'right', 'top', 'bottom';

@each $size, $value in $sizes {
  .padding-#{$size} {
    padding: $value;
  }

  @each $side in $sides {
    .padding-#{$side}-#{$size} {
      padding-#{$side}: $value;
    }
  }
}
```
