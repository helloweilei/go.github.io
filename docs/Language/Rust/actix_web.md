---
title: Actix Web
---
## 基础

### Quick Start

Rust的版本需要大于 `1.72.0`，可以通过 `rustup update`将rust升级到最新版本。

1. 添加依赖：在toml文件中添入如下依赖, 可以通过 `cargo add actix-web`添加最新的版本

   ```
   actix-web='4'
   ```
2. 创建新的web项目

   ```shell
   cargo new actix_test
   ```
3. 在main.rs文件中输入一下代码，`crago run`启动项目，通过 `http://localhost:8080`访问服务。

   ```rust

   use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

   #[get("/")]
   async fn hello() -> impl Responder {
       HttpResponse::Ok().body("Hello world!")
   }

   async fn manual_hello() -> impl Responder {
       HttpResponse::Ok().body("Hey there!")
   }

   #[actix_web::main]
   async fn main() -> std::io::Result<()> {
       HttpServer::new(|| {
           App::new()
               .service(hello)
               .route("/hey", web::get().to(manual_hello))
       })
       .bind(("127.0.0.1", 8080))?
       .run()
       .await
   }
   ```

### Application

#### 创建一个Application

#### 状态
