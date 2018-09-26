# GraphQL FileSystem

[![CircleCI](https://circleci.com/gh/aaccurso/graphql-fs-nodeconfar-workshop-2018.svg?style=svg&circle-token=d815f072dd7b04e0425b8ff286ac15c3153b10f0)](https://circleci.com/gh/aaccurso/graphql-fs-nodeconfar-workshop-2018)

## [Introduction](/INTRO.md)

[graphql-js](https://graphql.org/graphql-js/)

## [Step 1](/STEP-1.md)

```gql
query listFiles {
  files {
    name
  }
}
```

## [Step 2](/STEP-2.md)

```gql
query listDirs {
  dirs {
    name
    type
    files {
      name
      type
    }
    dirs {
      name
      type
    }
  }
}
```

## [Step 3](/STEP-3.md)

```gql
query list {
  ls {
    name
    type
    ... on Dir {
      ls {
        name
        type
      }
    }
  }
}
```

## [Step 4](/STEP-4.md)

```gql
query listDirA {
  ls(dir: "dirA") {
    name
    type
    ... on Dir {
      parent
      ls {
        name
        type
      }
    }
  }
}
```

## [Step 5](/STEP-5.md)

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```
