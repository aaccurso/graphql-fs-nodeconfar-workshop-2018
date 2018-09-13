# Graphql FileSystem

https://graphql.org/graphql-js/

## Step 1

```gql
query listFiles {
  files {
    name
  }
}
```

[Doc](/STEP-1.md)

## Step 2

```gql
query listFilesAndDirs {
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
    dirs {
      name
      type
    }
  }
}
```

## Step 3

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

## Step 4

```qgl
query lsDirA {
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

## Step 5

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```
