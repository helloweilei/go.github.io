---
title: Prisma配置文件详解
---
在 Prisma 中，`.prisma` 文件用于定义数据模型和数据库连接。以下是 `.prisma` 文件中定义数据模型的详细语法：

### 1. 数据源定义

在 `.prisma` 文件中，首先定义数据源，这通常是你的数据库连接信息，如下所示：

```prisma
datasource db {
  provider = "postgresql" // 数据库类型，例如 PostgreSQL, MySQL 等
  url      = env("DATABASE_URL") // 数据库连接URL，可以从环境变量获取
}
```

### 2. 模型定义

接下来，定义数据模型，包括表、字段和关系。每个模型以及其字段和关系都会被映射到数据库中的表和列。

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

在上述示例中：

- `User` 和 `Post` 是模型名称。
- `@id` 标记指定了主键。
- `@default(autoincrement())` 指定了自增主键。
- `@unique` 标记指定了唯一约束。
- `@relation` 标记指定了关系，包括外键 `authorId` 和 `User` 模型之间的关联。

### 3. 枚举定义

Prisma 支持枚举类型的定义，用于限制字段的取值范围。

```prisma
enum Role {
  USER
  ADMIN
}
```

### 4. 自动生成字段

Prisma 还支持生成字段，这些字段由 Prisma 自动生成，例如 `createdAt` 和 `updatedAt` 等。

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 5. 生成器选项

`.prisma` 文件还可以包含生成器选项，用于指定生成器（如 Prisma Client）的配置选项。

```prisma
generator client {
  provider = "prisma-client-js"
}
```

这些选项告诉 Prisma 如何生成与数据库交互的客户端代码。

### 完整示例

以下是一个完整的 `.prisma` 文件示例，结合了上述所有元素：

```prisma
// 数据源定义
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 枚举定义
enum Role {
  USER
  ADMIN
}

// 用户模型定义
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 帖子模型定义
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 生成器选项
generator client {
  provider = "prisma-client-js"
}
```

这些是定义数据模型时 `.prisma` 文件中的基本语法和元素。
