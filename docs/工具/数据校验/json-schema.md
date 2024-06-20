---
title: Json Schema简介
---
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://www.example.com/article.schema.json",
  "title": "Article",
  "description": "Object to describe transferred data",
  "type": "object",
  "properties": {
    "id": {
      "description": "unique identity for an article",
      "type": "integer"
    },
    "title": {
      "description": "the article's title",
      "type": "string"
    },
    "likes": {
      "description": "the amount of likes for this article",
      "type": "number",
      "minimum": 0
    },
    "tags": {
      "description": "tags for an article",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "author": {
      "description": "",
      "type": "object",
      "properties": {
        "width": { "type": "number" },
        "height": { "type": "number" }
      }
    }
  },
  "required": ["id", "title", "likes"]
}

```

#### 通过Schema校验数据
