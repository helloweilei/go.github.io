1. 包管理的方式变更

- 问题：array.go:5:2: package mastergo/readfile is not in GOROOT (/usr/local/go/src/mastergo/readfile)
- 解决方式
  - 使用新的包管理方式
  - `go env -w GO111MODULE=auto`

2.
