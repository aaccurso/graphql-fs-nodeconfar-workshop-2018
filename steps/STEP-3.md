# Step 3

El objetivo de este paso es poder listar los directorios y sus archivos de forma **recursiva**.

Es decir, dada la siguiente consulta:

```gql
query listDirs {
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

Queremos obtener esta respuesta:

<details><summary>Click para ver</summary><p>

```json
{
  "data": {
    "dirs": [
      {
        "name": "Father",
        "type": "Dir",
        "files": [
          {
            "name": "Homer_Simpson.png",
            "type": "File"
          }
        ],
        "dirs": [
          {
            "name": "Father",
            "type": "Dir"
          },
          {
            "name": "Mother",
            "type": "Dir"
          }
        ]
      },
      {
        "name": "Mother",
        "type": "Dir",
        "files": [
          {
            "name": "Marge_Simpson.png",
            "type": "File"
          },
          {
            "name": "Patty_Bouvier.png",
            "type": "File"
          },
          {
            "name": "Selma_Bouvier.png",
            "type": "File"
          }
        ],
        "dirs": [
          {
            "name": "Father",
            "type": "Dir"
          },
          {
            "name": "Mother",
            "type": "Dir"
          }
        ]
      }
    ]
  }
}
```

</p></details>

## Consultas anidadas

Para poder resolver esta consulta es necesario actualizar nuestro esquema y agregar los campos `files` y `dirs` en el tipo que definimos para representar a nuestros directorios.

Además, vamos a necesitar crear los resolvers para estos nuevos campos, ya que esperan que devolvamos objetos que no son del tipo escalar. Por ejemplo:

```javascript
{
  Query: {
    files: () => {
      // Resolver del campo files implementado en el STEP 1
    }
    dirs: () => {
      // Resolver del campo dirs implementado en el STEP 2
    }
  }
  Dir: {
    files: obj => {
      // TODO: leer los archivos del directorio actual
      // la info del directorio actual se encuentra en el parametro obj
      return [];
    },
    dirs: obj => {
      // TODO: leer los directorios del directorio actual
      // la info del directorio actual se encuentra en el parametro obj
      return [];
    }
  },
}
```

Es importante notar cada vez que el interprete de GraphQL tenga que resolver el campo `files` o `dirs` de un objeto tipo `Dir` utilizará estos resolvers.

### El argumento _obj_

El primer argumento de una función _resolver_ es el objeto devuelto por el _resolver_ del campo padre.

Supongamos que nuestro interprete GraphQL recibe la siguiente la consulta:

```gql
query listDirs {
  dirs {
    name
    dirs {
      name
    }
  }
}
```
En primer lugar va a computar los campos triviales del campo `dirs` que está más afuera, el cual dará como resultado un objeto similar a este:

```javascript
{
  name: "Father",
}
```

Luego intentará resolver los campos no triviales, es decir aquellos que se computan usando resolvers, invocando los distintos resolvers y pasándoles como primer parámetro este objeto. Es así como el resolver del campo `Dir.dirs` recibirá como primer parámetro un objeto con el nombre de la carpeta desde donde se está haciendo la consulta. Este proceso se repetirá tantas veces como sea necesario.

El argumento _obj_ es de particular importancia porque es el que __permite que nuestras consultas puedan tener anidamiento__.
