# Step 4 <img align="right" width="100" height="100" src="../img/graphql-fs-level-4.png">

En este paso queremos generar un listado de archivos y directorios a partir de un único comando `ls`.

Es decir, dada la siguiente consulta:

```gql
query list {
  ls {
    name
    type
  }
}
```

Queremos obtener esta respuesta:

```json
{
  "data": {
    "ls": [
      {
        "name": "Bart_Simpson.png",
        "type": "File"
      },
      {
        "name": "Father",
        "type": "Dir"
      },
      {
        "name": "Lisa_Simpson.png",
        "type": "File"
      },
      {
        "name": "Maggie_Simpson.png",
        "type": "File"
      },
      {
        "name": "Mother",
        "type": "Dir"
      }
    ]
  }
}
```

## Crear interfaz __Stat__

Para poder tratar archivos y directorios de forma polimórfica es necesario contar con una entidad que defina sus campos en común.

En GraphQL contamos con el tipo abstracto [Interface](https://www.apollographql.com/docs/apollo-server/features/unions-interfaces.html#Interface-type), que nos va a permitir describir los campos que comparten `File` y `Dir`.

En nuestro caso podemos llamar [_Stat_](https://en.wikipedia.org/wiki/Stat_(system_call)) a esta abstracción de archivos y directorios ya que es el nombre que utilizan los sistemas Unix para referirse a los atributos de un inodo:

```gql
interface Stat {
  # Campos comunes
}
```

## Implementar interfaz __Stat__ para __File__ y __Dir__

Luego es necesario modificar nuestro esquema para que los tipos `File` y `Dir` implementen la interfaz `Stat`.

Por ejemplo, para `File` modificamos su definición de esta forma:

```gql
type File implements Stat {
  # Campos comunes
  # Campos particulares de File
}
```

## Resolver tipo __Stat__

Solo falta indicarle a GraphQL cómo queremos que distinga entre los tipos `File` y `Dir`.

Para ello vamos a implementar el resolver [`__resolveType`](https://www.apollographql.com/docs/apollo-server/features/unions-interfaces.html) para la interfaz `Stat`, el cual debe devolver el tipo como string.

```javascript
{
  Stat: {
    __resolveType(obj) {
      // TODO: Retornar 'File' o 'Dir' de acuerdo al tipo del inodo
    },
  },
}
```

## Implementar _ls_

Ahora es tu turno! Solo queda agregar la definición de `ls` al tipo Query e implementar su resolver para que devuelva archivos y directorios.

---

Antes de continuar verifica que pasen los tests: `npm run test:4`

[Paso anterior](STEP-3.md) - [Paso siguiente](STEP-5.md)
