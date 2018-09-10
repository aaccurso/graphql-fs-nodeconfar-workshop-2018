# Graphql FileSystem

https://graphql.org/graphql-js/

## Queries

```gql
{
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
{
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

## Mutations

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```
