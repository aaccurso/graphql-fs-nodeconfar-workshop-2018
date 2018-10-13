# Step 7 <img align="right" width="100" height="100" src="../img/graphql-fs-level-7.png">

Hasta ahora hemos implementado todo lo necesario para poder navegar nuestro file system de forma cómoda y sencilla usando consultas de GraphQL.

El último paso tiene como objetivo agregar la funcionalidad necesaria para poder crear un archivo.

Es decir, dada la siguiente consulta:

```gql
mutation writeFile($name: String!, $content: String!) {
  writeFile(name: $name, content: $content) {
    name
  }
}
```

Con estos _query parameters_: 

```json
{
  "name": "test.txt",
  "content" "test"
}
```

Nos interesa obtener este resultado:

```json
{
  "data": {
    "writeFile": {
      "name": "test.txt"
    }
  }
}
```

Y además de eso, debería existir un archivo `ROOT_PATH/test.txt` cuyo contenido sea "text".

## El tipo __Mutation__

En el [paso 1](STEP-1.md) del workshop vimos que el tipo _Query_ era un tipo especial que nos provee un punto de partida para nuestras consultas. De forma análoga al tipo _Query_, existe otro tipo llamado [_Mutation_](https://www.apollographql.com/docs/apollo-server/v2/schemas/types.html#Mutation-type).

Los campos que componen al tipo _Mutation_ representan todas las operaciones de escritura que podemos realizar con nuestro esquema GraphQL. Asimismo, estos campos suelen devolver las entidades que acaban de ser creadas o modificadas.

La definición del tipo _Mutation_ es análoga a la definición del tipo _Query_, por ejemplo:

```gql
type Mutation {
  writeFile(name: String!, content: String!): File!
}
```

## Resolver del tipo __Mutation__

Los resolvers del tipo _Mutation_ son iguales a cualquier otro resolver, con la diferencia de que los mismos deben no sólo modificar los datos en nuestro sistema sino que ademas deben devolver la entidad que ha sido modificada.

```javascript
{
  Mutation: {
    writeFile: (obj, args) => {
      // Obtener los parametros name y content de args,
      // crear un archivo con el nombre y contenido dado y devolver un objeto
      // que sea acorde al tipo File
    }
  }
}
```

> __Nota__: Como regla general, toda operación de escritura debe implementarse como una _mutation_ y toda operación de lectura como una consulta convencional.

---

Antes de continuar verifica que pasen los tests: `npm run test:7`

[Paso anterior](STEP-6.md) - The End :tada:
