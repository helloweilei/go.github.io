---
title: Dependency Inject
---
### Best Practices

- Favor using Contructor Injection over Setter Injection
- User final properties for injected components
  - Declare property `private final` and initialize in the constructor
- Whenever practical, code to an interface

### 依赖注入的方式

- 属性字段注入（通过Autowired注解， not recommended）
- 构造函数
- setter(需要在setter上加上Autowired注解)

### Bean的life cycle

![Spring Bean Life Cycle](https://howtodoinjava.com/wp-content/uploads/Spring-bean-life-cycle.png)

### Customerize the Bean Life Cycle

1. `InitializingBean` and `DisposableBean` callback interfaces
   ```java
   public class DemoBean implements InitializingBean, DisposableBean
   {
   	//Other bean attributes and methods 

   	@Override
   	public void afterPropertiesSet() throws Exception
   	{
   		//Bean initialization code
   	}

   	@Override
   	public void destroy() throws Exception
   	{
   		//Bean destruction code
   	}
   }
   ```
2. *Aware interfaces for specific behavior

We can summarize these interfaces as :

| Aware interface                    | Method to override                                                                            | Purpose                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ApplicationContextAware`        | void `setApplicationContext` (ApplicationContext applicationContext) throws BeansException; | Interface to be implemented by any object that wishes to be notified of the `ApplicationContext` that it runs in. |
| `ApplicationEventPublisherAware` | void `setApplicationEventPublisher` (ApplicationEventPublisher applicationEventPublisher);  | Set the `ApplicationEventPublisher` that this object runs in.                                                     |
| `BeanClassLoaderAware`           | void `setBeanClassLoader` (ClassLoader classLoader);                                        | Callback that supplies the bean class loader to a bean instance.                                                    |
| `BeanFactoryAware`               | void `setBeanFactory` (BeanFactory beanFactory) throws BeansException;                      | Callback that supplies the owning factory to a bean instance.                                                       |
| `BeanNameAware`                  | void `setBeanName`(String name);                                                            | Set the name of the bean in the bean factory that created this bean.                                                |
| `BootstrapContextAware`          | void `setBootstrapContext` (BootstrapContext bootstrapContext);                             | Set the BootstrapContext that this object runs in.                                                                  |
| `LoadTimeWeaverAware`            | void `setLoadTimeWeaver` (LoadTimeWeaver loadTimeWeaver);                                   | Set the LoadTimeWeaver of this object’s containing ApplicationContext.                                             |
| `MessageSourceAware`             | void `setMessageSource` (MessageSource messageSource);                                      | Set the MessageSource that this object runs in.                                                                     |
| `NotificationPublisherAware`     | void `setNotificationPublisher` (NotificationPublisher notificationPublisher);              | Set the NotificationPublisher instance for the current managed resource instance.                                   |
| `PortletConfigAware`             | void `setPortletConfig` (PortletConfig portletConfig);                                      | Set the PortletConfig this object runs in.                                                                          |
| `PortletContextAware`            | void `setPortletContext` (PortletContext portletContext);                                   | Set the PortletContext that this object runs in.                                                                    |
| `ResourceLoaderAware`            | void `setResourceLoader` (ResourceLoader resourceLoader);                                   | Set the ResourceLoader that this object runs in.                                                                    |
| `ServletConfigAware`             | void `setServletConfig` (ServletConfig servletConfig);                                      | Set the ServletConfig that this object runs in.                                                                     |
| `ServletContextAware`            | void `setServletContext` (ServletContext servletContext);                                   | Set the ServletContext that this object runs in.                                                                    |

```java
package com.howtodoinjava.task;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class DemoBean implements ApplicationContextAware
{
  
        private ApplicationContext ctx;

	@Override
	public void setApplicationContext(ApplicationContext ctx)
			throws BeansException {
		this.ctx = ctx;
	}

        //Use the context in other bean methods
}
```

3. Custom `init()` and `destroy()` methods in bean configuration file

- For single Bean

```java
<beans>

<bean id="demoBean" class="com.howtodoinjava.task.DemoBean"
                init-method="customInit"
                destroy-method="customDestroy"></bean>

</beans>
```

- For all beans

```java
<beans default-init-method="customInit" default-destroy-method="customDestroy">   
 
        <bean id="demoBean" class="com.howtodoinjava.task.DemoBean"></bean>
         ...... more beans
 
</beans>
```

4. `@PostConstruct` and `@PreDestroy` annotations

- @PostConstruct annotated method will be invoked after the bean has been constructed using default constructor and just before it’s instance is returned to requesting object.
- @PreDestroy annotated method is invoked just before the bean is about be destroyed inside bean container.

```java
public class DemoBean

{
	@PostConstruct
	public void customInit()
	{
		System.out.println("Method customInit() invoked...");
	}

    @PreDestroy
	public void customDestroy()
	{
		System.out.println("Method customDestroy() invoked...");
	}
}
```

### 常见问题

1. 注入的接口有多个实现？
   使用@Primary或@Qualifier注解指定需要注入的实现类。
2. 新建的springboot的项目创建不了Bean？
   Springboot的版本有问题， 在pom.xml中将版本号设置成3.0.2。
