# GraphQL FileSystem

[![CircleCI](https://circleci.com/gh/aaccurso/graphql-fs-nodeconfar-workshop-2018.svg?style=svg&circle-token=d815f072dd7b04e0425b8ff286ac15c3153b10f0)](https://circleci.com/gh/aaccurso/graphql-fs-nodeconfar-workshop-2018)

## [Introduction](/INTRO.md)

[graphql-js](https://graphql.org/graphql-js/)

## [Step 0](/steps/STEP-0.md)

Setup del proyecto y enunciado del ejercicio que vamos a resolver en el workshop.

## [Step 1](/steps/STEP-1.md)

```gql
query listFiles {
  files {
    name
  }
}
```

## [Step 2](/steps/STEP-2.md)

```gql
query listDirs {
  dirs {
    name
    type
  }
}
```

## [Step 3](/steps/STEP-3.md)

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

## [Step 4](/steps/STEP-4.md)

```gql
query list {
  ls {
    name
    type
  }
}
```

## [Step 5](/steps/STEP-5.md)

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

## [Step 6](/steps/STEP-6.md)

```gql
query listDir {
  ls(dir: "Mother") {
    ...stats
    ... on Dir {
      parent
      ...stats
    }
  }
}

fragment stats on Stat {
  name
  type
}
```

## [Step 7](/steps/STEP-7.md)

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```
