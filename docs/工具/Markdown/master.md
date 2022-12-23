---
title: 高级技巧
---

## 支持的 HTML 元素

不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。  
目前支持的 HTML 元素有：`<kbd> <b> <i> <em> <sup> <sub> <br>`等 ，如：

```md
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```

## 转义

markdown 中使用反斜线转移特殊字符。

## 公式

Markdown Preview Enhanced（VSCode 插件）使用 [KaTeX](https://github.com/KaTeX/KaTeX) 或者 [MathJax](https://github.com/mathjax/MathJax) 来渲染数学表达式。

KaTeX 拥有比 MathJax 更快的性能，但是它却少了很多 MathJax 拥有的特性。你可以查看 KaTeX supported functions/symbols 来了解 KaTeX 支持那些符号和函数。

默认下的分隔符：

`$...$` 或者 `\(...\)` 中的数学表达式将会在行内显示。
`$$...$$` 或者 `\[...\]` 或者 ```math 中的数学表达式将会在块内显示。

```md
$f(x) = sin(2x) + 1

$$\sum_{n=1}^{100}n$$
```

效果如下：

$f(x) = sin(2x) + 1$

$$\sum_{n=1}^{100}n$$
