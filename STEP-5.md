# Step 5

Queremos crear un archivo y escribir contenido en el mismo.

Query:

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
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