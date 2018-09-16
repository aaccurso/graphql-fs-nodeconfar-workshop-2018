# GraphQL FileSystem

## Intro

[INTRO](/INTRO.md)
[graphql-js](https://graphql.org/graphql-js/)

## Step 1

```gql
query listFiles {
  files {
    name
  }
}
```

[STEP-1](/STEP-1.md)

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

[STEP-2](/STEP-2.md)

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

[STEP-3](/STEP-3.md)

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

[STEP-4](/STEP-4.md)

## Step 5

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```

[STEP-5](/STEP-5.md)
