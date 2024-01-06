---
title: Mermaid时序图
---
时序图用于表示参与者之间如何交互以及交互顺序，主要的元素包括：参与者、消息、注释、激活框、循环（loop）、可选（opt）、选择（alt）等。

时序图的基本语法：

```mermaid
%% 注释
sequenceDiagram
participant C as Client
participant S as Server
```

### 参与者

表示交互的对象，添加参与者的语法：`participant alias_name as display_name`:

```mermaid
sequenceDiagram
Client ->> Server : get api/v1/news
Server -->> Client : response data
```

可以使用别名：

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
C ->> S : get api/v1/news
S -->> C : response data
```

### 消息

参与者之间通过消息传递信息，消息的语法格式为：`<参与者> <箭头> <参与者> : <描述信息>`， 描述信息可以为空但不能省略。
箭头的格式有以下几种：

- ->: 无箭头实线
- -->: 无箭头虚线
- ->>: 有箭头实线(主动发送消息)
- -->>: 有箭头虚线（响应）
- -x: 末尾带x的实线
- --x: 末尾带x的虚线
- -): 空心箭头
- --): 空心箭头

示例：

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
C -x S : get api/v1/news
S -->> C : response error
```

### 激活框

激活框可以在接收方时间线上标记一段时间，用于表示处理消息的时间间隔。有两种方式创建激活框：

1. 直接激活（通过activate/deactivate）
2. 在对象前面加上加减号（+/-）激活：加号开始，减号结束

示例：

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
activate C
C ->> +S : get api/v1/news
S -->> -C : news list
C ->> +S : get api/v1/news/{newsId}
S -->> -C : news detail info
deactivate C
```

### 注释

注释的语法为： `note [位置] [对象1，对象2...] : 注释文本`；

位置有三种取值：`left of`, `right of`, `over`;

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
note right of C : 获取资讯列表
C -x S : get api/v1/news
note left of S : 响应出错
S -->> C : response error
note over C,S : 请求失败
```

### 循环（loop）

当条件满足是重复发送消息，语法格式：

```
loop 循环条件
[消息流]
end
```

示例：

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
loop 支付中
C ->> S : 获取支付状态
S -->> C : 返回支付状态
end
```

### 选择（alt）

选择会对多个条件作出判断，针对不同的条件发送不同的消息流，类似于if-else。语法格式如下：

```
alt 条件说明
  [消息流]
else
  [消息流]
else
  [消息流]
end
```

示例：

```mermaid
sequenceDiagram
participant C as Client
participant S as Server
activate C
C ->> +S : get api/v1/news
S -->> -C : news list
C ->> +S : get api/v1/news/{newsId}
S -->> -C : news detail info
alt detail.type == 公众号
C ->> C : 跳转到公众号详情
else
C ->> C : 跳转到富文本详情
end
deactivate C
```

### 可选（opt）

条件满足是执行消息流，类似于单分支的if。语法格式为：

```
opt 条件
[消息流]
end
```

示例：

```mermaid
sequenceDiagram
Client ->> Server : 获取账户余额
Server -->> Client : 返回余额
opt 余额 > 8000
Client ->> Server : 下单iPhone15
end
```

### 并行（par）

消息被分成多个片段并行执行，语法格式如下：

```
par [description]
[message]
and
[message]
end
```

示例：

```mermaid
sequenceDiagram
Boss ->> Worker : 开始工作啦！
alt 上班时间
par 摸鱼开始
Worker ->> Worker : 刷抖音
and
Worker ->> Worker : 刷微博
and
Worker ->> Worker : 喝咖啡
end
else 六点啦
Worker -->> Boss : 我们下班了...
end
```

### 背景颜色

语法格式：

```
rect rgb(r, g, b)/red/black/...
[message stream]
end
```

示例：

```mermaid
sequenceDiagram
Boss ->> Worker : 开始工作啦！
alt 上班时间
par 摸鱼开始
rect rgb(255,0,0)
Worker ->> Worker : 刷抖音
end
and
rect rgb(0,255,0)
Worker ->> Worker : 刷微博
end
and
rect rgb(0,0,255, 0.5)
Worker ->> Worker : 喝咖啡
end
end
else 六点啦
rect pink
Worker -->> Boss : 我们下班了...
end
end
```
