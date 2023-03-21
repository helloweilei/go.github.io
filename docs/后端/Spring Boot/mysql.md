---
title: MySql
---
### 1. 添加依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 2. Config MySQL

```yml
spring.datasource.username=restadmin
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/restdb?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.password=password
spring.jpa.database=mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update

#Show SQL
spring.jpa.properties.hibernate.show_sql=true
#Format Sql
spring.jpa.properties.hibernate.format_sql=true
```

### 3. 调整Entity中UUID的注解（如果有相关报错）

```java
@Entity
public class Employee {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  @JdbcTypeCode(SqlTypes.CHAR)
  @Column(length = 36, columnDefinition = "varchar(36)", nullable = false, updatable = false)
  private UUID id;
}
```