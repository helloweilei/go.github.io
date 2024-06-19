---
title: 基于NestJS、Prisma、Postgresql等构建rest API
---
### 创建NestJS项目

通过nestjs cli快速创建nestjs项目：

```bash
npx @nestjs/cli new rest-api
```

项目的目录结构如下：

![1718760575353](././image/nestjs/1718760575353.png)

根据提示运行命令启动项目(示例中的包管理工具为pnpm)：

```bash
$ cd rest-api
$ pnpm run start
```

### 在Docker中创建PostgresQL实例

1. 在项目中创建新的文件 `docker-compose.yml`,文件内容如下：

   ```yaml
   # docker-compose.yml

   version: '3.8'
   services:

     postgres:
       image: postgres:13.5
       restart: always
       environment:
         - POSTGRES_USER=myuser
         - POSTGRES_PASSWORD=mypassword
       volumes:
         - postgres:/var/lib/postgresql/data
       ports:
         - '5432:5432'./image/nestjs

   volumes:
     postgres:
   ```

   2. 在主目录中运行命令 `docker-compose up -d`创建postgresql容器，-d参数表示关闭terminal容器依然在后台运行。运行成功后可以看到类似下面的输出：

![1718762498936](./image/nestjs/1718762498936.png)

### 设置Prisma

1. 安装prisma cli：

   ```bash
   pnpm install -D prisma
   ```
2. 初始化prisma

   ```bash
   npx prisma init
   ```

   完成之后会在项目中新增文件 `.env`以及文件 `prisma/schema.prisma`，.env文件用于设置环境变量，schema.prisma文件用于配置prisma，包括数据库配置、数据库schema等。初始化内容大概🤔下面这个样子：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

> 建议在VScode中安装Prisma插件，该插件提供了.prisma文件的语法高亮功能。

3. 配置环境变量
   在.env文件加入数据库连接相关的配置：

   ```
   // .env
   DATABASE_URL="postgres://myuser:mypassword@localhost:5432/my-db"
   ```
4. 添加data Model

   在schema.prisma文件中新增model的声明：

   ```TS
   model Article {
     id          Int      @id @default(autoincrement())
     title       String   @unique
     description String?
     body        String
     published   Boolean  @default(false)
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

> Model配置的详细信息参考 `prisma配置文件详解`。

5. 数据库迁移

   ```
   npx prisma migrate dev --name=init
   ```

   prisma cli主要做了三件事：

* 保存schema，生成SQL文件（prisma/migrations）
* 执行SQL文件，在数据库中创建Table
* 基于最新的Schema生成client，client作为查询构建器提供了数据库的CRUD能力，支持最新Model的TS提示能力

  生成的SQL文件内容如下：

```pgsql
-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");
```

6. seed the Database
   添加seed脚本用于为数据库添加初始数据，在prisma文件夹中新建文件 `seed.ts`，加入以下内容：

   ```typescript
   import { PrismaClient } from '@prisma/client';

   const client = new PrismaClient();
   const main = async () => {
     // 当没有满足where条件的数据时插入新的数据
     const article1 = await client.article.upsert({
       where: { title: 'article 1' },
       update: {},
       create: {
         title: 'article 1',
         content: 'This is article 1 content ...',
         published: false,
       },
     });
     // 当没有满足where条件的数据时插入新的数据
     const article2 = await client.article.upsert({
       where: { title: 'article 1' },
       update: {},
       create: {
         title: 'article 1',
         content: 'This is article 1 content ...',
         published: false,
       },
     });
     console.log(article1, article2);
   };

   main()
     .then(() => {
       client.$disconnect();
     })
     .catch((err) => {
       console.error(err);
       client.$disconnect();
       process.exit(1);
     });

   ```

   在 `package.json`中加入一下设置，提示prisma cli在执行seed命令时需要执行的脚本：

   ![1718778200307](./image/nestjs/1718778200307.png)

   运行命令 `npx prisma db seed`执行脚本为数据库加入数据，运行结果如下：![1718778396191](./image/nestjs/1718778396191.png)

> 通过运行prisma cli提供的studio命令，打开可视化界面查看数据库数据 `npx prisma studio`。关于seed的更多信息参考[Prisma Docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).

7. 创建prisma服务

prisma服务负责实例化Prisma Client以及与数据库的连接，实现与业务逻辑分离的目的，可以通过nestjs cli快速创建模块和服务：

```shell
npx nest generate module prisma
npx nest generate service prisma
```

 新增的文件结构如下：

![1718779762299](./image/nestjs/1718779762299.png)

以下是prisma.service.ts的内容：

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {}
```

以及prisma.module.ts的内容：

```ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

module提供了PrismaService的单例，任何导入该module的模块都可以注入PrismaService对象，使用PrismaClient提供的数据库相关的能力。

> NestJS的更多信息参考[官方文档](https://docs.nestjs.com/)。

### 设置Swagger

1. 安装依赖

```shell
   pnpm install --save @nestjs/swagegr swagger-ui-express
```

2. 在main.ts中初始化Swagger设置

```ts
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     const swaggerConfig = new DocumentBuilder()
       .setTitle('nestjs demo')
       .setVersion('0.0.1')
       .setDescription('A demo for nestjs.')
       .build();

     const document = SwaggerModule.createDocument(app, swaggerConfig);
     SwaggerModule.setup('/swagger', app, document);
     await app.listen(3000);
   }
   bootstrap();
```

  启动服务后访问 `http://localhost:3000/swagger`, 查看启动后的swagger界面：

![1718782235145](./image/nestjs/1718782235145.png)

### 在Article Model上执行CRUD操作

#### 生成REST resource

通过nestjs cli提供的功能可以快速创建resource：

```shell
npx nest generate resource
```

根据提示设置相关参数：

*? What name would you like to use for this resource (plural, e.g., "users")? articles
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes*

新生成的文件结构：

![1718783201910](./image/nestjs/1718783201910.png)

更新后的swagger：

![1718783236961](./image/nestjs/1718783236961.png)

在articles.module.ts文件中导入 `PrismaModule`:

![1718783369774](./image/nestjs/1718783369774.png)

在articles.service.ts文件中注入 `PrismaSerice`服务：

![1718783504809](./image/nestjs/1718783504809.png)

#### 定义 `GET /articles` Endpoint

controller和service中的代码如下：

```ts
  // articles.controller.ts
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  // articles.service.ts
  findAll() {
    return this.prisma.article.findMany();
  }
```

#### 定义 `POST /articles` Endpoint

首先需要定于 `CreateArticleDto`类型，DTO(Data Transfer Object)描述了数据在网络中传输的格式。在这里表示创建article需要的数据类型：

```ts
export class CreateArticleDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ nullable: true })
  content?: string;

  @ApiProperty({ required: false, default: false })
  isPublished: boolean;
}
```

> `ApiProperty`装饰器帮助swagger模块识别请求参数的字段及类型。

接下来就可以在controller和service中使用该类型定义：

```ts
// article.controller.ts
@Post()
create(@Body() createArticleDto: CreateArticleDto) {
  return this.articlesService.create(createArticleDto);
}

// article.servive.ts
create(createArticleDto: CreateArticleDto) {
  return this.prisma.article.create({ data: createArticleDto });
}
```

最新的swagger有了关于请求参数类型的提示：

![1718801551748](./image/nestjs/1718801551748.png)

#### 定义Response 的类型

为了在swagger中能够得到响应类型的提示，需要一下几步：

1. 在 `articles/entities/article.entity.ts`文件中定义Article：
   ```ts
   import { ApiProperty } from '@nestjs/swagger';

   export class Article {
     @ApiProperty()
     id: number;

     @ApiProperty()
     title: string;

     @ApiProperty({ nullable: true })
     content?: string;

     @ApiProperty()
     createdAt?: Date;

     @ApiProperty()
     updatedAt?: Date;

     @ApiProperty()
     isPublished: boolean;
   }
   ```

    2. 在controller中方法上增加装饰器

```ts
@Post()
  @ApiCreatedResponse({ type: Article })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: Article, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }
```

更新后的swagger中的效果如下：

![1718802499682](./image/nestjs/1718802499682.png)

#### Swagger API 分组

对 `ArticlesController` class应用装饰器 ` @ApiTags('articles')`，可以实现swagger中对articles相关的API分组，分组后的效果如下：

![1718785447345](./image/nestjs/1718785447345.png)
