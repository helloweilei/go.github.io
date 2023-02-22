---
title: Dependency Inject
---
### Best Practices

- Favor using Contructor Injection over Setter Injection
- User final properties for injected components
  - Declare property `private final` and initialize in the constructor
- Whenever practical, code to an interface
