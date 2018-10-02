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
  Dir: {
    files: obj => {
      // TODO: read files from current resolved dir
      return [];
    },
  },
}
```

## El argumento _obj_

El primer argumento de una función _resolver_ representa el objeto que contiene el resultado devuelto por el resolver del campo padre.

En nuestro ejemplo, el argumento _obj_ de `Dir.files` contiene el objeto que resuelve el resolver de `Query.dirs`. Es decir:

```javascript
{
  name: "Father",
  type: "Dir"
}
```

Por lo tanto, en nuestro resolver podemos acceder a `obj.name` para poder seguir consultando niveles más profundos de nuestro filesystem.
