# Step 7

Queremos crear un archivo y escribir contenido en el mismo.

Query:

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```

Query variables:

```json
{
  "name": "test.txt",
  "content": "test"
}
```

Resultado:

```json
{
  "data": {
    "writeFile": {
      "name": "test.txt"
    }
  }
}
```

## Crear tipo __Mutation__

__TODO__: completar

## Resolver tipo __Mutation__

__TODO__: completar
