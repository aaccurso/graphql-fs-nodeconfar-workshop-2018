# Step 7 <img align="right" width="100" height="100" src="../img/graphql-fs-level-7.png">

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

---

Antes de continuar verifica que pasen los tests: `npm run test:7`

[Paso anterior](STEP-6.md) - The End :tada:
