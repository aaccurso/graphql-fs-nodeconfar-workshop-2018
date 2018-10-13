# Step 1 <img align="right" width="100" height="100" src="../img/graphql-fs-level-1.png">

Nuestro primer desafío consiste en **listar los nombres de los archivos** dentro de `ROOT_PATH`, donde se encuentran los personajes de Los Simpsons.

Es decir que dada la siguiente query:

```gql
query listFiles {
  files {
    name
    type
  }
}
```

El resultado de la misma deberia ser el siguiente:

```json
{
  "data": {
    "files": [
      {
        "name": "Bart_Simpson.png",
        "type": "File",
      },
      {
        "name": "Lisa_Simpson.png",
        "type": "File",
      },
      {
        "name": "Maggie_Simpson.png",
        "type": "File",
      }
    ]
  }
}
```

## Crear tipo __File__

Lo primero que debemos hacer es definir el esquema (_schema_) que nos permitirá resolver nuestra consulta. Los esquemas están compuestos por varios [tipos](https://www.apollographql.com/docs/apollo-server/v2/schemas/types.html) (ubicados en [src/typeDefs.js](../src/typeDefs.js)) y cada tipo asimismo está compuesto por uno o más campos (_fields_).

Los campos pueden ser de **tipos escalares o no escalares**. Los campos escalares pueden ser de tipo _String_, _Int_, _Float_, _Boolean_ o _ID_ y representan un valor concreto de una propiedad de un objeto en nuestro sistema. Los campos no escalares son instancias de alguno de los tipos definidos en nuestro esquema y representan las relaciones entre los nodos de nuestro grafo.

Nuestro esquema deberia incluir un tipo para representar un archivo de nuestro file system, donde los campos de ese tipo van a ser las distintas propiedades que nos interesa obtener del archivo. Para el tipo _File_:

```gql
# src/typeDefs.js

# Agrega debajo definiciones de tipo como File
type File {
  name: String!
  type: String!
}
```

> [__!__](https://www.apollographql.com/docs/apollo-server/v2/schemas/types.html#Non-nullable-types) es un modificador de tipo que indica que este campo no puede ser _null_.

## El tipo __Query__

Hasta ahora nuestro esquema está compuesto por el tipo _File_ que acabamos de definir. Sin embargo, no es suficiente para poder **realizar consultas** a nuestro servicio GraphQL.

Para ello debemos definir un tipo adicional, el tipo [_Query_](https://www.apollographql.com/docs/apollo-server/v2/schemas/types.html#Query-type). El mismo define cuáles son los puntos a partir de los cuales podremos navegar el grafo formado por los objetos en nuestro sistema.

En nuestro caso, nos interesa tener al menos un campo que nos permita obtener la lista de archivos, por lo que el tipo _Query_ podría definirse como sigue:

```gql
type Query {
  files: [File!]!
}
```

> __[]__ es un modificador de tipo que indica que este campo es una lista.
> __[]!__ indica que la lista no puede ser null, al menos se tiene que devolver una lista vacía.

## __Resolvers__

Teniendo nuestro esquema definido, aun falta una última pieza para que el interprete de GraphQL pueda resolver una consulta. Falta implementar los resolvers ubicados en [src/resolvers.js](../src/resolvers.js).

Los [resolvers](https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature) son un **conjunto de funciones** que permiten calcular los valores de los campos para aquellos casos en los que los mismos no se pueden obtener de forma trivial. Por ejemplo, para el esquema que hemos definido nos hace falta un único resolver:

```js
// src/resolvers.js

module.exports = {
  Query: {
    hello: () => {/* ... */},
    // Agrega debajo los resolvers para Query
    files: async () => {
      // TODO: Retornar la lista de archivos usando `readDir`
    }
  }
};
```

Para facilitar la lectura de directorios implementamos el helper `readDir` ubicado en [src/filesystem.js](../src/filesystem.js) que lee `ROOT_PATH` (que es nuestro directorio con Los Simpsons) y devuelve un listado de objetos con la información que necesitamos de los archivos.

> Cabe destacar que en este caso el único resolver necesario es el del tipo _Query_, mientras que los resolvers del tipo _File_ no son necesarios ya que alcanza con devolver un objeto cuyas propiedades tengan los mismos nombres y tipos escalares que los campos del tipo _File_.

---

Antes de continuar verifica que pasen los tests: `npm run test:1`

[Paso anterior](STEP-0.md) - [Paso siguiente](STEP-2.md)
