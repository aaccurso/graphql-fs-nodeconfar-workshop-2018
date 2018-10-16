# Step 6 <img align="right" width="100" height="100" src="../img/graphql-fs-level-6.png">

Hasta ahora tenemos lo necesario para navegar nuestro file system partiendo del `ROOT_PATH` y descendiendo tantos niveles como queramos. En este paso tendremos como objetivo listar los archivos y directorios partiendo de un directorio específico.

Es decir, dada la siguiente consulta:

```gql
query listDirRecursive {
  ls(dir: "Mother") {
    ...stats
    ... on Dir {
      ...stats
    }
  }
}

fragment stats on Stat {
  name
  type
}
```

Queremos obtener este resultado:

```json
{
  "data": {
    "ls": [
      {
        "name": "Father",
        "type": "Dir"
      },
      {
        "name": "Marge_Simpson.png",
        "type": "File"
      },
      {
        "name": "Mother",
        "type": "Dir"
      },
      {
        "name": "Patty_Bouvier.png",
        "type": "File"
      },
      {
        "name": "Selma_Bouvier.png",
        "type": "File"
      }
    ]
  }
}
```

> __Nota__: Antes de continuar, seguramente habrás notado el uso de [`fragment`](https://graphql.org/learn/queries/#fragments). Los _fragments_ son unidades reutilizables que agrupan un conjunto de _fields_ para incluirlas en las queries que necesites.

## Argumentos de un campo

Lo primero que pueden haber notado es que la consulta del ejemplo anterior tiene un valor entre paréntesis. Este valor es un [argumento](https://graphql.org/learn/queries/#arguments) y permite parametrizar el resolver de un campo.

Para poder utilizar un argumento en nuestra consulta primero debemos agregarlo en la definición del tipo donde se encuentra. Por ejemplo, en nuestro caso podría ser algo así:

```gql
type Query {
  ls(dir: String): [Stat!]!
}
```

> __Nota__: El tipo del parámetro __dir__ no tiene un signo __!__ al final, esto indica que el mismo es opcional.

## Argumentos de un campo y resolvers

Una vez que hemos definido el argumento en nuestro esquema podemos utilizarlo en nuetras consultas, pero todavía necesitamos hacer uso de dicho argumento en nuestro resolver para que modifique el resultado del mismo.

Anteriormente en el paso 3 vimos que las funciones resolver reciben como primer parámetro un argumento llamado __obj__. Además reciben un segundo parámetro habitualmente llamado __args__ que es un objeto que tiene todos los valores que se pasaron como parámetro en el campo. Es decir que a la hora de implementar el resolver para el campo _ls_ podemos acceder a sus argumentos de la siguiente forma:

```javascript
{
  Query {
    ls: (obj, args) => {
      // Utilizar args.dir para calcular el directorio inicial
    }
  }
}
```

---

Antes de continuar verifica que pasen los tests: `npm run test:6`

[Paso anterior](STEP-5.md) - [Paso siguiente](STEP-7.md)
