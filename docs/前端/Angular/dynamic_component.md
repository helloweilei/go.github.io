---
title: Angular2 动态加载外部组件
---
## 方法一：使用Compiler动态解析模块

```ts
import { AfterViewInit, Compiler, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'lib-my-lib',
  template: `
    <p>
      <ng-template #compView></ng-template>
    </p>
  `,
  styles: [
  ]
})
export class MyLibComponent implements OnInit, AfterViewInit {

  @Input()
  libsModule?: any;

  @ViewChild('compView', { read: ViewContainerRef })
  compViewContainerRef?: ViewContainerRef;

  constructor(
    private compiler: Compiler
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const cfs = this.compiler.compileModuleAndAllComponentsSync(this.libsModule).componentFactories;

    setTimeout(() => {
      const componentRef = this.compViewContainerRef?.createComponent(cfs[0]);
      componentRef!.instance.title = 'Hello world';
    }, 20);
  }

}

```

在上面的例子中外部定义的模块通过输入属性传入到组件，模块的定义如下，模块中包含一个组件 `my-button`。

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyButtonComponent } from './my-button/my-button.component';



@NgModule({
  declarations: [MyButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [MyButtonComponent]
})
export class ComponentLibsModule { }
```

## 方法二：使用ComponentResolevrFactory

```ts

createComponent() {
  // 获取组件工厂
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MyComponent);

  // 创建组件工厂实例
  const componentRef = this.container.createComponent(componentFactory);

  // 设置组件属性
  componentRef.instance.myInput = 'input value';

  // 订阅组件事件
  componentRef.instance.myOutput.subscribe((event) => {
    console.log('Received event:', event);
  });
}

removeComponent() {
  // 移除组件
  this.container.remove();
}

```
