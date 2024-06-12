---
title: Readable Stream的流动模式和非流动模式的区别
---
Node.js 的可读流（Readable Streams）在处理数据时提供了两种主要模式：流动模式（flowing mode）和非流动模式（non-flowing mode），也称为暂停模式（paused mode）。这两种模式的选择对于如何控制和管理数据流动至关重要，特别是在处理大量数据或需要精细控制数据流的应用程序中。

### 流动模式（Flowing Mode）

在流动模式下，数据会自动从源流向目的地，而不需要应用代码的显式干预。这通常是通过监听 `'data'` 事件来完成的，当数据可用时，Node.js 会自动推送数据到该事件的处理函数中。

* **优点** ：简单直接，对于简单的数据管道场景非常有效。
* **缺点** ：
  * 难以精确控制数据的流动速度，可能导致内存使用过多（特别是在高数据速率时）。
  * 应用程序需要处理所有的 `'data'` 事件，否则可能会丢失数据。


在流动模式下，我们通过监听可读流的 `'data'` 事件来自动接收数据。以下是一个使用 `fs.createReadStream()` 读取文件内容，并通过监听 `'data'` 事件来处理数据的示例：

```javascript

const fs = require('fs');  
  
const readableStream = fs.createReadStream('input.txt');  
  
readableStream.on('data', (chunk) => {  
  // 每次读取到数据块时，都会触发 'data' 事件  
  // chunk 是包含数据的一部分 Buffer 或字符串（取决于流的编码设置）  
  console.log(chunk.toString()); // 假设我们设置了流的编码为 'utf8'  
});  
  
readableStream.on('end', () => {  
  // 当所有数据都读取完毕后，会触发 'end' 事件  
  console.log('数据读取完毕');  
});  
  
readableStream.on('error', (err) => {  
  // 如果在读取过程中发生错误，会触发 'error' 事件  
  console.error('读取文件时发生错误:', err);  
});
```

### 非流动模式（Non-Flowing Mode）/ 暂停模式（Paused Mode）

在非流动模式下，数据不会自动流动。相反，应用程序需要显式地从流中读取数据，这通常是通过调用 `stream.read()` 或 `stream.pipe()` 到一个可写流来完成的。

* **优点** ：
  * 允许更精细地控制数据流动，避免内存使用过多。
  * 可以在读取数据之前或之后执行额外的逻辑。
  * 可以通过 `stream.pause()` 和 `stream.resume()` 来动态地暂停和恢复数据流。
* **缺点** ：需要更多的代码来管理数据流，增加了复杂性。

在非流动模式下，我们需要显式地从流中读取数据。以下是一个使用 `fs.createReadStream()` 读取文件内容，并通过调用 `stream.read()` 方法来手动读取数据的示例：

```js
const fs = require('fs');  
  
const readableStream = fs.createReadStream('input.txt', { highWaterMark: 10 }); // 设置 highWaterMark 为 10，以便更快地进入暂停模式  
  
let chunk;  
  
// 不添加 'data' 事件监听器，因此流将处于暂停模式  
  
// 手动读取数据  
while((chunk = readableStream.read()) !== null) {
  console.log(chunk.toString()); // 输出读取到的数据块  
};
  
readableStream.on('end', () => {  
  // 当所有数据都读取完毕后，会触发 'end' 事件  
  console.log('数据读取完毕');  
});  
  
readableStream.on('error', (err) => {  
  // 如果在读取过程中发生错误，会触发 'error' 事件  
  console.error('读取文件时发生错误:', err);  
});
```

### 为什么需要这两种模式？

不同的应用场景需要不同的数据流控制策略。例如：

* 对于简单的数据管道，如从文件读取数据并将其写入另一个文件，流动模式可能足够简单且高效。
* 然而，对于更复杂的场景，如实时分析数据流、限制内存使用或执行与数据流相关的特定逻辑，非流动模式提供了更多的灵活性和控制力。

Node.js 的流 API 设计允许开发人员根据具体需求选择最合适的模式，并在必要时在两种模式之间切换。这种灵活性使得 Node.js 的流 API 能够在各种应用程序中有效地处理数据流。
