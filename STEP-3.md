# Step 3

Queremos generar un listado de archivos y directorios a partir de un único comando.
Luego para directorios queremos poder listar su contenido de manera recursiva.

Query:

```gql
query list {
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

Resultado:

```json
{
  "data": {
    "ls": [
      {
        "name": "dirA",
        "type": "Dir",
        "ls": [
          {
            "name": "fileA.txt",
            "type": "File"
          }
        ]
      },
      {
        "name": "fileA.txt",
        "type": "File"
      },
      {
        "name": "fileB.txt",
        "type": "File"
      }
    ]
  }
}
```

## Crear interfaz __Stat__

__TODO__: hablar de interfaces y del método `__resolveType`

## Implementar interfaz __Stat__ para __File__ y __Dir__

__TODO__: completar

## Agregar field _ls_ al tipo __Query__

__TODO__: completar

## Resolver _ls_ para tipo __Query__

__TODO__: completar

En este momento se puede realizar la siguiente query:

```gql
query list {
  ls {
    name
    type
  }
}
```

## Agregar field _ls_ al tipo __Dir__

__TODO__: completar

## Resolver _ls_ para tipo __Dir__

__TODO__: completar
