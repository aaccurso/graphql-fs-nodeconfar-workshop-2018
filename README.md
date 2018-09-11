# Graphql FileSystem

https://graphql.org/graphql-js/

## Queries

```gql
query filesAndDirs {
  files {
    name
    type
  }
  dirs {
    name
    type
    files {
      name
      type
    }
  }
}
```

```gql
query ls {
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

```qgl
query lsDirA {
  ls(dir:"dirA") {
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

## Mutations

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```
