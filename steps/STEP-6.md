# Step 6

Queremos listar un directorio específico.

Dada la siguiente consulta:

```gql
query listDir {
  ls(dir: "Mother") {
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

Queremos obtener este resultado:

```json
{
  "data": {
    "ls": [
      {
        "name": "Father",
        "type": "Dir",
        "parent": "Mother"
      },
      {
        "name": "Marge_Simpson.png",
        "type": "File"
      },
      {
        "name": "Mother",
        "type": "Dir",
        "parent": "Mother"
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

> __Nota__: Antes de continuar, seguramente habrás notado el uso de `fragment`. Los _fragments_ son unidades reutilizables que agrupan un conjunto de _fields_ para incluirlas en las queries que necesites.

## Agregar argumento _dir_ al field _ls_

__TODO__: completar

## Utilizar argumento _dir_ en el resolver de _ls_ para el tipo __Query__

__TODO__: completar

---

[Paso anterior](STEP-5.md) - [Paso siguiente](STEP-7.md)
