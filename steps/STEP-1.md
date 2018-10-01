# Step 1

El objetivo de este paso es listar los nombres de los archivos que se encuentran en `ROOT_PATH`, es decir la carpeta `src/__test__/The Simpsons`. Es decir que dada la siguiente query:

```gql
query listFiles {
  files {
    name
  }
}
```

El resultado de la misma deberia ser el siguiente:

```json
{
  "data": {
    "files": [
      {
        "name": "Bart_Simpson.png"
      },
      {
        "name": "Lisa_Simpson.txt"
      },
      {
        "name": "Maggie_Simpson.txt"
      }
    ]
  }
}
```

## Crear tipo __File__

Para comenzar a resolver este ejercicio lo primero que debemos hacer es definir el esquema (_schema_) que nos permitirá resolver nuestra consulta. Los esquemas están compuestos por varios tipos y cada tipo asimismo está compuesto por uno o más campos (_fields_).

Los campos pueden ser de tipos escalares o no escalares. Los campos escalares pueden ser de tipo String, Int, Float, Boolean o ID y representan un valor concreto de una propiedad de un objeto en nuestro sistema. Los campos no escalares son instancias de alguno de los tipos definidos en nuestro esquema y representan las relaciones entre los nodos de nuestro grafo.

Para resolver este ejercicio deberíamos nuestro esquema deberia incluir al menos un tipo para representar un archivo de nuestro file system, donde los campos de ese tipo van a ser las distintas propiedades del archivos que nos interesa obtener. Por ej.:

```gql
type File {
  name: String!
}
```

> __String__ es uno de los tipos escalares built-in de GraphQL.

> __!__ es un modificador de tipo que indica que este campo no puede ser _null_.

## El tipo __Query__

Hasta ahora nuestro esquema está compuesto por al menos el tipo _File_ que acabamos de definir. Para poder realizar consultas debemos definir un tipo adicional, el tipo _Query_. El tipo _Query_ es un tipo especial que debe estar presente en todos los esquemas GraphQL. El mismo no tiene como propósito definir una entidad de nuestro sistema, sino que define cuáles son los puntos a partir de los cuales podremos navegar el grafo formado por los objetos en nuestro sistema.

En nuestro caso, nos interesa tener al menos un campo que nos permita obtener la lista de archivos en `ROOT_PATH`, por lo que el tipo _Query_ podría definirse como sigue:

```gql
type Query {
  files: [File!]!
}
```

> __[]__ es un modificador de tipo que indica que este campo es una lista.

## __Resolvers__

Teniendo nuestro esquema definido aun falta una última pieza para que el interprete de GraphQL pueda resolver una consulta, falta implementar los __resolvers__.

Los resolvers son un conjunto de funciones que permiten calcular los valores de los campos para aquellos casos en los que los mismos no se pueden obtener de forma trivial. Por ej., para el esquema que hemos definido nos hace falta un único resolver:

```js
const resolvers = {
  Query: {
    files: () => {
      // TODO: implement read ROOT_PATH dir
      return [];
    }
  }
};
```

Cabe destacar que en este caso el único resolver necesario es el del tipo _Query_, mientras que los resolvers del tipo _File_ no son necesarios ya que alcanza con devolver un objeto cuyas propiedades tengan los mismos nombres que los campos del tipo _File_.
