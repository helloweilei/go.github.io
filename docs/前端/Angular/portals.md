---
title: CDK Portals
---
### 导入Portal Module

```ts
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
    imports: [
        PortalModule,
    ],
})
export class AppModule {
}
```

### 动态显示ComponentPortal

```ts
// 1. 创建DomPortalHost
this.portalHost = new DomPortalHost(
    this.elementRef.nativeElement as HTMLElement,
    this.componentFactoryResolver,
    this.appRef,
    this.injector
);
// injectionTokens用于传递参数，如果不想传递参数，直接const templatePortal = new ComponentPortal(PortalChildComponent) 就可以了
const injectionTokens = new WeakMap();
injectionTokens.set(PORTAL_CHILD_DATA, '构建组件传递的参数');

// 2. 创建ComponentPortal
const templatePortal = new ComponentPortal(PortalChildComponent
    , this.viewContainerRef
    , new PortalInjector(this.injector, injectionTokens)
    , this.componentFactoryResolver);

// 3. ComponentPortal attach 到DomPortalHost里面去, 并且把ComponentPortal里面的时间返回上来
// 如果不需要传出参数，this.portalHost.attach(templatePortal); 就可以了
const portalComponentRef: ComponentRef<PortalChildComponent> = this.portalHost.attachComponentPortal(templatePortal);
// 处理返回回来的事件
const eventEmitter: EventEmitter<string> = new EventEmitter<string>();
portalComponentRef.instance.outEvent = eventEmitter;
eventEmitter.pipe(takeUntil(this._$destroy))
    .subscribe((event: string) => this.handlerPortalEvent(event));
```


### 动态显示TemplatePortal

```ts
// 1. DomPortalHost
const portalHost = new DomPortalHost(
    this.elementRef.nativeElement as HTMLElement,
    this.componentFactoryResolver,
    this.appRef,
    this.injector
);
// 2. TemplatePortal
const templatePortal = new TemplatePortal(
    this.testTemplate,
    this.viewContainerRef,
    {
        $implicit: "我是传递进来的数据",
    }
);
// 3. attach
portalHost.attach(templatePortal);
```

### 使用指令

#### CDK Portal

在模版中使用指令：

```html
<!-- #divPortal="cdkPortal",CdkPortal指令有exportAs: 'cdkPortal'元数据，所以我们才可以这么写来获取，来获取CdkPortal对象  -->
<ng-template #divPortal="cdkPortal" cdkPortal let-obj let-location="location">
    <h2>ng-template 指定的内容(first) 外部参数 {{obj.age}}</h2>
</ng-template>

<!-- 不建议在div上添加*cdkPortal指令，完全可以用ng-template代替 -->
<div *cdkPortal>
    <h2>ng-template 指定的内容(last)</h2>
</div>
```

在组件中通过ViewChild获取TemplatePortal：

```ts
// 获取单个的cdkPortal指令的元素的TemplatePortal 【#templatePortal="cdkPortal"】
@ViewChild('templatePortal') divTemplatePortal: TemplatePortal<any>;
```

#### CDK Portal Outlet

```ts
import {Component, ViewChild} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';

@Component({
    selector: 'app-cdk-portal',
    template: `
        <!-- Portal显示的位置 -->
        <div class="demo-portal-host">
            <!-- cdkPortalOutlet来指定动态内容需要放置的地方，参数是selectedPortal他是一个ComponentPortal或者TemplatePortal
             显示的内容会根据selectedPortal的改变而改变-->
            <ng-template cdkPortalHost [cdkPortalOutlet]="templatePortal" (attached)="onPortalAttached()"></ng-template>
        </div>

        <!-- #divPortal="cdkPortal",CdkPortal指令有exportAs: 'cdkPortal'元数据，所以我们才可以这么写来获取，来获取CdkPortal对象  -->
        <ng-template #templatePortal="cdkPortal" cdkPortal>
            <h2> cdkPortalHost cdkPortal 配合使用动态显示</h2>
        </ng-template>
    `,
    styleUrls: ['./cdk-portal.component.less']
})
export class CdkPortalComponent  {

    // cdkPortal指令对应的Portal
    @ViewChild('templatePortal') templatePortal: TemplatePortal<any>;

    onPortalAttached() {
        console.log('PortalOutlet 有元素attach上来了');
    }
}
```
