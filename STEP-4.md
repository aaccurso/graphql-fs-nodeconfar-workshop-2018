# Step 4

Queremos listar un directorio específico dentro de nuestro `ROOT_PATH`.

Query:

```gql
query listDirA {
  ls(dir: "dirA") {
    ...stats
    ... on Dir {
      parent
      ...stats
    }
  }
}

fragment stats on Stat {
  name
  type
}
```

Resultado:

```json
{
  "data": {
    "ls": [
      {
        "name": "fileA.txt",
        "type": "File"
      }
    ]
  }
}
```

> __Nota__: Antes de continuar, seguramente habrás notado el uso de `fragment`. Los _fragments_ son unidades reutilizables que agrupan un conjunto de _fields_ para incluirlas en las queries que necesites.

## Agregar argumento _dir_ al field _ls_

__TODO__: completar

## Utilizar argumento _dir_ en el resolver de _ls_ para el tipo __Query__

__TODO__: completar
