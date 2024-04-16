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

actix-web服务器构建在App实例之上，app用于为资源和中间件注册路由，同时保存了应用状态，同一作用域下的所有handler可以共享状态。

application的scope相当于一个命名空间，一个scope下的所有路由拥有相同的路径前缀，例如`/app`, 所有以`/app`开头的请求都会匹配该scope。

```rust
async fn index() -> impl Responder {
    return "hello world"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(||{
        App::new().service(
            web::scope("/app")
                .route("/index.html", web::get().to(index))
        )
    }).bind(("localhost", 8080))?
        .run()
        .await
}
```

#### 状态

App的状态可以在用一`scope`下所有路由和中间件间共享，可以通过`web::Data<T>`提取器访问状态，`T`表示状态对应的类型：

```rust
struct AppState {
    app_name: String
}

async fn index(data: web::Data<AppState>) -> impl Responder {
    format!("hello, {}", &data.app_name)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(||{
        App::new()
        .app_data(web::Data::new(AppState { app_name: "test_app".to_string() }))
        .service(
            web::scope("/app")
                .route("/index.html", web::get().to(index))
        )
    }).bind(("localhost", 8080))?
        .run()
        .await
}
```

#### 共享的可变状态

创建`HttpServer`时使用的是`application factory`而不是一个app实例，因为HttpServer会为每一个线程创建一个实例，因此应用数据也会被创建多次，如果需要在线程之间共享数据，就需要使用共享对象，例如：`Send + Sync`.

在内部，web:Data使用的是`Arc`(原子引用计数)，为了避免创建两个`Arc`, 需要在调用`App::app_data`注册应用数据之前创建我们的数据。实例如下：

```rust
struct AppState {
    counter: Mutex<u32>
}

async fn index(data: web::Data<AppState>) -> impl Responder {
    let mut counter = data.counter.lock().unwrap();
    *counter += 1;
    format!("hello, {}", counter)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let mut shared_state = web::Data::new(AppState {
        counter: Mutex::new(0)
    });
    HttpServer::new(move || {
        App::new()
        .app_data(web::Data::new(shared_state.clone()))
        .service(
            web::scope("/app")
                .route("/index.html", web::get().to(index))
        )
    }).bind(("localhost", 8080))?
        .run()
        .await
```

#### 通过`Scope`组合应用

```rust
#[web::main]
async fn main() -> std::io::Result<()> {
    let scope = web::scope("/user").service(show_user);
    App::new().service(scope);
    // ...
}
```

#### Application Guard

可以把Guard看成一个简单的函数，该函数接受`request`对象，返回true 或 false。guard是实现了`Guard trait`的对象， Actix Web 内置了一些Guard. 比如`Host`, 可以作为一个基于请求头信息的过滤器使用。

```rust
use actix_web::{web, guard::Host, HttpResponse};

web::scope("/admin")
    .guard(Host("admin.rust-lang.org").scheme("https"))
    .default_service(web::to(|| async {
        HttpResponse::Ok().body("admin connection is secure")
    }));
```

#### 配置

App和web::Scope都提供了`configure`方法进行配置，通过这种方式好处可以把配置函数放在一个独立的`module`甚至`library`中，实现配置的复用。

```rust
fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/app")
        .route(web::get().to(|| async {HttpResponse::Ok().body("Hello world")}))
    );
}

fn scope_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/user")
        .route(web::get().to(|| async {HttpResponse::Ok().body("hello man")}))
    );
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let shared_state = web::Data::new(AppState {
        counter: Mutex::new(0)
    });
    HttpServer::new(move || {
        App::new()
        .app_data(web::Data::new(shared_state.clone()))
        .configure(config)
        .service(
            web::scope("/app").configure(scope_config)
        )
    }).bind(("localhost", 8080))?
        .run()
        .await
}
```

### Http Server

Server负责处理http请求，Server初始化时接受`app factory`作为参数。为了启动Server，需要先绑定到网络`socket`，socket参数的格式形如`（host, port）`,如果端口已经被占用则会失败。通过调用`HttpServer::run()`返回Server实例，之后需被`await`或`spawn`才会开始处理请求，Server会一直运行知道收到终止信号（`ctrl + c` for windows）。

```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(||{
        App::new().route("/app", web::get().to(||async{HttpResponse::Ok().body("Hello app")}))
    }).bind(("127.0.0.1", 8080))?.run().await
}
```

#### 多线程

