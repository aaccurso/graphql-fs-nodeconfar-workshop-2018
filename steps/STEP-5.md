# Step 5 <img align="right" width="100" height="100" src="../img/graphql-fs-level-5.png">

El objetivo de este paso es poder listar los directorios y sus archivos con un solo comando de forma **recursiva**.

Es decir, dada la siguiente consulta:

```gql
query listRecursive {
  ls {
    name
    type
    ... on Dir {
      ls {
        name
        type
      }
    }
  }
}
```

Queremos obtener esta respuesta:

<details><summary>Click para ver</summary><p>

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
        "type": "Dir",
        "ls": [
          {
            "name": "Father",
            "type": "Dir"
          },
          {
            "name": "Homer_Simpson.png",
            "type": "File"
          },
          {
            "name": "Mother",
            "type": "Dir"
          }
        ]
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
        "type": "Dir",
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
    ]
  }
}
```

</p></details>

## Inline fragments

Como el field `ls` devuelve objetos de tipo `Stat`, solo podemos seleccionar de forma directa los campos definidos en dicha interfaz.

Para poder seleccionar campos de un tipo concreto que implementa `Stat`, como el tipo `Dir`, es necesario recurrir a los _[inline fragments](https://graphql.org/learn/queries/#inline-fragments)_.

En nuestra consulta el fragmento está definido como `... on Dir`, por lo que el field `ls` dentro del fragmento sólo se ejecutará cuando el `Stat` sea de tipo `Dir`.

---

Antes de continuar verifica que pasen los tests: `npm run test:5`

[Paso anterior](STEP-4.md) - [Paso siguiente](STEP-6.md)
